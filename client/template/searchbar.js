Template.searchbar.onRendered(function() {
	// create Maps autocomplete API
});

Template.searchbar.events({
	'focus #local-input': function(e,t) {
		if (navigator.geolocation) {
			// try getting user position (not available under http)
			navigator.geolocation.getCurrentPosition(function(position) {
				var geolocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				Maps.create({
					type: 'autocomplete',
					doc: document.getElementById('local-input'),
					params: {
						types: ['geocode']
					}
				});
				Maps.onLoad(function() { // ensure Maps api loaded
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					// set user position to improve autocomplete pertinence
					Maps.places.autocomplete.setBounds(circle.getBounds()); 
				});
			});
		}
	},
	'click .find-button': function(e,t) {
		var query = {
			$or: [
				{online: true},
				{'address.city': {
					$regex: '^.*'+t.find('#local-input').value+'.*$',
					$options: 'gi'
				}},
				{'address.zipcode': {
					$regex: '^.$' + t.find('#local-input').value + '.*$',
					$options: 'gi'
				}}
			],
			title: {
				$regex: '^.*'+t.find('#need-input').value+'.*$',
				$options: 'gi'
			}
		};
		Router.go('/searchMission?filters='+JSON.stringify(query));
	},
	'keypress #local-input': function(e,t) {
		if ( (e.keyCode && e.keyCode == 13))
			$('.find-button').click();
	},
	'keypress #need-input': function(e,t) {
		if ( (e.keyCode && e.keyCode == 13))
			$('.find-button').click();
	}
});
