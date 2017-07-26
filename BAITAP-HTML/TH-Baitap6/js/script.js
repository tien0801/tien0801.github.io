var CHECK1 = true;
var CHECK2 = true;
var CHECK3 = true;
/*
    Function check id, then show or hidden content id
*/
function click1(id) {
	if (id == 1) {
		if (CHECK1) {
				document.getElementById('div1').style.display = "none"; // hidden content
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";// change icon on title
		}
		else {
				document.getElementById('div1').style.display = "block";// show content
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";// change icon on title
		}
		CHECK1 = !CHECK1;
	}
	if (id == 2) {
		if (CHECK2) {
				document.getElementById("div2").style.display = "none";
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";
		}
		else {
				document.getElementById("div2").style.display = "block";
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";
		}
		CHECK2 = !CHECK2;
	}
	if (id == 3) {
		if (CHECK3) {
				document.getElementById("div3").style.display = "none";
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 -20px no-repeat";
		}
		else {
				document.getElementById("div3").style.display = "block";
				document.getElementById('icon-control').style.background = "url(images/top-movie-trailers-arrows.gif) 0 4px no-repeat";
		}
		CHECK3 = !CHECK3;
	}
}