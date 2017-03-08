Accounts.config({
	sendVerificationEmail: true
});

Accounts.emailTemplates.siteName = "www.jobday.fr";
Accounts.emailTemplates.from     = "Jobday <no-reply@incrdev.com>";

Accounts.emailTemplates.verifyEmail = {
	subject: function() {
		return "[Jobday] Verify Your Email Address";
	},
	html: function(user, url) {
		var supportEmail = "concact@jobday.fr",
				emailBody = emailBodyTemplate+
										"<br>Bonjour/Bonsoir<br>  Nous avons bien pris en compte votre inscription. <br>"+
										"Pour activer votre compte et/ou débloquer votre badge E-mail vérifié, il vous suffit "+
										"de cliquer sur le lien ci-dessous : <a href='" +url+"'> Valider mon compte <a/> "+
										emailBodyTemplate2;
		return emailBody;
	}
};

Accounts.emailTemplates.enrollAccount = {
	subject: function() {
		return "[Jobday] You now have Administrator privileges";
	},
	html: function(user, url) {
		var supportEmail = "concact@jobday.fr",
				emailBody = emailBodyTemplate+
										"<br>Bonjour/Bonsoir<br>  Nous vous avons enregistre comme nouvel Administrateur. <br>"+
										"Pour activer votre compte, il vous suffit "+
										"de cliquer sur le lien ci-contre : <a href='" +url+"'> Valider mon compte <a/> "+
										emailBodyTemplate2;
		return emailBody;
	}
};

Accounts.emailTemplates.resetPassword = {
	subject: function() {
		return "[Jobday] Reset your password";
	},
	html: function(user, url) {
		var supportEmail = "concact@jobday.fr",
				emailBody = emailBodyTemplate+
										"<br>Bonjour/Bonsoir<br>  Il semble que vous ayez perdu votre mot de passe. <br>"+
										"Pour le reinitialiser, il vous suffit "+
										"de cliquer sur le lien ci-dessous : <a href='" +url+"'> Reinitialiser mon mot de passe <a/> "+
										emailBodyTemplate2;
		return emailBody;
	}
};

/*
Accounts.validateNewUser(function(user) {
	if (user.services && user.services.password)
		return true;
	else
		throw new Meteor.Error('accountNotFound');
});
*/

Accounts.onCreateUser(function (options, user) {
	if (options.profile)
		user.profile = options.profile;
	var service, email;
	if (user.emails && user.emails[0])
		email = user.emails[0].address;
	else if (user.services) {
		var service = _.keys(user.services)[0];
		var email = user.services[service].email;
		if (email==undefined)
			email = user.services[service].emailAddress;
		if (!email) {
			if (user.emails)
				email = user.emails[0].address;
		}
		if (!email)
			return user;
	}
	var existingUser = Meteor.users.findOne({$or: [
		{'emails.0.address': email},
		{'services.google.email': email},
		{'services.facebook.email': email},
		{'services.linkedin.emailAddress': email}
	]});
	if (existingUser) {
		// merging account with already existing account
		var newServices = _.extend(user.services||{}, existingUser.services||{});
		var newEmails = _.extend(user.emails||[], existingUser.emails||[]);
		existingUser.services = newServices;
		existingUser.emails = newEmails;
		Meteor.users.direct.remove({_id: existingUser._id}); // remove existing record
		return existingUser;                  // record is re-inserted
	} else {
		var method;
		var userData = {
			userId: user._id
		};
		if (user.services && user.services.password) {
			method = 'password';
//			console.log(user.profile);
			userData.name = user.profile.name;
			userData.userType = user.profile.userType;
			if (userData.userType != 'society')
				userData.firstname = user.profile.firstname;
		} else if (user.services && user.services.google) {
			userData.name = user.services.google.family_name;
			userData.firstname = user.services.google.given_name;
			userData.photo = user.services.google.picture;
			userData.locale = user.services.google.locale;
			userData.gender = (function() {
				switch(user.services.google.gender) {
					case 'male': return 1;
					case 'female': return 2;
					default: return 0;
				}
			})();
		} else if (user.services && user.services.facebook) {
			userData.name = user.services.facebook.last_name;
			userData.firstname = user.services.facebook.first_name;
			userData.photo = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
			userData.locale = user.services.facebook.locale.split('_')[0];
			userData.gender = (function() {
				switch(user.services.facebook.gender) {
					case 'male': return 1;
					case 'female': return 2;
					default: return 0;
				}
			})();
		}else if (user.services && user.services.linkedin) {
			userData.name = user.services.linkedin.lastName;
			userData.firstname = user.services.linkedin.firstName;
			userData.photo =  user.services.linkedin.pictureUrl;
			//userData.locale = user.services.facebook.locale.split('_')[0];
			// userData.gender = (function() {
				// switch(user.services.facebook.gender) {
					// case 'male': return 1;
					// case 'female': return 2;
					// default: return 0;
				// }
			// })();
		} else {
			userData.firstname = user.profile.firstname;
			userData.name = user.profile.name;
			userData.userType = user.profile.userType;
		}
		// create userdata if new user
		userDataId = UsersDatas.insert(userData);
		if (userDataId) {
			return user;
		}
	}
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1081613621860903',
    secret: 'f9be86c3944ecdda0801942f9154ebb7'
});


ServiceConfiguration.configurations.update(
    { "service": "linkedin" },
    {
      $set: {
        "clientId": "77wg97iklzkqyn",
        "secret": "bIoc9DDQMPr7NbWw"
      }
    },
    { upsert: true }
  );

ServiceConfiguration.configurations.remove({
  service: "google"
});


ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "479545754930-ejfinvlle7p0fe7pmpek4jl8j6q2algb.apps.googleusercontent.com",
  secret: "m5O4iHhUipp7BpIhNVfIuLMD"
});
