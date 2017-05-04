Template.spinner.replaces('_pagesLoading');

Template.searchMission.onCreated(function() {
	Session.set('mapsIsLoaded', false);
	Session.set('latlng', {lat: 48.853, lng: 2.35});
	this.pageCount = new ReactiveVar(0);
	var self = this;
	Meteor.call('getPageCount', Router.current().params.query, function(e,r) {
		if (r)
			self.pageCount.set(r);
	});
});

Template.searchMission.onDestroyed(function() {
	delete Maps.maps.searchMissionMap;
});

Template.searchMission.onRendered(function() {
	// creating map
	Maps.create({
		type: 'map', 
		name: 'searchMissionMap', 
		doc: document.getElementById('searchMissionMap'), 
		params: {
			center: Session.get('latlng'),
			zoom: 5
		},
		after: function() {
			Session.set('mapsIsLoaded', true); // this is for map markers
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					Maps.maps.searchMissionMap.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
					Maps.maps.searchMissionMap.setZoom(6);
				});
			}
		}
	});
	$("#searchMissionMap").affix({ // setting map affix to permit it to stay when scrolling
		offset: { 
			top: 475
		}
	});
	// setting selects inputs to match current filters
	var cat = Session.get('currentCategory'),
			sub = Session.get('currentSubcategory'),
			dat = Session.get('dateBeginning'),
			loc = Session.get('searchMissionLocal'),
			need= Session.get('searchMissionNeed');
			key = Session.get('searchMissionKeyword');
	if (cat != 'off' && (cat || cat == 0)) {
		$('#categorySelect').val(cat.toString());
		if (sub != 'off' && (sub || sub == 0))
			$('#subcatSelect').val(sub.toString());
	} else
		Session.set('currentCategory', 'off');
	if (dat && dat != 'off')
		$('#dateSelect').val(dat);
	Session.set('dateBeginning', 'off');
	if (loc)
		$('#localisation').val(loc);
	if (need)
		$('#besoin').val(need);
	if (key)
		$('#keyword').val(key);
});

Template.searchMission.helpers({
	numberNotificationALL: function() { // returns the user's hometown
		var idsArray=[];
		idsArray.push(Meteor.userId());
		var aA = UserNotification.find({'owner': Meteor.userId()});
		return aA.count();
	},
	active: function(w) { // returns a classname for underlining top filters
		if (Session.equals('searchMission_type', w))
			return 'botborder'
	},
	subdisabled: function() { // disable suCategories if no categories are selected
		return Session.equals('currentCategory', 'off')? 'disabled':'';
	},
	subcategories: function() { // extending subcategories for select
		var cat = Session.get('currentCategory');
		if (cat != 'off' && cat != undefined) {
			return _.map(Categories[cat].subcategories, function(d,i) {
				return {
					index: i,
					name: d
				}
			});
		}
	},
	pages: function() {
		var currentPage = Session.get('searchMission_page');
		var maxPage = Template.instance().pageCount.get();
		var min = Math.max(currentPage-1, 1);
		var max = Math.min(currentPage+3, maxPage);
		var pages = [];
		for (var i = min; i == max, i++) {
			pages.push(i);
		};
		return pages;
	},
	pageCount: function() {
		var currentPage = Session.get('searchMission_page');
		var maxPage = Template.instance().pageCount.get();
	},
	prevEnabled: function() {
		return Session.get('searchMission_page') ? 'prevPage' : 'disabled';
	},
	nextEnabled: function() {
		var maxPage = Template.instance().pageCount.get();
		return Session.get('searchMission_page') < maxPage - 1 ? 'nextPage' : 'disabled';
	}
});

Template.searchMission.events({
	'change #categorySelect': function(e,t) {
		Session.set('currentCategory', e.currentTarget.value);
	},
	'click #btnSearchJobParticulier': function(e,t) {
		resetForm();
		Session.set('searchMission_type', 'part');
		$('#btnSearch').click();
	},
	'click #btnSearchJobProfessionel': function(e,t) {
		resetForm();
		Session.set('searchMission_type', 'pro');
		$('#btnSearch').click();
	},
	'click #btnSearchJobAll': function(e,t) {
		resetForm();
		Session.set('searchMission_type', 'all');
		$('#btnSearch').click();
	},
	'click #btnSearchJobOnline': function(e,t) {
		resetForm();
		Session.set('searchMission_type', 'online');
		$('#btnSearch').click();
	},
	'click .nextPage': function(e,t) {
		var p = Session.get('searchMission_page');
		Session.set('searchMission_page', p+1);
		$('#btnSearch').click();
	},
	'click .prevPage': function(e,t) {
		var p = Session.get('searchMission_page');
		if (p)
			Session.set('searchMission_page', p-1);
		else
			Session.set('searchMission_page', 0);
		$('#btnSearch').click();
	},
	'click .nPage': function(e,t) {
		var p = $(e.currentTarget).data('page');
		Session.set('searchMission_page', parseInt(p) - 1);
		$('#btnSearch').click();
	},
	'click #btnSearch': function(e,t) {
		// FILTRES
		// retriveing filters
		var filters = {};

		var cat = parseInt(t.find('#categorySelect').value);
		if (cat || cat == 0) {
			filters.category = cat;
			var sc = t.find('#subcatSelect').value;
			if (sc != 'off')
				filters.subcategory = parseInt(t.find('#subcatSelect').value);
		}

		if (t.find('#localisation').value) {
			filters['$or'] = [
				{online: true},
				{'address.city': {$regex: '^.*'+t.find('#localisation').value+'.*$', $options: 'gi'}},
				{'address.zipcode': {$regex: '^.*'+t.find('#localisation').value+'.*$', $options: 'gi'}},
			];
		}

		if (t.find('#besoin').value)
			filters.title = {$regex: '^.*'+t.find('#besoin').value+'.*$', $options: 'gi'};

		if (t.find('#keyword').value)
			filters.description = {$regex: '^.*'+t.find('#keyword').value+'.*$', $options: 'gi'};

		switch(Session.get('searchMission_type')) {
			case 'pro': filters.type = 0; break;
			case 'part': filters.type = 1; break;
			case 'online': filters.online = true; break;
			default: break;
		}

		// Setting date filters
		switch($('#dateSelect').val()) {
			case 'hour': filters.startDate = {
				$lte: (new Date(moment().add(moment.duration(1, 'hour')))).toISOString(),
				$gte: (new Date()).toISOString()
			}; break;
			case 'day': filters.startDate = {
				$lte: (new Date(moment().add(moment.duration(1,'day')))).toISOString(),
				$gte: (new Date()).toISOString()
			}; break;
			case 'week': filters.startDate = {
				$lte: (new Date(moment().add(moment.duration(1,'week')))).toISOString(),
				$gte: (new Date()).toISOString()
			}; break;
			case 'past': filters.startDate = {
				$lt: (new Date()).toISOString()
			}; break;
			case 'future': filters.startDate = {
				$gte: (new Date()).toISOString()
			}; break;
			default: break;
		}
		Session.set('dateBeginning', $('#dateSelect').val());
		Session.set('setMissionType', true);
		Session.set('setMissionPage', true);

		// TRI
		var ss = t.find('#sort-type');
		var a = ss.value.split('_');
		var sort = {};
		switch(a[0]) {
			// sort by price or sort by date
			case 'price': 
				sort = {budget: a[1]=='asc'? 1: -1};
				break;
			case 'date': 
				if (a[1] == 'desc')
					sort = {createdAt:-1};
				else
					sort = {startDate:1};
				break
			default: break;
		}
		var p = Session.get('searchMission_page') || 0;
		UrlQuery({page: p, filters: JSON.stringify(filters), sort: JSON.stringify(sort)});
	},
});

Template.Adverts.helpers({
	adverts: function() {
		return Adverts.find();
	}
});

function resetForm() {
	Session.set('currentCategory', 'off');
	Session.set('currentSubcategory', 'off');
	$('#dateSelect').val('off');
	$('#localisation').val('');
	$('#besoin').val('');
	$('#keyword').val('');
}
