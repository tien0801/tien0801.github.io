$(document).ready(function() {
       
    if($('.js-home-slider').length >0) {
        $('.js-home-slider').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 0,
            responsiveClass:true,
            items: 3,
            dots: true,
            navText : ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
            rewindNav : true,
            nav: true,
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
    		    1200 : {
    		        items: 3,
    		    }
    		}
        })
    }


    // setTimeout(function(){
    //    $('.item-slider iframe').

    // }, 3000);
    /*var frame = jQuery('.item-slider iframe');
    var src = frame.attr('src');
    console.log(src);
    console.log(frame);

    setTimeout(function(){ 
        frame.attr('src', src+'?autoplay=1');
        // $('#ifrm').attr('src', "http://www.google.com")
    }, 500);*/

    if($('.home-slider-3').length >0) {
        $('.home-slider-3').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 0,
            responsiveClass:true,
            items: 1,
            dots: true,
            navText : ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
            rewindNav : true,
            nav: true,
        })
    }

    if($('.js-slider-stage').length >0) {
        $('.js-slider-stage').owlCarousel({
            loop: false,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 0,
            responsiveClass:true,
            items: 3,
            dots: false,
            navText : ["",""],
            rewindNav : true,
            nav: true,
            // center: true,
            stagePadding: 100,
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
                1200 : {
                    items: 2,
                }
            },
        }).on('changed.owl.carousel', stageSlider);
    }
    function stageSlider(slider) {
        console.log("change slider stage");
        var currentItem = slider.item.index;
        console.log(currentItem);
    }

    if($('.js-slider-center').length >0) {
        $('.js-slider-center').owlCarousel({
            loop: false,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 0,
            responsiveClass:true,
            items: 3,
            dots: false,
            navText : ["",""],
            rewindNav : true,
            nav: true,
            center: true,
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
                1200 : {
                    items: 2,
                }
            }
        });
    }
    if($('.js-slider-fade').length >0) {
        $('.js-slider-fade').owlCarousel({
            loop: false,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 0,
            responsiveClass:true,
            items: 3,
            dots: true,
            navText : ["<",">"],
            rewindNav : true,
            animateOut: 'fadeOut',
            nav: true,
            // center: true,
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
                1200 : {
                    items: 1,
                }
            }
        });
    }

});