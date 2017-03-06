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
		Session.set('searchMissionLocal', t.find('#local-input').value);
		Session.set('searchMissionNeed', t.find('#need-input').value);
		Router.go('/searchMission');
	}
    ,'keypress #local-input': function(e,t) {
		//alert(e.keyCode);
        if ( (e.keyCode && e.keyCode == 13)) {
            
        Session.set('searchMissionLocal', t.find('#local-input').value);
		Session.set('searchMissionNeed', t.find('#need-input').value);
		Router.go('/searchMission');
            return false;
        } else {
            return true;
        }
	},
    'keypress #need-input': function(e,t) {
		//alert(e.keyCode);
        if ( (e.keyCode && e.keyCode == 13)) {
            
        Session.set('searchMissionLocal', t.find('#local-input').value);
		Session.set('searchMissionNeed', t.find('#need-input').value);
		Router.go('/searchMission');
            return false;
        } else {
            return true;
        }
	}
});
