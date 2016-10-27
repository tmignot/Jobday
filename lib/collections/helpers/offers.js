OfferSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	distance: {
		type: Number,
		min: 0
	},
	isPro: {
		type: Boolean
	},
	price: {
		type: Number,
		decimal: true,
		min: 1
	},
	date: {
		type: Date,
		autoValue: function() {
			if (this.isInsert)
				return new Date();
			this.unset();
		}
	},
	validated: {
		type: Boolean,
		defaultValue: false
	}
});
