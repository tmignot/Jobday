Template.poster.onCreated(function() {
	// initialize session variables
	Session.set('currentCategory', 0);
	Session.set('choixDate', 0);
	Session.set('choixHoraire', 0);
	Session.set('addressStatus', false);
	// create geocoder from Maps api
	Maps.create({type: 'geocoder'});
});

Template.poster.onRendered(function() {
	// pre-fill firsts choices for each radios
	$('#choixHoraireAnnonce1').prop('checked', true);
	$('#choixAnnonceDate1').prop('checked', true);
	$('#TypeTarifAnnonce1').prop('checked', true);
});
	

Template.poster.helpers({
	categories: function() { // minifying categories for select
		return _.map(Categories, function(d,i) {
			return {
				index: i,
				name: d.name
			}
		});
	},
	subcategories: function() { // extending subcategories for select
		var cat = Session.get('currentCategory');
		return _.map(Categories[cat].subcategories, function(d,i) {
			return {
				index: i,
				name: d
			}
		});
	},
	infobulle: function() {
		return "Certaines missions concernent uniquement les travailleurs professionels independant.D'autres missions occasionnelles comme l'entraide peuvent s'effectuer entre particuliers";
	}
});

Template.poster.events({
	'change #nbPersonnePourAnnonce': function(e,t) {
		var n = numVal('nbPersonnePourAnnonce') * numVal('tarifAnnonce');
		if (n == n)
			$('#totalVal').html(n + ' Euros');
	},
	'change #tarifAnnonce': function(e,t) {
		var n = numVal('nbPersonnePourAnnonce') * numVal('tarifAnnonce');
		if (n == n)
			$('#totalVal').html(n + ' Euros');
	},
	'change #categorieID': function(e,t) {
		Session.set('currentCategory', e.currentTarget.value);
	},
	'change input[name="choixDate"]': function(e,t) {
		Session.set('choixDate', parseInt(e.currentTarget.value));
	},
	'change input[name="choixHoraire"]': function(e,t) {
		Session.set('choixHoraire', parseInt(e.currentTarget.value));
	},
	'change #address-inputs input': function(e,t) {
		var s = t.find('#adresseRueAnnonce').value,
				z = t.find('#adresseCodePostalAnnonce').value,
				c = t.find('#adresseVilleAnnonce').value;
		if (s == '' || z == '' || c == '') {
			Session.set('addressStatus', 'ZERO_RESULT');
			return;
		}
		Maps.onLoad(function() { // ensure maps api loaded;
			Maps.geocoder.geocode({
				address: s + ' ' + z + ' ' + c,
				componentRestrictions: {
					country: 'FR'
				}
			}, function(res, stat) {
				Session.set('addressStatus', stat); // sets the icon near address label
			});
		});
	},
	'click .submit-container button': function(e,t) {
		var values = getValues(); // get all values
		checkValues(values); // check and insert new advert
	}
});

// Some helper functions to retrieve input datas depending on data type
function numVal(id) {
	var elem = document.getElementById(id);
	if (!elem)
		console.log(id + ' was not found');
	return parseInt(elem.value);
}

function strVal(id) {
	var elem = document.getElementById(id);
	if (!elem)
		console.log(id + ' was not found');
	return elem.value;
}

function bVal(id) {
	var elem = document.getElementById(id);
	if (!elem)
		console.log(id + ' was not found');
	return $('#'+id).is(':checked');
}

function dateVal(id) {
	return new Date(strVal(id));
}

function getValues() {
	var wh = {};
	var whType = 0;
	// which "choixHoraire" is checked is saved as whType (workingHours.type)
	$('input[name="choixHoraire"]').each(function(i,e) {
		if ($(e).is(':checked'))
			whType = $(e).val();
	});
	if (whType == 5) { // date range
		var	from = strVal('choixHoraireAnnonceDeb').split(':');
		var	to = strVal('choixHoraireAnnonceFin').split(':');
		var wh = {
			type: whType,
			from: {
				hour: from[0],
				min: from[1]
			}
		};
		if (to.length == 2) { // ensure [to] input has been set
			wh.to = {
				hour: to[0],
				min: to[1]
			};
		}
	} else {
		var wh = { // not a date range so one of morning, afternoon, evening
			type: whType
		};
	}
	return {
		category: numVal('categorieID'),
		subcategory: numVal('ssCategorieID'),
		type: numVal('typeAnnonce'),
		title: strVal('titreAnnonce'),
		description: strVal('descriptionAnnonce'),
		precisions: strVal('precisionAnnonce'),
		address: {
			street: strVal('adresseRueAnnonce').replace(/\s+/g, ' ').trim(),
			zipcode: strVal('adresseCodePostalAnnonce'),
			city: strVal('adresseVilleAnnonce'),
			geocoded: Session.equals('addressStatus', 'OK') ? true : undefined
		},
		tools: bVal('outilsAdisposition'),
		clothes: bVal('vetementsADispositions'),
		needsVehicle: bVal('vehiculeNecessaire'),
		beforeDate: bVal('choixAnnonceDate2'),
		startDate: dateVal('AnnonceDate2'),
		endDate: bVal('choixAnnonceDate3') ? dateVal('AnnonceDate3') : undefined,
		workingHours: wh,
		budget: numVal('tarifAnnonce'),
		negocible: bVal('TypeTarifAnnonce2'),
		nbPeople: numVal('nbPersonnePourAnnonce')
	};
};

function checkValues(values) {
	var ctx = AdvertSchema.namedContext('advertForm');
	AdvertSchema.clean(values);
	ctx.validate(values);
	/*
	** hack around:
	** manually add invalid key. see editJobber for more info
	*/
	_.each(['city','zipcode','street'], function(e) {
		if (!values.address[e]) { 
			ctx.addInvalidKeys([{name: 'address.'+e , type: 'required'}]);
		}
	});
	if (ctx.isValid() && !ctx.invalidKeys().length) {
		Adverts.insert(values, function(err, res) {
			if (err)
				console.log(err)
			else
				Router.go('/missionProfil/'+res);
		});
	} else {
		Modal.show('errorModal', ctx.getErrorObject());
		return false;
	}
	return false;
};
