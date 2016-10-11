Meteor.startup(function() {
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

});
