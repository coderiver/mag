head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	// function scrollFixedElements() {
	//     var scroll_left = $(this).scrollLeft();
	//     $(".fixed-element").css({
	//         left: -scroll_left
	//     });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//     scrollFixedElements()
	// });

	$('.js-popup').click(function(event) {
		event.preventDefault();
		$('.' + $(this).data('popup')).fadeIn();
		$('body').addClass('is-overflow');
	});

	$('.js-close').click(function(e) {
		e.preventDefault();
		$(this).parents('.popup').fadeOut();
		$('body').removeClass('is-overflow');
	});

	// // zoom
	// $('.js-zoom').elevateZoom({
	// 	zoomWindowFadeIn: 400,
	// 	zoomWindowFadeOut: 400,
	// 	zoomWindowWidth: 300,
	// 	zoomWindowHeight: 300,
	// 	zoomWindowOffetx: 10,
	// 	borderSize: 1,
	// 	lensSize: 200,
	// 	zoomWindowPosition: 14
	// });

});