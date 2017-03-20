Template.eventCard_license.events({
	'click .showIdCard': function(e,t) {
		var d = t.data;
		Modal.show('modalAdminVerif', d);
	}
});

Template.eventCard_grade.events({
	'click .showIdCard': function(e,t) {
		var d = t.data;
		Modal.show('modalAdminVerif', d);
	}
});

Template.eventCard_identity.events({
	'click .showIdCard': function(e,t) {
		var d = t.data;
		d.badgeName = 'Identite';
		Modal.show('modalAdminVerif', d);
	}
});

Template.eventCard_pro.events({
	'click .showIdCard': function(e,t) {
		var d = t.data;
		d.badgeName = 'Pro';
		Modal.show('modalAdminVerif', d);
	}
});

Template.modalAdminVerif.helpers({
	userDataKeyVal: function() {
		var uid = Template.instance().data.userEmitter;
		var udata = UsersDatas.findOne({userId: uid});
		switch(Template.instance().data.type) {
			case 'ask_identity_validation':
				return [
					{key: 'Prenom', value: udata.firstname},
					{key: 'Nom', value: udata.name},
					{key: 'Date de naissance', value: moment(udata.birthdate).format('DD/MM/YYYY')}
				];
			case 'ask_grade_validation':
				var keyval = [
					{key: 'Nom', value: udata.name},
					{key: 'Prenom', value: udata.firstname}
				];
				_.each(udata.grades, function(e) {
						keyval.push({key: 'Diplome', value: e.name});
				});
				return keyval;
			case 'ask_license_validation':
				var p = Permis.find({_id: {$in: udata.permis}}).fetch();
				console.log(udata.permis);
				return _.map(p, function(e) {
					return {key: 'Permis ' + e.name};
				});
			case 'ask_pro_validation':
				return [
					{key: 'Adresse', value: udata.address.street + ' ' + 
																	udata.address.zipcode + ' ' +
																	udata.address.city},
					{key: 'SIRET', value: udata.siret}
				];
			default: return;
		}
	},
	docs: function() {
		var d = Template.instance().data;
		switch(d.type) {
			case 'ask_identity_validation': return [d.data.recto, d.data.verso];
			case 'ask_pro_validation': return [d.data.license];
			case 'ask_grade_validation': return [d.data.image];
			default: return '';
		}
	}
});
Template.modalAdminVerif.events({
	'click .confirm': function(e,t) {
		Modal.allowMultiple = true;
		var badgeName = (function() {
			switch(t.data.type) {
				case 'ask_identity_validation': return 'Identite';
				case 'ask_pro_validation': return 'Pro';
				default: return '';
			}
		})();
		if (!badgeName) {
			Meteor.call('removeEvent', t.data._id, function(e) {if (e) console.log(e);});
			Modal.show('modalSuccess', {message: "Vous avez approuve"});
			return;
		}
		Meteor.call('addBadge', {
			userId: t.data.userEmitter,
			badgeName: badgeName,
		}, function(e,r) {
			if (e) {
				Modal.show('serverErrorModal', e);
			} else {
				Meteor.call('removeEvent', t.data._id, function(e) {if (e) console.log(e);});
				Modal.show('modalSuccess', {message: "Le badge a bien ete attribue"});
			}
		});
	},
	'click .cancel': function(e,t) {
		Meteor.call('removeEvent', t.data._id, function(e) {
			if (e) console.log(e);
			else Modal.show('modalSuccess', {message: 'Vous avez refuse le badge'});
		});
	}
});



Template.eventCard_abuse.helpers({
	elemName: function() {
		var elem = Template.instance().data;
		var data = elem ? elem.data : undefined;
		if (!data) { return; }
		switch(data.object) {
			case 'advert': return "une annonce";
			case 'offer': return "une offre";
			case 'user': return "un profil utilisateur";
			case 'message': return "une question/reponse";
			default: return;
		}
	},
	elemLink: function() {
		var elem = Template.instance().data;
		var data = elem ? elem.data : undefined;
		if (!data) { return; }
		switch(data.object) {
			case 'advert': return "/adverts/"+data.advertId;
			case 'offer': return "/adverts/"+data.advertId;
			case 'user': return "/profilUser/"+data.userId;
			case 'message': return "/adverts/"+data.advertId;
			default: return;
		}
	}
});

Template.Events.onRendered(function() {
	EventsPages.requestPage(1);
});
