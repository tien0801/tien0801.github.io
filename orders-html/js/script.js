(function($){
	"use strict";
	$(document).ready(function(){
		$(".detailod-btn").on("click", function(){
			$(".sub-table").slideDown(300);
			$("html, body").animate({
				scrollTop: $(".sub-table").offset().top
			}, 300);
		});
	});
})(jQuery);