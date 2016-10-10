Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
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

Router.route('/', {name: 'home'});

Router.route('/commentCaMarche', {name: 'commentCaMarche'});

Router.route('/searchMission', {name: 'searchMission'});

Router.route('/allCategorieScreen', function () {
	this.render('allCategorieScreen');
});

Router.route('/poster', function () {
    this.render('poster');
});

Router.route('/poster/:_id', function () {
	this.render('poster', {
		data: function() { 
			return { annonce : Annonce.findOne({ _id :  this.params._id }) } ; 
		}
	});
});

Router.route('/missionProfil/:_id', function () {
	this.render('missionProfil', {
		data: function() { 
			return { annonce :  Annonce.findOne({ _id :  this.params._id })};
		}
	});
});

Router.route('/profiluser', function () {
	this.render('dashboardJobber');
});
