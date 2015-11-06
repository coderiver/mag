head.ready(function() {

	$('.js-popup').click(function(event) {
		event.preventDefault();
		$('.' + $(this).data('popup')).fadeIn('fast');
		$('body').addClass('is-overflow');
	});

	$('.js-close').click(function(e) {
		e.preventDefault();
		$(this).parents('.popup').fadeOut('fast');
		$('body').removeClass('is-overflow');
	});

	// magnifier
	var evt = new Event(),
		m = new Magnifier(evt);

	m.attach({
		thumb: '.js-zoom',
		largeWrapper: 'preview',
		zoom: 2,
		zoomable: true
	});


	$('.js-show').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.tel__num').css('max-width', 'initial');
		$(this).hide();
	});

	$('.js-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
		$('.js-nav').toggleClass('is-active');
		if ($(window).width() < 700) {
			$('body').toggleClass('is-overflow');
		}
	});

	// scroll button 'book my visit'
	function buttonFixed() {
		var	win		  = $(window),
			button	   = $('.js-bookbtn'),
			buttonHeight = button.outerHeight(),
			scrollPos	 = win.scrollTop(),
			bottomPos	 = $('.js-bottom').offset().top,
			absolutePos  = $('.js-bottom').offset().top + $('.js-bottom').outerHeight() - buttonHeight;

		if ( scrollPos > 0 && scrollPos < bottomPos && win.width() > 900) {
			button.addClass('is-fixed').css('top', 'initial');
		} else if (scrollPos == 0 || win.width() < 900) {
			button.removeClass('is-fixed').css('top', 'initial');
		} else {
			button.removeClass('is-fixed').css('top', absolutePos);
		}
	}

	buttonFixed();

	// scroll and resize
	(function() {
		var win	= $(window),
			nav	= $('.js-nav'),
			button = $('.js-bookbtn'),
			body   = $('body');

		win.resize(function() {
			if (win.width() < 700 && nav.hasClass('is-active')) {
				body.addClass('is-overflow');
			} else {
				body.removeClass('is-overflow');
			}
			buttonFixed();
		});

		win.scroll(function() {
			buttonFixed();
		});
	})();

});