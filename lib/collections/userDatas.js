UserDataSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	userType: {
		type: String,
		defaultValue: 'individual',
		allowedValues: [
			'individual',
			'professional',
			'society',
		]
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert)
				return new Date;
			else
				this.unset();
		},
		optional: true
	},
	siret: {
		type: String,
		min: 14,
		max: 14,
		optional: true
	},
	name: {
		type: String,
		min: 2,
		max: 25
	},
	verifPhone:{
		type: Number,
		optional: true
	},
	firstname: {
		type: String,
		min: 2,
		max: 25,
		optional: true,
		autoValue: function() {
			if (this.isInsert) {
				if (this.field('userType').isSet && this.field('userType').value == 'society') {
					this.unset();
					return
				} else if (this.field('userType').isSet && this.field('userType').value != 'society') {
					if (!this.isSet) {
						return false;
					}
				}
				return this.value;
			} else if (this.isUpdate) {
				 var d = UsersDatas.findOne({_id: this.docId});
				
				if (d) {
					if ((this.field('userType').isSet && this.field('userType').value == 'society') ||
							(!this.field('userType').isSet && d.userType == 'society')) {
						this.unset();
						return
					} else if ((this.field('userType').isSet && this.field('userType').value != 'society') ||
										 (!this.field('userType').isSet && d.userType != 'society')) {
						return this.value;
					}	else {
						return false;
					}
				}
			}
		}
	},
	birthdate: {
		type: Date,
		optional: true
	},
	devices: {
		type: [String],
		defaultValue: []
	},
	gender: {
		type: Number,
		allowedValues: [0,1,2],
		defaultValue: 0
	},
	hometown: {
		type: String,
		optional: true
	},
	languages: {
		type: [String],
		defaultValue: ['fr']
	},
	locale: {
		type: String,
		defaultValue: 'fr'
	},
	phone: {
		type: String,
		regEx: /[0-9]{9}/,
		optional: true
	},
	address: {
		type: AddressSchema,
		optional: true
	},
	photo: {
		type: String,
		defaultValue: '/default_user.jpeg'
	},
	presentation: {
		type: String,
		min: 20,
		optional: true
	},
	lastLocation: {
		type: GeolocationSchema,
		optional: true
	},
	experiences: {
		type: String,
		optional: true
	},
	precisions: {
		type: String,
		optional: true
	},
	means: {
		type: [String],
		defaultValue: []
	},
	'means.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	permis: {
		type: [String],
		defaultValue: []
	},
	'permis.$': {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	grades: {
		type: [GradeSchema],
		defaultValue: []
	},
	notificationMail: {
		type: [Number],
		defaultValue: [],
		min: 0,
		max: NotificationMail.length - 1
	},
	badges: {
		type: [UserBadgeSchema],
		defaultValue: []
	},
	sponsor: {
		type: [SponsorSchema],
		defaultValue: []
	},
	skills: {
		type: [Number],
		defaultValue: [],
		min: 0,
		max: Categories.length - 1
	},
	disponibilities: {
		type: [DisponibilitySchema],
		defaultValue: []
	},
	notes: {
		type: [NoteSchema],
		defaultValue: []
	},
	iban: {
		type: String,
		optional: true,
		regEx: /^FR\d{12}[0-9A-Z]{11}\d{2}$/
	},
	bic: {
		type: String,
		optional: true,
		regEx: /^[a-zA-Z]{6}\w{2}(\w{3})?$/
	},
	profileComplete: {
		type: Boolean,
		defaultValue: false
	},
	bankComplete: {
		type: Boolean,
		defaultValue: false
	}
});

UsersDatas = new Mongo.Collection('UsersDatas');
UsersDatas.attachSchema(UserDataSchema);
UsersDatasPages = new Meteor.Pagination(UsersDatas, {
	itemTemplate: 'userCard',
	perPage: 50,
	sort: {
		createdAt: -1
	},
	availableSettings: {
		sort: true,
		perPage: true,
		filters: true
	},
	auth: function(skip, sub) {
		if (Roles.userIsInRole(sub.userId, 'admin'))
			return true;
		else
			return false;
	}
});

UsersDatas.deny({
	insert: function(uid) { return true; },
	update: function(uid, doc, fieldNames) {
		if (doc.userId === uid) {
			var forbidden = ['notes', 'sponsor', 'badges', 'userId', 'devices', 'profileComplete'];
			_.each(forbidden, function(f) {
				if (_.contains(fieldNames, f))
					return true;
			});
		}
		return false;
	},
	remove: function(uid, doc) { return true; }
});

UsersDatas.allow({
	insert: function(uid) { return false; },
	update: function(uid, doc) { return true; },
	remove: function(uid, doc) { return false; }
});

if (Meteor.isServer) {

	checkProfile = function(doc) {
		if (doc.birthdate && doc.phone && doc.address && doc.address.street &&
				doc.address.zipcode && doc.address.city && doc.name && 
				((!doc.userType == 'society' && doc.firstname)||doc.userType == 'society'))
			return true;
		return false;
	};

	checkBank = function(doc) {
		 if (checkProfile(doc) && doc.iban && doc.bic)
			 return true;
		 return false;
	 };

	 Meteor.users.after.remove(function(uid,doc) {
		 UsersDatas.remove({userId: doc._id});
		});

	 UsersDatas.after.update(function(uid,doc) {
		 if (!checkProfile(this.previous) && checkProfile(doc)){
			 UsersDatas.update(doc, {$set: {profileComplete: true}});
			////UsersDatas.update(doc, {$set: {bankComplete: true}});
 }
		 else if (checkProfile(this.previous) && !checkProfile(doc)){
			 UsersDatas.update(doc, {$set: {profileComplete: false}});
		}

		 if (uid) {
			 if (checkProfile(doc)) {
				 upsertMangoUser(uid);
				 if (doc.iban && doc.bic &&
						(doc.iban != this.previous.iban ||
						doc.bic != this.previous.bic)) {
					upsertMangoBank(uid);
				} else if (!checkProfile(this.previous) && checkBank(doc)){
				upsertMangoBank(uid);}
			 }
			 if (!checkBank(doc) && doc.bankComplete){
			 UsersDatas.update(doc, {$set: {bankComplete: false}});
			
			 }else{//console.log("raté dans le "+checkBank(doc));
			//jonas error
			//	this.unblock();
			Meteor.defer(function(){
			UsersDatas.update(doc, {$set: {bankComplete: true}});
			});
			}
		 }
	 });
}

