Template.advertCard.onRendered(function() {
	console.log('advertCard');
	if (this.data) {
		var addr = this.data.address.city;
		var name = this.data._id;
		var self = this;
		Tracker.autorun(function(c) {
			self.tracker = this;
			self.destroyed = false;
			if (Session.get('mapsIsLoaded')) {
				Maps.onLoad(function() {
					Maps.create({type: 'geocoder',
						after: function() {
							Maps.geocoder.geocode({address: addr}, function(r,s) {
								if (s == 'OK' && !self.destroyed) {
									console.log('creating marker '+name);
									Maps.create({type: 'marker',
										name: name,
										map: Maps.maps.searchMissionMap,
										position: {
											lat: r[0].geometry.location.lat(),
											lng: r[0].geometry.location.lng()
										}
									});
								}
							})
						}
					});
				});
				c.stop();
			} else { return; }
		});
	}
});

Template.advertCard.onDestroyed(function() {
	this.tracker.stop();
	this.destroyed = true;
	if (this.data) {
		console.log('destroying card');
		var name = this.data._id;
		if (Maps.markers && Maps.markers[name]) {
			console.log('destroying marker '+name);
			Maps.markers[name].setMap(null);
			Maps.markers[name] = undefined;
		}
	}
});

Template.advertCard.helpers({
	getCat: function() { //returns [category][subcategory]
		var d = Template.instance().data;
		if (d) {
			var c = Categories[d.category].name,
					s = Categories[d.category].subcategories[d.subcategory];
			return '[' + c + '][' + s + ']';
		}
	}
});

Template.advertCard.events({
	'click .advertCard .advertCard-title': function(e,t) {
		var id = $(e.currentTarget).data('which');
		Router.go('missionProfil', {_id: id});
	}
});
