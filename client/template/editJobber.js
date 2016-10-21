Template.editJobber.onCreated(function() {
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
	active: function(w) {
		var params = Router.current().params;
		if (params && params.query && params.query.tab)
			return (params.query.tab == w)? 'active': undefined;
	},
	inactive: function(w) {
		var params = Router.current().params;
		if (params && params.query && params.query.tab) {
			switch(w) {
				case 'previous': return params.query.tab == 'info' ? 'inactive':'';
				case 'next': return params.query.tab == 'badges' ? 'inactive':'';
				default: return '';
			}
		}
	},
	userHasMean: function(id) {
		var m = Template.instance().data.means;
		if (m && _.contains(m, id))
			return 'mean-got';
	},
	userHasPermis: function(id) {
		var p = Template.instance().data.permis;
		if (p && _.contains(p, id))
			return 'permis-got';
	},
	dateValue: function(d) {
		return moment(d).format('Y-MM-DD');
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
	}
});
