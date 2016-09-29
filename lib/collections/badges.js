BadgeSchema = new SimpleSchema({
	description: {
		type: String
	},
	icon: {
		type: String,
		regEx: SimpleSchema.RegEx.Url
	}
});

Badges = new Mongo.Collection('Badges');
Badges.attachSchema(BadgeSchema);

Badges.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
