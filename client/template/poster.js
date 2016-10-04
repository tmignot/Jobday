Template.poster.onCreated(function() {
	Session.set('currentCategory', 0);
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
	}
});
