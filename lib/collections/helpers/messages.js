MessageSchema = new SimpleSchema({
	_id: {
		type: String,
		autoValue: function() { if (!this.isSet) return Random.id(); }
	},
	userId: {
		type: String,
		autoValue: function() {
			if (this.operator == '$pull')
				return;
			if (!this.isSet) return this.userId;
		}
	},
	text: {
		type: String,
		min: 5,
		max: 1023
	},
	date: {
		type: Date,
		autoValue: function() { 
			if (this.operator == '$pull')
				return;
			if (!this.isSet) return new Date();
		}
	}
});
