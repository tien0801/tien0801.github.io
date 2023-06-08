// JS Rating Star
$('.kv-fa').on('change', function () {
    console.log('Rating selected: ' + $(this).val());
});

if ($('.kv-fa').length > 0) {
    $('.kv-fa').rating({
        theme: 'krajee-fa',
        filledStar: '<i class="fas fa-star"></i>',
        emptyStar: '<i class="fas fa-star star-none"></i>',
        // clearCaption: '<b>0</b> Trên 5',
        // starCaptions:{
        //     0.5: '<b>0.5</b> Trên 5',
        //     1: '<b>1</b> Trên 5',
        //     1.5: '<b>1.5</b> Trên 5',
        //     2: '<b>2</b> Trên 5',
        //     2.5: '<b>2.5</b> Trên 5',
        //     3: '<b>3</b> Trên 5',
        //     3.5: '<b>3.5</b> Trên 5',
        //     4: '<b>4</b> Trên 5',
        //     4.5: '<b>4.5</b> Trên 5',
        //     5: '<b>5</b> Trên 5'
        // }
    });
}
if ($('.kv-fa-rating').length > 0) {
    $('.kv-fa-rating').rating({
        theme: 'krajee-fa',
        filledStar: '<i class="fas fa-star"></i>',
        emptyStar: '<i class="far fa-star"></i>',
    });
}
$(".viewmore-rating").click(function () {
    $('html, body').animate({
        scrollTop: $(".box-product-rating").offset().top
    }, 800);
});

$('.js-btn-review').click(function () {
    $('.box-write-review').slideToggle();
})
$('.js-quick-reply').click(function () {
    $(this).closest('.content-comment').children('.quick-reply').slideDown();
})
$('.js-close-reply').click(function () {
    $(this).closest('.content-comment').children('.quick-reply').slideUp();
})


$(document).ready(function () {
    $('.js-input-check-tour').click(function () {
        if ($(this).is(":checked")) {
            $(this).parents('tr').addClass('active');
        } else {
            $(this).parents('tr').removeClass('active');
        }
    })

    // Slider SYNC
    $('.js-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // fade: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<span class="btn-arrow btn-prev"><i class="fas fa-chevron-left"></i></span>',
        nextArrow: '<span class="btn-arrow btn-next"><i class="fas fa-chevron-right"></i></span>',
        asNavFor: '.js-slider-nav',
    });

    $('.js-slider-nav').slick({
        slidesToShow: 6,
        // slidesToScroll: 1,
        asNavFor: '.js-slider-for',
        autoplay: true,
        dots: false,
        infinite: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    });

    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
    });

    $(".datepicker-modal").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        beforeShow: function (input, inst) {
            var rect = input.getBoundingClientRect();
            setTimeout(function () {
                inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
            }, 0);
        }
    });

    // Btn viewmore Room
    $('.btn-viewmore-room').click(function () {
        $(this).parent().toggleClass('show');
        $(this).parent().find('.content-viewmore').slideToggle();
    })

    // Js combo slider
    if ($('.js-tour-slider').length > 0) {
        $('.js-tour-slider').owlCarousel({
            loop: true,
            lazyLoad: true,
            margin: 10,
            responsiveClass: true,
            items: 4,
            dots: true,
            // navText: ["<span class='arrow-l'></span>", "<span class='arrow-r'></span>"],
            // rewindNav: true,
            nav: false,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                576: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        })
    }

});
