AdvertSchema = new SimpleSchema({
	owner: {
		type: String,
		autoValue: function() {	return this.userId; }
	},
	category: {
		type: Number,
		min: 0,
		max: Categories.length
	},
	subcategory: {
		type: Number,
		min: 0,
		autoValue: function() {
			if (this.isSet && this.field('category').isSet) {
				var c = Categories[this.field('category').value];
				if (this.value <= c.subcategories.length)
					return this.value;
			}
		}
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
		type: Boolean,
		defaultValue: false
	},
	clothes: {
		type: Boolean,
		defaultValue: false
	},
	needsVehicle: {
		type: Boolean,
		defaultValue: false
	},
	address: {
		type: AddressSchema
	},
	beforeDate: {
		type: Boolean
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
	negocible: {
		type: Boolean
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

Adverts.deny({
	insert: function(uid) {
		if (Meteor.user())
			return false;
		return true
	},
	update: function(uid, doc) {
		if (doc.owner === uid)
			return false;
		return true
	},
	remove: function(uid, doc) {
		if (doc.owner === uid)
			return false;
		return true
	}
});

Adverts.allow({
	insert: function(uid) { 
		if (Meteor.user())
			return true; 
	},
	update: function(uid, doc) {
		if (doc.owner === uid)
			return true;
	},
	remove: function(uid, doc) {
		if (doc.owner === uid)
			return true;
	}
});
