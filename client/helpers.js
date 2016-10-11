Template.registerHelper('userData', function() {
	return UsersDatas.findOne({userId: Meteor.userId()});
});

Template.registerHelper('means', function() {
	return MeansOfTransports.find();
});

Template.registerHelper('permis', function() {
	return Permis.find();
});

Template.registerHelper('formatDate', function(date) {
	console.log(date);
	moment.locale('fr');
	return moment(date).format('DD MMMM YYYY');
});

Template.registerHelper('lastLogin', function() {
	var user = Meteor.user();
	moment.locale('fr');
	if (user && user.services && user.services.resume && user.services.resume.loginTokens){
		var d = _.last(user.services.resume.loginTokens).when;
		return moment(d).fromNow();
	}
});