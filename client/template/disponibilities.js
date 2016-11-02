/*
** Initiallizing empty disponibilities
*/
Template.disponibilities.onCreated(function() {
	this.dispo = {
		day: null,
		morning: false,
		afternoon: false,
		evening: false
	}
});

Template.disponibilities.helpers({
	whenChecked: function() { // pre-check disponibilities if date
														// already in DB
		var currentDay = Session.get('dispoday');
		var t = Template.instance();
		var userdata = Blaze._globalHelpers.userData();
		var date = _.find(userdata.disponibilities, function(disp) {
			if (disp.day && currentDay && disp.day.getTime() == currentDay.getTime())
				return disp;
		});
		_.each(['morning', 'afternoon', 'evening'], function(w) {
			$('.checkbox input[data-when="'+w+'"]').prop('checked', false);
		});
		if (date) {
			_.each(['morning', 'afternoon', 'evening'], function(w) {
				if (date[w]) {
					t.dispo[w] = true;
					$('.checkbox input[data-when="'+w+'"]').prop('checked', true);
				} else
					t.dispo[w] = false;
			});
		} else {
			t.dispo.morning = false;
			t.dispo.afternoon = false;
			t.dispo.evening = false;
		}
	}
});


Template.disponibilities.events({
	'change .checkbox input': function(e,t) { // update template.dispo on change
		tg = $(e.currentTarget);
		t.dispo[tg.data('when')] = tg.is(':checked');
	},
	'click button': function(e,t) { // save changes on submit
		t.dispo.day = Session.get('dispoday');
		var userdataId = UsersDatas.findOne({userId: Meteor.userId()})._id;
		UsersDatas.update({_id: userdataId}, { // remove the current day all the way
			$pull: {disponibilities: {day: t.dispo.day}},
		});
		if (t.dispo.morning || t.dispo.afternoon || t.dispo.evening) {
			UsersDatas.update({_id: userdataId}, { // re-insert it if not empty
				$push: {disponibilities: t.dispo}
			});
		}
		t.dispo = {day: t.dispo.day, morning: false, evening: false, afternoon: false}; // uncheck all for the next
		$('#dispo-calendar').fullCalendar('refetchEvents'); // refresh callendar
	}
});
