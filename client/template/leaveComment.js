Template.leaveComment.onCreated(function() {
	this.note = new ReactiveVar(0);
});

Template.leaveComment.helpers({
	star: function(n) {
		var note = Template.instance().note.get();
		if (note >= n)
			return 'star'
		else
			return 'star_border'
	}
});

Template.leaveComment.events({
	'click .star': function(e,t) {
		t.note.set(parseInt($(e.currentTarget).data('note')));
	},
	'click .blue.button': function(e,t) {
		Meteor.call('leaveComment', {
			advertId: t.data.advert,
			offer: t.data.offer._id,
			note: t.note.get(),
			msg: $('.comment-text textarea').val()
		}, function(e,r) {
			if (r) {
				Modal.allowMultiple = true;
				Modal.show('errorModal', r);				
			} else {
				Modal.hide('leaveComment');
				Router.go(Router.current().originalUrl);
			}
		});
	}
});
