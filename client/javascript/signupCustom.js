Template.signupCustom.onCreated(function() {
	Session.set('society', 'false');
});

Template.signupCustom.events({
	'change #societyInput': function(e,t) {
		Session.set('society', e.currentTarget.value);
	},
	'click #jobdaybtn': function(e,t) {
		console.log(getValues('jobday'));
		Meteor.call('addUser', getValues('jobday'));
	}
});

function getValues(method) {
	return {
		method: method,
		society: Session.equals('society', 'true'),
		name: $('#signupName').val(),
		firstname: $('#signupFirstname').val(),
		email: $('#signupEmail').val(),
		password: $('#signupPassword').val()
	}
}
