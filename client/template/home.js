Template.home.events({
	'click .subscribe-button': function(e,t) {
		Newsletters.insert({ // add name, mail to Newsletter collection
			name: $('.news-name').val(),
			email: $('.news-mail').val()
		});
		$('.newsletter input').val('');
	},
	'click .category-jobs.button': function() { Router.go('allCategories'); },
	'click .all-jobs.button': function() { Router.go('searchMission'); }
});
