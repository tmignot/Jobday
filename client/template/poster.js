Template.poster.onCreated(function() {
	Session.set('currentCategory', 0);
	Session.set('choixDate', 0);
	Session.set('choixHoraire', 0);
});

Template.poster.helpers({
	categories: function() {
		return _.map(Categories, function(d,i) {
			return {
				index: i,
				name: d.name
			}
		});
	},
	subcategories: function() {
		var cat = Session.get('currentCategory');
		return _.map(Categories[cat].subcategories, function(d,i) {
			return {
				index: i,
				name: d
			}
		});
	}
});

Template.poster.events({
	'change #categorieID': function(e,t) {
		Session.set('currentCategory', e.currentTarget.value);
	},
	'change input[name="choixDate"]': function(e,t) {
		Session.set('choixDate', parseInt(e.currentTarget.value));
	},
	'change input[name="choixHoraire"]': function(e,t) {
		console.log(e.currentTarget);
		Session.set('choixHoraire', parseInt(e.currentTarget.value));
	}
});
