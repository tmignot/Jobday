Accounts.config({
	sendVerificationEmail: true
});

Accounts.onCreateUser(function (options, user) {
	console.log('onCreateUser');
	if (options.profile)
		user.profile = options.profile;

	var service, email;
	if (user.emails && user.emails[0])
		email = user.emails[0].address;
	else if (user.services) {
		var service = _.keys(user.services)[0];
		var email = user.services[service].email;
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
		{'services.linkedin.email': email}
	]});
	console.log(existingUser);
	if (existingUser) {
		console.log('user exists');
		var newServices = _.extend(user.services||{}, existingUser.services||{});
		var newEmails = _.extend(user.emails||[], existingUser.emails||[]);
		existingUser.services = newServices;
		existingUser.emails = newEmails;
		Meteor.users.remove({_id: existingUser._id}); // remove existing record
		return existingUser;                  // record is re-inserted
	} else {
		console.log('user doesnt exists');
		var method;
		var userData = {
			userId: user._id
		};
		if (user.services && user.services.password) {
			method = 'password';
			userData.name = user.profile.name;
			userData.society = user.profile.society;
			if (!userData.society)
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
		}
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
