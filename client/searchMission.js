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
	'click #btnSearch': function(e,t) {
		// FILTRES
		var filters = { };
		var cat = parseInt(t.find('#categorySelect').value);
		if (cat || cat == 0) {
			filters.category = cat;
			filters.subcategory = parseInt(t.find('#subcatSelect').value);
		}
		filters['address.city'] = new RegExp('^.*'+t.find('#localisation').value+'.*$', 'gi');		
		filters.description = new RegExp('^.*'+t.find('#keyword').value+'.*$', 'gi');
		console.log(filters);
		AdvertsPages.set({filters: filters});

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
