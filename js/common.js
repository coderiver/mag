head.ready(function() {

	// popups
	var openedPopup = null;

	var showPopup = function(popup) {
		if ( openedPopup ) {
			hidePopup(openedPopup);
		}
		popup.fadeIn('fast');
		openedPopup = popup;
		$('body').addClass('is-overflow');
	};

	var hidePopup = function(popup) {
		popup.fadeOut('fast');
		openedPopup = null;
		$('body').removeClass('is-overflow');
	};

	$('[data-popup]').each(function(index, el) {
		var el = $(el);
		el.on('click', function(event) {
			event.preventDefault();
			var popup = $('.' + el.data('popup'));
			showPopup(popup);
		});
	});

	$('.js-close').on('click touchend', function(e) {
		e.preventDefault();
		var popup = $(this).parents('.popup');
		hidePopup(popup);
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

	// show tel number
	$('.js-show').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.tel__num').css('max-width', 'initial');
		$(this).hide();
	});

	// menu
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
			body = $('body');

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

	// form validation
	(function () {
		var popup  = $('.popup'),
			thanks = $('.js-thanks-popup');
		// welcome
		$.validate({
			form: '#popup-form',
			errorMessage: false,
			onSuccess: function() {
				post_data = {
					'name': $('#popup-form input[name=name]').val(),
					'surname': $('#popup-form input[name=surname]').val(),
					'tel': $('#popup-form input[name=tel]').val(),
					'email': $('#popup-form input[name=email]').val(),
					'comment': $('#popup-form input[name=comment]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {
						console.log('error');
					}
					else {
						// reset values in all input fields
						popup.fadeOut();
						thanks.fadeIn('fast');
						$('#popup-form').get(0).reset();
						setTimeout(function() {
							thanks.fadeOut('fast');
						}, 2000);
					}
				}, 'json');
			}
		});
		// footer
		$.validate({
			form : '#form-footer',
			errorMessage: false,
			onSuccess: function() {
				post_data = {
					'name': $('#form-footerinput[name=name]').val(),
					'surname': $('#form-footer input[name=surname]').val(),
					'tel': $('#form-footer input[name=tel]').val(),
					'email': $('#form-footer input[name=email]').val(),
					'comment': $('#form-footer input[name=comment]').val()
				};
				//Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {}
					else {
						popup.fadeOut();
						thanks.fadeIn('fast');
						$('#form-footer').get(0).reset();
						setTimeout(function() {
							thanks.fadeOut('fast');
						}, 2000);
					}
				}, 'json');
				return false;
			}
		});
	}());

	// animate to anchor link
	$('.js-link').click(function(e) {
		var headerHeight = $('.js-header').outerHeight();

		e.preventDefault();
		$(this).parent().siblings().children().removeClass('is-active');
		$(this).addClass('is-active');
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - headerHeight
		}, 500);
	});

});