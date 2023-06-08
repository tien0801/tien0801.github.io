$(document).ready(function () {

    // Countdown
    // Set the date we're counting down to
    // var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
    var countDownDate = new Date("6/25/2023 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days < 10) {
            days = '0' + days;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        // Output the result in an element with id="demo"
        // document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("t-days").innerHTML = days;
        document.getElementById("t-hours").innerHTML = hours;
        document.getElementById("t-minutes").innerHTML = minutes;
        document.getElementById("t-seconds").innerHTML = seconds;

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 100);

    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
    });

    // Toggle form Offer
    // $('#btn-toggle-offer').click(function () {
    //     $(this).addClass('hide');
    //     $('#form-offer').slideDown();
    // })

    // Js combo slider
    if ($('.js-combo-slider').length > 0) {
        $('.js-combo-slider').owlCarousel({
            loop: true,
            lazyLoad: true,
            margin: 20,
            responsiveClass: true,
            items: 3,
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
                    items: 2,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 3,
                }
            }
        })
    }

});