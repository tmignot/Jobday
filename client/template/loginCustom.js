this.UserActuel = new Object();

Template.loginCustom.onRendered(function(){
		$('.modal-body .has-error').addClass('hidden');
});

// log a user in with a OAuth service provider
// then route to user profile
Template.loginCustom.events({
    'click #googlebtn': function (event) {
			event.preventDefault();
			Meteor.loginWithGoogle({}, function (err) {
				if (err)
					throw new Meteor.Error("Google login failed");
				else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				}
			});
    },
    'click #jobdaybtn': function (event) {
			event.preventDefault();
			var emailVar = $('#loginEmail').val();
			var passwordVar = $('#loginPassword').val();
			Meteor.loginWithPassword(emailVar, passwordVar, function (err) {
				if (err) {
					$('.modal-body .has-error').removeClass('hidden');
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('.modal-body .has-error').addClass('hidden');
					$('#myModal').modal('hide');
				}
			});
    },
    'click #linkedInbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithLinkedin({}, function (err) {
				if (err) {
						throw new Meteor.Error("Linked login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				}
			});
    },
    'click #facebookbtn': function (event) {
			event.preventDefault();
			Meteor.loginWithFacebook({}, function (err) {
				if (err) {
						throw new Meteor.Error("Facebook login failed");
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				}
			});
    }
});
