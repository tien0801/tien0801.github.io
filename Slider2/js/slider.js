
/*
Author: VU BA TIEN
Project: Slider - Javascript
*/

var dots = document.getElementsByClassName("thumb_slide");
		var count = 1;
	/* Function set active  */
	function setActive(y) {
		for (var i = 0; i < dots.length; i++) {
			dots[i].classList.remove("active"); 
		}
		dots[y].classList.add("active");
	}
function responsiveSlider() {

	
	var slider = document.getElementById("slider");
	var slideList = document.getElementById("sliderWrap");
	var sliderWidth = slider.offsetWidth;
	var items = slideList.querySelectorAll("li").length;
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	
	window.addEventListener('resize', function(){
		 sliderWidth = slider.offsetWidth;
	 });

	function prevSlide(){
		if(count > 1) {
			count = count - 2;
			slideList.style.left = "-" + (count * sliderWidth) + "px";
			setActive(count);
			count ++;
		} else if(count = 1) {
			count = items - 1;
			slideList.style.left = "-" + (count * sliderWidth) + "px";
			setActive(count);
			count ++;
		}
	};
	
	function nextSlide() {
		if(count < items) {
			slideList.style.left = "-" + (count * sliderWidth) + "px";
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

	//Auto next slide
	 var myTimer = setInterval(function() {
		nextSlide();
	}, 4000);
	
	//var thumb = document.getElementsByClassName("thumb_slide");
	
}; 
/* Function for event click thumbnail */
	function clickThumb(x) {
		/* var slider = document.getElementById("slider");
		var sliderWidth = slider.offsetWidth;
		var slideList = document.getElementById("sliderWrap"); */
		count = x;
		setActive(count);
		slideList.style.left = "-" + (count * sliderWidth) + "px";
		count ++;
	}
	dots.addEventListener("click",clickThumb(this));

 window.onload = function() {
	responsiveSlider();
 }