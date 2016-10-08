Template.signupCustom.onCreated(function() {
	Session.set('society', 'false');
});

Template.signupCustom.events({
	'click #jobdaybtn': function(e,t) {
		console.log(getValues('jobday'));
		Meteor.call('addUser', getValues('jobday'));
	},
	'click #googlebtn': function(e,t) {
		Meteor.loginWithGoogle({
			requestionPermissions: ['email', 'profile'],
			requestOfflineToken: true,
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else
				console.log('ok');
		});
	},
	'click #facebookbtn': function(e,t) {
		Meteor.loginWithFacebook({
			requestionPermissions: ['email', 'public_profile'],
			loginStyle: 'popup'
		}, function(err) {
			if (err)
				console.log(err);
			else
				console.log('ok');
		});
	}
});

function getValues(method) {
	return {
		method: method,
		email: $('#signupEmail').val(),
		password: $('#signupPassword').val()
	}
}
