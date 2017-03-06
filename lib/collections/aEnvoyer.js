AenvoyerSchema = new SimpleSchema({
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
	type: {
		type: Number,
		allowedValues: [0,1,2,3], // 0=phone 1=facture annonce 2=N/A 3=N/A
		defaultValue: 0
	},
	id_cle: {
		type: String,
		optional: true
	},
});

Aenvoyer = new Mongo.Collection('Aenvoyer');
Aenvoyer.attachSchema(AenvoyerSchema);



//Aenvoyer.deny({
//	insert: function(uid) {
//		if (Meteor.user())
//			return false;
//		return true
//	},
//	update: function(uid, doc) {
//		if (doc.owner === uid)
//			return false;
//		return true
//	},
//	remove: function(uid, doc) {
//		if (doc.owner === uid)
//			return false;
//		return true
//	}
//});
//
Aenvoyer.allow({
	insert: function(uid) { 
		
			return true; 
	},
	update: function(uid, doc) {
		if (doc.owner === uid)
			return true;
	},
	remove: function(uid, doc) {
		
			return true;
	}
});
//