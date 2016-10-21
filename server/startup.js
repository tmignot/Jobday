Meteor.startup(function() {
	if (Meteor.users.find({'profile.name': 'Administrator'}).count() == 0) {
		var adminId = Accounts.createUser({
			email: 'admin@adm.in',
			password: 'password',
			profile: {
				name: 'Administrator',
				firstname: '',
				society: true
			}
		});
		var udId = UsersDatas.findOne({userId: adminId})._id;
		UsersDatas.update({_id: udId}, {$set: {
			locale: 'fr',
			gender: 1,
			devices: [],
			languages: [ 'fr' ],
			grades: 
			 [ { name: 'BAC-S',
					 date: new Date('Tue Jun 06 2006 00:00:00 GMT+0200 (CEST)') },
				 { name: 'BREVET DES COLLEGES',
					 date: new Date('Sat Jun 07 2003 00:00:00 GMT+0200 (CEST)') } ],
			presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			experiences: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudgradesam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
			precisions: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
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
