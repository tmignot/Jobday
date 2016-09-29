UserSkillSchema = new SimpleSchema({
	skillId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	date: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});
