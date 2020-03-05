$(document).ready(function() {
    console.log("ready");

	$('.search-menu a').click(function() {
		$('.search-menu').find('.form-search-inline').slideToggle(100);
	})

	$('.mobile-icon-search').click(function() {
		$('.box-search-mobile').slideToggle(200);
	})

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

    if($('.js-thiep-slider').length >0) {
        $('.js-thiep-slider').owlCarousel({
            loop: true,
            // autoplay: true,
            // autoplayTimeout: 4000,
            // nestedItemSelector: 'item-gall',
            margin: 30,
            responsiveClass:true,
            items: 3,
            dots: false,
            navText : ["<img src='../images/icons/btn-prev.svg'/>","<img src='../images/icons/btn-next.svg'/>"],
            rewindNav : true,
            nav: false,
            responsive : {
                // breakpoint from 0 up
                0 : {
                   items: 1,
                   nav: true,
                },
                480 : {
                    items: 2,
                },
                768 : {
                    items: 2,
                },
                992 : {
                    items: 3,
                },
                1200 : {
                    items: 3,
                }
            }
        })
    }

    $('.upload-btn-wrapper .input-upload').on('change',function(){
        let filename = $(this).val().replace(/.*(\/|\\)/, '');
        if(filename != "") {
          $('.upload-btn-wrapper .name-file').html(filename);
        }
        console.log(filename);
    });

    $(".scroll-to-target[href^='#']").on("click", function(scroll_to_target) {
        scroll_to_target.preventDefault();
        var a = this.hash,
            i = $(a);
        $("html, body").stop().animate({
            scrollTop: i.offset().top
        }, 1500, "swing", function() {})
    })

});