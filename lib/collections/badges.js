BadgeSchema = new SimpleSchema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	icon: {
		type: String
	},
	verif: {
		type: Boolean,
		defaultValue: false
	}
});

Badges = new Mongo.Collection('Badges');
Badges.attachSchema(BadgeSchema);

Badges.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
