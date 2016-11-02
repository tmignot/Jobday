/*
** UrlQuery: route to current URL with queryParameters
**		- queryObj: Object in the form {k1: v1, ..., kx: vx}
**	Example: UrlQuery({sortby: 'name', order: 'asc'})
**	will route to [currentUrl]?sortBy=name&order=asc
*/
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

Template.registerHelper('Maps', function() { return Maps; });

/*
** toUrlQuery: returns a query string from an object
**		- obj: Object in the form {k1: v1, ..., kx: vx}
**	Example: toUrlQuery({sortby: 'name', order: 'asc'})
**	will return to "sortBy=name&order=asc"
*/
Template.registerHelper('toUrlQuery', function(obj) {
	var q = '';
	_.each(_.keys(obj), function(k, i, l) {
		q += (i == l.length-1) ? k+'='+obj[k] : k+'='+obj[k]+'&';
	});
	return q;
});

/*
** currentUserData: helper to get the current user's entry
**									in the UsersDatas collection
*/
Template.registerHelper('currentUserData', function() {
		return UsersDatas.findOne({userId: Meteor.userId()});
});

/*
** userData: helper to get a user's entry in the UsersDatas
**					 collection
**		- id: the id of the user whose you want to retrieve data
**	If no if provided, search for Session variable 'currentUserDataId'
**  If none either retrieves current user's datas
*/
Template.registerHelper('userData', function(id) {
	if (id)
		return UsersDatas.findOne({userId: id});
	if (Session.get('currentUserDataId'))
		return UsersDatas.findOne({userId: Session.get('currentUserDataId')});
	else
		return UsersDatas.findOne({userId: Meteor.userId()});
});

/*
**	user: helper to retrieve the current user's Accounts entry
**		same as above: seach for Session variable or fall back
**		to current user
*/
Template.registerHelper('user', function() {
	if (Session.get('currentUserDataId'))
		return Meteor.users.findOne({_id: Session.get('currentUserDataId')});
	else
		return Meteor.users.findOne({_id: Meteor.userId()});
});

/*
**	username: helper to get a user's name from its id
*/
Template.registerHelper('username', function(id) {
	return UsersDatas.findOne({userId: id}).name;
});

/*
**	categories: helper to retrieve all categories
**		NB: extends the array with indices values
**				to have it in the templates
*/
Template.registerHelper('categories', function() {
	return _.map(Categories, function(c,i) {
		return _.extend(c, {index: i});
	});
});

/*
**	category: helper to get a full category and subs
**						from its index
*/
Template.registerHelper('category', function(id) {
	return Categories[id];
});

/*
**	means: just return all means in DB
*/
Template.registerHelper('means', function() {
	return MeansOfTransports.find();
});

/*
**	permis: just return all permis in DB
*/
Template.registerHelper('permis', function() {
	return Permis.find();
});

/*
**	badges: just return all badges in DB
*/
Template.registerHelper('badges', function() {
	return Badges.find();
});

/*
** I don't believe I use that thing ..??
** but sure I made it.
*/
Template.registerHelper('adverts', function(settings) {
	return Adverts.find(settings||{});
});

/*
** formatDate: helper to get french litteral date
**						 from a Date object
*/
Template.registerHelper('formatDate', function(date) {
	moment.locale('fr');
	return moment(date).format('DD MMMM YYYY');
});

/*
** duration: helper to get french litteral duration
**					 from [from] to [to]
**	It could per example return a string like:
**	"4 heures 15 minutes"
*/
Template.registerHelper('duration', function(from, to) {
	moment.locale('fr');
	return moment.duration({hours: to.hour, minutes: to.min})
		.subtract(moment.duration({hours: from.hour, minutes: from.min}))
		.humanize();
});

/*
** fromNow: returns a duration from now to [d]
**		NB: could be in *duration* for future dates
**								 *duration* ago for past dates
*/
Template.registerHelper('fromNow', function(d) {
	moment.locale('fr');
	return moment(d).fromNow();
});

/*
** lastLogin: helper to get a french litteral duration
** from which current user last logged in
*/
Template.registerHelper('lastLogin', function() {
	var user = Meteor.user();
	moment.locale('fr');
	if (user && user.services && user.services.resume && user.services.resume.loginTokens){
		var d = _.last(user.services.resume.loginTokens).when;
		return moment(d).fromNow();
	}
});
