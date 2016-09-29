UserBadgeSchema = new SimpleSchema({
	giver: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	badgeId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});

