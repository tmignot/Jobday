MessageSchema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() { return this.userId; }
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
