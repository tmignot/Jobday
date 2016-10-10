Template.dashboardJobber.onRendered(function() {
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250
	});
});

Template.dashboardJobber.helpers({
	userAddress: function() {
		var u = Meteor.user();
		if (u) {
			var d = UsersDatas.findOne({userId: u._id});
			if (d && d.address && d.address.city)
				return d.address.city;
		}
		return 'Non renseigne';
	},
	grades: function() {
		var u = Meteor.user();
		var g = UsersDatas.findOne({userId: u._id}).grades;
		if (g)
			return _.sortBy(g, 'date');
	}
});
