AddressSchema = new SimpleSchema({
	street: {
		type: String
	},
	zipcode: {
		type: String,
		min:  5,
		max: 6
	},
	city: {
		type: String,
		min: 3
	}
});
