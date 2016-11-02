/*
** profileNotComplete Template buttons
**  [edit profile] and [cancel]
*/
Template.profileNotComplete.events({
	'click .orange': function(e,t) { Modal.hide('profileNotComplete'); },
	'click .blue': function(e,t) { 
		Modal.hide('profileNotComplete'); 
		Router.go('editJobber', {id: Meteor.userId()},{query: {tab: 'info'}});
	}
});
