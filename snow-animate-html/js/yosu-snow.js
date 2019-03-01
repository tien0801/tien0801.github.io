

/* create the link element */
var linkElement = document.createElement('link');
/* add attributes */
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('href', 'css/yosu-snow.css');
// linkElement.setAttribute('href', 'https://demo2.laziweb.com/snow-animate-html/css/yosu-snow.css');
/* attach to the document head */
document.getElementsByTagName('head')[0].appendChild(linkElement);

var snowFunc = function() {	
	// var b = document.getElementsByTagName('body');

	var p = document.createElement("div");
	p.innerHTML =  '   <div class="snow-container">  '  + 
	 '   		<div class="snow foreground"></div>  '  + 
	 '   		<div class="snow foreground layered"></div>  '  + 
	 '   		<div class="snow middleground"></div>  '  + 
	 '   		<div class="snow middleground layered"></div>  '  + 
	 '   		<div class="snow background"></div>  '  + 
	 '   		<div class="snow background layered"></div>  '  + 
	 '  	</div>  ' ; 
	document.body.insertBefore(p, document.body.firstChild);
}	

window.onload = function() {
	snowFunc();	
}