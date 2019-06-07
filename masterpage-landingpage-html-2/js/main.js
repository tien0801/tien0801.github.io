var iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
if (iOS)
  preventZoomOnFocus();

function preventZoomOnFocus()
{
  document.documentElement.addEventListener("touchstart", onTouchStart);
  document.documentElement.addEventListener("focusin", onFocusIn);
}

let dont_disable_for = ["checkbox", "radio", "file", "button", "image", "submit", "reset", "hidden"];
//let disable_for = ["text", "search", "password", "email", "tel", "url", "number", "date", "datetime-local", "month", "year", "color"];

function onTouchStart(evt)
{
  let tn = evt.target.tagName;

  // No need to do anything if the initial target isn't a known element
  // which will cause a zoom upon receiving focus
  if (    tn != "SELECT"
      &&  tn != "TEXTAREA"
      && (tn != "INPUT" || dont_disable_for.indexOf(evt.target.getAttribute("type")) > -1)
     )
    return;

  // disable zoom
  setViewport("width=device-width, initial-scale=1.0, user-scalable=0");
}

// NOTE: for now assuming this focusIn is caused by user interaction
function onFocusIn(evt)
{
  // reenable zoom
  setViewport("width=device-width, initial-scale=1.0, user-scalable=1");
}

// add or update the <meta name="viewport"> element
function setViewport(newvalue)
{
  let vpnode = document.documentElement.querySelector('head meta[name="viewport"]');
  if (vpnode)
    vpnode.setAttribute("content",newvalue);
  else
  {
    vpnode = document.createElement("meta");
    vpnode.setAttribute("name", "viewport");
    vpnode.setAttribute("content", newvalue);
  }
}

// Mmenu
$(window).bind("load resize", function(){
    if(jQuery(window).width()<992){
        jQuery(document).ready(function( $ ) {
          $("#nav-mobile").mmenu({
             "extensions": [
                "position-back",
                "position-right"
             ]
          });
       });
        
    }
});

$(document).ready(function(){
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

    //smoothscroll
    $('.menu-scroll a[href^="#"].link-scroll').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $("html, body").animate({ scrollTop: $target.offset().top - 50 });
       
    });

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('#menu-center a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('#menu-center ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}
    onScroll();



    if($('.home-slider').length > 0) {
        $('.home-slider').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            margin: 0,
            responsiveClass:true,
            items: 1,
            dots: true,
            navText : ["",""],
            rewindNav : true,
            nav: true,
        })
    }

})

