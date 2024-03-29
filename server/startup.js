Meteor.startup(function() {
	process.env.MAIL_URL = 'smtp://no-reply%40incrdev.com:dominique@ssl0.ovh.net:465/'
        /* SSLProxy({
       port: 3000, //or 443 (normal port/requires sudo)
       ssl : {
            key: Assets.getText('key.pem'),
      cert: Assets.getText('server.crt')

            //Optional CA
            //Assets.getText("ca.pem")
       }
    }); */
	if (Meteor.users.find({'profile.name': 'Administrator'}).count() == 0) {
		var adminId = Accounts.createUser({
			email: 'admin@adm.in',
			password: 'password',
			profile: {
				name: 'Administrator',
				firstname: 'Jobday',
				userType: 'individual'
			}
		});
		Roles.addUsersToRoles(adminId, ['admin','root']);
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

		_.each([
			{
				name: 'telephone',
				description: 'Confirmer votre numéro de téléphone portable pour obtenir le badge Telephone',
				icon: '/Badges icones/Badge telephone cercle.png',
				verif: true
			}			,
			{
				name: 'Identite',
				description: 'Transferez votre carte d\'identite pour que nous puissions verifier les informations de votre profil et obtenir le badge Identite',
				icon: '/Badges icones/Badge pro cercle.png',
				verif: true
			},
			{
				name: 'Mail',
				description: 'Validez l’existence de votre adresse e-mail vous obtenir le badge Mail',
				icon: '/Badges icones/Badge mail v2 cercle.png',
				verif: true
			},
			{
				name: 'Pro',
				description: 'Envoyez-nous votre license professionelle pour obtenir le badge Pro',
				icon: '/Badges icones/Badge pro cercle.png',
				verif: true
			},
			{
				name: 'Social',
				description: 'Connectez-vous avec Facebook, Gmail, ou LinkedIn pour obtenir le badge Resaux Sociaux',
				icon: '/Badges icones/Badge social cercle.png',
			},
			{
				name: 'Certifie',
				description: 'Faites vous certifier pour obtenir le badge Certifie Jobday',
				icon: '/Badges icones/Badge certifie jobday cercle.png',
			},
			{
				name: 'Assidu',
				description: 'Effectuez 5 missions pour obtenir le badge Travailleur Assidu',
				icon: '/Badges icones/Badge assidu cercle.png',
			},
			{
				name: 'Connecte',
				description: 'Connectez-vous regulierement pour obtenir le badge Super Connecte',
				icon: '/Badges icones/Badge super connecte cercle.png',
			},
		], function(b) {
			var fb = Badges.findOne({name: b.name});
			if (!fb) {
				Badges.insert(b);
			} else if (b.verif && !fb.verif) {
				Badges.update({_id: fb._id}, {$set: {verif: true}});
			}
		});

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
