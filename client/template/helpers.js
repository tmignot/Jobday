checkParams = function(p, o, f) {
	_.each(_.keys(p), function(k) {
		if (!o)
			throw new Error('No parameters provided');
		if (!o[k] && !_.contains(f, k))
			return;
		if (!o || ! o[k] || !o[k].constructor || !o[k].constructor.name)
			throw new Error('No constructor found for key '+k);
		if (!o[k].constructor.name == p[k])
			throw new Error('checkParam: Value mismatch '+o[k].contructor.name+' and '+p[k]);
	});
};

UploadImage = function(opt) {
	checkParams({
		doc: 'HTMLInputElement',
		name: 'String',
		maxWidth: "Number",
		maxHeight: "Number",
		onBeforeCompress: 'Function',
		onStartUpload: 'Function',
		onProgress: 'Function',
		onEndUpload: 'Function',
		onAfterCompress: 'Function',
		onAfterUpload: 'Function',
		onError: 'Function'
	}, opt, ['doc', 'name']);
	if (opt.doc.type != 'file')
		throw new Error('UploadImage: doc have to be a file input');
	if (!opt.doc.files || !opt.doc.files.length)
		throw new Error('UploadImage: no file chosen');
	if (opt.onBeforeCompress)
		opt.onBeforeCompress.call();
	/*
	** Compression :
	** here we create a canvas which we will draw the new photo to
	** then we check its size and resize to maxWidth or maxHeight
	** depending on format and we draw the photo
	** in its new size
	*/
	var file = opt.doc.files[0];
	var reader = new FileReader();
	if (file.type.indexOf('image') == 0) {
		reader.onload = function (event) {
			var image = new Image();
			image.src = event.target.result;
			image.onload = function() {
				if (image.width > image.height) {
					if (opt.maxWidth && image.width > opt.maxWidth) {
						image.height *= opt.maxWidth / image.width;
						image.width = opt.maxWidth;
					}
				}
				else {
					if (opt.maxHeight && image.height > opt.maxHeight) {
						image.width *= opt.maxHeight / image.height;
						image.height = opt.maxHeight;
					}
				}
				var canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(this, 0, 0, image.width, image.height);
				if (opt.onAfterCompress)
					opt.onAfterCompress.call();
				var f = canvas.toDataURL(file.type);
				var uploader = Images.insert({
					//Jonas file: canvas.toDataURL(file.type),
					file : f.replace(';base64', ''),
					isBase64: true,
					fileName: opt.name
				}, false);
				uploader.on('start', function () {
					if (opt.onStartUpload)
						opt.onStartUpload.call();
				});
				uploader.on('end', function (error, file) {
					if (opt.onEndUpload)
						opt.onEndUpload.call(this, error, file);
				});
				uploader.on('progress', function(percent, file) {
					if (opt.onProgress)
						opt.onProgress.call(this, percent, file);
				});
				uploader.on('uploaded', function (error, file) {
					if (opt.onAfterUpload)
						opt.onAfterUpload.call(this, error, file);
				});
				uploader.on('error', function (error, file) {
					if (opt.onError)
						opt.onError.call(this, error, file);
				});
				// start uploading
				uploader.start();
			};
		};
		reader.readAsDataURL(file);
	} else
		opt.onAfterUpload.call(this, new Error('Le type de fichier n\'est pas supporte'));
};

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

Template.registerHelper('log', function(o) { console.log(o); });

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
	var u = UsersDatas.findOne({userId: id});
	if (u) {
		if (u.society)
			return u.name
		else
			return u.firstname
	}
});
/*
**	notificationMail: helper to retrieve all notificationMail
**		NB: extends the array with indices values
**				to have it in the templates
*/
Template.registerHelper('notificationMail', function() {
	return _.map(NotificationMail, function(c,i) {
		return _.extend(c, {index: i});
	});
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
	var fromTotal = parseInt(from.hour*60 + from.min);
	var toTotal = parseInt(to.hour*60 + to.min);
	if (fromTotal > toTotal) {
		var fromOffset = moment.duration({hours: from.hour, minutes: from.min})
			.subtract(moment.duration({hours: to.hour, minutes: to.min}));
		return moment.duration({hours: 24}).subtract(fromOffset).humanize();
	} else {
		return moment.duration({hours: to.hour, minutes: to.min})
			.subtract(moment.duration({hours: from.hour, minutes: from.min}))
			.humanize();
	}
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
