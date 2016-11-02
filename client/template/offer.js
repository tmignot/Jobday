// helper to convert meters to kilometers
Template.offer.helpers({
	m2km: function(dist) { return Math.round(dist / 1000); }
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
		Meteor.call('validateOffer', {
			advert: Template.parentData(2)._id,
			offer: t.data._id
		});
	}
});
