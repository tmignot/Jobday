Template.missionProfil.onRendered (function() {
	var address;
	if (this.data && this.data.address) {
		// construct address litteral
		address = this.data.address.street +
			' ' + this.data.address.zipcode +
			' ' + this.data.address.city;
	}
	// create geocoder if not already
	Maps.create({type: 'geocoder', after: function(maps) {
		// geocode address to create map marker and center map
		Maps.geocoder.geocode({address: address}, function(res, stat) {
			var c = {lat: 0, lng: 0};
			if (stat === 'OK')
				c = res[0].geometry.location;
			// create map centered at [address]
			Maps.create({
				type: 'map',
				name: 'mission-profil-map',
				doc: document.getElementById('mission-map'),
				params: {
					center: c,
					zoom: 8
				}
			});
			// create map marker over [address]
			Maps.create({
				type: 'marker',
				name: 'mission-address-marker',
				map: Maps.maps['mission-profil-map'],
				position: c
			});
		});
	}});
});

Template.missionProfil.helpers({
	isOwner: function() { // is currentUser the advert's owner ?
		if (Template.instance().data && Meteor.userId())
			return Template.instance().data.owner == Meteor.userId();
		return false
	},
	getCat: function() { // returns "[category][subcategory]" (subtitle)
		var d = Template.instance().data;
		if (d) {
			var c = Categories[d.category].name,
					s = Categories[d.category].subcategories[d.subcategory];
			return '[' + c + '][' + s + ']';
		}
	},
	waitingFor: function() { // how many poeple are still needed ?
		var d = Template.instance().data;
		if (d)
			return d.nbPeople - _.where(d.offers, {validated: true}).length;
	},
	hasOffer: function() {
		var d = Template.instance().data,
				retval = false;
		_.each(d.offers, function(o) {
			if (o.userId == Meteor.userId()) {
				retval = true;
			}
		});
		return retval;
	},
	getStatus: function() { // get the status of advert given the number of validated offers
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
	'click #btnModifierJob': function (event,t) { // TODO route to editJob
		Router.go('editJob', {_id: t.data._id});
	},
	'click #btnFaireOffre': function (event, t) { // open the makeOfferModal
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete)
				Modal.show('makeOfferModal', t.data);
			else
				Modal.show('profileNotComplete');
		} else
			Modal.show('shouldBeLogged');
	},
	'click #btnPay': function(e,t) {
		Modal.show('makePaymentModal', t.data)
	}
});

Template.makeOfferModal.onCreated(function(){
	// create distance object to calculate distance between job & jobber
	Maps.create({type: 'distance'});
});

Template.makeOfferModal.events({
	'click #btnPosterOffreGo': function(e,t) {
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete) {
				var distance = 0;
				Maps.onLoad(function() { // ensure Maps api loaded
					Maps.distance.getDistanceMatrix({ // calculate distance
						origins: [d.address.street +' '+d.address.zipcode+' '+d.address.city],
						destinations: [t.data.address.street+' '+t.data.address.zipcode+' '+t.data.address.city],
						travelMode: 'DRIVING'
					}, function(r,s) {
						if (s == 'OK') {
							distance = r.rows[0].elements[0].distance;
							data = {
								advert: t.data._id,
								distance: distance.value,
								comment: document.getElementById('make-offer-comment').value,
								// if advert's price not negocible, take budget value, else take input value
								price: (t.data.negocible)? parseInt(document.getElementById('make-offer-price').value) : t.data.budget
							};
							var ctx = OfferSchema.newContext();
							var valid = true;
							/*
							** hack around :
							** manually add address' keys because of SimpleSchema limitations
							** on optional object and subObject internal keys
							*/
							_.each(['comment','price','distance'], function(e) {
								if (!ctx.validateOne(data, e))
									valid = false;
							});
							if (valid) { 
								Meteor.call('makeOffer', data, function(err, res) {
									Modal.hide('makeOfferModal');
								});
							} else {
								Modal.allowMultiple = true;
								Modal.show('errorModal', ctx.getErrorObject());
							}
						}
					});
				});
			}
		}
	}
});
