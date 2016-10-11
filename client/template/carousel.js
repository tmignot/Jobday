Template.carousel.onRendered(function() {
	$("#owl").owlCarousel({
		navigation: true,
		items: 1,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 2000,
		loop: true
	});
});

Template.carousel.onDestroyed(function() {
	$('#owl').data('owlCarousel').destroy();
});
