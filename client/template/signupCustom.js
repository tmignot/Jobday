Template.signupCustom.onCreated(function() {
	Session.set('mailSent', 'false');
	Session.set('society', 'false');
});

// sign user up with some OAuth service providers
Template.signupCustom.events({
	'click #jobdaybtn': function(e,t) {
		if (Meteor.userId())
			Meteor.logout();
		var data = getValues('jobday');
		var errors = checkValues(data);
		if (errors.length) {
			Modal.allowMultiple = true;
			Modal.show('errorModal', {invalidKeys: errors});
		} else {
			Meteor.call('addUser', data, function(err, res) {
				if (err) {
					Modal.allowMultiple = true;
					Modal.show('errorModal', {invalidKeys: [{message: "<strong>Email</strong> existe deja"}]});
				} else if (res) {
					Session.set('mailSent', true);
				}
			});
		}
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

function checkValues(data) {
	var errors = [];
	if (!data.society && !data.firstname)
		errors.push({message: "<strong>Prenom</strong> est requis pour un particulier"});
	if (!data.name)
		errors.push({message: "<strong>Nom</strong> est requis"});
	if (!data.email)
		errors.push({message: "<strong>Email</strong> est requis"});
	if (!data.password)
		errors.push({message: "<strong>Mot de passe</strong> est requis"});
	if (!data.confirmation)
		errors.push({message: "<strong>Confirmation</strong> est requis"});
	if (data.confirmation != data.password)
		errors.push({message: "<strong>Confirmation</strong> et <strong>Mot de passe</strong> doivent etre identiques"});
	return errors;
}
