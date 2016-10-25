Meteor.publish('Adverts', function() {
	return Adverts.find({});
});

Meteor.publish('Advert', function(id) {
	return Adverts.find({_id: id});
});

Meteor.publish('UsersDatas', function(ids) {
	return UsersDatas.find({_id: {$in: ids}});
});

Meteor.publish('MeansOfTransports', function() {
	return MeansOfTransports.find();
});

Meteor.publish('Permis', function() {
	return Permis.find();
});

Meteor.publish('Badges', function() {
	return Badges.find({});
});

Meteor.publish("Images", function () {
	return Images.find({}).cursor;
});

Meteor.publish("users");
Meteor.publish("utilisateur", function (e) {
	return Utilisateur.find({});
});

Meteor.publish("userData", function (ids) {
	if (ids) {
		return [
			Meteor.users.find({_id: {$in: ids}}),
			UsersDatas.find({userId: {$in: ids}})
		]
	}
});

Meteor.publish("annonce", function () {
	return Annonce.find({});
});
