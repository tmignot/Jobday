OfferSchema = new SimpleSchema({
	_id: {
		type: String,
		autoValue: function() { if (!this.isSet) return Random.id(); }
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	comment: {
		label: 'Commentaire',
		type: String,
		min: 20,
		max: 1023
	},
	distance: {
		type: Number,
		min: 0
	},
	price: {
		label: 'Prix',
		type: Number,
		decimal: true,
		min: 1
	},
	date: {
		type: Date,
		autoValue: function() { if (!this.isSet) return new Date();}
	},
	validated: {
		type: Boolean
	}
});
