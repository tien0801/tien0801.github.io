// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
                
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$('.js-player-section').each(function( e ) {
    console.log( e + ":");
    
    let section_video = $(this);
    let you_ID = $(this).find('.iframe-youtube-autoplay').attr('id');
    let videoID = $(this).find('.iframe-youtube-autoplay').data('videoid');
    console.log('section video:'+ section_video);
    console.log('ID Youtube:'+ you_ID);
    console.log('ID Youtube:'+ videoID);

   


    // var box_iframe = $('.iframe-youtube-autoplay');
    // var you_ID = box_iframe.attr('id');
    // var videoID = box_iframe.data('videoid');
    // console.log('iframe Youtube:'+ box_iframe);
    // console.log('ID Youtube:'+ videoID);

    

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player = [];
    console.log(player);

    function onYouTubeIframeAPIReady() {
        player = new YT.Player(you_ID, {
        //  height: '390',
        //  width: '640',
            videoId: videoID,
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
        player[e].stopVideo();
    }
    function pauseVideo() {
        player[e].pauseVideo();
    }
    function playVideo() {
        player[e].playVideo();
    }


    $(window).bind('scroll load', function () {
    
        if (section_video.length > 0 && you_ID.length > 0) {
            $.fn.isInViewport = function () {
                let elementTop = section_video.offset().top;
                let elementBottom = elementTop + $(this).outerHeight();

                let viewportTop = $(window).scrollTop();
                let viewportBottom = viewportTop + $(window).height();

                return elementBottom > viewportTop && elementTop < viewportBottom;
            };

            if (section_video.isInViewport()) {
                if(!section_video.hasClass('play')) {
                    section_video.addClass('play');
                    playVideo();
                    console.log('play iframe');
                }
            } else {
                if(section_video.hasClass('play')) {
                    section_video.removeClass('play');
                    pauseVideo();
                    console.log('pause iframe');
                }
            }

        }
    });

});