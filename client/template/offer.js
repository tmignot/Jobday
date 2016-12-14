Template.offer.onCreated(function() {
	this.requestingValidation = new ReactiveVar(false);
});

// helper to convert meters to kilometers
Template.offer.helpers({
	m2km: function(dist) { return Math.round(dist / 1000); },
	requestingValidation: function() {
		return Template.instance().requestingValidation.get();
	},
	hasBeenNoted: function() {
		var t = Template.instance();
		var advert = Template.parentData(2)._id;
		var user = UsersDatas.findOne({userId: t.data.userId});
		console.log(user, user.notes, _.findWhere(user.notes, {advertId: advert}));
		if (user && user.notes && !_.findWhere(user.notes, {advertId: advert}))
			return false;
		return true;
	}
});

/*
** validate an offer
** Server method necessary to update a subdocument because
** the query is not in the simple form {_id: 'id'}
** but in this one: {_id: 'id', 'offers._id': 'o_id'}
** such a query isn't authorized in unsafe code (client)
*/
Template.offer.events({
	'click .validate': function(e,t) {
		t.requestingValidation.set(true);
		Meteor.call('validateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		}, function() {
			t.requestingValidation.set(false);
		});
	},
	'click .invalidate': function(e,t) {
		t.requestingValidation.set(true);
		Meteor.call('invalidateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		}, function() {
			t.requestingValidation.set(false);
		});
	},
	'click .comment': function(e,t) {
		Modal.show('leaveComment', {offer: t.data, advert: Template.parentData(2)._id});
	}
});
