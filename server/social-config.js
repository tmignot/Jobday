Accounts.onCreateUser(function (options, user) {
	console.log(options, user);
	if (user.services) {
		console.log('services found')
		if (options.profile) {
			user.profile = options.profile
		}
		var service = _.keys(user.services)[0];
		var email = user.services[service].email;
		if (!email) {
			console.log('no email found');
			if (user.emails) {
				email = user.emails.address;
			}
		}
		if (!email) {
			email = options.email;
		}
		if (!email) {
			// if email is not set, there is no way to link it with other accounts
			return user;
		}

		// see if any existing user has this email address, otherwise create new
		var existingUser = Meteor.users.findOne({'emails.address': email});
		if (!existingUser) {
			// check for email also in other services
			var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
			var existingTwitterUser = Meteor.users.findOne({'services.twitter.email': email});
			var existingFacebookUser = Meteor.users.findOne({'services.facebook.email': email});
			var doesntExist = !existingGoogleUser && !existingTwitterUser && !existingFacebookUser;
			if (doesntExist)
				return user;
		} else {
			if (!existingUser.services) {
				if (user.emails) {
					existingUser.emails = user.emails;
				}
				existingUser.services = { resume: { loginTokens: [] }};
			}
			existingUser.services[service] = user.services[service];
			existingUser.services.resume.loginTokens.push(
				user.services.resume.loginTokens[0]
			);

			Meteor.users.remove({_id: existingUser._id}); // remove existing record
			return existingUser;                  // record is re-inserted
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
