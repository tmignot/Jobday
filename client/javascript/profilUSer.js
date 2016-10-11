Template.dashboardJobber.onRendered(function() {
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250,
		dayClick: function(date) {
			console.log(new Date(date));
			Session.set('dispoday', new Date(date));
			$('#editDisponibilities').modal('show');
		}
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
	},
	userHasMean: function(id) {
		var u = Meteor.user();
		var m = UsersDatas.findOne({userId: u._id}).means;
		if (m && _.contains(m, id))
			return true;
		return false;
	},
	userHasPermis: function(id) {
		var u = Meteor.user();
		var p = UsersDatas.findOne({userId: u._id}).permis;
		if (p && _.contains(p, id))
			return true;
		return false;
	}
});
