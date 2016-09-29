PaymentSchema = new SimpleSchema({
	date: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	amount: {
		type: Number,
		decimal: true,
		min: 0
	},
	from: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	to: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	}
});

Payments = new Mongo.Collection('Payments');
Payments.attachSchema(PaymentSchema);

Payments.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
