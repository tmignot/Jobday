Template.carousel.onRendered(function() {
	//initialize carousel
	$("#owl").owlCarousel({
		navigation: true,
		items: 1,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		loop: true
	});
});

Template.carousel.onDestroyed(function() {
	//destroy carousel
	$('#owl').data('owlCarousel').destroy();
});
