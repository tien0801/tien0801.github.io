$(document).ready(function () {
    function CurrencyFormat(el) {
        return el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    //js slider-range-1
    if ($("#slider-range-1").length) {
        var min = $("#slider-range-1").data('min');
        var max = $("#slider-range-1").data('max');
        var vmin = $("#slider-range-1").data('vmin');
        var vmax = $("#slider-range-1").data('vmax');

        $("#slider-range-1").slider({
            range: true,
            min: min,
            max: max,
            values: [vmin, vmax],
            slide: function (event, ui) {
                $("#amount-min").val("vnđ " + CurrencyFormat(ui.values[0]));
                $("#amount-max").val("vnđ " + CurrencyFormat(ui.values[1]));
            }
        });

        $("#amount-min").val("vnđ " + CurrencyFormat($("#slider-range-1").slider("values", 0)));
        $("#amount-max").val("vnđ " + CurrencyFormat($("#slider-range-1").slider("values", 1)));

    }
});