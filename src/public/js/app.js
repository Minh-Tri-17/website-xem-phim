$(document).ready(() => {
	$("#hamburger-menu").click(() => {
		$("#hamburger-menu").toggleClass("active");
		$("#nav-menu").toggleClass("active");
	});

	// setting owl carousel

	let navText = [
		"<i class='bx bx-chevron-left'></i>",
		"<i class='bx bx-chevron-right'></i>",
	];

	$("#hero-carousel").owlCarousel({
		items: 1,
		dots: false,
		loop: true,
		nav: true,
		navText: navText,
		autoplay: true,
		autoplayHoverPause: true,
	});

	$("#top-movies-slide").owlCarousel({
		items: 2,
		dots: false,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		responsive: {
			500: {
				items: 3,
			},
			1280: {
				items: 4,
			},
			1600: {
				items: 6,
			},
		},
	});

	$(".movies-slide").owlCarousel({
		items: 2,
		dots: false,
		nav: true,
		navText: navText,
		margin: 15,
		responsive: {
			500: {
				items: 2,
			},
			1280: {
				items: 4,
			},
			1600: {
				items: 6,
			},
		},
	});

	$(".menu-dropdown").click(function() {
		$(".menu").removeClass("visible");
		$(this).children(".menu").toggleClass("visible");
		setTimeout(function() {
			$(".menu").removeClass("visible");
		}, 5000);
	});


	$(".on-top").click(() => {
		$("html, body").animate({ scrollTop: 0 }, 500);
	});

	var scrolltop = $(".on-top");
	$(window).scroll(function() {
		if ($(this).scrollTop() < 50) {
			scrolltop.addClass("hidden");
		} else {
			scrolltop.removeClass("hidden");
		}
	});
});

