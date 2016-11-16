Template.dashboardJobber.onRendered(function() {
	Session.set('dispoday', new Date());
	var uid;
	if (this.data)
		uid = this.data._id;
	/*
	** initialize fullCalendar with 3 events sources
	** corresponding to morning, afternoon, evening
	** with their own color.
	** Additionally it hooks an function on dayClick
	** to show the editDisponibilities modal
	*/
	$('#dispo-calendar').fullCalendar({
		contentHeight: 250,
		displayEventTime: false,
		dayClick: function(date) {
			var u = UsersDatas.findOne({_id: uid});
			if (u.userId == Meteor.userId()) {
				Session.set('dispoday', new Date(date));
				$('#editDisponibilities').modal('show');
			}
		},
		eventSources: [ 
			{
				// morning
				color: 'blue',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
					var events = _.map(_.where(disp, {morning: true}), function(d) {
						return {
							title: 'Matin',
							//dummy start and end dates to garanty events order
							start: (new Date(d.day)).setHours(6),
							end: (new Date(d.day)).setHours(12)
						};
					});
					c(events);
				}
			},
			{
				//afternoon
				color: 'orange',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
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
				//evening
				color: 'gray',
				textColor: 'white',
				events: function(s,e,t,c) {
					var u = UsersDatas.findOne({_id: uid}),
							disp = [];
					if (u && u.disponibilities)
						disp = u.disponibilities
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
	userAddress: function() { // returns the user's hometown
		var a = Template.instance().data.address;
		if (a && a.city)
			return a.city;
		return 'Non renseigne';
	},
	grades: function() { // returns the user's grades sorted by date
		var g = Template.instance().data.grades;
		if (g)
			return _.sortBy(g, 'date');
	},
	userHasMean: function(id) { // returns true if user has mean [id]
		var m = Template.instance().data.means;
		if (m && _.contains(m, id))
			return true;
		return false;
	},
	userHasSkill: function(id) { // returns a class name if user has skill
															 // I don't really know why it's not the same as above
		if (!Template.instance().data)
			return
		var p = Template.instance().data.skills;
		if (p && _.contains(p, id))
			return 'skill-got';
	},
	userHasPermis: function(id) { // same as means for permis
		var p = Template.instance().data.permis;
		if (p && _.contains(p, id))
			return true;
		return false;
	},
	nbNote: function(i) {
		i = 4 - i;
		var n = Template.instance().data.notes;
		var min = i,
				max = (i+1);
		return _.select(n, function(e) {
			if ((max != 5 && e.note >= min && e.note < max) ||
					(max == 5 && e.note >= min))
				return e.note;
		}).length
	},
	notePercent: function(i) {
		i = 4 - i;
		var n = Template.instance().data.notes;
		var ni = _.where(n, {note: i}).length
		return ni/n.length * 100;
	},
	labelForProgress: function(i) {
		switch(i) {
			case 0: return 'Parfait';
			case 1: return 'Tres bien';
			case 2: return 'Bien';
			case 3: return 'Decevant';
			case 4: return 'A eviter';
			default: return;
		}
	},
	advertTitle: function(advertId) {
		return Adverts.findOne(advertId).title;
	}
});

Template.dashboardJobber.events({
	'click .edit-profil-button': function(e,t) { // routes to edit profile page, first tab
		Router.go('editJobber', {id: Meteor.userId()}, {query: {tab: 'info'}});
	},
	'click .user-disponibilities-container .orange.button': function(e,t) {
		Modal.show('dispoRangeModal');
	}
});
