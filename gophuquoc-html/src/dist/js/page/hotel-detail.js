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
    $(".slide-criteria").on("input change", function () {
        var val_slide = this.value;
        $(this).parent().find('.number').text(val_slide);
    });

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

    $('.js-slider-room-for').each(function (key, item) {
        var sliderIdName = 'slider' + key;
        var sliderNavIdName = 'sliderNav' + key;

        this.id = sliderIdName;
        $('.js-slider-room-nav')[key].id = sliderNavIdName;

        var sliderId = '#' + sliderIdName;
        var sliderNavId = '#' + sliderNavIdName;

        $(sliderId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: '<span class="btn-arrow btn-prev"><i class="fas fa-chevron-left"></i></span>',
            nextArrow: '<span class="btn-arrow btn-next"><i class="fas fa-chevron-right"></i></span>',
            asNavFor: sliderNavId
        });

        $(sliderNavId).slick({
            slidesToShow: 3,
            asNavFor: sliderId,
            autoplay: true,
            dots: false,
            centerPadding: '60px',
            arrows: false,
            infinite: false,
            focusOnSelect: true
        });
    });

    // Popup Combo
    $('.js-slider-combo-nav').slick({
        slidesToShow: 4,
        asNavFor: '.js-slider-combo-for',
        centerPadding: '30px',
        dots: false,
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
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
    $('.js-slider-combo-for').slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-slider-combo-nav',
        draggable: false,
    });
    $("#combo_modal").on('shown.bs.modal', function () {
        $('#combo_modal .js-slider-combo-for').slick('setPosition');
        $('#combo_modal .js-slider-combo-nav').slick('setPosition');
        $('.js-slider-combo-nav').slick('refresh');
    });


    // $('.datepicker').each(function (key, item) {
    //     var dateIdName = 'datepicker_0' + key;
    //     this.id = dateIdName;
    //     $('.datepicker')[key].id = dateIdName;
    //     var datepickerId = '#' + dateIdName;
    //     $(datepickerId).datepicker(
    //         {
    //             minDate: 0,
    //             dateFormat: "dd/mm/yy",
    //             beforeShow: function (input, inst) {
    //                 var rect = input.getBoundingClientRect();
    //                 setTimeout(function () {
    //                     inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
    //                 }, 0);
    //             }
    //         }
    //     );
    // })

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

    // js Cart fixed
    $('.js-choose-room').change(function () {
        $('.cart-fixed').addClass('show');
    })

    $('#close-cart-fixed').click(function () {
        $('.cart-fixed').removeClass('show');
    })

    // Btn viewmore Room
    $('.btn-viewmore-room').click(function () {
        $(this).parent().toggleClass('show');
        $(this).parent().find('.content-viewmore').slideToggle();
    })

    // Check Room Slider
    if ($('.js-check-room-slider').length > 0) {
        $('.js-check-room-slider').owlCarousel({
            loop: true,
            lazyLoad: true,
            margin: 12,
            responsiveClass: true,
            items: 4,
            dots: false,
            navText: ["<span class='arrow-l'></span>", "<span class='arrow-r'></span>"],
            rewindNav: true,
            nav: true,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                },
                576: {
                    items: 3,
                },
                768: {
                    items: 3,
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

// Datepicker Check Rooom
// var check_Device;
// var number_datepicker;
// $(window).on("load resize scroll", function (e) {
//     if ($(window).width() <= 767) {
//         check_Device = 'Mobile'
//         number_datepicker = 1;
//     } else {
//         check_Device = 'Desktop'
//         number_datepicker = 2;
//     }

//     console.log('number', number_datepicker);
// });

$(document).ready(function () {
    var number_datepicker;
    if ($(window).width() <= 991) {
        number_datepicker = 1;
    } else {
        number_datepicker = 2;
    }

    var events = [
        {
            Date: new Date("02/24/2023"),
            text: "Khuyến mãi giảm 10%",
            className: 'blue'
        },
        {
            Date: new Date("03/10/2023"),
            text: "Hết Phòng",
            className: 'red'
        },
        {
            Date: new Date("03/11/2023"),
            text: "Hết Phòng",
            className: 'red'
        },
        {
            Date: new Date("03/12/2023"),
            text: "Hết Phòng",
            className: 'red'
        },
        {
            Date: new Date("03/20/2023"),
            text: "Khuyến mãi 2",
            className: 'blue'
        },
    ]

    $("#datepicker-check-rooom").datepicker({
        // defaultDate: "02/28/2023",
        // changeMonth: true,
        // changeYear: true, 
        numberOfMonths: number_datepicker,
        onSelect: function (dateText, inst) { inst.show() },
        beforeShowDay: function (date) {
            var result = [true, "", null];
            var matching = $.grep(events, function (event) {
                return event.Date.valueOf() === date.valueOf();
            });
            if (matching.length) {
                result = [true, matching[0].className, matching[0].text];
            }
            return result;
        }
    });

    // $('#check_room_modal').modal('show');
    // $('#combo_modal').modal('show');
});
