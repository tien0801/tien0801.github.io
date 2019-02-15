
// $('#js-prev1').click(function() {
//   console.log("next");
//   Swiper.navigation.nextEl;
// })
$('#js-prev1').on('click', function(){
   Swiper.slideTo($(this).index());
   $('.pagi-slide .item-pagi').removeClass('active');
   $(this).addClass('active');
});