GradeSchema = new SimpleSchema({
	_id: {
		type: String,
		autoValue: function() {
			return Random.id();
		}
	},
	name: {
		type: String,
		min: 3
	},
	date: {
		type: Date
	}
});
