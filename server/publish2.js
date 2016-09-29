Meteor.publish('Adverts', function() {
	return Adverts.find({});
});

Meteor.publish('Advert', function(id) {
	return Adverts.find({_id: id});
});
