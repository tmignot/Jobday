Template.navbar.events({
	'click .navbar-brand .dummy-link': function(e) { Router.go('home');	},
	'click .proposerUnJob a': function() { Router.go('poster'); },
	'click .chercherUnJob a': function() { Router.go('searchMission'); },
	'click .commentCaMarche': function() { Router.go('commentCaMarche');},
	'click .fb-button img': function() {},
	'click .signup-link': function() {
	},
	'click .login-link': function() {
	},
});
