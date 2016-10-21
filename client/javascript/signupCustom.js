Template.signupCustom.onCreated(function() {
	Session.set('mailSent', 'false');
	Session.set('society', 'false');
});

Template.signupCustom.events({
	'click #jobdaybtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		Meteor.call('addUser', getValues('jobday'), function(err, res) {
			if (err) {
				console.log(err);
			} else if (res) {
				Session.set('mailSent', true);
			}
		});
	},
	'click #googlebtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		Meteor.loginWithGoogle({
			requestionPermissions: ['email', 'profile'],
			requestOfflineToken: true,
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else {
				Router.go('profile', {id: Meteor.userId()});
				$('#signupModal').modal('hide');
			}
		});
	},
	'click #facebookbtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		Meteor.loginWithFacebook({
			requestionPermissions: ['email', 'public_profile'],
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else {
				Router.go('profile', {id: Meteor.userId()});
				$('#signupModal').modal('hide');
			}
		});
	},
	'change #societyInput': function(e,t) {
		Session.set('society', e.currentTarget.value);
	}
});

function getValues(method) {
	return {
		society: Session.equals('society','true'),
		name: $('#signupName').val(),
		firstname: $('#signupFirstname').val(),
		email: $('#signupEmail').val(),
		password: $('#signupPassword').val(),
		confirmation: $('#signupPasswordConfirm').val()
	}
}
