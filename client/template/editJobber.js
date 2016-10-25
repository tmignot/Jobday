Template.editJobber.onCreated(function() {
  this.currentFile = new ReactiveVar(false);
	this.compressing = new ReactiveVar(false);
	Session.set('isSociety', false);
	Session.set('gender', 'female');
	if (this.data) {
		Session.set('isSociety', this.data.society);
		Session.set('gender', this.data.gender == 1? 'male':'female');
	}
});

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
	runHelp: function() {
		var data = Template.instance().data;
		if (data) {
			Session.set('isSociety', data.society);
			Session.set('gender', data.gender == 1? 'male':'female');
		}
	},
	active: function(w) {
		var params = Router.current().params;
		if (params && params.query && params.query.tab)
			return (params.query.tab == w)? 'active': undefined;
	},
	inactive: function(w) {
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(w) {
				case 'submit': return params.query.tab == 'info' ? '': 'inactive';
				case 'previous': return params.query.tab == 'info' ? 'inactive':'';
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
		return moment(d).format('Y-MM-DD');
	},
	currentFile: function() {
		return Template.instance().currentFile.get();
	},
	compressing: function() {
		return Template.instance().compressing.get();
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
  'change #fileInput': function (e, t) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
			var current_file = e.currentTarget.files[0];
			t.compressing.set(true);
			var reader = new FileReader();
			if (current_file.type.indexOf('image') == 0) {
				reader.onload = function (event) {
					var image = new Image();
					image.src = event.target.result;
					image.onload = function() {
						var maxWidth = 1024,
								maxHeight = 1024,
								imageWidth = image.width,
								imageHeight = image.height;

						if (imageWidth > imageHeight) {
							if (imageWidth > maxWidth) {
								imageHeight *= maxWidth / imageWidth;
								imageWidth = maxWidth;
							}
						}
						else {
							if (imageHeight > maxHeight) {
								imageWidth *= maxHeight / imageHeight;
								imageHeight = maxHeight;
							}
						}
						var canvas = document.createElement('canvas');
						canvas.width = imageWidth;
						canvas.height = imageHeight;
						image.width = imageWidth;
						image.height = imageHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
						t.compressing.set(false);
						var uploader = Images.insert({
							file: canvas.toDataURL(current_file.type),
							isBase64: true,
							fileName: 'pic.png'
						}, false);

						uploader.on('start', function () {
							t.currentFile.set(this);
						});
						uploader.on('end', function (error, fileObj) {
							t.currentFile.set(false);
						});
						uploader.on('progress', function(percent, file) {
						});
						uploader.on('uploaded', function (error, fileObj) {
							var cur = t.data.photo.match(/([^\/]*)\.png$/);
							if (cur) {
								Images.remove({_id: cur[1]})
							}
							UsersDatas.update({_id: t.data._id}, {
								$set: {photo: Images.link(fileObj)}
							});
						});
						uploader.on('error', function (error, fileObj) {
							alert('Error during upload: ' + error);
						});
						uploader.start();
					}
				}
				reader.readAsDataURL(current_file);
			}
    }
  },
	'click .user-skill': function(e,t) {
		var user = {_id: t.data._id};
		var index = parseInt($(e.currentTarget).data('which'));
		if (_.contains(t.data.skills, index))
			UsersDatas.update(user, {$pull: {skills: index}});
		else
			UsersDatas.update(user, {$push: {skills: index}});
	},
	'click .user-mean': function(e,t) {
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		if (_.contains(t.data.means, index))
			UsersDatas.update(user, {$pull: {means: index}});
		else
			UsersDatas.update(user, {$push: {means: index}});
	},
	'click .user-permi': function(e,t) {
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		if (_.contains(t.data.permis, index))
			UsersDatas.update(user, {$pull: {permis: index}});
		else
			UsersDatas.update(user, {$push: {permis: index}});
	},
	'click .user-grades .delete-icon': function(e,t) {
		var user = {_id: t.data._id};
		var index = $(e.currentTarget).data('which');
		var grades = _.filter(t.data.grades, function(g) {
			return g.index !== index;
		});
		UsersDatas.update(user, {$set: {grades: grades}});
	},
	'click .add-grade .blue': function(e,t) {
		var user = {_id: t.data._id};
		var new_grade = {
			name: $('.add-grade-name').val(),
			date: new Date($('.add-grade-date').val())
		};
		UsersDatas.update(user, {$push: {grades: new_grade}});
	},
	'click .submit-button': function(e,t) {
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
						birthdate: new Date($('.user-birthdate input').val()),
						gender: $('select[name="user-gender-select"]').val() == 'male'? 1:2,
						phone: $('.user-phone input').val()
					};
				}
				data.presentation = $('.user-presentation textarea').val();
				data.experiences = $('.user-experiences textarea').val();
				data.precisions = $('.user-precisions textarea').val();
				
				var cleanData = _.extend({}, data);
				UserDataSchema.clean(cleanData);
				var ctx = UserDataSchema.newContext();
				ctx.validate(cleanData);
				if (ctx.invalidKeys().length) {
				} else {
					console.log(data);
					UsersDatas.update({_id: t.data._id}, {$set: data});
				}
			}
		}
	}
});
