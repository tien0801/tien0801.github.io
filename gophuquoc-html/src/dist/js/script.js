// Customize.js
/* Sticky Menu */
window.onscroll = function () { myFunction() };
var header = document.getElementById("sticky-top");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

let items = document.querySelectorAll('.vehicle .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

// window.addEventListener("scroll", reveal);

// New Js
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";
    $('.carousel-control-prev, .carousel-control-next').click(function () {
        var condition = $(this).hasClass("carousel-control-prev");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });
    ResCarouselSize();
    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1600) {
                incno = itemsSplit[4];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 575) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".carousel-control-prev").addClass("over");
            $(".carousel-control-next").removeClass("over");
        });
    }
    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.carousel-control-prev');
        var rightBtn = ('.carousel-control-next');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }
    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }
});

// JS Update
$(document).ready(function () {
    /* Heart Icon */
    $('.icon_heart_line').click(function () {
        console.log('dsfd.click');
        $(this).toggleClass('icon_heart_solid');
    })

    if ($('.js-vehicle-slider').length > 0) {
        $('.js-vehicle-slider').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            //autoplaySpeed: 2000,
            // nestedItemSelector: 'item-gall',
            lazyLoad: true,
            margin: 12,
            responsiveClass: true,
            items: 4,
            dots: true,
            navText: ["<span class='arrow-l'></span>", "<span class='arrow-r'></span>"],
            rewindNav: true,
            nav: true,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
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

    // Set min Datapicker
    var t_day = new Date();
    var val_today = t_day.getFullYear() + "-" + (t_day.getMonth() + 1) + "-" + t_day.getDate();
    $(".datepicker_min_today").attr('min', val_today);

    // Button Plus and Minus
    if ($('.t-box-quantity').length > 0) {
        $('.t-box-quantity .t-plus').on('click', function () {
            var input = $(this).parents('.t-box-quantity').find('.t-input-quantity');
            var cur = input.val();
            cur++;
            input.val(cur);
            input.attr("value", cur);

            onChangeNumber($(this));
        })
        $('.t-box-quantity .t-minus').on('click', function () {
            var input = $(this).parents('.t-box-quantity').find('.t-input-quantity');
            var cur = input.val();
            if (cur >= 1) {
                cur--;
                input.val(cur);
                input.attr("value", cur);

                onChangeNumber($(this));
            } else {
                //Otherwise do nothing
            }
        });
    }

    function onChangeNumber(e) {
        var t_people = e.parents('.t-input-custom').find('.t-box-quantity').hasClass('t-number-people');
        var t_children = e.parents('.t-input-custom').find('.t-box-quantity').hasClass('t-number-children');
        var t_room = e.parents('.t-input-custom').find('.t-box-quantity').hasClass('t-number-room');
        var t_kid = e.parents('.t-input-custom').find('.t-box-quantity').hasClass('t-number-kid');

        var n_people = e.parents('.t-input-custom').find('.t-number-people').children('.t-input-quantity').val();
        var n_children = e.parents('.t-input-custom').find('.t-number-children').children('.t-input-quantity').val();
        var n_room = e.parents('.t-input-custom').find('.t-number-room').children('.t-input-quantity').val();
        var n_kid = e.parents('.t-input-custom').find('.t-number-kid').children('.t-input-quantity').val();

        var text_placeholder = '';
        console.log(n_people);
        console.log(t_people);

        if (t_people && t_children && t_room) {
            console.log('v1');
            text_placeholder = n_people + " người lớn, " + n_children + " trẻ em, " + n_room + " phòng";
        }

        if (t_people && t_children && t_kid) {
            text_placeholder = n_people + " người lớn, " + n_children + " trẻ em, " + n_kid + " trẻ sơ sinh";
            console.log('v2');
        }

        e.parents('.t-input-custom').find('.t-input').attr(
            "placeholder", text_placeholder
        );
    }

    // Select Custom
    $('.t-input').click(function (e) {
        console.log('click select');
        $(this).parent('.t-input-custom').find('.options-custom').toggleClass('open');
        e.stopPropagation();
    })

    $('.options-custom').click(function (e) {
        e.stopPropagation();
    })
    $(document).click(function () {
        // e.stopPropagation();
        $('.options-custom').removeClass('open');
    })

    var t_number_people = $('.t-number-people');
    var t_number_children = $('.t-number-children');
    var t_number_room = $('.t-number-room');



    $('.t-number-people').change(function () {
        console.log('ádfádf');
    })
    // $('.t-input-quantity').on('change', function () {
    //     console.log('change');
    // });

})