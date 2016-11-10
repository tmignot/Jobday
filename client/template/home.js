Template.home.events({
	'click .subscribe-button': function(e,t) {
		Newsletters.insert({ // add name, mail to Newsletter collection
			name: $('.news-name').val(),
			email: $('.news-mail').val()
		});
		$('.newsletter input').val('');
	},
	'click .category-jobs.button': function() { Router.go('allCategories'); },
	'click .all-jobs.button': function() { Router.go('searchMission'); },
	'click .urgent-jobs.button': function() { 
		var hourAgo = new Date(moment().subtract(moment.duration(1, 'hour')));
		AdvertsPages.set({filters: {startDate: {$gte: hourAgo, $lte: new Date()}}});
		Router.go('searchMission');
	}
});
