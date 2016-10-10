NewsletterSchema = new SimpleSchema({
	name: {
		type: String,
		min: 5,
		max: 255,
		trim: true
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		unique: true
	}
});

Newsletters = new Mongo.Collection('Newsletter');
Newsletters.attachSchema(NewsletterSchema);

Newsletters.deny({
	insert: function() { return false; },
	update: function() { return true;  },
	remove: function() { return true;  }
});

Newsletters.allow({
	insert: function() { return true; }
});
