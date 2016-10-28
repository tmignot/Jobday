UrlQuery = function(queryObj) {
	var currentRouteMatch = Router.current().url.match(/^(https?:\/\/)?[^\/]*(\/[^?]*)\\?/);
	var route = _.last(currentRouteMatch);
	var query = '?';
	_.each(_.keys(queryObj), function(k) {
		query = query + (query !='?'?'&':'') + k + '=' + queryObj[k];
	})
	Router.go(route+query);
	window.scrollTo(0,0);
};

Template.registerHelper('currentUserData', function() {
		return UsersDatas.findOne({userId: Meteor.userId()});
});
Template.registerHelper('userData', function(id) {
	if (id)
		return UsersDatas.findOne({userId: id});
	if (Session.get('currentUserDataId'))
		return UsersDatas.findOne({userId: Session.get('currentUserDataId')});
	else
		return UsersDatas.findOne({userId: Meteor.userId()});
});

Template.registerHelper('user', function() {
	if (Session.get('currentUserDataId'))
		return Meteor.users.findOne({_id: Session.get('currentUserDataId')});
	else
		return Meteor.users.findOne({_id: Meteor.userId()});
});

Template.registerHelper('username', function(id) {
	return UsersDatas.findOne({userId: id}).name;
});

Template.registerHelper('categories', function() {
	return _.map(Categories, function(c,i) {
		return _.extend(c, {index: i});
	});
});

Template.registerHelper('category', function(id) {
	return Categories[id];
});

Template.registerHelper('means', function() {
	return MeansOfTransports.find();
});

Template.registerHelper('permis', function() {
	return Permis.find();
});

Template.registerHelper('badges', function() {
	return Badges.find();
});

Template.registerHelper('adverts', function(settings) {
	return Adverts.find(settings||{});
});

Template.registerHelper('formatDate', function(date) {
	moment.locale('fr');
	return moment(date).format('DD MMMM YYYY');
});

Template.registerHelper('duration', function(from, to) {
	moment.locale('fr');
	return moment.duration({hours: to.hour, minutes: to.min})
		.subtract(moment.duration({hours: from.hour, minutes: from.min}))
		.humanize();
});

Template.registerHelper('fromNow', function(d) {
	moment.locale('fr');
	return moment(d).fromNow();
});

Template.registerHelper('lastLogin', function() {
	var user = Meteor.user();
	moment.locale('fr');
	if (user && user.services && user.services.resume && user.services.resume.loginTokens){
		var d = _.last(user.services.resume.loginTokens).when;
		return moment(d).fromNow();
	}
});
