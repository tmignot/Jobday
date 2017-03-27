GradeSchema = new SimpleSchema({
	index: {
		type: String,
		autoValue: function() {
			if (!this.isSet)
				return Random.id();
		}
	},
	name: {
		type: String,
		min: 3
	},
	date: {
		type: Date
	},
	image: {
		type: String
	},
	validated: {
		type: Boolean,
		defaultValue: false,
		optional: true,
	}
});
