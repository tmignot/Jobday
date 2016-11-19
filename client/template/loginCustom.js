this.UserActuel = new Object();

Template.loginCustom.onRendered(function(){
		$('.modal-body .has-error').addClass('hidden');
});

// log a user in with a OAuth service provider
// then route to user profile
Template.loginCustom.events({
    'click #googlebtn': function (event) {
			event.preventDefault();
			Modal.hide();
			Meteor.loginWithGoogle({}, function (err) {
				if (err)
					if (err.error)
						Modal.show('accountError');
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
			Modal.hide();
			event.preventDefault();
			Meteor.loginWithLinkedin({}, function (err) {
				if (err) {
					if (err.error)
						Modal.show('accountError');
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				}
			});
    },
    'click #facebookbtn': function (event) {
			Modal.hide();
			event.preventDefault();
			Meteor.loginWithFacebook({}, function (err) {
				if (err) {
					if (err.error)
						Modal.show('accountError');
				} else {
					Router.go('/profiluser/'+Meteor.userId());
					$('#myModal').modal('hide');
				}
			});
    }
});
