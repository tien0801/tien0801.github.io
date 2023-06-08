
// Customize.js
$(document).ready(function () {
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
})

$(document).ready(function () {
    // Scroll to Top Button
    $(".scroll-top-btn").click(function () {
        $("html, body").scrollTop({ top: 0, behavior: "smooth" });
        return false;
    })
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            $(".scroll-top-btn").addClass("visible");
        } else {
            $(".scroll-top-btn").removeClass("visible");
        }
    });

    // Scroll to Target
    $(".scroll-to-target[href^='#']").on("click", function (scroll_to_target) {
        scroll_to_target.preventDefault();
        var a = this.hash,
            i = $(a);
        $("html, body").stop().animate({
            scrollTop: i.offset().top - 140
        }, 1000, "swing", function () { })
        // $("html, body").stop().scrollTop({ top: i.offset().top - 71, behavior: "smooth" });
    })

    // Text editor
    if ($(".t-text-editor").length > 0) {
        $(".t-text-editor table").wrap("<div class='table-responsive'></div>");
        $(".t-text-editor iframe").wrap("<div class='box-iframe'></div>");
    }

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Noti on top Header
    $('.btn-close-sticky').click(function () {
        $(this).parents('.noti-sticky').addClass('hide');
    })

    /* Heart Icon */
    $('.icon_heart_line').click(function () {
        console.log('dsfd.click');
        $(this).toggleClass('icon_heart_solid');
    })

    // Set min Datapicker
    var t_day = new Date();
    var val_today = t_day.getDate() + "/" + (t_day.getMonth() + 1) + "/" + t_day.getFullYear();
    $(".datepicker_min_today").attr('min', val_today);
    $(".datepicker_min_today").attr('placeholder', val_today);

    // Datepicker 
    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
    });

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
        if (t_people && t_children) {
            text_placeholder = n_people + " người lớn, " + n_children + " trẻ em";
            console.log('v1');
        }

        if (t_people && t_children && t_room) {
            text_placeholder = n_people + " người lớn, " + n_children + " trẻ em, " + n_room + " phòng";
            console.log('v2');
        }

        if (t_people && t_children && t_kid) {
            text_placeholder = n_people + " người lớn, " + n_children + " trẻ em, " + n_kid + " trẻ sơ sinh";
            console.log('v3');
        }

        e.parents('.t-input-custom').find('.t-input').attr(
            "placeholder", text_placeholder
        );
    }

    // Select Custom
    $('.t-input').click(function (e) {
        console.log('Click Select Custom');
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

    // Search Autocomplete
    $(".input-autocomplete").keyup(function () {
        var result_search = $(this).parents('.box-search-autocomplete').children('.result-search-autocomplete');
        console.log(result_search);
        result_search.addClass('show');
        // if (!$(this).val()) {
        //     result_search.removeClass('show');
        // } else {
        //     console.log('Please enter text search');
        // }
    });

    $(".input-autocomplete").mousedown(function () {
        var result_search = $(this).parents('.box-search-autocomplete').children('.result-search-autocomplete');
        result_search.addClass('show');
    })

    $('.result-search-autocomplete, .box-search-autocomplete').click(function (e) {
        e.stopPropagation();
    })
    $(document).click(function () {
        $('.result-search-autocomplete').removeClass('show');
    });

    $('.result-search-autocomplete .item-result .text').click(function () {
        var val = $(this).text();
        console.log(val);
        $(this).parents('.box-search-autocomplete').find('.input-autocomplete').val(val);
        $('.result-search-autocomplete').removeClass('show');
    })
    // End Search Autocomplete

    // Toggle Input Password 
    $('.toggle-input-password .icon-toggle').click(function (e) {
        e.Default
        var x = $(this).parent().find('input');
        console.log(x);
        if (x.attr("type") == "text") {
            x.attr('type', 'password');
            $(this).addClass('hide');
        } else {
            x.attr('type', 'text');
            $(this).removeClass('hide');
        }
    })

    // Viewmore
    $('.btn-viewmore').click(function () {
        $(this).parents('.box-viewmore').toggleClass('show');
        $(this).parents('.box-viewmore').find('.content-viewmore').slideToggle();;
    })

    // jQuery input box automatically add DOT into Currency format
    $('input.numberformat').change(function (event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function (index, value) {
            return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                ;
        });
    });

});