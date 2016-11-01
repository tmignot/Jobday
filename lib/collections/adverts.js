AdvertSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		optional: true,
		autoValue: function() { 
			if (this.isInsert)
				return new Date();
			this.unset();
		}
	},
	owner: {
		type: String,
		optional: true,
		autoValue: function() {
			if (this.isInsert)
				return this.userId;
			this.unset();
		}
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
	status: {
		type: Number,
		allowedValues: [0,1,2], // 0=open 1=taken 2=done
		defaultValue: 0
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

if (Meteor.isServer) {
	Adverts.after.update(function(uid, doc) {
		if (_.where(doc.offers, {validated: true}).length == doc.nbPeople) {
			Adverts.update(doc, {$set: {status: 1}});
		}
	});
}

