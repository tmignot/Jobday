Template.userCard.events({
	'click .certify': function(e,t) {
		var uid = $(e.currentTarget).data('user-id');
		Modal.allowMultiple = true;
		Modal.show('confirmationModal', {
			message: "Vous etes sur le point de certifier "+
							 (t.data.firstname? t.data.firstname + ' ':'') +
							 t.data.name,
			onConfirm: function() {
				Modal.hide('confirmationModal');
				Meteor.call('certifyUser', uid, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e);
					else {
						Modal.show('modalSuccess', {
							message: "L'utilisateur a bien ete certifie"
						});
					}
				})
			}
		});
	},
	'click .remove': function(e,t) {
		var uid = $(e.currentTarget).data('user-id');
		Modal.allowMultiple = true;
		Modal.show('confirmationModal', {
			message: 'Vous etes sur le point de supprimer le profil de '+
							 (t.data.firstname? t.data.firstname + ' ':'') +
							 t.data.name + '<br>ATTENTION: cette action est irreversible',
			onConfirm: function() {
				Modal.hide('confirmationModal');
				Meteor.call('removeUser', uid, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e);
					else {
						Modal.show('modalSuccess', {
							message: "L'utilisateur a bien ete supprime"
						});
					}
				})
			}
		});
	}
});

Template.userCard.helpers({
	userHasBadge: function(id) {
		console.log('b');
		var m = _.map(Template.instance().data.badges, function(b) {
			return b.badgeId;
		});
		if (m && _.contains(m, id))
			return true;
		else
			return false;
	}
});
