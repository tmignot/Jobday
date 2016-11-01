Template.missionProfil.onRendered (function() {
	var address;
	if (this.data && this.data.address) {
		address = this.data.address.street +
			' ' + this.data.address.zipcode +
			' ' + this.data.address.city;
	}
	Maps.create({type: 'geocoder'});
	Maps.onLoad(function(maps) {
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
	'click #btnFaireOffre': function (event, t) {
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete)
				Modal.show('makeOfferModal', t.data);
			else
				Modal.show('profileNotComplete');
		} else
			Modal.show('shouldBeLogged');
	}
});

Template.makeOfferModal.onCreated(function(){
	Maps.create({type: 'distance'});
});

Template.makeOfferModal.events({
	'click #btnPosterOffreGo': function(e,t) {
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if (d) {
			if (d.profileComplete) {
				var distance = 0;
				Maps.distance.getDistanceMatrix({
					origins: [d.address.street +' '+d.address.zipcode+' '+d.address.city],
					destinations: [t.data.address.street+' '+t.data.address.zipcode+' '+t.data.address.city],
					travelMode: 'DRIVING'
				}, function(r,s) {
					if (s == 'OK') {
						distance = r.rows[0].elements[0].distance;
						console.log(r);
						data = {
							advert: t.data._id,
							distance: distance.value,
							comment: document.getElementById('make-offer-comment').value,
							price: (t.data.negocible)? parseInt(document.getElementById('make-offer-price').value) : t.data.budget
						};
						console.log(data);
						var ctx = OfferSchema.newContext();
						var valid = true;
						_.each(['comment','price','distance'], function(e) {
							if (!ctx.validateOne(data, e))
								valid = false;
						});
						if (valid) { 
							Meteor.call('makeOffer', data, function(err, res) {
								console.log(err, res);
								if (!err && res == 'OK')
									console.log('success');
								else
									console.log(res);
								Modal.hide('makeOfferModal');
							});
						} else {
							console.log(ctx);
							Modal.allowMultiple = true;
							Modal.show('errorModal', ctx.getErrorObject());
						}
					}
				});
			}
		}
	}
});
