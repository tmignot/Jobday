MangoSchema = new SimpleSchema({
	user: { type: String },
	wallet: { type: String },
	card: { type: String },
	bank: { type: String }
});

MangoUserSchema = new SimpleSchema({
	userId: {
		type: String,
		unique: true,
		index: true
	},
	mango: {
		type: MangoSchema,
		blackbox: true
	}
});


Payins = new Mongo.Collection('Payins');
MangoUsers = new Mongo.Collection('mangoUsers');
MangoUsers.attachSchema(MangoUserSchema);

MangoPaySDK.production = false;
MangoPaySDK.apiVersion = 'v2.01';
MangoPaySDK.authenticate('thommignot', 'Hk6aeu4Bhft0LbkPU6Jtt5dwOtjQGSLR6wREFPXJ7zvtzzHZhS');


/* Created a user in mango's DB and store its ID in MangoUsers collection */
createNaturalMangoUser = function(_id, email, data) {
	var ret = new Future();
	MangoPaySDK.user.create(new MangoPaySDK.user.NaturalUser({
		Birthday: data.birthdate.getTime() / 1000,
		Nationality: 'FR',
		CountryOfResidence: 'FR',
		Email: email,
		FirstName: data.firstname||'Society',
		LastName: data.name
	}), function(err, user) {
		if (err || !user) {
			console.log('An error occured');
			console.log(err);
			ret.throw(err);
		} else {
			console.log('Mango distant user created');
			var mUser = MangoUsers.insert({userId: _id, mango: {user: user.Id}});
			if (mUser)
				ret.return(createMangoWallet(mUser));
			else
				ret.throw('unable to create MangoUser');
		}
	});
	return ret.wait();
};

/* Create a wallet attached to a user in mango's DB and stores its ID in MangoUsers collection */
createMangoWallet = function(_id) {
	var ret = new Future();
	MangoPaySDK.wallet.create(new MangoPaySDK.wallet.Wallet({
		owners: [MangoUsers.findOne(_id).mango.user],
		Currency: 'EUR',
		Description: 'Wallet_'+_id
	}), function(err, wallet) {
		if (err || !wallet)
			ret.throw(err);
		else
			ret.return(MangoUsers.update(_id, {$set: {'mango.wallet': wallet.Id}}));
	});
	return ret.wait();
};

/* get a user email and call createMangoUser */
createMangoUser = function(_id) {
	var user = Meteor.users.findOne(_id),
			email;
	if (user && user.emails && user.emails.length)
		email = user.emails[0].address
	else if (user) {
		if (user.services && user.services.google)
			email = user.services.google.email;
		else if (user.services && user.services.facebook)
			email = user.services.facebook.email;
	} else
		throw new Error('User with _id '+_id+' was not found');
	if (email) {
		var data = UsersDatas.findOne({userId: _id});
		console.log('trying to create mangoUser');
		createNaturalMangoUser(_id, email, data);
		console.log('mangoUser created');
	} else
		throw new Error('Cannot find user\'s email');
};

/* If a users doesn't exist, we create it, else we update */
upsertMangoUser = function(_id) {
	var localUser = UsersDatas.findOne({userId: _id});
	var localMangoUser = MangoUsers.findOne({userId: _id});
	if (localMangoUser && localUser) {
		MangoPaySDK.user.fetch(localMangoUser.mango.user, function(err, user) {
			if (err || !user){
				console.log(err);
			}
			else {
				var data = {};
				if (localUser.birthdate && user.Birthday != localUser.birthdate.getTime() / 1000)
					data.Birthday = localUser.birthdate.getTime() / 1000;
				if (localUser.firtname && user.FirstName != localUser.firstname)
					data.FirstName = localUser.firstname;
				if (localUser.name && user.LastName != localUser.name)
					data.LastName = localUser.name;
				if (_.keys(data).length) {
					MangoPaySDK.user.updateNatural(localMangoUser.mango.user, data, function(err, user) {
						if (err || !user){
							console.log(err);
						}
					});
				}
			}
		});
	} else
		createMangoUser(_id);
};

/* Creates a bank account attached to a user in mango's DB and store its ID */
createMangoBank = function(_id) {
	var localUser = UsersDatas.findOne({userId: _id});
	var localMangoUser = MangoUsers.findOne({userId: _id});
	if (localUser && localMangoUser) {
		var ret = new Future();
		MangoPaySDK.bank.create(localMangoUser.mango.user, MangoPaySDK.bank.type.IBAN, new MangoPaySDK.bank.BankAccount({
			IBAN: localUser.iban,
			BIC: localUser.bic,
			OwnerName: localUser.name,
			OwnerAddress: {
				AddressLine1: localUser.address.street,
				City: localUser.address.city,
				PostalCode: localUser.address.zipcode,
				Country: 'FR'
			}
		}), function(err, nbank) {
			if (err || !nbank) {
				ret.throw(err);
				UsersDatas.update({userId: _id}, {$set: {bankComplete: false}});
			} else {
				UsersDatas.update({userId: _id}, {$set: {bankComplete: true}});
				ret.return(MangoUsers.update({userId: _id}, {$set: {'mango.bank': nbank.Id}}));
			}
		});
		return ret.wait();
	} else
		throw new Error('No user found with _id ' + _id);
};

/* if a bank account exists, update it else, create it */
upsertMangoBank = function(_id) {
	var localUser = UsersDatas.findOne({userId: _id});
	var localMangoUser = MangoUsers.findOne({userId: _id});
	if (localUser && localMangoUser && localMangoUser.mango.bank) {
		MangoPaySDK.bank.fetch(localMangoUser.mango.user, localMangoUser.mango.bank, function(err, bank) {
			if (err || !bank){
				//console.log(err);
			}
			else {
				if ((localUser.iban && bank.IBAN != localUser.iban) ||
						(localUser.bic && bank.BIC != localUser.bic)) {
					createMangoBank(_id);
				}
			}
		});
	} else
		createMangoBank(_id);
};

/*  */
createMangoPayin = function(uid, cid, wid, amount, ad, offers) {
	var ret = new Future();
	MangoPaySDK.payin.create(new MangoPaySDK.payin.TokenizedCard({
		AuthorId: uid,
		CardId: cid,
		CreditedWalletId: wid,
		SecureModeReturnURL: Meteor.absoluteUrl() + '3dsecure',
		SecureMode: 'FORCE',
		DebitedFunds: {
			Currency: 'EUR',
			Amount: amount * 100
		},
		Fees: {
			Currency: 'EUR',
			Amount: (amount - amount/1.1) * 100
		}
	}), function(err, payin) {
		if (err || !payin)
			ret.throw(err);
		else {
			payin.advertId = ad;
			Payins.insert(payin);
			ret.return(payin.SecureModeRedirectURL);
			// NEED TO SAVE PAYIN THEN REDIRECT USER TO 3DSECUR URL;
			// THE createMangoTransfer() PART IS GOING TO BE HANDLED IN
			// THE returnURL ROUTE GIVEN ABOVE '/3dsecure/:payinId'
			/*
			_.each(offers, function(offer) {
				createMangoTransfer(uid, wid, offer);
			});
			*/
		}
	});
	return ret.wait();
};

/* transfers from a wallet to another */
createMangoTransfer = function(uid, wid, offer) {
	var creditedUser = MangoUsers.findOne({userId: offer.userId});
	if (creditedUser && creditedUser.mango && creditedUser.mango.wallet) {
		var ret = new Future();
		MangoPaySDK.transfer.create(new MangoPaySDK.transfer.Transfer({
			AuthorId: uid,
			DebitedWalletID: wid,
			CreditedWalletID: creditedUser.mango.wallet,
			DebitedFunds: {
				Currency: "EUR", 
				Amount: offer.price * 100
			},
			Fees: {
				Currency: "EUR", 
				Amount: 0
			}
		}), function (err, transfer) {
			if (err || !transfer) {
				ret.throw(err);
			} else {
				if (transfer.Status == 'SUCCEEDED') {
					ret.return(createMangoPayout(creditedUser, transfer));
				}	else
					ret.return(transfer.ResultCode);					
			}
		});
		return ret.wait();
	} else
		throw new Error('No user found with id '+offer.userId);
};

/* credit bank account from wallet */
createMangoPayout = function(user, transfer) {
	if (user.mango.bank) {
		var ret = new Future();
		MangoPaySDK.payout.create(new MangoPaySDK.payout.BankWire({
			AuthorId: user.mango.user,
			BankWireRef: 'Paiement Jobday',
			BankAccountId: user.mango.bank,
			DebitedWalletId: user.mango.wallet,
			DebitedFunds: transfer.CreditedFunds,
			Fees: {
				Currency: "EUR", 
				Amount: 0
			}
		}), function(err, payout) {
			if (err || !payout)
				ret.throw(err);
			else {
				ret.return();
			}
		});
		return ret.wait();
	} else
		throw new Error('No bank account found for user');
};

