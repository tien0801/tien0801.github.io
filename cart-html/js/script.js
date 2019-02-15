(function($){
	"use strict";
	! function(n) {
        n.fn.stacktable = function(t) {
            var i, u = this,
                r = n.extend({}, {
                    headIndex: 0
                }, t);
            return i = t && t.headIndex ? t.headIndex : 0, u.each(function() {
                var l = n(this).prop("class"),
                    f = n('<table class="' + l + ' stacktable small-only visible-xs"><tbody><\/tbody><\/table>'),
                    t, c, s, h, u, e, o;
                "undefined" != typeof r.myClass && f.addClass(r.myClass);
                o = "";
                t = n(this);
                t.addClass("stacktable large-only hidden-xs");
                c = t.find("caption").clone();
                s = t.find("tr").eq(0);
                t.find("tr").each(function(t) {
                    h = "";
                    u = "";
                    e = n(this).prop("class");
                    0 === t ? o += '<tr class=" ' + e + ' "><th class="st-head-row st-head-row-main" colspan="2">' + n(this).find("th,td").eq(i).html() + "<\/th><\/tr>" : (n(this).find("td,th").each(function(t) {
                        t === i ? h = '<tr class="' + e + '"><th class="st-head-row" colspan="2">' + n(this).html() + "<\/th><\/tr>" : "" !== n(this).html() && (u += '<tr class="' + e + '">', u += s.find("td,th").eq(t).html() ? '<td class="st-key">' + s.find("td,th").eq(t).html() + "<\/td>" : '<td class="st-key"><\/td>', u += '<td class="st-val ' + n(this).prop("class") + '">' + n(this).html() + "<\/td>", u += "<\/tr>")
                    }), o += h + u)
                });
                f.prepend(c);
                f.append(n(o));
                t.before(f)
            })
        };
    }(jQuery);
    // $(".cart-container .table").stacktable();
    // $(".cart-container .table .qty").each(function(){
    // 	var idVal=$(this).attr("id") + $(this).index();
    // 	$(this).attr("id",idVal);
    // });
})(jQuery);