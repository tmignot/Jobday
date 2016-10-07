this.UserActuel = new Object();

Template.loginCustom.onRendered(function(){
		$('.modal-body .has-error').addClass('hidden');
});

Template.loginCustom.events({
    'click #googlebtn': function (event) {
			event.preventDefault();
			var emailVar = $('#loginEmail').val();
			var passwordVar = $('#loginPassword').val();
			Meteor.loginWithGoogle({}, function (err) {
				if (err) {
						throw new Meteor.Error("Google login failed");
				} else {
					$('#myModal').on('hidden.bs.modal', function () {
							Router.go('/profiluser');
					}).modal('hide');
				}
			});
    },
    'click #jobdaybtn': function (event) {
			event.preventDefault();
			var emailVar = $('#loginEmail').val();
			var passwordVar = $('#loginPassword').val();
			Meteor.loginWithPassword(emailVar, passwordVar, function err(err) {
				if (err) {
					$('.modal-body .has-error').removeClass('hidden');
				} else {
					$('.modal-body .has-error').addClass('hidden');
					$('#myModal').modal('hide');
				}
			});
    },
    'click #linkedInbtn': function (event) {
        //alert("linkedInAPI");
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        // connectProfil("linkedIn", emailVar, passwordVar);
        Meteor.loginWithLinkedin({}, function (err) {
            if (err) {
                throw new Meteor.Error("Linked login failed");
            } else {

                $('#myModal').on('hidden.bs.modal', function () {
                    Router.go('/profiluser');
                }).modal('hide');

            }
        });

    },
    'click #facebookbtn': function (event) {
        //alert("facebookAPI");
        event.preventDefault();
        var emailVar = $('#loginEmail').val();
        var passwordVar = $('#loginPassword').val();
        // connectProfil("facebook", emailVar, passwordVar);
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            } else {

                $('#myModal').on('hidden.bs.modal', function () {
                    Router.go('/profiluser');
                }).modal('hide');

            }
        });
    }
});
