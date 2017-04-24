Template.documentsModal.onCreated(function() {
	this.selected = new ReactiveVar('');
});

Template.documentsModal.events({
	'click .doc': function(e,t) {
		t.selected.set($(e.currentTarget).data('document'));
	}
});

Template.documentsModal.helpers({
	documents: function() {
		var uid = Template.instance().data.userId;
		return Images.find({userId: uid, name: {$ne: 'pic'}}).cursor;
	},
	selectedDoc: function() {
		var d = Images.findOne({_id: Template.instance().selected.get()});
		return d;
	}
});
