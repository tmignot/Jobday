NoteSchema = new SimpleSchema({
	advertId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	advertOwnerId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	note: {
		type: Number,
		min: 0,
		max: 4
	},
	message: {
		type: String,
		min: 20,
		max: 1023
	}
});
