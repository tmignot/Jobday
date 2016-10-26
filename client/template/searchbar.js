initAutocomplete = function() {
	autocomplete = new google.maps.places.Autocomplete(document.getElementById('local-input'),{types: ['geocode']});
};

Template.searchbar.events({
	'focus #local-input': function(e,t) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var geolocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var circle = new google.maps.Circle({
					center: geolocation,
					radius: position.coords.accuracy
				});
				autocomplete.setBounds(circle.getBounds());
			});
		}
	}
});
