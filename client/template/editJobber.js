Template.editJobber.onCreated(function() {
  this.currentFile = new ReactiveVar(false);
	this.compressing = new ReactiveVar(false);
	this.uploadingGrade = new ReactiveVar(false);
	Maps.create({type: 'geocoder'});
	Session.set('isSociety', false);
	Session.set('gender', 'female');
	Session.set('addressStatus', false);
	if (this.data) {
		Session.set('isSociety', this.data.society);
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
	var society = Session.get('isSociety');
	var societyInput = $('input[name="user-society-input"][value="'+society+'"]');
	societyInput.prop('checked', true);
});

Template.editJobber.helpers({
	runHelp: function() { // dummy helper just to be rerun on subTemplate rendering
		var data = Template.instance().data;
		if (data) {
			Session.set('isSociety', data.society);
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
				case 'next': return params.query.tab == 'badges' ? 'inactive':'';
				default: return '';
			}
		}
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
		if (p && _.contains(p, id))
			return 'skill-got';
	},
	userHasBadge: function(id) {
		if (!Template.instance().data)
			return
		var p = Template.instance().data.badges;
		if (p && _.contains(p, id))
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
	}
});

Template.editJobber.events({
	'change input[name="user-society-input"]': function(e,t) {
		Session.set('isSociety', e.currentTarget.value == 'true');
	},
	'click .previous-button': function() {
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(params.query.tab) {
				case 'info' : Router.go('/profiluser/'+Meteor.userId()); break;
				case 'skills': UrlQuery({tab: 'info'}); break;
				case 'badges': UrlQuery({tab: 'skills'}); break;
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
				default: return;
			}
		}
	},
	'click .user-photo .orange': function() {
		$('#fileInput').click();
	},
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
	'click .user-skill': function(e,t) { // add the skill that was clicked
		var user = {_id: t.data._id};
		var index = parseInt($(e.currentTarget).data('which'));
		if (_.contains(t.data.skills, index))
			UsersDatas.update(user, {$pull: {skills: index}});
		else
			UsersDatas.update(user, {$push: {skills: index}});
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
	'click .user-grades .delete-icon': function(e,t) { // removes the grade that was clicked
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		var grades = _.filter(t.data.grades, function(g) {
			return g.index !== index;
		});
		UsersDatas.update(user, {$set: {grades: grades}});
	},
	'click .add-grade .blue': function(e,t) { // add a grade from grades form
		var user = {_id: t.data._id};
		var new_grade = {
			name: $('.add-grade-name').val(),
			date: new Date($('.add-grade-date').val())
		};
		UploadImage({
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
				if (Session.get('isSociety') == true) {
					data = {
						userId: Meteor.userId(),
						society: true,
						name: $('.user-name input').val(),
						siret: $('.user-siret input').val(),
						address: {
							street: $('.user-address-street').val(),
							zipcode: $('.user-address-zipcode').val(),
							city: $('.user-address-city').val()
						},
						phone: $('.user-phone input').val()
					};
				} else {
					data = {
						userId: Meteor.userId(),
						society: false,
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
