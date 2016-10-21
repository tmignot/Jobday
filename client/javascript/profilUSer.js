Template.dashboardJobber.onRendered(function() {
	Session.set('dispoday', new Date());
	var u = this.data;
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250,
		displayEventTime: false,
		dayClick: function(date) {
			if (u.userId == Meteor.userId()) {
				Session.set('dispoday', new Date(date));
				$('#editDisponibilities').modal('show');
			}
		},
		eventSources: [ 
			{
				color: 'blue',
				textColor: 'white',
				events: function(s,e,t,c) {
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
		var a = Template.instance().data.address;
		if (a && a.city)
			return a.city;
		return 'Non renseigne';
	},
	grades: function() {
		var g = Template.instance().data.grades;
		if (g)
			return _.sortBy(g, 'date');
	},
	userHasMean: function(id) {
		var m = Template.instance().data.means;
		if (m && _.contains(m, id))
			return true;
		return false;
	},
	userHasPermis: function(id) {
		var p = Template.instance().data.permis;
		if (p && _.contains(p, id))
			return true;
		return false;
	}
});

Template.dashboardJobber.events({
	'click .edit-profil-button': function(e,t) {
		Router.go('editJobber', {id: Meteor.userId()}, {query: {tab: 'info'}});
	}
});
