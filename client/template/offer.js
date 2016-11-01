Template.offer.helpers({
	m2km: function(dist) { return Math.round(dist / 1000); }
});

Template.offer.events({
	'click .validate': function(e,t) {
		Meteor.call('validateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		});
	}
});
