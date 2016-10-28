AddressSchema = new SimpleSchema({
	street: {
		type: String,
		optional: true
	},
	zipcode: {
		type: String,
		optional: true,
		min:  5,
		max: 6
	},
	city: {
		type: String,
		optional: true,
		min: 3
	},
	geocoded: {
		type: Boolean,
		defaultValue: false
	}
});
