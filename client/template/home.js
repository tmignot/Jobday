Template.home.events({
	'click .subscribe-button': function(e,t) {
		Newsletters.insert({
			name: $('.news-name').val(),
			email: $('.news-mail').val()
		});
		$('.newsletter input').val('');
	}
});
