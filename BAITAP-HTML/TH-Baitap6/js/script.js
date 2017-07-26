
/*
    Function check id, then show or hidden content id
*/
var check = true;

function click1(id) {
	var div1 = document.getElementById('div1');
	var icon1 = document.getElementById('icon-control');
	var div2 = document.getElementById('div2');
	var icon2 = document.getElementById('icon-control-2');
	var div3 = document.getElementById('div3');
	var icon3 = document.getElementById('icon-control-3');
	
	if (id == 1) {
		if (check) {
				div1.style.display = "none"; // hidden content
				icon1.style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";// change icon on title
		} else {
				div1.style.display = "block";// show content
				icon1.style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";// change icon on title
		}
		check = !check;
	}
	if (id == 2) {
		if (check) {
				div2.style.display = "none";
				icon2.style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";
		} else {
				div2.style.display = "block";
				icon2.style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";
		}
		check = !check;
	}
	if (id == 3) {
		if (check) {
				div3.style.display = "none";
				icon3.style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";
		} else {
				div3.style.display = "block";
				icon3.style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";
		}
		check = !check;
	}
}