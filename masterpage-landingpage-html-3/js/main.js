var iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
if (iOS)
    preventZoomOnFocus();

function preventZoomOnFocus() {
    document.documentElement.addEventListener("touchstart", onTouchStart);
    document.documentElement.addEventListener("focusin", onFocusIn);
}

let dont_disable_for = ["checkbox", "radio", "file", "button", "image", "submit", "reset", "hidden"];
//let disable_for = ["text", "search", "password", "email", "tel", "url", "number", "date", "datetime-local", "month", "year", "color"];

function onTouchStart(evt) {
    let tn = evt.target.tagName;

    // No need to do anything if the initial target isn't a known element
    // which will cause a zoom upon receiving focus
    if (tn != "SELECT" &&
        tn != "TEXTAREA" &&
        (tn != "INPUT" || dont_disable_for.indexOf(evt.target.getAttribute("type")) > -1)
    )
        return;

    // disable zoom
    setViewport("width=device-width, initial-scale=1.0, user-scalable=0");
}

// NOTE: for now assuming this focusIn is caused by user interaction
function onFocusIn(evt) {
    // reenable zoom
    setViewport("width=device-width, initial-scale=1.0, user-scalable=1");
}

// add or update the <meta name="viewport"> element
function setViewport(newvalue) {
    let vpnode = document.documentElement.querySelector('head meta[name="viewport"]');
    if (vpnode)
        vpnode.setAttribute("content", newvalue);
    else {
        vpnode = document.createElement("meta");
        vpnode.setAttribute("name", "viewport");
        vpnode.setAttribute("content", newvalue);
    }
}

// Menu desktop
$(document).ready(function() {
    $(window).bind("load resize scroll", function() {
        if ($(document).scrollTop() > 100) {
            $('.header').addClass('header-fixed');
        } else {
            $('.header').removeClass('header-fixed');
        }
    });

    $(document).on("load scroll", onScroll);
    //smoothscroll
    $('.menu-scroll a[href^="#"].link-scroll').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.menu-scroll li').each(function() {
            $(this).removeClass('active');
        })
        $(this).parent().addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $("html, body").animate({ scrollTop: $target.offset().top - 50 });

    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.menu-scroll li .link-scroll').each(function() {
            
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.menu-scroll li').removeClass("active");
                currLink.parent().addClass("active");
            } else {
                currLink.parent().removeClass("active");
            }
        });
    }
})

// Menu Mobile
$(document).ready(function () {
    function closeMenu() {
        $('.y-mobile-menu').removeClass('show');
        $('.overlay-menu').removeClass('active');
    }
    $(".has-submenu > .btn-toggle-sub").on("click", function(e){
        var parentli = $(this).closest('li');
        if(parentli.hasClass('opened')) {
            parentli.removeClass('opened');
            parentli.find('> ul.sub-menu').slideUp(400);
        } else {
            parentli.addClass('opened');
            parentli.find('> ul.sub-menu').slideDown(400);
        }
        parentli.siblings('li').removeClass('opened');
        parentli.siblings('li').find('.has-submenu.opened').removeClass('opened');
        parentli.siblings('li').find('ul:visible').slideUp();
    })
    $('.mobile-menu-btn').on("click", function(){
        $('.overlay-menu').toggleClass("active");
        $(".y-mobile-menu").toggleClass("show");
        return false;
    })
    $('.overlay-menu, .m-menu-close').on("click", function(){
        closeMenu();
    })
    $('.y-mobile-menu li a').click(function() {
        // e.preventDefault();
        var target = $(this).attr("href");
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 800, function() {
            location.hash = target;
        });
        closeMenu();
        return false;
    })

    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        // Assign active class to nav links while scolling
        $('.section-menu').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.y-mobile-menu li.active').removeClass('active');
                $('.y-mobile-menu li').eq(i).addClass('active');
            }
        });
    }).scroll();
});

// Loop animation
$(document).ready(function() {
    $.doTimeout(2500, function() {
        $('.repeat.go').removeClass('go');
        return true;
    });
    $.doTimeout(2520, function() {
        $('.repeat').addClass('go');
        return true;
    });
});

$(document).ready(function() {
    // Search button
    $('.top-search .icon-search').click(function() {
        $('.box-search').slideToggle(400);
    })

    // Scroll to top
    $(".scroll-top-btn").on("click", function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            $(".scroll-top-btn").addClass("visible");
        } else {
            $(".scroll-top-btn").removeClass("visible");
        }
    });

    if ($('.home-slider').length > 0) {
        $('.home-slider').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            margin: 0,
            responsiveClass: true,
            items: 1,
            dots: true,
            navText: ["", ""],
            rewindNav: true,
            nav: true,
        })
    }

})