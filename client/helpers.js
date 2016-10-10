Template.registerHelper('userData', function() {
	return UsersDatas.findOne({userId: Meteor.userId()});
});
