/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

(function(view) {
"use strict";
var
	  Uint8Array = view.Uint8Array
	, HTMLCanvasElement = view.HTMLCanvasElement
	, canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
	, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
	, to_data_url = "toDataURL"
	, base64_ranks
	, decode_base64 = function(base64) {
		var
			  len = base64.length
			, buffer = new Uint8Array(len / 4 * 3 | 0)
			, i = 0
			, outptr = 0
			, last = [0, 0]
			, state = 0
			, save = 0
			, rank
			, code
			, undef
		;
		while (len--) {
			code = base64.charCodeAt(i++);
			rank = base64_ranks[code-43];
			if (rank !== 255 && rank !== undef) {
				last[1] = last[0];
				last[0] = code;
				save = (save << 6) | rank;
				state++;
				if (state === 4) {
					buffer[outptr++] = save >>> 16;
					if (last[1] !== 61 /* padding character */) {
						buffer[outptr++] = save >>> 8;
					}
					if (last[0] !== 61 /* padding character */) {
						buffer[outptr++] = save;
					}
					state = 0;
				}
			}
		}
		// 2/3 chance there's going to be some null bytes at the end, but that
		// doesn't really matter with most image formats.
		// If it somehow matters for you, truncate the buffer up outptr.
		return buffer;
	}
;
if (Uint8Array) {
	base64_ranks = new Uint8Array([
		  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
		, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
		, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
		, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
		, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
	]);
}
if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
	if (!canvas_proto.toBlob)
	canvas_proto.toBlob = function(callback, type /*, ...args*/) {
		  if (!type) {
			type = "image/png";
		} if (this.mozGetAsFile) {
			callback(this.mozGetAsFile("canvas", type));
			return;
		} if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
			callback(this.msToBlob());
			return;
		}

		var
			  args = Array.prototype.slice.call(arguments, 1)
			, dataURI = this[to_data_url].apply(this, args)
			, header_end = dataURI.indexOf(",")
			, data = dataURI.substring(header_end + 1)
			, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
			, blob
		;
		if (Blob.fake) {
			// no reason to decode a data: URI that's just going to become a data URI again
			blob = new Blob
			if (is_base64) {
				blob.encoding = "base64";
			} else {
				blob.encoding = "URI";
			}
			blob.data = data;
			blob.size = data.length;
		} else if (Uint8Array) {
			if (is_base64) {
				blob = new Blob([decode_base64(data)], {type: type});
			} else {
				blob = new Blob([decodeURIComponent(data)], {type: type});
			}
		}
		callback(blob);
	};

	if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
		canvas_proto.toBlobHD = function() {
			to_data_url = "toDataURLHD";
			var blob = this.toBlob();
			to_data_url = "toDataURL";
			return blob;
		}
	} else {
		canvas_proto.toBlobHD = canvas_proto.toBlob;
	}
}
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));

(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d,e){var f=new XMLHttpRequest;f.open("GET",b),f.responseType="blob",f.onload=function(){a(f.response,c,d,e)},f.onerror=function(){console.error("could not download file")},f.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d,e);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"undefined"!=typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
$('body').append(`
<div class="modal fade" id="w-modal-canvas-code" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content" style="background-color: white;>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal"  style="position: absolute;right: 10px;top: 5px;"><span aria-hidden="true">&times;</span></button>
            <canvas id="woay-download-code" style="max-width: 100%;max-height: 80%;"></canvas>
            <div style="padding:5px;">
            <p>
                Bạn đang sử dụng <b>iPhone</b>. Vui lòng bấm đồng thời 2 phím <span style="font-weight:bold; color: #fa7324;">[Home] + [Nguồn]</span> để chụp màn hình
            </p>   
            </div>
        </div>
    </div>
</div>
`);

function downloadCode(targetId, title, code) {
    var c = document.getElementById("woay-download-code");
    var ctx = c.getContext("2d");
    var img = document.getElementById("woay-code-bg");
    c.width = img.width;
    c.height = img.height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.drawImage(img, 0, 0);

    ctx.textAlign = "center";

    var fontSize = 100;
    ctx.fillStyle = '#b6004d';
    while (true) {
        ctx.font = 'bold ' + fontSize + "px HelveticaNeue";
        var textLength = ctx.measureText(title).width;
        if (textLength < c.width * 0.90) {
            break;
        } else {
            fontSize -= 2;
        }
    }
    
    ctx.fillText(title, c.width/2, c.height/5*2);

    ctx.font = "bold 100px HelveticaNeue";
    ctx.fillStyle = 'black';
    ctx.fillText(code, c.width/2, 55/100 * c.height);

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') > -1) {
        $('#' + targetId)
        .off('click')
        .click(function(e) {
            e.preventDefault();
            $('.modal').modal('hide');
            $('#w-modal-canvas-code').modal('show');
        });
        return;
    }

    var dataURL = c.toDataURL();
    c.toBlob(function(blob) {
        $('#' + targetId)
        .off('click')
        .click(function(e) {
            e.preventDefault();
            saveAs(blob, "ma-trung-thuong.png");
        });
    });    
}
                                              function copyToClipboard(el) {
    // resolve the element
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

        // save current contentEditable/readOnly status
        var editable = el.contentEditable;
        var readOnly = el.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        el.contentEditable = true;
        el.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(el);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }
    else {
        el.select();
    }

    // execute copy command
    document.execCommand('copy');

}
var hasLogin = false;
var $$woay = Woay('#background', Object.assign({}, WHEEL_SETTINGS, {
    imgSrc: WHEEL_SETTINGS.image.origin
}));

$('.btn-woay, #kiemtraphanthuong-tab').click(function () {
    if (!hasLogin) {
        return $('#w-verify').modal('show');
    }
    hasSpin = true;
    $$woay.emit('start');
})

$$woay.on('userInfo', function (userInfo) {
    hasLogin = true;
})

$('#w-verify .btn-login-fb').click(function () {
    $$woay.emit('start');
    $('#w-verify').modal('hide');
})

$$woay.on('reward', function (number, data) {
    if (!data.item_name) {
        data.item_name = data.name;
    }
    showAward(data, 'Chúc mừng bạn đã nhận được phần quà');
    
});

$$woay.override('showRewardList', function () {
    var reward = $$woay.showOptions().reward;

    var times = $$woay.getRemainTurnCount();
    if (times < 1) {
        reward = $$woay.showOptions().userAward.data.rewards[0];
    }

    showAward(reward, 'Chúc mừng bạn đã nhận được phần quà');
});

function showAward(reward, subject){
    if(reward.sku==="BADLUCK"){
        changeForm(false, reward.item_name, reward.code, reward.sku);
    }else{
        changeForm(subject, reward.item_name, reward.code, reward.sku)
    }
  }

  function changeForm(subject, reward, code, sku){
    $('#w-award').find('.title-voucher').html(subject);
    $('#w-award').find('.title-big').html(reward);
    $('#text-code').val(code);
  
    if(subject==false){
      $('#w-award').find('.title-voucher').remove();
    }
    if(reward==false){
      $('#w-award').find('.title-big').remove();
    }
    if(code == false){
      $('#w-award').find('.input-code').remove();
    }
  
    $('#w-award').modal('show');
    $('.your-award').removeClass('hidden');
    $('.your-award .award-name').html(reward);
    $('.your-award .award-code').html(code);
     downloadCode('btn-download-code', reward, code);
  }

$('#modal-woay-userinfo').on('hide.bs.modal', function() {
    $$woay.addUserMeta('Khu vực', $('#w-khuvuc').val());
    $$woay.addUserMeta('Đại lý', $('#w-daily').val());
})

$('.m-menu-btn').click(function() {
    $('.m-menu-overlay').css('display', 'block');
    $('.m-menu-wrapper').css('right', 0);
})
$('.m-menu-close-btn').click(function() {
    $('.m-menu-overlay').css('display', 'none');
    $('.m-menu-wrapper').css('right', '-100%');
})

$('.m-menu li.m-content-btn').click(function() {
    var contentId = $(this).data('href');
    $('.m-content-wrapper').html($('#' + contentId).html());
    $('.desktop-screen').css('display', 'none');
    $('.mobile-screen').css('display', 'block');
    $('.m-main-content').css('display', 'block');
    $('.m-menu-overlay').css('display', 'none');
    $('.m-menu-wrapper').css('right', '-100%');
})

$('.m-index-btn').click(function() {
    $('.mobile-screen').css('display', 'none');
    $('.desktop-screen').css('display', 'block');
    $('.m-main-content').css('display', 'none');
    $('.m-menu-overlay').css('display', 'none');
    $('.m-menu-wrapper').css('right', '-100%');
})

$('.m-kiemtraphanthuong').click(function() {
    $('.mobile-screen').css('display', 'none');
    $('.desktop-screen').css('display', 'block');
    $('.m-main-content').css('display', 'none');
    $('.m-menu-overlay').css('display', 'none');
    $('.m-menu-wrapper').css('right', '-100%');
    if (!hasLogin) {
        return $('#w-verify').modal('show');
    }
    hasSpin = true;
    $$woay.emit('start');
})