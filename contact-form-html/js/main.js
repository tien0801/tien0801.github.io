(function($) {
  'use strict';    
    /*=====================================
        Preloader JS
    ======================================*/
        var prealoaderOption = $(window);
        prealoaderOption.on("load", function () {
            var preloader = jQuery('.spinner');
            var preloaderArea = jQuery('.preloader-area');
            preloader.fadeOut();
            preloaderArea.delay(350).fadeOut('slow');
        });
    /*=====================================
        Preloader JS
    ======================================*/
    /*=====================================
        sticky header JS
    ======================================*/
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();
            if (scroll < 100) {
                $("#header-area").removeClass("sticky");
            } else {
                $("#header-area").addClass("sticky");
            }
        });
    /*=====================================
                sticky header JS
    ======================================*/
    /*====================================
        page scroll JS
    ======================================*/
        $("a.page-scroll").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                //console.log($(hash).offset().top - topOffset);
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - $("header").outerHeight() + "px"
                }, 1200, function () {

                    //window.location.hash = hash;
                });
            } // End if
        });
    /*=====================
        page scroll JS
    =======================*/
    /*======================================
        slick slider js
    ======================================*/
        $(".regular").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            infinite: true,
            slidesToShow:1,
            speed: 400,
            slidesToScroll: 1
        });
        $(".responsive").slick({
            dots: false,
            arrows: false,
            autoplay: true,
            infinite: true,
            slidesToShow:1,
            speed: 400,
            slidesToScroll: 1
        });
        $('.autoplay').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 200,
            responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            ]
        });
    /*======================================
                slick slider js
    ======================================*/

    /*=====================================
        isotope js
    ======================================*/
        $('#portfolio').imagesLoaded( function() {
            // init Isotope
            var $grid = $('.protfolio-list').isotope({
                itemSelector: '.single-item',
                layoutMode: 'fitRows'
            });
            // bind filter button click
            $('#filters').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({filter: filterValue});
            });
            $('.button-group').each(function (i, buttonGroup) {
                var $buttonGroup = $(buttonGroup);
                $buttonGroup.on('click', 'button', function () {
                    $buttonGroup.find('.is-checked').removeClass('is-checked');
                    $(this).addClass('is-checked');
                });
            });
        });
    /*======================================
                  isotope js
    ======================================*/
    /*=====================================
            counterup JS
    ======================================*/
        $('.counter').counterUp({
            delay: 60,
            time: 8000
        });
    /*=====================================
            counterup JS
    ======================================*/
    /*=====================================
                  magnific-Popup js
    ======================================*/
        $('.portfolio-single').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
        $('.video-play').magnificPopup({
            type: 'iframe',
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    /*=====================================
        magnific-Popup js
    ======================================*/
    /*=====================================
        Wow JS
     ======================================*/
        new WOW().init();
    /*=====================================
                    Wow JS
    ======================================*/
    /*=====================================
        form validation JS
    ======================================*/
        $("#commentForm").validate();
    /*=====================================
                form validation JS
    ======================================*/
    /*======================================
                    google map JS
    ======================================*/ 
        // $(document).ready(function(){
        //     var  map = new GMaps({
        //         el: '#map',
        //         lat: 24.363589,
        //         lng: 88.624135
        //     });
        //     map.addMarker({
        //         lat: 24.363589,
        //         lng: 88.624135,
        //         title: 'Marker with InfoWindow',
        //         infoWindow: {
        //           content: '<p>Rajshahi</p>'
        //         }
        //     });
        // });
    /*======================================  
                    google map JS
    ======================================*/
    /*=======================
        Scroll top js
    =========================*/
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('#scroll-up').fadeIn();
            } else {
                $('#scroll-up').fadeOut();
            }
        });
        $('#scroll-up').on('click', function() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    /*=======================
              Scroll top js
    =========================*/
	/*=======================
       Ajax contact form js
    =========================*/
	
	$("#contact-form").submit(function (event) {

        var successMail = '#success' ;
        var errorMail = '#error' ;

        event.preventDefault();



        var formData = $("#contact-form").serialize();

        $("#contact-form :input").prop("disabled", true);

        $.ajax({
            type: 'POST',
            url: $('#contact-form').attr('action'),
            data: formData
        })
            .done(function (response) {
                $(successMail).show();
                $(errorMail).hide();
                $('.contact-form input').val('');
                $('.contact-form textarea').val('');
                $("#contact-form :input").prop("disabled", false);
                console.log(response);
                $(successMail).text(response.success);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                var msg = JSON.parse(jqXHR.responseText) ;
                $(errorMail).show();
                $(successMail).hide();
                $("#contact-form :input").prop("disabled", false);
                $(errorMail).text(msg.error);
            });


        return false ;
    })

	
})(window.jQuery);   
	
	
 