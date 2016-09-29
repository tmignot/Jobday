UserDataSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	name: {
		type: String,
		min: 2,
		max: 25
	},
	firstname: {
		type: String,
		min: 2,
		max: 25
	},
	birthdate: {
		type: Date,
		optional: true
	},
	devices: {
		type: [String],
		defaultValue: []
	},
	gender: {
		type: Number,
		allowedValues: [0,1]
	},
	hometown: {
		type: String,
		optional: true
	},
	languages: {
		type: [String]
	},
	locale: {
		type: String,
		defaultValue: 'FR'
	},
	address: {
		type: AddressSchema,
		optional: true
	},
	photo: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	presentation: {
		type: String,
		min: 20
	},
	lastLocation: {
		type: GeolocationSchema,
		optional: true
	},
	experiences: {
		type: String,
		optional: true
	},
	grades: {
		type: [GradeSchema],
		defaultValue: []
	},
	badges: {
		type: [UserBadgeSchema],
		defaultValue: []
	},
	'badges.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	sponsor: {
		type: SponsorSchema,
		optional: true
	},
	skills: {
		type: [UserSkillSchema],
		defaultValue: []
	},
	disponibilities: {
		type: [DisponibilitySchema],
		defaultValue: []
	},
	note: {
		type: [NoteSchema],
		defaultValue: []
	}
});
