    
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
    
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('id_video', {
    //  height: '390',
    //  width: '640',
        videoId: 'lgkyhEHIC_c',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
function pauseVideo() {
    player.pauseVideo();
}
function playVideo() {
    player.playVideo();
}

var id_video = $('#id_video');
$(window).bind('scroll load', function () {
    if ($('.js-player-section').length > 0 && id_video.length > 0) {
        $.fn.isInViewport = function () {
            let elementTop = $(this).offset().top;
            let elementBottom = elementTop + $(this).outerHeight();

            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        if ($('.js-player-section').isInViewport()) {
            if(!$('.js-player-section').hasClass('play')) {
                $('.js-player-section').addClass('play');
                playVideo();
                console.log('play');
            }
        } else {
            if($('.js-player-section').hasClass('play')) {
                $('.js-player-section').removeClass('play');
                pauseVideo();
                console.log('pause');
            }
        }

    }
})
