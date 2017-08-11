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
	var slider = $("#slider");
	var sliderWidth = slider.width();
	var slideList = $("#sliderWrap");
	var items = slideList.children("li").length;
	var prev = $("#prev");
	var next = $("#next");
	thumb.first().css({"opacity": "1"});

	//Select Current Thumb
	var setThumb = function() {
		var index = $(".thumb_slide").index(this);
		index = count - 1;
		$(".thumb_slide").css({"opacity": "0.5"});
		$(".thumb_slide").eq(index).css({"opacity": "1"});
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
		$(".thumb_slide").css({"opacity": "0.5"});
		$(".thumb_slide").eq(index).css({"opacity": "1"});
		console.log(index);
	})
};
