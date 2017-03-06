NotificationParamPhoneSchema = new SimpleSchema({
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

NotificationParamPhone = new Mongo.Collection('notificationParamPhone');
NotificationParamPhone.attachSchema(NotificationParamPhoneSchema);

NotificationParamPhone.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});
