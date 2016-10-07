HourSchema = new SimpleSchema({
	hour: {
		type: String,
		regEx: new RegExp('/([01][0-9])|(2[0-3])/')
	},
	min: {
		type: String,
		regEx: new RegExp('/[0-5][0-9]/')
	}
});

WorkingHoursSchema = new SimpleSchema({
	type: {
		type: Number,
		min: 1,
		max: 5
	},
	from: {
		type: HourSchema,
		optional: true,
		autoValue: function() {
			var type = this.field('type');
			if (type.isSet) {
				if (!this.isSet && type.value == 5)
					return '';
			}
		}
	},
	to: {
		type: HourSchema,
		optional: true,
		autoValue: function() {
			var type = this.field('type');
			if (type.isSet) {
				if (!this.isSet && type.value == 5)
					return '';
			}
		}
	}
});
