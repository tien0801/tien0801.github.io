$(document).ready(function () {
    $(".has-submenu > a").on("click", function(e){
        var $parentli = $(this).closest('li');
        $parentli.siblings('li').find('ul:visible').slideUp().prev('a').removeClass("active");
        $parentli.find('> ul').slideToggle().prev('a').toggleClass("active");
    })
    $('.mobile-menu-btn, .mobile-menu-close').on("click", function(){
        $('.overlay').toggleClass("active");
        $(".mobile-menu").toggleClass("show");
        return false;
    })
    $('.overlay').on("click", function(){
        $(this).removeClass("active");
        $(".mobile-menu").removeClass("show");
    })
});

window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
function myFunction() {
  if (window.pageYOffset > 0) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}