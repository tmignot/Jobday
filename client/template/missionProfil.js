Template.missionProfil.onRendered (function() {
	var q = Router.current().params.query;
	if (q && q.pay) { // if we have alert to show about payment we do it
		Modal.show('payment'+q.pay, {errors: q.errors});
		Router.go('/missionProfil/'+this.data._id); // re-routing to same route to prevent multiple alerts
	}
	var address;
	if (this.data && this.data.address) {
		// construct address litteral
		//address = this.data.address.street;// +
		address = this.data.address.zipcode + ' ' + 
							this.data.address.city;
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
	societyMessage: function (){
		var d = Template.parentData();
		if (d){
		var d1 = UsersDatas.findOne({userId: Meteor.userId()});
		//alert(d.type);
		if(d.type==0 && (d1.society != true)){
			//alert("1");
			return false;
			}
			else{ 
			//alert("2");
			return true;
			}
		}else{//alert("3"); 
		return false;}
	},
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
	hasOffer: function() { // return true if current user has already made an offer
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
				case 2: return 'ferme';
				case 3: return 'termine';
			}
		}
	}
});

Template.missionProfil.events({
	'click #btnModifierJob': function (event,t) { // TODO route to editJob
		Router.go('editJob', {_id: t.data._id});
	},
	'click #btnDeleteJob': function(event, t) {
		Modal.show('confirmationModal', {
			message: 'Vous etes sur le point de supprimer definitivement cette annonce, '+
							 'ATTENTION: cette action est irreversible',
			onConfirm: function() {
				Modal.allowMultiple = true;
				Modal.hide('confirmationModal');
				Adverts.remove({_id: t.data._id}, function(e,r) {
					if (e)
						Modal.show('serverErrorModal', e);
					else {
						Modal.show('modalSuccess', {message: "L'annonce a bien ete supprimee"});
						Router.go('/');
					}
				});
			}
		});
	},
	'click #btnFaireOffre': function (event, t) { // open the makeOfferModal
		var d = UsersDatas.findOne({userId: Meteor.userId()});
		if(d.society==false && t.data.type==0){
			alert("Pas d'offre car vous ètes un particulier");
			}
		else{
		if (d) {
			//alert(d.bankComplete);
			if (d.bankComplete){
				Modal.show('makeOfferModal', t.data);
				
			//console.log(t.data._id);
			var data = Meteor.call('sendEmailNoreplyByAnnonce','Bonjour, Une Personne a postulé ','Postulant Jobber',t.data._id, function(error, result){
					   if(error){
						//  alert('Error'+error);
					   }else{
						  return result;
					   }
						});
			
			}
			else{
				Modal.show('profileNotComplete');
			//console.log('erreur 2');
			}
		} else{
			Modal.show('shouldBeLogged');
		}}
	},
	'click #btnClose': function(e,t) {
		var d = t.data;
		if (d && d.nbPeople - _.where(d.offers, {validated: true}).length == 0)
			Meteor.call('closeAdvert', {advertId: t.data._id});
	},
	'click #btnPay': function(e,t) {
		var d = t.data;
		if (d) {
			var notedUsersIds = _.map(_.where(d.offers, {validated: true}), function(o) {
				return o.userId;
			});
			//console.log(notedUsersIds);
			var notedUsers = UsersDatas.find({userId: {$in: notedUsersIds}}, {fields: {notes: 1}}).fetch();
			var ok = true;
			_.each(notedUsers, function(u) {
				if (!_.findWhere(u.notes, {advertId: t.data._id}))
					ok = false;
			});
			if (ok)
				Modal.show('makePaymentModal', t.data)
			else
				Modal.show('shouldNote');
		}
	},
	'click #btnPayFake': function(e,t) {
		Meteor.call('fakePayment', {advertId: t.data._id}); // fake payment for testing
	},
	'click .postSimilarAdvert': function(e,t) { // fill post form for a similar advert
		e.preventDefault();
		Router.go('poster', {}, {query: 'like='+t.data._id});
	}
});

Template.makeOfferModal.onCreated(function(){
	// create distance object to calculate distance between job & jobber
	Maps.create({type: 'distance'});
});

Template.makeOfferModal.events({
	'click #btnPosterOffreGo': function(e,t) {
		if (t.data.current) {
			Meteor.call('updateOffer', {
				advert: t.data._id,
				offer: {
					_id: t.data.current._id,
					comment: document.getElementById('make-offer-comment').value,
					price: (t.data.negocible)? parseInt(document.getElementById('make-offer-price').value) : t.data.budget
				}
			}, function(e,r) {
				Modal.allowMultiple = true;
				if (e)
					Modal.show('serverErrorModal', e);
				else {
					Modal.hide('updateOffer');
					Modal.show('modalSuccess', {message: "L'offre a bien ete editee"});
				}
			});
		} else {
			var d = UsersDatas.findOne({userId: Meteor.userId()});
			if (d) {
				if (d.profileComplete) {
					var m1 = d.notificationMail;
					//console.log(m1);
					if (m1 && _.contains(m1, 1)){
								//console.log('jonas');
								var data = Meteor.call('sendEmailNoreply','Bonjour, Merci pour l offre ','OFFRE',Meteor.user().emails[0].address,
									function(error, result){					
										 if(error){
											alert('Error'+error);
										 }else{
											return result;
										 }
									});
					}
					var distance = 0;
					Maps.onLoad(function() { // ensure Maps api loaded
						Maps.distance.getDistanceMatrix({ // calculate distance
							origins: [d.address.street +' '+d.address.zipcode+' '+d.address.city],
							destinations: [t.data.address.street+' '+t.data.address.zipcode+' '+t.data.address.city],
							travelMode: 'DRIVING'
						}, function(r,s) {
							if (s == 'OK') {
								distance = r.rows[0].elements[0].distance;
								if(distance==undefined){
									//console.log("fffrrr");
									distance = { "value": 1,"text": "0 mi"};}
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
							}else {
									Modal.allowMultiple = true;
									Modal.show('errorModal', ctx.getErrorObject());
								}
						});
					});
				}else {
					
					
									Modal.allowMultiple = true;
									Modal.show('errorModal', "PRofil pas a jour");
									//Modal.show('errorModal', ctx.getErrorObject());
								};
			}
		}
	}
});
