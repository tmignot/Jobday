Meteor.publish('Adverts', function() {
	return Adverts.find({});
});

Meteor.publish('Advert', function(id) {
	return Adverts.find({_id: id});
});

Meteor.publish("images", function (e) {
    return Images.find({});
});

Meteor.publish("users");
Meteor.publish("utilisateur", function (e) {
    return Utilisateur.find({});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish("annonce", function () {
    return Annonce.find({});
});
