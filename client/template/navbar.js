Template.navbar.events({
	'click .navbar-brand .dummy-link': function(e) { Router.go('home');	},
	'click .proposerUnJob a': function() { // check profile completion before posting a job
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete)
				Router.go('poster');
			else
				Modal.show('profileNotComplete');
		} else
			Modal.show('shouldBeLogged');
	},
	'click .chercherUnJob a': function() { Router.go('searchMission'); },
	'click .commentCaMarche': function() { Router.go('commentCaMarche');},
	'click .fb-button img': function() {},
	'click .signup-link': function() {
		$('#signupModal').modal('show');
	},
	'click .login-link': function() {
		$('#myModal').modal('show');
	},
	'click .logout': function() {
		Meteor.logout();
	},
	'click .profile-link': function() { Router.go('profile', {id: Meteor.userId()}); }
});
