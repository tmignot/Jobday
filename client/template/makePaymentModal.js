Template.makePaymentModal.onCreated(function() {
	this.activeCard = new ReactiveVar('');
	this.paymentInProgress = new ReactiveVar(false);
	this.formError = new ReactiveVar('');
});

Template.makePaymentModal.helpers({
	total: function() {
		var d = Template.instance().data;
		if (d && d.offers) {
			var t = _.reduce(_.where(d.offers,{validated: true}), function(acc, offer) { return acc + offer.price }, 0) * 1.1;
			return Math.round(t, 2);
		}
	},
	active: function(which) {
		return Template.instance().activeCard.get() == which ? 'selected': '';
	},
	voffers: function() {
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
	'click .card-icon': function(e,t) {
		t.activeCard.set($(e.currentTarget).data('which'));
	},
	'click .blue.button': function(e,t) {
		t.formError.set('');
		t.paymentInProgress.set(true);
		Meteor.call('createCardReg', function(err, res) {
			if (err || !res || !res.cardReg || !res.user)
				throw err;
			else {
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
				} else {
					HTTP.call('POST', res.cardReg.CardRegistrationURL, {params: data}, function(err, nres) {
						if (err || !nres) {
							t.paymentInProgress.set(false);
							t.formError.set('Vos informations ne sont pas valides, veuillez les verifier SVP');
						}	else {
							Meteor.call('updateCardReg', {id: res.cardReg.Id, data: nres.content}, function(err, res) {
								if (err || !res) {
									t.paymentInProgress.set(false);
									t.formError.set('Vos informations ne sont pas valides, veuillez les verifier SVP');
								}	else {
									Meteor.call('makePayment', {advertId: t.data._id, cardId: res}, function(err,res) {
										if (res)
											window.location = res;
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
