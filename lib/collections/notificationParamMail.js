NotificationParamMailSchema = new SimpleSchema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	icon: {
		type: String
	}
});

NotificationParamMail = new Mongo.Collection('notificationParamMail');
NotificationParamMail.attachSchema(NotificationParamMailSchema);

NotificationParamMail.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
