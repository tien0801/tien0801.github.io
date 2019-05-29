
if($('.home-slider').length > 0) {
    $('.home-slider').owlCarousel({
        loop: true,
        // autoplay: true,
        // autoplayTimeout: 4000,
        margin: 0,
        responsiveClass:true,
        items: 1,
        dots: true,
        navText : ["",""],
        rewindNav : true,
        nav: true,
    })
}

if($('.m-home-slider').length > 0) {

    $('.m-home-slider').owlCarousel({
        loop: true,
        // autoplay: true,
        // autoplayTimeout: 4000,
        margin: 0,
        responsiveClass:true,
        items: 1,
        dots: true,
        navText : ["",""],
        rewindNav : true,
        nav: true,
        
    })
}


$(document).ready(function(){
    // mmmenu
    $(window).bind("load resize", function(){
        if(jQuery(window).width()<=767){
            jQuery('nav#nav-mobile').mmenu({
                offCanvas: {
                    zposition : "front"
                }
            });
        }
    });

	// Menu fixed
	$(window).scroll(function() {
        if ($(document).scrollTop() > 100) {
            $('#menu-center').addClass('active');
        }
        else {
            $('#menu-center').removeClass('active');
        }
    });

    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('.menu-scroll a[href^="#"].link-scroll').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $("html, body").animate({ scrollTop: $target.offset().top - 50 });
       
    });

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('#menu-center a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('#menu-center ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}
    onScroll();

    // Click Menu mobile
    $('#menu li a').click(function(e) {
        // e.preventDefault();
        if($(this).hasClass('link-scroll')) {
            var API = $("#menu").data( "mmenu" );
            API.close();
        } else {
           
            var self = jQuery(this);
            var href = self.attr('href');
            e.preventDefault();
            window.location = href;
        }
    })


})

