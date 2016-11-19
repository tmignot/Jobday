Accounts.onLogout(function() {
	if (Meteor.isClient)
		Router.go('/');
});
