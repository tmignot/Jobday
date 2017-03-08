Template.offer.onCreated(function() {
	this.requestingValidation = new ReactiveVar(false);
});

// helper to convert meters to kilometers
Template.offer.helpers({
	m2km: function(dist) { return Math.round(dist / 1000); },
	requestingValidation: function() {
		return Template.instance().requestingValidation.get();
	},
	hasBeenNoted: function() {
		var t = Template.instance();
		var advert = Template.parentData(2)._id;
		var user = UsersDatas.findOne({userId: t.data.userId});
		console.log(user, user.notes, _.findWhere(user.notes, {advertId: advert}));
		if (user && user.notes && !_.findWhere(user.notes, {advertId: advert}))
			return false;
		return true;
	}
});

/*
** validate an offer
** Server method necessary to update a subdocument because
** the query is not in the simple form {_id: 'id'}
** but in this one: {_id: 'id', 'offers._id': 'o_id'}
** such a query isn't authorized in unsafe code (client)
*/
Template.offer.events({
	'click .edit': function(e,t) {
		var data = t.parent(2).data;
		data.current = t.data;
		Modal.show('makeOfferModal', data);
	},
	'click .remove': function(e,t) {
		Modal.show('confirmationModal', {
			message: 'Vous etes sur le point de supprimer cette offre.<br>'+
							'ATTENTION: cette action est irreversible!',
			onConfirm: function() {
				Modal.allowMultiple = true;
				Modal.hide('confirmationModal');
				Meteor.call('removeOffer', {
					advert: t.parent(2).data._id,
					offer: t.data
				}, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e)
					else
						Modal.show('modalSuccess', {message: "L'offre a bien ete supprimee"});
				});
			}
		});
	},
	'click .validate': function(e,t) {
		t.requestingValidation.set(true);
		Meteor.call('validateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		}, function() {
			t.requestingValidation.set(false);
			var m1 = UsersDatas.findOne({userId: Meteor.userId()}).notificationMail;
						//console.log(m1);
						if (m1 && _.contains(m1, 1)){
									console.log('jonas');
	corpsHtml ="Bonjour ! <br><br>J’ai le plaisir de vous annoncer que l'annonceur à valider votre prestation.  <br><br> " ;
	corpsHtml = corpsHtml + "Je reste à votre service, <br>";	
	corpsHtml = corpsHtml +"Service Client Jobday  <br><br>";
	corpsHtml = corpsHtml +" <a href='http://jobday.fr/missionProfil/'"+res+"> CONSULTER VOTRE ANNONCE</a> <br><br>";
	
				subjectmail ="[JOBDAY] Validation Profil, Déclenchement Paiement.";

				
			
									var data = Meteor.call('sendEmailNoreplyByAnnonce',corpsHtml,subjectmail,Session.get('annonceIDPosteMessageCurrent'),
										function(error, result){					
										   if(error){
											  alert('Error'+error);
										   }else{
											  return result;
										   }
										});
						}
			/* var data = Meteor.call('sendEmailNoreplyByAnnonce','Bonjour, lannonceur a valider votre profil ','Postulant Jobber',t.data._id, function(error, result){
					   if(error){
						//  alert('Error'+error);
					   }else{
						   
						  return result;
					   }
						}); */
		});
	},
	'click .invalidate': function(e,t) {
		t.requestingValidation.set(true);
		Meteor.call('invalidateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		}, function() {
			t.requestingValidation.set(false);
			var m1 = UsersDatas.findOne({userId: Meteor.userId()}).notificationMail;
						//console.log(m1);
						if (m1 && _.contains(m1, 3)){
									//console.log('jonas');
									var data = Meteor.call('sendEmailNoreplyByAnnonce','Bonjour, Refuser Annonce  ','OFFRE',Session.get('annonceIDPosteMessageCurrent'),
										function(error, result){					
										   if(error){
											  alert('Error'+error);
										   }else{
											  return result;
										   }
										});
						}
		});
	},
	'click .comment': function(e,t) {
		Modal.show('leaveComment', {offer: t.data, advert: Template.parentData(2)._id});
	}
});
