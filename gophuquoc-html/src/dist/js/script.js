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

$(document).ready(function () {
    /* Heart Icon */
    $('.icon_heart_line').click(function () {
        console.log('dsfd.click');
        $(this).toggleClass('icon_heart_solid');
    })
    // Scoll to taget
    $(".scroll-to-target[href^='#']").on("click", function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        var target = this.hash,
            id_target = $(target);
        // if (!$(this.hash).hasClass('active')) {
        // $("html, body").stop().animate({
        //   scrollTop: id_target.offset().top - 160
        // }, 1000, function () { })

        // $('html, body').animate({
        //   scrollTop: id_target.offset().top
        // }, 500);
        // return false;
        // }
    })

})