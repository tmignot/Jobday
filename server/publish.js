Meteor.publish('UserNotification', function(ids) {
	return UserNotification.find({$or: [{_id: ids},{owner:  ids},{createdBy: ids}]});
		
});
Meteor.publish('Adverts', function(ids) {
	if (!ids)
		return Adverts.find({});
	else
		//console.log('Advert:' + ids);
		//return Adverts.find({_id: {$in: ids}});
		return Adverts.find({$or: [{_id: {$in: ids}},{owner: {$in: ids}},
		{'status':3,'offers.userId':this.userId ,'offers.validated': true }]});
		
});
Meteor.publish('Advert', function(id) {
	  //return Adverts.find({_id: id});
	return Adverts.find({$or: [{_id: id},{owner: id},{'status':3,'offers.userId':this.userId,'offers.validated': true }]});
});

Meteor.publish('NotificationParamPhone', function(id) {
	return NotificationParamPhone.find({owner: id});
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

Meteor.publish('Events', function() {
	return Events.find();
});

Meteor.publish(null, function (){
	  return Meteor.roles.find({})
});

Meteor.publish('AdminList', function() {
	var adminIds =	Meteor.users.find({
		$or: [
			{roles: {$elemMatch: {$eq: 'admin'}}},
			{roles: {$elemMatch: {$eq: 'root'}}}
		]
	}).map(function(entry) { return entry._id });
	return [
		Meteor.users.find({_id: {$in: adminIds}}),
		UsersDatas.find({userId: {$in: adminIds}})
	]
});


Meteor.publish("annonce", function () {
	return Annonce.find({});
});
