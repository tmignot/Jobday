UserDataSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	society: {
		type: Boolean,
		defaultValue: false
	},
	name: {
		type: String,
		min: 2,
		max: 25
	},
	firstname: {
		type: String,
		min: 2,
		max: 25,
		optional: true,
		autoValue: function() {
			/*
			console.log('=================== this ====================');
			console.log(this);
			console.log('=================== society field =================');
			console.log(this.field('society'));
			console.log('=================== firsname field ================');
			console.log(this.field('firstname'));
			*/
			if (this.isInsert) {
				if (this.field('society').isSet && this.field('society').value == true) {
					this.unset();
					return
				} else if (this.field('society').isSet && this.field('society').value == false) {
					if (!this.isSet) {
						return false;
					}
				}
				return this.value;
			} else if (this.isUpdate) {
				var d = UsersDatas.findOne({_id: this.docId});
				if (d) {
					if ((this.field('society').isSet && this.field('society').value == true) ||
							(!this.field('society').isSet && d.society == true)) {
						this.unset();
						return
					} else if ((this.field('society').isSet && this.field('society').value == false) ||
										 (!this.field('society').isSet && d.society == 'false')) {
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
		regEx: /[09]{9}/,
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
	badges: {
		type: [UserBadgeSchema],
		defaultValue: []
	},
	sponsor: {
		type: [SponsorSchema],
		defaultValue: []
	},
	skills: {
		type: [UserSkillSchema],
		defaultValue: []
	},
	disponibilities: {
		type: [DisponibilitySchema],
		defaultValue: []
	},
	notes: {
		type: [NoteSchema],
		defaultValue: []
	}
});

UsersDatas = new Mongo.Collection('UsersDatas');
UsersDatas.attachSchema(UserDataSchema);

UsersDatas.deny({
	insert: function(uid) { return true; },
	update: function(uid, doc, fieldNames) {
		if (doc.userId === uid) {
			var forbidden = ['notes', 'sponsor', 'badges', 'userId', 'devices'];
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

