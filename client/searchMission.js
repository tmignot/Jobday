Template.spinner.replaces('_pagesLoading');

Template.searchMission.onCreated(function() {
	Session.set('mapsIsLoaded', false);
	Session.set('latlng', {lat: 48.853, lng: 2.35});

	var f = {};
	if (Session.get('currentCategory') && !Session.equals('currentCategory', 'off')) {
		this.filters = new ReactiveVar({
			category: parseInt(Session.get('currentCategory'))
		});
	} else
		this.filters = new ReactiveVar({});
	if (Session.get('dateBeginning') && Session.get('dateBeginning') != 'off') {
		switch(Session.get('dateBeginning')) {
			case 'off': break;
			case 'hour': f.startDate = {$lte: new Date(moment().add(moment.duration(1, 'hour'))), $gte: new Date()}; break;
			case 'day': f.startDate = {$lte: new Date(moment().add(moment.duration(1,'day'))), $gte: new Date()}; break;
			case 'week': f.startDate = {$lte: new Date(moment().add(moment.duration(1,'week'))), $gte: new Date()}; break;
			case 'past': f.startDate = {$lt: new Date()}; break;
			case 'future': filters.startDate = {gte: new Date()}; break;
			default: console.log('error in date filter');
		}
	}
	this.filters.set(_.extend(f, this.filters.get()));

	AdvertsPages.set('filters', _.clone(this.filters.get()));
});

Template.searchMission.onDestroyed(function() {
	console.log('destroying searchmission');
	Session.set('currentCategory', 'off');
	Session.set('dateBeginning', 'off');
	delete Maps.maps.searchMissionMap;
});

Template.searchMission.onRendered(function() {
	console.log('searchmission');
	Maps.create({
		type: 'map', 
		name: 'searchMissionMap', 
		doc: document.getElementById('searchMissionMap'), 
		params: {
			center: Session.get('latlng'),
			zoom: 5
		},
		after: function() {
			Session.set('mapsIsLoaded', true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					Maps.maps.searchMissionMap.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
					Maps.maps.searchMissionMap.setZoom(7);
				});
			}
		}
	});
	$("#searchMissionMap").affix({
		offset: { 
			top: 475 //data-offset-top="400"
		}
	});
	var cat = Session.get('currentCategory'),
			dat = Session.get('dateBeginning');
	if (cat != 'off' && (cat || cat == '0'))
		$('#categorySelect').val(cat);
	else
		Session.set('currentCategory', 'off');
	if (dat && dat != 'off')
		$('#dateSelect').val(dat);
});

Template.searchMission.helpers({
	active: function(w) {
		var f = Template.instance().filters.get();
		if ((f && !_.keys(f).length && w == 'all') ||
				(f && f.type == 1 && w == 'particulier') ||
				(f && f.type == 0 && w == 'pro') ||
				(f && f.online && w == 'online'))
			return 'botborder'
	},
	subdisabled: function() {
		return Session.equals('currentCategory', 'off')? 'disabled':'';
	},
	subcategories: function() { // extending subcategories for select
		var cat = Session.get('currentCategory');
		if (cat && cat != 'off') {
			cat = parseInt(cat);
			return _.map(Categories[cat].subcategories, function(d,i) {
				return {
					index: i,
					name: d
				}
			});
		}
	}
});

Template.searchMission.events({
	'change #categorySelect': function(e,t) {
		Session.set('currentCategory', e.currentTarget.value);
	},
	'click #btnSearchJobParticulier': function(e,t) {
		resetForm();
		AdvertsPages.set({filters: {type: 1}});
		t.filters.set({type: 1});
	},
	'click #btnSearchJobProfessionel': function(e,t) {
		resetForm();
		AdvertsPages.set({filters: {type: 0}});
		t.filters.set({type: 0});
	},
	'click #btnSearchJobAll': function(e,t) {
		resetForm();
		AdvertsPages.set({filters: {}});
		t.filters.set({});
	},
	'click #btnSearchJobOnline': function(e,t) {
		resetForm();
		AdvertsPages.set({filters: {online: true}});
		t.filters.set({online: true});
	},
	'click #btnSearch': function(e,t) {
		// FILTRES
		var filters = _.clone(t.filters.get());
		var cat = parseInt(t.find('#categorySelect').value);
		if (cat || cat == 0) {
			filters.category = cat;
			var sc = t.find('#subcatSelect').value;
			if (sc != 'off')
				filters.subcategory = parseInt(t.find('#subcatSelect').value);
		} else if (filters.hasOwnProperty('category'))
			delete filters['category'];
		filters['$or'] = [{'online': true}, {'address.city': new RegExp('^.*'+t.find('#localisation').value+'.*$', 'gi')}];
		filters.description = new RegExp('^.*'+t.find('#keyword').value+'.*$', 'gi');
		filters.title = new RegExp('^.*'+t.find('#besoin').value+'.*$', 'gi');

		switch($('#dateSelect').val()) {
			case 'off': break;
			case 'hour': filters.startDate = {$lte: new Date(moment().add(moment.duration(1, 'hour'))), $gte: new Date()}; break;
			case 'day': filters.startDate = {$lte: new Date(moment().add(moment.duration(1,'day'))), $gte: new Date()}; break;
			case 'week': filters.startDate = {$lte: new Date(moment().add(moment.duration(1,'week'))), $gte: new Date()}; break;
			case 'past': filters.startDate = {$lt: new Date()}; break;
			case 'future': filters.startDate = {$gte: new Date()}; break;
			default: console.log('error in date filter');
		}
		console.log(filters);
		AdvertsPages.set({filters: filters});
		filters = {};

		// TRI
		var ss = t.find('#sort-type');
		var a = ss.value.split('_');
		switch(a[0]) {
			case 'price': AdvertsPages.set({sort: {budget: a[1]=='asc'?1:-1}}); break;
			case 'date': 
				if (a[1] == 'desc')
					AdvertsPages.set({sort: {createdAt:1}});
				else
					AdvertsPages.set({sort: {startDate:1}});
				break
			default: break;
		}

	},
});

function resetForm() {
	Session.set('currentCategory', 'off');
	$('#dateSelect').val('off');
	$('#localisation').val('');
	$('#besoin').val('');
	$('#keyword').val('');
}
