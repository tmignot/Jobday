WorkingHoursSchema = new SimpleSchema({
	type: {
		type: Number,
		min: 0,
		max: 4
	},
	from: {
		type: Number,
		min: 0,
		max: 23,
		decimal: true
	},
	to: {
		type: Number,
		min: 0,
		max: 23,
		decimal: true
	}
});
