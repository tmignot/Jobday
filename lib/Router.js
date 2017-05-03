Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'NotFound',
	loadingTemplate: 'loading'
});

Router.onBeforeAction(function() {
	if (Meteor.loggingIn()){
		this.render('loading');
	} else if (Meteor.user()) {
		/*
		var u = Meteor.user();
		if (u.emails && u.emails[0] && !u.emails[0].verified)
			this.render('verification');
		else
		*/
			this.next();
	} else {
		this.next();
	}
});

Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.redirect('/');
	} else {
		this.next();
	}
}, {
	only: [
		'3dsecure',
		'editJobber',
		'profiluser',
		'poster',
		'adminPanel'
	]
});

Router.onBeforeAction(function() {
	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
		this.redirect('/');
	} else {
		this.next();
	}
}, {
	only: [
		'adminPanel'
	]
});

Router.route('/', {
	name: 'home',
	waitOn: function() {
		return [
		Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});
Router.route('/about', {
	name: 'about',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/commentCaMarche', {
	name: 'commentCaMarche',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/team', {
	name: 'team',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/faq', {
	name: 'faq',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});


Router.route('/allCategorieScreen', {
	name: 'allCategories',
	template: 'allCategorieScreen',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/poster', {
	name: 'poster',
	template: 'poster',
	waitOn: function() {
		if (this.params.query && this.params.query.like) {
			return [
				Meteor.subscribe('UserNotification', Meteor.userId()),
				Meteor.subscribe('Advert', this.params.query.like),	
				Meteor.subscribe('userData', [Meteor.userId()]),
				Meteor.subscribe('Images')
			];
		} else {
			return [
				Meteor.subscribe('UserNotification', Meteor.userId()),
				Meteor.subscribe('userData', [Meteor.userId()]),
				Meteor.subscribe('Images')
			];
		}
	},
	data: function() {
		if (this.params.query && this.params.query.like) {
			var d = Adverts.findOne({_id: this.params.query.like});
			if (d) {
				delete d._id;
				delete d.address.street;
				delete d.address.zipcode;
				delete d.address.city;
				return d;
			}
		}
	},
	onBeforeAction: function() {
		if (Meteor.userId()) {
			var u = UsersDatas.findOne({userId: Meteor.userId()});
			if (u && u.profileComplete)
				this.next();
			else
				this.redirect('profiluser/'+Meteor.userId());
		} else
			this.redirect('/');
	}
});

Router.route('/poster/:_id', {
	name: 'editJob',
	template: 'poster',
	data: function() {
		var ad = Adverts.findOne({ _id:  this.params._id });
		if (!ad)
			this.render('NotFound');
		else
			return ad;
	},
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Advert', this.params._id),
			Meteor.subscribe('Images')
		];
	},
	onBeforeAction: function() {
		if (this.ready() && this.data()) {
			if (this.data().owner == Meteor.userId() ||
					Roles.userIsInRole(Meteor.userId(), 'admin'))
				this.next();
			else
				this.redirect('/');
		}
	}
});

Router.route('/searchMission', {
	name: 'searchMission',
	template: 'searchMission',
	waitOn: function() {
		return [
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/missionProfil/:_id', {
	name: 'missionProfil',
	template: 'missionProfil',
	data: function() {
		var ad = Adverts.findOne({ _id:  this.params._id });
		if (!ad)
			this.render('NotFound');
		else
			return ad;
	},
	waitOn: function() {
		var d = this.data();
		var msgUsers = [Meteor.userId()];
		if (d) {
			msgUsers = _.union(d.owner, msgUsers);
			msgUsers = _.union(msgUsers, _.map(d.messages, function(m) {
				return m.userId;
			}));
			msgUsers = _.union(msgUsers, _.map(d.offers, function(o) {
				return o.userId;
			}));
		}
		return [
			Meteor.subscribe('Events'),
			Meteor.subscribe('Badges'),
			Meteor.subscribe('userData', msgUsers),
			Meteor.subscribe('Advert', this.params._id),
			Meteor.subscribe('UserNotification', Meteor.userId()),
			Meteor.subscribe('Images')
		];
	},
});

Router.route('/profiluser/:id', {
	name: 'profile',
	template: 'dashboardJobber',
	waitOn: function() {
		var d = this.data();
		var notesAds = [];
		var notesAdsOwners = []
		if (d) {
			notesAds = _.map(d.notes, function(n) { return n.advertId; });
			notesAdsOwners = _.map(d.notes, function(n) { return n.advertOwnerId; });
		}
		var idOK = notesAds;
		idOK.push(Meteor.userId());
		//idOK.push(this.data._id);
			Session.set('currentUserDataId', this.params.id);
		
		notesAdsOwners.push(this.data._id);
		return [
			Meteor.subscribe('UserNotification',Meteor.userId()),
			Meteor.subscribe('Adverts', idOK),
			Meteor.subscribe('Adverts', notesAds),
			Meteor.subscribe('Badges'),
			Meteor.subscribe('MeansOfTransports'), 
			Meteor.subscribe('Permis'), 
			Meteor.subscribe('userData', _.union(notesAdsOwners, [Meteor.userId(), this.params.id])),
			Meteor.subscribe('Images')
		];
	},
	data: function() {
		return UsersDatas.findOne({userId: this.params.id});
	},
	onBeforeAction: function() {
		if (UsersDatas.find({userId: this.params.id}).count() != 1)
			this.render('NotFound');
		else {
			Session.set('currentUserDataId', this.params.id);
			this.next();
		}
	}
});

Router.route('/profiluser/:id/edit', {
	name: 'editJobber',
	template: 'editJobber',
	waitOn: function() {
		return [
			Meteor.subscribe('Badges'),
			Meteor.subscribe('MeansOfTransports'), 
			Meteor.subscribe('Permis'), 
			Meteor.subscribe('userData', [Meteor.userId(), this.params.id]),
			Meteor.subscribe('Images')
		];
	},
	data: function() {
		return UsersDatas.findOne({userId: this.params.id});
	},
	onBeforeAction: function() {
		if (Meteor.userId() !== this.params.id && !Roles.userIsInRole(Meteor.userId(), 'admin' ))
			this.redirect('/');
		else {
			if (UsersDatas.find({userId: this.params.id}).count() != 1)
				this.render('NotFound');
			else {
				Session.set('currentUserDataId', this.params.id);
				if (_.contains(['info','skills','badges','notificationParam'], this.params.query.tab))
					Session.set('editJobberTab', this.params.query.tab);
				else
					Session.set('editJobberTab', 'info');
				this.next();
			}
		}
	}
});

Router.route('/3dsecure', {
	name: '3dsecure',
	action: function() {
		this.render('spinner');
		if (this.params.query && this.params.query.transactionId) {
			Meteor.call('getPayin', this.params.query.transactionId, function(err, res) {
				if (err || !res || res.Status != 'SUCCEEDED') {
					Router.go('missionProfil', {_id: res.advertId}, {query: 'pay=error&errors[]='+translateMangoMsg(res.ResultCode)});
				} else {
					Meteor.call('finalizePayment', res.advertId, function(err, r) {
						if (err || r) {
							var q = _.reduce(r, function(a,e) {return a +'&errors[]='+translateMangoMsg(e)}, '');
							Router.go('missionProfil', {_id: res.advertId}, {query: 'pay=error'+q});
						}	else
							Router.go('missionProfil', {_id: res.advertId}, {query: 'pay=success'});
					});
				}
			});
		}
	}
});

Router.route('/admin', {
	name: 'adminPanel',
	template: 'adminPanel',
	waitOn: function() {
		if (this.params.query && this.params.query.p == 'admin') {
			Session.set('adminPage', 'admin');
			return [
				Meteor.subscribe('Badges'),
				Meteor.subscribe('AdminList'),
				Meteor.subscribe('Images')
			];
		} else if (this.params.query && this.params.query.p == 'users') {
			Session.set('adminPage', 'users');
			return [
				Meteor.subscribe('Badges'),
				Meteor.subscribe('Images')
			];
		} else {
			Session.set('adminPage', 'events');
			var eventUsers = _.map(Events.find({},{fields: {userEmitter: 1}}).fetch(), function(e) {
				return e.userEmitter;
			});
			eventUsers.push(Meteor.userId());
			return [
				Meteor.subscribe('Permis'),
				Meteor.subscribe('userData', _.uniq(eventUsers)),
				Meteor.subscribe('Badges'),
				Meteor.subscribe('Images')
			];
		}
	}
});
