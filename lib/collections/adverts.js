AdvertSchema = new SimpleSchema({
	owner: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	category: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	subcategory: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	type: {
		type: Number,
		min: 0,
		max: 2
	},
	title: {
		type: String,
		min: 5,
		max: 255
	},
	description: {
		type: String,
		min: 25,
    max: 1023
	},
	precisions: {
		type: String,
		defaultValue: ''
	},
	tools: {
		type: Array,
		defaultValue: []
	},
	'tools.$': {
		type: String,
		optional: true,
		regEx: SimpleSchema.RegEx.Id
	},
	clothes: {
		type: Array,
		defaultValue: []
	},
	'clothes.$': {
		type: String,
		optional: true
	},
	needsVehicle: {
		type: Boolean,
		defaultValue: false
	},
	adress: {
		type: AddressSchema
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date,
		optional: true
	},
	workingHours: {
		type: WorkingHoursSchema
	},
	budget: {
		type: Number,
		decimal: true,
		min: 0
	},
	nbPeople: {
		type: Number,
		min: 1
	},
	totalPrice: {
		type: Number,
		decimal: true,
		autoValue: function() {
			if (this.field('budget').isSet && this.field('nbPeople').isSet) {
				var b = this.field('budget').value;
				var n = this.field('nbPeople').value;
				return b*n;
			}
		}
	},
	offers: {
		type: [OfferSchema],
		defaultValue: []
	},
	messages: {
		type: [MessageSchema],
		defaultValue: []
	}
});

Adverts = new Mongo.Collection('Adverts');
Adverts.attachSchema(AdvertSchema);

Adverts.allow({
	insert: function(uid) { return true; },
	update: function(uid, doc) {
		if (doc.owner === uid)
			return true;
	},
	remove: function(uid, doc) {
		if (doc.owner === uid)
			return true;
	}
});
