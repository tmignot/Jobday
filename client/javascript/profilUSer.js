Template.dashboardJobber.onRendered(function() {
	Session.set('dispoday', new Date());
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250,
		displayEventTime: false,
		dayClick: function(date) {
			Session.set('dispoday', new Date(date));
			$('#editDisponibilities').modal('show');
		},
		eventSources: [ 
			{
				color: 'blue',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({userId: Meteor.userId()});
					var disp = u.disponibilities;
					var events = _.map(_.where(disp, {morning: true}), function(d) {
						return {
							title: 'Matin',
							start: (new Date(d.day)).setHours(6),
							end: (new Date(d.day)).setHours(12)
						};
					});
					c(events);
				}
			},
			{
				color: 'orange',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({userId: Meteor.userId()});
					var disp = u.disponibilities;
					var events = _.map(_.where(disp, {afternoon: true}), function(d) {
						return {
							title: 'Apres-midi',
							start: (new Date(d.day)).setHours(12),
							end: (new Date(d.day)).setHours(18)
						};
					});
					c(events);
				}
			},
			{
				color: 'gray',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({userId: Meteor.userId()});
					var disp = u.disponibilities;
					var events = _.map(_.where(disp, {evening: true}), function(d) {
						return {
							title: 'Soir',
							start: (new Date(d.day)).setHours(18),
							end: (new Date(d.day)).setHours(23)
						};
					});
					c(events);
				}
			}
		]
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
