requirejs.config({
    paths: {
        "jquery": "js/jquery.min",
        "bootstrap": "js/bootstrap.min",
        "pace": "js/pace.min"
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
require(["jquery", "bootstrap", "pace"], function ($) {
	 $('img').addClass('img-responsive center-block').css({
	   'cursor': "pointer"
	 });
	 $('img').click(function() {
	   var $img = $(this);
	   $('#imagepreview').attr('src', $img.attr('src'));
	   $('#imagemodal').modal('show');
	 });
	 if ($("#back-to-top").length) {
	   var scrollTrigger = 100,
		 backToTop = function() {
		   var o = $(window).scrollTop();
		   o > scrollTrigger ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
		 };
	   backToTop(), $(window).on("scroll", function() {
		 backToTop()
	   }), $("#back-to-top").on("click", function(o) {
		 o.preventDefault(), $("html,body").animate({
		   scrollTop: 0
		 }, 700)
	   })
	 }
});