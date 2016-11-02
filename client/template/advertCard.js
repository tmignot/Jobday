Template.advertCard.helpers({
	getCat: function() { //returns [category][subcategory]
		var d = Template.instance().data;
		if (d) {
			var c = Categories[d.category].name,
					s = Categories[d.category].subcategories[d.subcategory];
			return '[' + c + '][' + s + ']';
		}
	}
});

Template.advertCard.events({
	'click .advertCard .advertCard-title': function(e,t) {
		var id = $(e.currentTarget).data('which');
		Router.go('missionProfil', {_id: id});
	}
});
