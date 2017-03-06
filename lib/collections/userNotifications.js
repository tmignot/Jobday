UserNotificationSchema = new SimpleSchema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	icon: {
		type: String
	},
	urlNotif: {
		type: String
	},
	owner: {
		type: String
	},
	createdBy:{
		type: String
	}
});

UserNotification = new Mongo.Collection('UserNotification');
UserNotification.attachSchema(UserNotificationSchema);
UserNotification.allow({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});/*
UserNotification.deny({
	insert: function() { return true; },
	update: function() { return true; },
	remove: function() { return true; }
});*/
