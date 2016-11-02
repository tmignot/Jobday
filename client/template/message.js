// submit a message to an advert or show errors
Template.messages.events({
	'click .submit': function(e,t) {
		var ctx = MessageSchema.newContext();
		if (ctx.validateOne({text: t.find('textarea').value}, 'text')) {
			Meteor.call('postMessage', {
				to: {advert: Template.parentData()._id},
				text: t.find('textarea').value
			}, function(err, res) {
				if (err)
					console.log(err);
				else
					console.log(res);
			});
		}	else
			Modal.show('errorModal', ctx.getErrorObject());
	}
});
