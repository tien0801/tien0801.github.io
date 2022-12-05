/* Sticky Menu */
window.onscroll = function() {myFunction()};  
var header = document.getElementById("sticky-top");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } else {
    header.classList.remove("sticky");
    }
}

/* Heart Icon */
document.querySelector('.icon_heart_line').addEventListener('click', function(event) {
    event.preventDefault();
    var icon_heart_line = document.querySelector('.icon_heart_line');
    if (icon_heart_line.classList.contains('icon_heart_solid')) {
        icon_heart_line.classList.remove('icon_heart_solid');
    } else {
        icon_heart_line.classList.add('icon_heart_solid');
    }
});    

let items = document.querySelectorAll('.vehicle .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
