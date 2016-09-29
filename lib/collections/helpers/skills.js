SkillSchema = new SimpleSchema({
	icon: {
		type: String,
		regEx: SimpleSchema.RegEx.Url
	},
	description: {
		type: String,
		min: 20,
		max: 1023
	}
});
