// submit a message to an advert or show errors
Template.messages.events({
	'click .submit': function(e,t) {
		var ctx = MessageSchema.newContext();
		if (ctx.validateOne({text: t.find('textarea').value}, 'text')) {
			Meteor.call('postMessage', {
				to: {advert: Template.parentData()._id},
				text: t.find('textarea').value
			}, function(err, res) {
				if (err || res)
					Modal.show('errorModal', {invalidKeys: [{message:  'Il est interdit de communiquer des informations personnelles avec les autres utilisateurs'}]});
			});
		}	else
			Modal.show('errorModal', ctx.getErrorObject());
	}
});

Template.messages.helpers({
	hasPassed: function() {
		var d = Template.parentData();
		if (d)
			return d.startDate <= new Date();
	}
});
