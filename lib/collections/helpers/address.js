AddressSchema = new SimpleSchema({
	street: {
		label: 'Numero, rue',
		type: String,
		optional: true
	},
	zipcode: {
		label: 'Code Postal',
		type: String,
		optional: true,
		min:  5,
		max: 6
	},
	city: {
		label: 'Ville',
		type: String,
		optional: true,
		min: 3
	},
	geocoded: {
		type: Boolean,
		defaultValue: false
	}
});
