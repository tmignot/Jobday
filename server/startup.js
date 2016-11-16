Meteor.startup(function() {
	if (Meteor.users.find({'profile.name': 'Administrator'}).count() == 0) {
		var adminId = Accounts.createUser({
			email: 'admin@adm.in',
			password: 'password',
			profile: {
				name: 'Administrator',
				firstname: 'Jobday',
				society: true
			}
		});
		var udId = UsersDatas.findOne({userId: adminId})._id;
		UsersDatas.update({_id: udId}, {$set: {
			locale: 'fr',
			gender: 1,
			devices: [],
			birthdate: new Date('01-01-1990'),
			siret: '12345678987654',
			iban: 'FR7610107001011234567890129',
			bic: 'CMBRFR2BARK',
			address: {
				street: 'le bourg',
				zipcode: '16110',
				city: 'Agris',
				geocoded: true
			},
			languages: [ 'fr' ]
		}});
	}

	if (MeansOfTransports.find().count() == 0) {
		_.each([
			{name: 'Voiture', icon: "<i class='mdi mdi-car'></i>"},
			{name: 'Bus', icon: "<i class='mdi mdi-bus'></i>"},
			{name: 'Velo', icon: "<i class='mdi mdi-bike'></i>"},
			{name: 'Moto', icon: "<i class='fa fa-motorcycle'></i>"},
			{name: 'Train', icon: "<i class='fa fa-train'></i>"},
			{name: 'Pieds', icon: "<i class='mdi mdi-walk'></i>"}
		], function(m) {
			MeansOfTransports.insert(m);
		});
	}
	if (Permis.find().count() == 0) {
		_.each([
			{name: 'A'},
			{name: 'A1'},
			{name: 'A2'},
			{name: 'B'},
			{name: 'B1'},
			{name: 'BE'},
			{name: 'C'},
			{name: 'C1'},
			{name: 'CE'},
			{name: 'C1E'},
			{name: 'D'},
			{name: 'D1'},
			{name: 'DE'},
			{name: 'D1E'}
		], function(p) {
			Permis.insert(p);
		});
	}

	if (Badges.find().count() == 0) {
		_.each([
			{
				name: 'Numero de telephone',
				description: 'Faites verifier votre numero de telephone pour recevoir des offres par SMS',
				icon: 'phone'
			},
			{
				name: 'Identite',
				description: 'Transferez votre carte d\'identite pour que nous puissions verifier les informations de votre profil',
				icon: 'account_box'
			}
		], function(b) {
			Badges.insert(b);
		});
	}

	var adminMeans = _.map(MeansOfTransports.find({
		$or: [{name: 'Voiture'},
					{name: 'Pieds'},
					{name: 'Velo'}]
	}).fetch(), function(elem) { return elem._id; });
	var adminPermis = _.map(Permis.find({
		$or: [{name: 'B'},
					{name: 'A1'}]
	}).fetch(), function(elem) { return elem._id; });

	UsersDatas.update({_id: udId}, {
		$set: {
			means: adminMeans,
			permis: adminPermis
		}
	});
});
