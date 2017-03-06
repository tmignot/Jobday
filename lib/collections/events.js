EventSchema = new SimpleSchema({
	type: {
		type: String,
		allowedValues: [
			'ask_grade_validation',
			'ask_identity_validation',
			'ask_license_validation',
			'report_abuse'
		]
	},
	userEmitter: {
		type: String
	},
	takenBy: {
		type: String
	},
	data: {
		type: Object,
		optional: true
	}
});

Events = new Mongo.Collection('Events');
Events.attachSchema(EventSchema);

Events.allow({
	insert: function() { 
		if (Meteor.userId())
			return true; 
		return false;
	},
	update: function() {
		if (Roles.userIsInRole(Meteor.userId(), 'admin'))
			return true;
		return false
	},
	remove: function() {
		return false;
	}
});
