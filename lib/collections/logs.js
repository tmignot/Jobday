LogsSchema = new SimpleSchema({
	date: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	type: {
		type: String,
		allowedValues: [
			'login',
		]
	},
	userId: {
		type: String
	}
});

Logs = new Mongo.Collection('Logs');
Logs.attachSchema(LogsSchema);

Logs.allow({
	insert: function() { return Meteor.userId() ? true : false; },
	update: function() { return false; },
	remove: function() { return false; }
});
