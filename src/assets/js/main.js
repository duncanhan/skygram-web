	jQuery(document).ready(function($){
		"use strict";

		var demo1 = $("#tada-slider").slippry({
			speed: 1000,
			pager:false,
			captions:false
		});

		/* PRELOADER */
		jQuery("#preloader-container").delay(2000).fadeOut("slow");

		/* STICKY MENU */
		// var stickyTop = $('nav.menu-sticky').offset().top;
		$(window).scroll(function(){
			if ($(this).scrollTop() > 0) {
				$('nav').addClass('sticky');
			} else {
				$('nav').removeClass('sticky');
			}
		})

		/* BACK TO TOP */
		$(window).scroll(function(){
			if ($(this).scrollTop() > 50) {
				$('.backtotop').fadeIn('slow');
			} else {
				$('.backtotop').fadeOut('slow');
			}
		});
		$('.backtotop').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 500);
			return false;
		});

		$('.open-menu-responsive').click(function(){
			$('.menu-responsive').css('display','block');
			$('.close-menu-responsive').css('display','block');
			$('.open-menu-responsive').css('display','none');
			$('header').addClass('header-menu-open');
		});
		$('.close-menu-responsive').click(function(){
			$('.menu-responsive').css('display','none');
			$('.close-menu-responsive').css('display','none');
			$('.open-menu-responsive').css('display','block');
			$('header').removeClass('header-menu-open');
		});
	});