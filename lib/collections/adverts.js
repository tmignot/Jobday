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
	online: {
		type: Boolean,
		defaultValue: false
	},
	title: {
		label: 'Titre',
		type: String,
		min: 5,
		max: 255
	},
	description: {
		label: 'Description',
		type: String,
		min: 25,
    max: 1023
	},
	precisions: {
		label: 'Precisions',
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
		label: 'Avant une certaine Date',
		type: Boolean
	},
	startDate: {
		label: 'Date de debut',
		type: Date
	},
	endDate: {
		label: 'Date de fin',
		type: Date,
		optional: true
	},
	workingHours: {
		label: 'Horaires',
		type: WorkingHoursSchema
	},
	budget: {
		label: 'Prix',
		type: Number,
		decimal: true,
		min: 0
	},
	negocible: {
		label: 'Negociable',
		type: Boolean
	},
	nbPeople: {
		label: 'Nombre de personne',
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
				if (b && n)
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
		allowedValues: [0,1,2,3], // 0=open 1=taken 2=done 3=Paye
		defaultValue: 0
	},
	messages: {
		type: [MessageSchema],
		defaultValue: []
	}
});

Adverts = new Mongo.Collection('Adverts');
Adverts.attachSchema(AdvertSchema);
AdvertsPages = new Meteor.Pagination(Adverts, {
	itemTemplate: 'advertCard',
	perPage: 10,
	sort: {
		createdAt: 1
	},
	availableSettings: {
		sort: true,
		filters: true
	},
});


Adverts.deny({
	insert: function(uid) {
		if (Meteor.user())
			return false;
		return true
	},
	update: function(uid, doc) {
		if (doc.owner === uid || Roles.userIsInRole(uid, 'admin'))
			return false;
		return true
	},
	remove: function(uid, doc) {
		if (doc.owner === uid || Roles.userIsInRole(uid, 'admin'))
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
		if (doc.owner === uid || Roles.userIsInRole(uid, 'admin'))
			return true;
	},
	remove: function(uid, doc) {
		if (doc.owner === uid || Roles.userIsInRole(uid, 'admin'))
			return true;
	}
});

if (Meteor.isServer) {
	Adverts.before.update(function(uid, doc, fields, mod, opt) {
		console.log(mod);
	});
	Adverts.after.update(function(uid, doc) {
		if (doc.status == 0 && _.where(doc.offers, {validated: true}).length == doc.nbPeople) {
			Adverts.update(doc, {$set: {status: 1}});
		} else if (doc.status && _.where(doc.offers, {validated: true}).length < doc.nbPeople) {
			Adverts.update(doc, {$set: {status: 0}});
		}
	});
}
