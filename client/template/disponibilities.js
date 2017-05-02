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

Template.dispoRangeModal.onCreated(function() {
	this.isAlwaysDisp = new ReactiveVar(this.data.alwaysDisponible);
});

Template.dispoRangeModal.onRendered(function() {
	$('.date-input').datetimepicker({
		format: 'DD/MM/YYYY',
		locale: 'fr'
	});
	$('.hour-input').datetimepicker({
		format: 'HH:mm',
		locale: 'fr'
	});
});

Template.dispoRangeModal.helpers({
	isAlwaysDisp: function() {
		return Template.instance().isAlwaysDisp.get();
	},
	rundatepicker: function() {
		$('.date-from').datetimepicker({
			widgetPositioning: {
				vertical: 'bottom'
			},
			widgetParent: $('.date-from-parent'),
			format: 'DD/MM/YYYY',
			locale: 'fr'
		});
		$('.hours-from').datetimepicker({
			widgetPositioning: {
				vertical: 'bottom'
			},
			widgetParent: $('.hours-from-parent'),
			format: 'HH:mm',
			locale: 'fr'
		});
		$('.date-to').datetimepicker({
			widgetPositioning: {
				vertical: 'bottom'
			},
			widgetParent: $('.date-to-parent'),
			format: 'DD/MM/YYYY',
			locale: 'fr'
		});
		$('.hours-to').datetimepicker({
			widgetPositioning: {
				vertical: 'bottom'
			},
			widgetParent: $('.hours-to-parent'),
			format: 'HH:mm',
			locale: 'fr'
		});
	}
});

Template.dispoRangeModal.events({
	'change #alwaysDisp': function(e,t) {
		t.isAlwaysDisp.set($(e.currentTarget).is(':checked'));
	},
	'click .validate': function(e,t) { // on validation
		var userDataId = t.data._id;
		if (t.isAlwaysDisp.get() === true) {
			UsersDatas.update({_id: userDataId}, {$set: {alwaysDisponible: true}});
		} else {
			UsersDatas.update({_id: userDataId}, {$set: {alwaysDisponible: false}});
			var hFrom = t.find('.hours-from').value, // we retrieve the form's values
					hTo = t.find('.hours-to').value,
					dFrom = t.find('.date-from').value.split('/').reverse().join('/'),
					dTo = t.find('.date-to').value.split('/').reverse().join('/');
			var isDisp = $('.dispo-range input[name=isDisp]:checked').val() == 'true';
			var day = new Date(dFrom);
			var days = moment(dTo).diff(dFrom, 'days');
			var duration = moment.duration(1, 'days');
			for (i=0; i<days; i++) { //for each day in the range chosen
				// logic
				UsersDatas.update({_id: userDataId}, {
					$pull: {disponibilities: {day: new Date(day)}} // removing the selected day
				});
				if (isDisp) { // if the user is disponible we re-insert the day with the proper values
					var disp = {morning: true, afternoon: true, evening: true};
					if (!i) {
						var hfh = parseInt(hFrom.split(':')[0]);
						if (hfh >= 12)
							disp.morning = false;
						if (hfh >= 18)
							disp.afternoon = false;
					} else if (i == days - 1) {
						var hth = parseInt(hTo.split(':')[0]);
						if (hth < 12)
							disp.afternoon = false;
						if (hth < 18)
							disp.evening = false;
					}
					disp.day = new Date(day);
					UsersDatas.update({_id: userDataId}, { // re-inserting here
						$push: {disponibilities: disp}
					});
				}
				// increment day in order to loop correctly
				day = moment(day).add(duration);
			}
		}
		$('#dispo-calendar').fullCalendar('refetchEvents'); // refresh callendar
	}
});
