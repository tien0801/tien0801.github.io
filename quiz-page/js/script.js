
$(document).ready(function() {
    console.log("script.js Ready");

    $('#btn-start').click(function() {
        console.log('click Button Start');

        $('.bg_normal').addClass('active');
        $('#vue_splashScreen').addClass('disable');
        setTimeout(() => {
            $('.vue-quiz').addClass('active');
            $('#vue_splashScreen').css('display','none');
            $('.vue-quiz .v_question .item:first-child').addClass('active');
        }, 800);

    });

    $('.vue-quiz .v_question .item .v_answer').click(function() {
        var n_next = $(this).data('next');
        console.log('next:', n_next);

        if(n_next == 0) {
            $('.vue-quiz').removeClass('active');
            $('.quiz-result').addClass('active');
        }

		$(this).find('.check-quiz').prop('checked', true);

        $('#prev-quiz').addClass('active');
        $('#prev-quiz').attr('data-prevq', n_next - 1);
        $('#prev-quiz').attr('data-currq', n_next);

        $(this).closest('.item').addClass('hide');
        $(this).closest('.item').removeClass('active');

        $('.vue-quiz .v_question .item:nth-child(' + n_next + ')').addClass('active');

        var new_height = $('.vue-quiz .v_question .item:nth-child(' + n_next + ')').height();
        $('.vue-quiz .v_question').height(new_height);

        $('.v_breadcrumbs .list-process li:nth-child(' + n_next + ')').addClass('active');
    });
    
    $('#prev-quiz').click(function() {
        console.log('Btn Prev Quiz');
        var n_prev = $('#prev-quiz').attr('data-prevq');
        var n_curr = $('#prev-quiz').attr('data-currq');
        console.log('prev:', n_prev);
        console.log('current:', n_curr);

        if(n_curr == 2) {
            $(this).removeClass('active');
        }

        $('.vue-quiz .v_question .item').eq(n_curr-1).removeClass('active');
        $('.vue-quiz .v_question .item').eq(n_curr-1).addClass('wait');

        $('.vue-quiz .v_question .item').eq(n_prev-1).addClass('active');
        $('.vue-quiz .v_question .item').eq(n_prev-1).removeClass('hide');

		$('.vue-quiz .v_question .item').eq(n_prev-1).find('.check-quiz').prop('checked', false);

        $('#prev-quiz').attr('data-prevq', n_prev - 1);
        $('#prev-quiz').attr('data-currq', n_curr - 1);

        $('.v_breadcrumbs .list-process li:nth-child(' + n_curr + ')').removeClass('active');
    });
    
});



/*
* Slider - JQuery
*
*/
$(document).ready(function() {
	responsiveSlider();
	console.log(count);
});

var count = 1;

/*
* Function Slider
*
*/
function responsiveSlider() {
	var thumb = $(".thumb_slide");
	var slider = $("#slider-quiz");
	var sliderWidth = slider.width();
	var slideList = $("#sliderWrap");
	var items = slideList.children("li").length;
	var prev = $("#prev");
	var next = $("#next");
	thumb.first().addClass('active');

	//Select Current Thumb
	var setThumb = function() {
		var index = $(".thumb_slide").index(this);
		index = count - 1;
		$(".thumb_slide").removeClass('active');
		$(".thumb_slide").eq(index).addClass('active');
	}

	//Function Previous slide
	var prevSlide = function() {
		if(count > 1) {
			count = count - 2;
			slideList.css({"left": ""+ (-count * sliderWidth) + "px"});
			count ++;
			setThumb();
			console.log(count);
		} else if(count = 1) {
			count = items - 1;
			slideList.css({"left": ""+ (-count * sliderWidth) + "px"});
			count ++;
			setThumb();
			console.log(count);
		}
	}

	//Function next slide
	var nextSlide = function() {
		if(count < items) {
			slideList.css({"left": "" + (-count * sliderWidth) + "px"});
			count++;
			setThumb();
			console.log(count);
		} else if(count = items) {
			slideList.css("left", "0");
			count = 1;
			setThumb();
			console.log(count);
		}
	}

	//Click Previous
	prev.click(function() {
		prevSlide();
		clearInterval(myTimer);
	});

	//Click Next
	next.click(function() {
		nextSlide();
		clearInterval(myTimer);
	});

	//Auto next slide: 3s
	var myTimer = setInterval(function() {
		nextSlide();
		console.log(count);
	}, 3000);

	//Set click Thumb
	$(".thumb_slide").click(function() {
		clearInterval(myTimer);
		var index = $(".thumb_slide").index(this);
		count = index;
		nextSlide();
		$(".thumb_slide").removeClass('active');
		$(".thumb_slide").eq(index).addClass('active');
		console.log(index);
	})
};
