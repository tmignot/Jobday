Template.missionProfil.onRendered (function() {
	var address;
	if (this.data && this.data.address) {
		address = this.data.address.street +
			' ' + this.data.address.zipcode +
			' ' + this.data.address.city;
	}
	Maps.create({type: 'geocoder'});
	Maps.onLoad(function(maps) {
		console.log('loaded', address);
		maps.geocoder.geocode({address: address}, function(res, stat) {
			var c = {lat: 0, lng: 0};
			if (stat === 'OK')
				c = res[0].geometry.location;
			Maps.create({
				type: 'map',
				name: 'mission-profil-map',
				doc: document.getElementById('mission-map'),
				params: {
					center: c,
					zoom: 8
				}
			});
			Maps.create({
				type: 'marker',
				name: 'mission-address-marker',
				map: Maps.maps['mission-profil-map'],
				position: c
			});
		});
	});
});

Template.missionProfil.helpers({
	isOwner: function() {
		if (Template.instance().data && Meteor.userId())
			return Template.instance().data.owner == Meteor.userId();
		return false
	},
	getCat: function() {
		var d = Template.instance().data;
		if (d) {
			var c = Categories[d.category].name,
					s = Categories[d.category].subcategories[d.subcategory];
			return '[' + c + '][' + s + ']';
		}
	},
	waitingFor: function() {
		var d = Template.instance().data;
		if (d)
			return d.nbPeople - _.where(d.offers, {validated: true}).length;
	},
	getStatus: function() {
		var d = Template.instance().data;
		if (d) {
			switch(d.status) {
				case 0: return 'ouvert';
				case 1: return 'attribue';
				case 2: return 'termine';
			}
		}
	}
});

Template.missionProfil.events({
	'click #btnModifierJob': function (event) {
	},
	'click #btnFaireOffre': function (event) {
		event.preventDefault();
		if (Meteor.userId() != null){
			$('#posterOffre').modal()         ; // initialized with no keyboard
			$('#posterOffre').modal('show') ;
		}else{
			alert('Vous devez vous connecter');
		}
	}
});
