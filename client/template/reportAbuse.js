Template.reportAbuseModal.onCreated(function() {
	this.itemType = new ReactiveVar('');
	this.item = new ReactiveVar('');
});

Template.reportAbuseModal.helpers({
	itemIs: function(i) {
		return Template.instance().itemType.get() == i;
	},
	validable: function() {
		var t = Template.instance();
		if (t.itemType.get() == 'advert' ||
				t.item.get() != '')
			return true;
	},
	shorten: function(t) {
		return t.substr(0,50) +'...';
	}
});

Template.reportAbuseModal.events({
	'change #abuse-item-type-select': function(e,t) {
		t.item.set('');
		t.itemType.set($(e.currentTarget).val());
	},
	'change #abuse-item': function(e,t) {
		t.item.set($(e.currentTarget).val());
	},
	'click .confirm': function(e,t) {
		var data = {
			advertId: t.data._id,
			message: $('#abuse-message').val(),
			objectType: t.itemType.get(),
			objectId: t.item.get()
		};
		if (data.objectType != 'advert')
			data.objectUser = _.findWhere(t.data[data.objectType+'s'], {_id: data.objectId}).userId;

		Meteor.call('sendEvent', {
			userEmitter: Meteor.userId(),
			type: 'report_abuse',
			data: data
		}, function(e,r) {
			Modal.allowMultiple = true;
			if (e) Modal.show('serverErrorModal', e);
			else Modal.show('modalSuccess', {message: "Le signalement a bien ete effectue"});
		});
	}
});

