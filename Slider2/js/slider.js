
/*
Author: VU BA TIEN
Project: Slider - Javascript
*/

var count = 1;
var dots = document.getElementsByClassName("thumb_slide");

/* Function set active  */
function setActive(y) {
	for (var i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active"); 
	}
	dots[y].classList.add("active");
}

var responsiveSlider = function() {
	
	var slider = document.getElementById("slider");
	var sliderWidth = slider.offsetWidth;
	var slideList = document.getElementById("sliderWrap");
	
	var items = slideList.querySelectorAll("li").length;
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	
	window.addEventListener('resize', function(){
		sliderWidth = slider.offsetWidth;
	});
	
	var prevSlide = function(){
		if(count > 1) {
			count = count - 2;
			slideList.style.left = "-" + count * sliderWidth + "px";
			setActive(count);
			count ++;
		} else if(count = 1) {
			count = items - 1;
			slideList.style.left = "-" + count * sliderWidth + "px";
			setActive(count);
			count ++;
		}
	};
	
	var nextSlide = function() {
		if(count < items) {
			slideList.style.left = "-" + count * sliderWidth + "px";
			setActive(count);
			count++;
		} else if(count = items) {
			slideList.style.left = "0px";
			setActive(0);
			count = 1;	
		}
	};

	next.addEventListener("click", function() {
		nextSlide();
		clearInterval(myTimer);
	});
	
	prev.addEventListener("click", function() {
		prevSlide();
		clearInterval(myTimer);
	});
	/* Auto next slide */
	var myTimer = setInterval(function() {
		nextSlide();
	}, 4000);
	
};

/* Function for event click thumbnail */
function clickThumb(x) {
	var slider = document.getElementById("slider");
	var slideList = document.getElementById("sliderWrap");
		count = x;
		setActive(count);
		slideList.style.left = "-" + (count * 960) + "px" ;
	}
	
window.onload = function() {
	responsiveSlider();	
}