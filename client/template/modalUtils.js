Template.profileNotComplete.events({
	'click .orange': function(e,t) { Modal.hide('profileNotComplete'); },
	'click .blue': function(e,t) { 
		Modal.hide('profileNotComplete'); 
		Router.go('editJobber', {id: Meteor.userId()},{query: {tab: 'info'}});
	}
});

var keysTranslate = {
	comment: 'Commentaire',
	price: 'Prix',
},	errMsgTranslate = {
	minString: 'Il faut au moins [x] caracteres'
};

Template.errorModal.helpers({
	translateKey: function(name) {
		return keysTranslate[name];
	},
	translateErrMsg: function(type) {
		return errMsgTranslate[type];
	}
});

