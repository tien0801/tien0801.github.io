$(document).ready(function () {
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
            console.log('v3');
        }

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
    $('.toggle-input-password .icon-eye-toggle').click(function (e) {
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


});