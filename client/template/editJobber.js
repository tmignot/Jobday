Template.editJobber.onCreated(function() {
  this.currentFile = new ReactiveVar(false);
	this.compressing = new ReactiveVar(false);
	this.uploadingGrade = new ReactiveVar(false);
	this.uploadingLicense = new ReactiveVar(false);
	Maps.create({type: 'geocoder'});
	Session.set('userType', 'individual');
	Session.set('gender', 'female');
	Session.set('addressStatus', false);
	if (this.data) {
		Session.set('userType', this.data.userType);
		Session.set('gender', this.data.gender == 1? 'male':'female');
	}
});

/*
** onRendered: fill select & checkbox inputs with known datas
*/
Template.editJobber.onRendered(function() {
	window.scrollTo(0,0);
	var gender = Session.get('gender');
	var genderSelect = $('select[name="user-gender-select"]');
	genderSelect.val(gender);
	var userType = Session.get('userType');
	var userTypeSelect = $('input[name="user-type-select"]');
	userTypeSelect.val(userType);
	if ($('input.user-address-street')[0]) {
		Maps.create({
			type: 'autocomplete',
			doc: $('input.user-address-street')[0],
			params: {
				componentRestrictions: {country: 'fr'}
			},
			listeners: {
				place_changed: function() {
					var p = Maps.places.autocomplete.getPlace();
					for (var i = 0; i < p.address_components.length; i++) {
						var addressType = p.address_components[i].types[0];
						var val = p.address_components[i].long_name;
						//console.log(addressType, val);
						var s,z,c;
						switch(addressType) {
							case 'street_number': s = s?val+' '+s:val; break;
							case 'route': s = s?s+' '+val:val; break;
							case 'postal_code': z = val; break;
							case 'locality': c = val; break;
							default: break;
						}
						$('input.user-address-street').val(s);
						$('input.user-address-zipcode').val(z);
						$('input.user-address-city').val(c);
					}
				}
			}
		});
	}
});

Template.editJobber.helpers({
	runHelp: function() { // dummy helper just to be rerun on subTemplate rendering
		var data = Template.instance().data;
		if (data) {
			Session.set('userType', data.userType);
			Session.set('gender', data.gender == 1? 'male':'female');
		}
	},
	tab: function() {
		var params = Router.current().params;
		if (params && params.query && params.query.tab)
			return params.query.tab;
	},
	active: function(w) { // tab handler
												// I don't think its used anymore
		var params = Router.current().params;
		if (params && params.query && params.query.tab)
			return (params.query.tab == w)? 'active': undefined;
	},
	inactive: function(w) { // tab button state handler
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(w) {
				//JME case 'next': return params.query.tab == 'badges' ? 'inactive':'';
				case 'next': return params.query.tab == 'notificationParam' ? 'inactive':'';
				default: return '';
			}
		}
	},
	userHasNotificationParamMail: function(id) {
		if (!Template.instance().data)
			return 
		var m = Template.instance().data.notificationMail;
		//console.log(m);
		if (m && _.contains(m, id)){
			return 'notificationParamMail-got';
	}else{
		return 'notificationParamMail-not-got';
	}
	},
	userHasNotificationParamPhone: function(id) {
		if (!Template.instance().data)
			return
		var m = Template.instance().data.notificationParamPhoneValue;
		if (m && _.contains(m, id))
			return 'notificationParamPhone-got';
	},
	userHasMean: function(id) {
		if (!Template.instance().data)
			return
		var m = Template.instance().data.means;
		if (m && _.contains(m, id))
			return 'mean-got';
	},
	userHasPermis: function(id) {
		if (!Template.instance().data)
			return
		var p = Template.instance().data.permis;
		if (p && _.contains(p, id))
			return 'permis-got';
	},
	userHasSkill: function(id) {
		if (!Template.instance().data)
			return
		var p = Template.instance().data.skills;
		if (p && p[id])
			return 'skill-got';
	},
	userHasBadge: function(id) {
		if (!Template.instance().data)
			return
		var p = Template.instance().data.badges;
		if (p && _.findWhere(p, {badgeId: id}))
			return 'badge-got';
	},
	dateValue: function(d) {
		return d ? moment(d).format('Y-MM-DD'): undefined;
	},
	currentFile: function() {
		return Template.instance().currentFile.get();
	},
	compressing: function() {
		return Template.instance().compressing.get();
	},
	uploadingGrade: function() {
		return Template.instance().uploadingGrade.get();
	},
	uploadingLicense: function() {
		return Template.instance().uploadingLicense.get();
	}
});

Template.editJobber.events({
	'click #btnCodeVerifPhone': function(e,t) {
		//alert($(e.currentTarget).data('which'));
		if($(e.currentTarget).data('which')=="telephone"){
			//alert(document.getElementById("codeVerifPhone").value + ": "+t.data.verifPhone);
			
		if (document.getElementById("codeVerifPhone").value == t.data.verifPhone ){
		UsersDatas.update(
     { _id: t.data._id },
     { $push: { 
				badges: {
					giver: t.data._id,
					badgeId: Badges.findOne({"name":"telephone"})._id
						} 
			} 
	 },  function(err, res) {
				if (err) {
				
				} else {
			Modal.show('modalSuccess', {message: 'Badges Téléphone dévérouiller '});
			}
		}
	 );
	 
				
	}	;
		}
		
		
	},
	'click .center-block': function(e,t) {
		//alert($(e.currentTarget).data('which'));
		if($(e.currentTarget).data('which')=="telephone"){
		Meteor.call('sendAenvoyer', Meteor.userId(),"0"," ", function(err, res) {
				if (err) {
				console.log(err);
				} else {
				Modal.show('modalSuccess', {message: 'Un sms vous seras envoyé pour dévérouiller votre téléphone  entre 8h et 20H de Lundi à Samedi.'});
				
			
			
			}
		});
		}
		if($(e.currentTarget).data('which')=="Mail"){
		Meteor.call('verifEmail',  function(err, res) {
				if (err) {
				
				} else {
			
			}
		});
		}
		
	},
	'change select[name="user-type-select"]': function(e,t) {
		console.log('changed');
		Session.set('userType', e.currentTarget.value);
	},
	'click .previous-button': function() {
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(params.query.tab) {
				case 'info' : Router.go('/profiluser/'+Meteor.userId()); break;
				case 'skills': UrlQuery({tab: 'info'}); break;
				case 'badges': UrlQuery({tab: 'skills'}); break;
				case 'notificationParam': UrlQuery({tab: 'badges'}); break;
				default: return;
			}
		}
	},
	'click .next-button': function() {
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(params.query.tab) {
				case 'info': UrlQuery({tab: 'skills'}); break;
				case 'skills': UrlQuery({tab: 'badges'}); break;
				case 'badges': UrlQuery({tab: 'notificationParam'}); break;
				default: return;
			}
		}
	},
	'click .user-photo .orange': function() {
		$('#fileInput').click();
	},
	/*
	'change .user-address input': function(e,t) {
		var s = t.find('.user-address-street').value,
				z = t.find('.user-address-zipcode').value,
				c = t.find('.user-address-city').value;
		if (s == '' || z == '' || c == '') {
			Session.set('addressStatus', 'ZERO_RESULT');
			return;
		}
		// check address with geocoder
		Maps.onLoad(function() { // ensure Maps is loaded with a callback;
			Maps.geocoder.geocode({
				address: s + ' ' + z + ' ' + c,
				componentRestrictions: {
					country: 'FR'
				}
			}, function(res, stat) {
				Session.set('addressStatus', stat);
			});
		});
	},
	*/
  'change #fileInput': function (e, t) {
		UploadImage({
			name: 'pic.jpg',
			doc: e.currentTarget,
			maxWidth: 1024,
			maxHeight: 1024,
			onBeforeCompress: function() {
				t.compressing.set(true);
			},
			onStartUpload: function() {
				t.compressing.set(false); 
				t.currentFile.set(this);
			},
			onEndUpload: function(error, file) {
				t.currentFile.set(false);
			},
			onAfterUpload: function(error, file) {
				var cur = t.data.photo.match(/([^\/]*)\.png$/);
				if (cur)
					Images.remove({_id: cur[1]})
				UsersDatas.update({_id: t.data._id}, {
					$set: {photo: Images.link(file)}
				});
			}
		});
  },
	'click .user-notificationMail': function(e,t) { // add the notification that was clicked
		var user = {_id: t.data._id};
		var index = parseInt($(e.currentTarget).data('which'));
		
	//console.log(index);
		if (_.contains(t.data.notificationMail, index))
			UsersDatas.update(user, {$pull: {notificationMail: index}});
		else
			UsersDatas.update(user, {$push: {notificationMail: index}});
	},
	'click .user-skill': function(e,t) { // add the skill that was clicked
		var user = {_id: t.data._id};
		var index = parseInt($(e.currentTarget).data('which'));
		Modal.show('subcategoriesModal', {user: user, index: index});
		/*
		if (_.contains(t.data.skills, index))
			UsersDatas.update(user, {$pull: {skills: index}});
		else
			UsersDatas.update(user, {$push: {skills: index}});
		*/
	},
	'click .user-mean': function(e,t) { // add the mean that was clicked
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		if (_.contains(t.data.means, index))
			UsersDatas.update(user, {$pull: {means: index}});
		else
			UsersDatas.update(user, {$push: {means: index}});
	},
	'click .user-permi': function(e,t) { // add the permis that was clicked
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		if (_.contains(t.data.permis, index))
			UsersDatas.update(user, {$pull: {permis: index}});
		else
			UsersDatas.update(user, {$push: {permis: index}});
	},
	'click .grade': function(e,t) {
		if (!$(e.currentTarget).data('validated')) {
			var src = $(e.currentTarget).data('img');
			Modal.show('imageModal', {src: src});
		}
	},
	'click .user-grades .delete-icon': function(e,t) { // removes the grade that was clicked
		e.stopPropagation();
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		var grades = _.filter(t.data.grades, function(g) {
			return g.index !== index;
		});
		UsersDatas.update(user, {$set: {grades: grades}});
	},
	'click .sendLicense': function(e,t) {
		Modal.allowMultiple = true;
		var user = t.data.userId;
		UploadImage({ //See client/helpers.js for a better looking of this function
			doc: $('#licenseInput')[0],
			name: user + '_license_' + Date.now(),
			maxWidth: 300,
			maxHeight: 300,
			onBeforeCompress: function() {t.uploadingLicense.set(true);},
			onAfterUpload: function(error, file) {
				if (!error) {
					var license = Images.link(file);
					Meteor.call('sendEvent', {
						userEmitter: user,
						type: 'ask_license_validation',
						data: {
							license: license
						}
					}, function (e,r) {
						if (e) { Modal.show('serverErrorModal', e);	} 
						else {
							Modal.show('modalSuccess', {
								message: 'Vos documents ont bien etes telecharge, nous allons traiter votre demande'
							});
						}
					});
				} else
					Modal.show('errorModal', {invalidKeys: [{message: error.message}]});
				t.uploadingLicense.set(false);
			}
		});
	},
	'click .add-grade .blue': function(e,t) { // add a grade from grades form
		var user = {_id: t.data._id};
		var new_grade = {
			name: $('.add-grade-name').val(),
			date: new Date($('.add-grade-date').val())
		};
		UploadImage({ //See client/helpers.js for a better looking of this function
			doc: $('.add-grade input[type=file]')[0],
			name: user._id + new_grade.name + Date.now(),
			maxWidth: 300,
			maxHeight: 300,
			onBeforeCompress: function() { t.uploadingGrade.set(true); },
			onAfterUpload: function(error, file) {
				if (!error) {
					new_grade.image = Images.link(file);
					UsersDatas.update(user, {$push: {grades: new_grade}});
				} else
					Modal.show('errorModal', {invalidKeys: [{message: error.message}]});
				t.uploadingGrade.set(false);
			}
		});
	},
	'click .submit-button': function(e,t) { // saves user infos
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			if (params.query.tab == 'info') {
				var data;
				if (Session.get('userType') == 'society') {
					data = {
						userId: t.data.userId,
						userType: 'society',
						name: $('.user-name input').val(),
						siret: $('.user-siret input').val(),
						address: {
							street: $('.user-address-street').val(),
							zipcode: $('.user-address-zipcode').val(),
							city: $('.user-address-city').val()
						},
						phone: $('.user-phone input').val()
					};
				} else if (Session.get('userType') == 'professional'){
					data = {
						userId: t.data.userId,
						userType: 'professional',
						name: $('.user-name input').val(),
						firstname: $('.user-firstname input').val(),
						gender: $('select[name="user-gender-select"]').val() == 'male'? 1:2,
						siret: $('.user-siret input').val(),
						phone: $('.user-phone input').val(),
						address: {
							street: $('.user-address-street').val(),
							zipcode: $('.user-address-zipcode').val(),
							city: $('.user-address-city').val()
						},
					};
				} else if (Session.get('userType') == 'individual') {
					data = {
						userId: t.data.userId,
						userType: 'individual',
						name: $('.user-name input').val(),
						firstname: $('.user-firstname input').val(),
						gender: $('select[name="user-gender-select"]').val() == 'male'? 1:2,
						phone: $('.user-phone input').val(),
						address: {
							street: $('.user-address-street').val(),
							zipcode: $('.user-address-zipcode').val(),
							city: $('.user-address-city').val()
						},
					};
				}
				if ($('.user-birthdate input').val()){}else{
                     if ( Session.get('isSociety') != true){
				Modal.show('modalSuccess', {message: 'La date de naissance est obligatoire'});}
				}
				if ($('.user-birthdate input').val())
					data.birthdate = new Date($('.user-birthdate input').val()),
				data.presentation = $('.user-presentation textarea').val();
				data.experiences = $('.user-experiences textarea').val();
				data.precisions = $('.user-precisions textarea').val();
				data.iban = $('.user-iban input').val();
				data.bic = $('.user-bic input').val();
				if (data.address && Session.equals('addressStatus','OK'))
					data.address.geocoded = true;
				
				var cleanData = _.extend({}, data);
				UserDataSchema.clean(cleanData);
				var ctx = UserDataSchema.newContext();
				ctx.validate(cleanData);
				if (ctx.invalidKeys().length) { // if data not valid, show errorModal
					Modal.show('errorModal', ctx.getErrorObject());
				} else {
					UsersDatas.update({_id: t.data._id}, {$set: data}, function() {
						Modal.show('modalSuccess', {message: 'Vos informations ont bien ete mises a jour'});
					});
				}
			}
		}
	}
});
