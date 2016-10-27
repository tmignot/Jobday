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
}, { only: ['profiluser','poster']});

Router.route('/', {
	name: 'home',
	waitOn: function() {
		return [
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/commentCaMarche', {name: 'commentCaMarche'});


Router.route('/allCategorieScreen', function () {
	this.render('allCategorieScreen');
});

Router.route('/poster', function () {
    this.render('poster');
});

Router.route('/poster/:_id', {
	template: 'poster',
	data: function() {
		return Adverts.findOne({ _id: this.params._id });
	},
	waitOn: function() {
		return [
			Meteor.subscribe('Advert', this.params._id),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/searchMission', {
	name: 'searchMission',
	template: 'searchMission',
	waitOn: function() {
		return [
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Adverts'),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/missionProfil/:_id', {
	name: 'missionProfil',
	template: 'missionProfil',
	data: function() { 
		return Adverts.findOne({ _id:  this.params._id });
	},
	waitOn: function() {
		return [
			Meteor.subscribe('userData', [Meteor.userId()]),
			Meteor.subscribe('Advert', this.params._id),
			Meteor.subscribe('Images')
		];
	}
});

Router.route('/profiluser/:id', {
	name: 'profile',
	template: 'dashboardJobber',
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
		if (Meteor.userId() !== this.params.id)
			this.redirect('/');
		else {
			Session.set('currentUserDataId', this.params.id);
			if (_.contains(['info','skills','badges'], this.params.query.tab))
				Session.set('editJobberTab', this.params.query.tab);
			else
				Session.set('editJobberTab', 'info');
			this.next();
		}
	}
});
