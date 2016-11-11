MangoSchema = new SimpleSchema({
	user: { type: String },
	wallet: { type: String },
	card: { type: String },
	bank: { type: String }
});

MangoUserSchema = new SimpleSchema({
	userId: {
		type: String
	},
	mango: {
		type: MangoSchema,
		blackbox: true
	}
});

MangoUsers = new Mongo.Collection('mangoUsers');
MangoUsers.attachSchema(MangoUserSchema);

MangoPaySDK.production = false;
MangoPaySDK.apiVersion = 'v2.01';
MangoPaySDK.authenticate('thommignot', 'Hk6aeu4Bhft0LbkPU6Jtt5dwOtjQGSLR6wREFPXJ7zvtzzHZhS');

createNaturalMangoUser = function(_id, email, data) {
	MangoPaySDK.user.create(new MangoPaySDK.user.NaturalUser({
		Birthday: data.birthdate.getTime() / 1000,
		Nationality: 'FR',
		CountryOfResidence: 'FR',
		Email: email,
		FirstName: data.firstname||'',
		LastName: data.name
	}), function(err, user) {
		if (err || !user) {
			console.log(err);
		} else {
			var mUser = MangoUsers.insert({userId: _id, mango: {user: user.Id}});
			if (mUser)
				createMangoWallet(mUser);
		}
	});
};

createLegalMangoUser = function(_id, email, data) {
	MangoPaySDK.user.create(new MangoPaySDK.user.LegalUser({
		Email: email,
		Name: data.name,
		LegalPersonType: MangoPaySDK.user.personTypes.BUSINESS,
		LegalRepresentativeFirstName: data.representativeFirstname,
		LegalRepresentativeLastName: data.representativeLastname,
		LegalRepresentativeBirthday: data.birthdate.getTime() / 1000,
		LegalRepresentativeNationality: 'FR',
		LegalRepresentativeCountryOfResidence: 'FR'
	}), function(err, user) {
		if (err || !user) {
			console.log(err);
		} else {
			var mUser = MangoUsers.insert({userId: _id, mango: {user: user.Id}});
			if (mUser)
				createMangoWallet(mUser);
		}
	});
};

createMangoWallet = function(_id) {
	MangoPaySDK.wallet.create(new MangoPaySDK.wallet.Wallet({
		owners: [MangoUsers.findOne(_id).mango.user],
		Currency: 'EUR',
		Description: 'Wallet_'+_id
	}), function(err, wallet) {
		if (err || !wallet)
			console.log(err);
		else
			MangoUsers.update(_id, {$set: {'mango.wallet': wallet.Id}});
	});
};

createMangoUser = function(_id) {
	var user = Meteor.users.findOne(_id),
			email;
	if (user.emails && user.emails.length)
		email = user.emails[0].address
	else {
		if (user.services && user.services.google)
			email = user.services.google.email;
		else if (user.services && user.services.facebook)
			email = user.services.facebook.email;
	}
	if (email) {
		var data = UsersDatas.findOne({userId: _id});
		//if (data.society)
		//	createLegalMangoUser(_id, email, data);
		//else
			createNaturalMangoUser(_id, email, data);
	}
};
