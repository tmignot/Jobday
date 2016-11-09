Template.searchMission.onCreated(function() {
	this.filters = new ReactiveVar({});
	this.formFilters = {};
});

Template.searchMission.onRendered(function() {
	Session.set('currentCategory', 'off');
	Session.set('latlng', {lat: 48.853, lng: 2.35});
	Maps.create({
		type: 'map', 
		name: 'searchMissionMap', 
		doc: document.getElementById('searchMissionMap'), 
		params: {
			center: Session.get('latlng'),
			zoom: 5
		},
		after: function() {
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
			top: 400 //data-offset-top="400"
		}
	});
});

Template.searchMission.helpers({
	active: function(w) {
		var f = Template.instance().filters.get();
		console.log(f);
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
		AdvertsPages.set({filters: {type: 1}});
		t.filters.set({type: 1});
	},
	'click #btnSearchJobProfessionel': function(e,t) {
		AdvertsPages.set({filters: {type: 0}});
		t.filters.set({type: 0});
	},
	'click #btnSearchJobAll': function(e,t) {
		AdvertsPages.set({filters: {}});
		t.filters.set({});
	},
	'click #btnSearchJobOnline': function(e,t) {
		AdvertsPages.set({filters: {online: true}});
		t.filters.set({online: true});
	},
	'click #btnSearch': function(e,t) {
		// FILTRES
		var filters = _.clone(t.filters.get());
		var cat = parseInt(t.find('#categorySelect').value);
		console.log(cat);
		console.log('hey', filters);
		if (cat || cat == 0) {
			filters.category = cat;
			filters.subcategory = parseInt(t.find('#subcatSelect').value);
		}
		filters['address.city'] = new RegExp('^.*'+t.find('#localisation').value+'.*$', 'gi');		
		filters.description = new RegExp('^.*'+t.find('#keyword').value+'.*$', 'gi');
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
