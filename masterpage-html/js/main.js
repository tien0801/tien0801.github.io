
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

if($('.slider-owl-2').length > 0) {
    $('.slider-owl-2').owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass:true,
        items: 4,
        dots: true,
        nav: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
               items: 1,
            },
            480 : {
                items: 1,
            },
            768 : {
                items: 1,
            },
            1200 : {
                items: 4,
            }
        }
    })
}
if($('.slider-owl-3').length > 0) {
    $('.slider-owl-3').owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass:true,
        items: 4,
        dots: true,
        nav: false,
        responsive : {
            // breakpoint from 0 up
            0 : {
               items: 1,
            },
            480 : {
                items: 1,
            },
            768 : {
                items: 2,
            },
            992 : {
                items: 2,
            },
            1200 : {
                items: 4,
            }
        }
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

    // Readmore section 4
    $('.btn-readmore').click(function() {
        $(this).closest('.section-4').toggleClass('show-all');
        // if($('.section-4').hasClass('show-full')) {
        //     $(this).text("TÌM HIỂU CHI TIẾT");
        // } else {
        //     $(this).text("THU GỌN");
        // }
    })
    
    // Btn copy code
    $('.btn-copycode').click(function() {
        copyText = $('body').find('.box-input-code input');
        copyText.select();
        document.execCommand("copy");
        $(this).text("Copy thành công");
        $(this).css('background-color', '#828282');
        $(this).css('color', '#fff');
    })

})

