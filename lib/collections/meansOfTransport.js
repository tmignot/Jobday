MeansOfTransportSchema = new SimpleSchema({
	name: {
		type: String
	},
	icon: {
		type: String
	}
});

PermisSchema = new SimpleSchema({
	name: {
		type: String
	}
});

MeansOfTransports = new Meteor.Collection('MeansOfTransports');
Permis = new Meteor.Collection('Permis');
MeansOfTransports.attachSchema(MeansOfTransportSchema);
Permis.attachSchema(PermisSchema);

MeansOfTransports.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});

Permis.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
