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
		optional: true,
		custom: function() {
			var siret = this.value;
			if (siret && siret.length == 14) {
				var siren = siret.substr(0,9);
				if (checkSiren(siren) && checkSiret(siret))
					return true;
			}
			return {name: 'Siret', type: 'regEx'};
		}
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
		type: Array,
		defaultValue: [],
		minCount: 0,
		maxCount: Categories.length,
		blackbox: true
	},
	'skills.$': {
		type: [Number]
	},
	disponibilities: {
		type: [DisponibilitySchema],
		defaultValue: []
	},
	alwaysDisponible: {
		type: Boolean,
		defaultValue: true
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
		if (!sub.userId) {
			return false
		}
		if (Roles.userIsInRole(sub.userId, 'admin'))
			return true;
		else
			return false;
	}
});

UsersDatas.deny({
	insert: function(uid) { return true; },
	update: function(uid, doc, fieldNames) {
		if (doc.userId === uid || Roles.userIsInRole(uid, 'admin')) {
			var forbidden = ['notes', 'sponsor', 'badges', 'userId', 'devices', 'profileComplete', 'bankComplete'];
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

var checkSiren = function(siren) {
	var isValid;
	if ( (siren.length != 9) || (isNaN(siren)) )
		isValid = false;
	else {
		var sum = 0;
		var tmp;
		for (var i = 0; i<siren.length; i++) {
			if ((i % 2) == 1) {
				tmp = siren.charAt(i) * 2;
				if (tmp > 9) 
					tmp -= 9;
			}
			else
				tmp = siren.charAt(i);
			sum += parseInt(tmp);
		}
		if ((sum % 10) == 0)
			isValid = true;
		else
			isValid = false;
	}
	return isValid;
};

var checkSiret = function(siret) {
	var isValid;
	if ( (siret.length != 14) || (isNaN(siret)) )
		isValid = false;
	else {
		var sum = 0;
		var tmp;
		for (var i = 0; i<siret.length; i++) {
			if ((i % 2) == 0) {
				tmp = siret.charAt(i) * 2;
				if (tmp > 9) 
					tmp -= 9;
			}
			else
				tmp = siret.charAt(i);
			sum += parseInt(tmp);
		}
		if ((sum % 10) == 0)
			isValid = true;
		else
			isValid = false;
	}
	return isValid;
};

if (Meteor.isServer) {

	checkProfile = function(doc) {
		if (doc.birthdate && doc.phone && doc.address && doc.address.street &&
				doc.address.zipcode && doc.address.city && doc.name && 
				((doc.userType != 'society' && doc.firstname)||(doc.userType != 'individual' && doc.siret)))
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

	 UsersDatas.before.update(function(uid,doc, f, m) {
	 });

	 UsersDatas.after.update(function(uid,doc, f, m) {
		 if (_.contains(f, 'grades')) {
			 if (m['$push'] && m['$push'].grades) {
				 var g = m['$push'].grades;
				 Events.insert({
					 date: new Date(),
					 type: 'ask_grade_validation',
					 userEmitter: uid,
					 data: {
						 grade: g.index,
						 image: g.image,
						 name: g.name
					 }
				 });
			 }
		 }

		if (!checkProfile(this.previous) && checkProfile(doc))
			UsersDatas.update(doc, {$set: {profileComplete: true}});
		else if (checkProfile(this.previous) && !checkProfile(doc))
			UsersDatas.update(doc, {$set: {profileComplete: false}});
		else if (checkProfile(this.previous) && checkProfile(doc) && !doc.profileComplete)
			UsersDatas.update(doc, {$set: {profileComplete: true}});

		if (this.previous.bankComplete && !checkBank(doc))
			UsersDatas.update(doc, {$set: {bankComplete: false}});

		if (m['$set'] &&
				m['$set'].birthdate && 
			 (m['$set'].firstname || doc.userType == 'society') &&
				m['$set'].name && 
			 (this.previous.firstname != m['$set'].firstname ||
				this.previous.name != m['$set'].name || !this.previous.birthdate ||
				this.previous.birthdate.getTime() != m['$set'].birthdate.getTime()) ||
				!MangoUsers.findOne({userId: doc.userId}))
			upsertMangoUser(doc.userId);

		try {
			if (m['$set'] && 
					m['$set'].address && 
					m['$set'].address.street && 
					m['$set'].address.city &&	
					m['$set'].address.zipcode &&
					m['$set'].iban &&
					m['$set'].bic &&
				 (m['$set'].iban != this.previous.iban ||
					m['$set'].bic != this.previous.bic ||
					m['$set'].address.street != this.previous.address.street ||
					m['$set'].address.city != this.previous.address.city ||
					m['$set'].address.zipcode != this.previous.address.zipcode ||
					!MangoUsers.findOne({userId: doc.userId}).mango.bank))
				upsertMangoBank(this.previous.userId);
		} catch(e) {
			console.log(e);
			throw new Meteor.Error(0, 'Les informations bancaires enregistrees ne sont pas valides. Corrigez-les pour pouvoir postuler a une annonce');
		}
	});
}

