Template.makePaymentModal.onCreated(function() {
	this.activeCard = new ReactiveVar('');
	this.paymentInProgress = new ReactiveVar(false);
	this.formError = new ReactiveVar('');
});

Template.makePaymentModal.helpers({
	total: function() { // returns the total amount to pay (price * nbPeople)
		var d = Template.instance().data;
		if (d && d.offers) {
			var t = _.reduce(_.where(d.offers,{validated: true}), function(acc, offer) { return acc + offer.price }, 0) * 1.1;
			return Math.round(t, 2);
		}
	},
	active: function(which) { // retursn 'selected' if a card type [which] is selected
		return Template.instance().activeCard.get() == which ? 'selected': '';
	},
	voffers: function() { // returns the validated offers
		var d = Template.instance().data;
		if (d && d.offers) {
			return _.where(d.offers, {validated: true});
		}
	},
	paymentInProgress: function() {
		return Template.instance().paymentInProgress.get();
	},
	formError: function() {
		return Template.instance().formError.get();
	}
});

Template.makePaymentModal.events({
	'click .card-icon': function(e,t) { // selects a card type
		t.activeCard.set($(e.currentTarget).data('which'));
	},
	'click .blue.button': function(e,t) { // validate payment
		t.formError.set('');
		t.paymentInProgress.set(true);
		/* here we star to register the user's card by creating a cardeRegistration object
			 at mangopay's
		*/
		Meteor.call('createCardReg', function(err, res) {
			if (err || !res || !res.cardReg || !res.user)
				throw err;
			else { // if the operation is successful then we send card info to mango with the card registration data retrieved above
				var data = {
					data: res.cardReg.PreregistrationData,
					accessKeyRef: res.cardReg.AccessKey,
					cardNumber: $('#card-number-input').val(),
					cardExpirationDate: $('#card-exp-input').val(),
					cardCvx: $('#card-cvx-input').val()
				};
				if (!data.data || !data.accessKeyRef || !data.cardNumber || !data.cardExpirationDate || !data.cardCvx) {
					t.paymentInProgress.set(false);
					t.formError.set('Merci de bien remplir le formulaire');
				} else { // form is correctly filled so let's go
					HTTP.call('POST', res.cardReg.CardRegistrationURL, {params: data}, function(err, nres) {
						if (err || !nres) {
							t.paymentInProgress.set(false);
							t.formError.set('Vos informations ne sont pas valides, veuillez les verifier SVP');
						}	else { // Mango says card info are OK, we can make the payment with the newly created cardID
							Meteor.call('updateCardReg', {id: res.cardReg.Id, data: nres.content}, function(err, res) {
								if (err || !res) {
									t.paymentInProgress.set(false);
									t.formError.set('Vos informations ne sont pas valides, veuillez les verifier SVP');
								}	else {
									Meteor.call('makePayment', {advertId: t.data._id, cardId: res}, function(err,res) {
										if (res)
											window.location = res; // we redirect the user to fill 3DSecure form an finalize the payment
										else {
											t.paymentInProgress.set(false);
											t.formError.set('Probleme de communication avec le serveur bancaire, merci de bien vouloir reessayer');
										}
									});
								}
							});
						}
					});
				}
			}
		});
	}
});
