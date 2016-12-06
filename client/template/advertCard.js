Template.advertCard.onRendered(function() {
	if (this.data) {
		var addr = this.data.address.city;
		var name = this.data._id;
		var self = this;
		/* Running tracker.autorun to ensure searchMissionMap is correctly loaded */
		Tracker.autorun(function(c) {
			self.tracker = this;
			self.destroyed = false;
			/* There's multiple checks due to multiplicity of possible errors
				 such has filter changing, fast back/forward in navigator, etc
				 before adding the marker attached to this advert
			*/
			if (Session.get('mapsIsLoaded')) { 
				Maps.onLoad(function() {
					Maps.create({type: 'geocoder',
						after: function() {
							Maps.geocoder.geocode({address: addr}, function(r,s) {
								if (s == 'OK' && !self.destroyed) { // Check that advertCard is still present
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
	/* We stop the tracker attached to this advertCard */
	this.tracker.stop();
	this.destroyed = true;
	if (this.data) {
		/* Deleting the marker */
		var name = this.data._id;
		if (Maps.markers && Maps.markers[name]) {
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
