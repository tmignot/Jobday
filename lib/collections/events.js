EventSchema = new SimpleSchema({
	type: {
		type: String,
		allowedValues: [
			'ask_grade_validation',
			'ask_identity_validation',
			'ask_license_validation',
			'ask_pro_validation',
			'report_abuse'
		]
	},
	userEmitter: {
		type: String
	},
	takenBy: {
		type: String,
		optional: true
	},
	data: {
		type: Object,
		blackbox: true,
		optional: true
	},
	date: {
		type: Date,
		autoValue: function() {
			if (this.isInsert)
				return new Date();
			else
				this.unset()
		}
	}
});

Events = new Mongo.Collection('Events');
Events.attachSchema(EventSchema);
EventsPages = new Meteor.Pagination(Events, {
	itemTemplate: 'eventCard',
	perPage: 50,
	sort: {
		date: -1
	},
	availableSettings: {
		filters: true,
		perPage: true,
		sort: true
	},
	auth: function(skip, sub) {
		if (Roles.userIsInRole(sub.userId, 'admin'))
			return true;
		else
			return false;
	}
});

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
