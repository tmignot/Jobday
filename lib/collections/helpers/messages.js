MessageSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	text: {
		type: String,
		min: 5,
		max: 1023
	},
	date: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});
