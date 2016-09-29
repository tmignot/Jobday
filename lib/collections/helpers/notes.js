NoteSchema = new SimpleSchema({
	advertId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	note: {
		type: Number,
		min: 0,
		max: 10
	},
	message: {
		type: String,
		min: 20,
		max: 1023
	}
});
