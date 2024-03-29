/**
 * Firemaks
 * @author Yury Vasilyev
 * Copyright (c) 2014 by Yury Vasilyev (aka iamMakep)
 */
(function(a) {
    a.fn.firemaks = function(d) {
        var c = {
            main_window: null,
            mw_height: 0,
            mw_width: 0,
            canvas: null,
            context: null,
            aud_bang: null,
            aud_shake: null,
            sound_file_old: "",
            sound_file_child_old: "",
            gravity: 3,
            lastfiretime: 0,
            fireworks: new Array(),
            getLengthXXYY: function(f, h, e, g) {
                return Math.sqrt(Math.abs(Math.pow((e - f), 2) + Math.pow((g - h), 2)));
            },
            getVectorDirection: function(e, h) {
                var f = {
                    x: 0,
                    y: 0
                };
                var g = 0;
                g = e;
                if (e > 90) {
                    g = 180 - e;
                }
                if (e > 180) {
                    g = e - 180;
                }
                if (e > 270) {
                    g = 360 - e;
                }
                f.x = Math.cos(c.inRad(g)) * h;
                f.y = Math.sin(c.inRad(g)) * h;
                if ((e > 90) && (e < 270)) {
                    f.x *= -1;
                }
                if ((e > 0) && (e < 180)) {
                    f.y *= -1;
                }
                if ((e == 90) || (e == 270)) {
                    f.x = 0;
                }
                if ((e == 180) || (e == 0) || (e == 360)) {
                    f.y = 0;
                }
                return f;
            },
            compareRGBs: function(f, e) {
                if ((f.r != e.r) || (f.g != e.g) || (f.b != e.b)) {
                    return false;
                }
                return true;
            },
            genereateRGBstring: function(e) {
                return e.r + "," + e.g + "," + e.b;
            },
            inRad: function(e) {
                return e * Math.PI / 180;
            },
            getRandomArbitary: function(f, e) {
                return Math.random() * (e - f) + f;
            },
            getRandomInt: function(f, e) {
                return Math.floor(Math.random() * (e - f + 1)) + f;
            },
            addfire: function(n, m, r, o, j, u, g) {
                o = o || 2;
                j = j || false;
                u = u || "random";
                g = g || 1;
                switch (g) {
                    case 1:
                    case 2:
                    case 3:
                        break;
                    default:
                        g = 1;
                        break;
                }
                var k = {
                    x: n,
                    y: m,
                    rays: new Array(),
                    die: 0,
                    timebegin: a.now(),
                    maxlt: 0,
                    type: g
                };
                var v = r;
                var t = j;
                var p = false;
                for (var w = 0; w < v; w++) {
                    var h = {
                        r: 0,
                        g: 0,
                        b: 0
                    };
                    if ((typeof(u) == "string") && (u == "random")) {
                        h.r = c.getRandomInt(0, 255);
                        h.g = c.getRandomInt(0, 255);
                        h.b = c.getRandomInt(0, 255);
                    }
                    if (typeof(u) == "object") {
                        h = u;
                    }
                    if (a.isArray(u)) {
                        h = u[c.getRandomInt(0, u.length - 1)];
                    }
                    p = false;
                    if (t > 0) {
                        p = true;
                        t--;
                    }
                    var f = c.getRandomInt(0, 359);
                    var l = c.getRandomInt((o * 1000) / 2, o * (1000) + 300);
                    if (k.maxlt < l) {
                        k.maxlt = l;
                    }
                    var s = c.getRandomArbitary(0.35, 0.85);
                    var e = c.getVectorDirection(f, 10);
                    e.x = e.x / 2;
                    e.y = e.y / 2;
                    var q = {
                        x: n,
                        y: m,
                        islife: true,
                        lifetime: l,
                        color: h,
                        angle: f,
                        power: e,
                        speed: s,
                        boom: p,
                        trace: new Array()
                    };
                    k.rays.push(q);
                }
                c.fireworks.push(k);
                return k;
            }
        };
        var b = {
            init: function(e) {
                this.firemaks.settings = a.extend({}, this.firemaks.defaults, e);
                return this.each(function() {
                    c.main_window = a(this);
                    c.mw_height = a(window).height();
                    c.mw_width = $('.box-fireworks').width();
                    c.aud_bang = new Audio();
                    c.aud_shake = new Audio();
                    if (a(this).firemaks.settings.sound_file != "") {
                        c.aud_bang.src = a(this).firemaks.settings.sound_file;
                    }
                    if (a(this).firemaks.settings.sound_file_child != "") {
                        c.aud_shake.src = a(this).firemaks.settings.sound_file_child;
                    }
                    c.sound_file_old = a(this).firemaks.settings.sound_file;
                    c.sound_file_child_old = a(this).firemaks.settings.sound_file_child;
                    var f = a("<canvas />", {
                        id: "fmkscnvs"
                    });
                    f.attr({
                        width: c.mw_width - 2 + "px",
                        height: c.mw_height - 2 + "px"
                    });
                    f.css({
                        position: "absolute",
                        "z-index": 9999,
                        "pointer-events": "none"
                    });
                    c.canvas = f;
                    c.context = a(c.canvas)[0].getContext("2d");
                    c.main_window.prepend(c.canvas);
                    a(window).resize(function() {
                        c.mw_height = a(window).height();
                        c.mw_width = $('.box-fireworks').width();
                        c.canvas.attr({
                            width: c.mw_width - 2 + "px",
                            height: c.mw_height - 2 + "px"
                        });
                    });
                    setInterval(function() {
                        c.context.clearRect(0, 0, c.mw_width, c.mw_height);
                        if (c.sound_file_old != a(this).firemaks.settings.sound_file) {
                            c.aud_bang.src = a(this).firemaks.settings.sound_file;
                            c.sound_file_old = a(this).firemaks.settings.sound_file;
                        }
                        if (c.sound_file_child_old != a(this).firemaks.settings.sound_file_child) {
                            c.aud_shake.src = a(this).firemaks.settings.sound_file_child;
                            c.sound_file_child_old = a(this).firemaks.settings.sound_file_child;
                        }
                        if (a(this).firemaks.settings.fire != null) {
                            c.fireworks.push(a(this).firemaks.settings.fire);
                            a(this).firemaks.settings.fire = null;
                            if (a(this).firemaks.settings.sound) {
                                if (a(this).firemaks.settings.sound_file != "") {
                                    var v = c.aud_bang.cloneNode(true);
                                    v.play();
                                }
                            }
                        }
                        var g = 0;
                        if (a(this).firemaks.settings.boom_time_from == a(this).firemaks.settings.boom_time_to) {
                            g = a(this).firemaks.settings.boom_time_from;
                        } else {
                            g = c.getRandomInt(a(this).firemaks.settings.boom_time_from * 1000, a(this).firemaks.settings.boom_time_to * 1000);
                        }
                        if ((a.now() - c.lastfiretime) >= g) {
                            var h = {
                                r: 235,
                                g: 235,
                                b: 255
                            };
                            if ((typeof(a(this).firemaks.settings.color) == "string") && (a(this).firemaks.settings.color == "random")) {
                                h.r = c.getRandomInt(0, 255);
                                h.g = c.getRandomInt(0, 255);
                                h.b = c.getRandomInt(0, 255);
                            }
                            if ((typeof(a(this).firemaks.settings.color) == "string") && (a(this).firemaks.settings.color == "full_random")) {
                                h = "random";
                            }
                            if (typeof(a(this).firemaks.settings.color) == "object") {
                                h = a(this).firemaks.settings.color;
                            }
                            if (a.isArray(a(this).firemaks.settings.color)) {
                                if (a.isArray(a(this).firemaks.settings.color[0])) {
                                    h = a(this).firemaks.settings.color[c.getRandomInt(0, a(this).firemaks.settings.color.length - 1)];
                                } else {
                                    h = a(this).firemaks.settings.color;
                                }
                            }
                            var q = "random";
                            if ((typeof(a(this).firemaks.settings.type) == "string") && (a(this).firemaks.settings.type == "random")) {
                                q = c.getRandomInt(1, 3);
                            }
                            if (typeof(a(this).firemaks.settings.type) == "number") {
                                q = parseInt(a(this).firemaks.settings.type);
                                if ((q < 1) || (q > 3)) {
                                    q = "random";
                                }
                            }
                            var p = 0;
                            var o = 0;
                            if (a(this).firemaks.settings.decrease_for_mobile) {
                                o = c.getRandomInt(15, 50);
                                p = c.getRandomInt(0, 3);
                            } else {
                                o = c.getRandomInt(45, 160);
                                p = c.getRandomInt(0, 5);
                            }
                            if (c.fireworks.length < a(this).firemaks.settings.boom_count) {
                                c.addfire(c.getRandomInt(20, c.mw_width - 20), c.getRandomInt(20, c.mw_height - 20), o, c.getRandomInt(1, 4), p, h, q);
                                if (a(this).firemaks.settings.sound) {
                                    if (a(this).firemaks.settings.sound_file != "") {
                                        var v = c.aud_bang.cloneNode(true);
                                        v.play();
                                    }
                                }
                            }
                            c.lastfiretime = a.now();
                        }
                        if (c.fireworks.length != 0) {
                            for (var l = 0; l < c.fireworks.length; l++) {
                                for (var m = 0; m < c.fireworks[l].rays.length; m++) {
                                    if (c.fireworks[l].rays[m].islife) {
                                        var n = false;
                                        if (c.fireworks[l].type == 3) {
                                            n = c.getRandomInt(0, 100);
                                            if ((n >= 0) && (n <= 50)) {
                                                n = true;
                                            } else {
                                                n = false;
                                            }
                                        }
                                        if (!n) {
                                            c.context.beginPath();
                                            c.context.shadowBlur = 0;
                                            c.context.shadowOffsetX = 0;
                                            c.context.shadowOffsetY = 0;
                                            c.context.shadowColor = "";
                                            c.context.beginPath();
                                            c.context.fillStyle = "rgba(" + c.fireworks[l].rays[m].color.r + "," + c.fireworks[l].rays[m].color.g + "," + c.fireworks[l].rays[m].color.b + ",1)";
                                            c.context.arc(c.fireworks[l].rays[m].x, c.fireworks[l].rays[m].y, 1, 0, 2 * Math.PI);
                                            c.context.fill();
                                            if (c.fireworks[l].rays[m].trace.length > 0) {
                                                c.context.moveTo(c.fireworks[l].rays[m].trace[0][0], c.fireworks[l].rays[m].trace[0][1]);
                                                c.context.strokeStyle = "rgba(" + c.fireworks[l].rays[m].color.r + "," + c.fireworks[l].rays[m].color.g + "," + c.fireworks[l].rays[m].color.b + "," + (1 / 2) + ")";
                                                for (var u = 1; u < c.fireworks[l].rays[m].trace.length; u++) {
                                                    c.context.lineTo(c.fireworks[l].rays[m].trace[u][0], c.fireworks[l].rays[m].trace[u][1]);
                                                    c.context.stroke();
                                                    c.context.moveTo(c.fireworks[l].rays[m].trace[u][0], c.fireworks[l].rays[m].trace[u][1]);
                                                    c.context.strokeStyle = "rgba(" + c.fireworks[l].rays[m].color.r + "," + c.fireworks[l].rays[m].color.g + "," + c.fireworks[l].rays[m].color.b + "," + (1 / u) + ")";
                                                }
                                            }
                                            c.context.closePath();
                                        }
                                        c.fireworks[l].rays[m].x += c.fireworks[l].rays[m].power.x * c.fireworks[l].rays[m].speed;
                                        c.fireworks[l].rays[m].y += c.fireworks[l].rays[m].power.y * c.fireworks[l].rays[m].speed;
                                        if (c.fireworks[l].type == 2) {
                                            if (c.fireworks[l].rays[m].trace.length >= 5) {
                                                c.fireworks[l].rays[m].trace.pop();
                                            }
                                            c.fireworks[l].rays[m].trace.unshift(new Array(c.fireworks[l].rays[m].x, c.fireworks[l].rays[m].y));
                                        }
                                        if ((a.now() - c.fireworks[l].timebegin) > (c.fireworks[l].maxlt / 4)) {
                                            if (c.fireworks[l].rays[m].power.x > 0) {
                                                if ((c.fireworks[l].rays[m].power.x - 0.1) < 0) {
                                                    c.fireworks[l].rays[m].power.x = 0;
                                                } else {
                                                    c.fireworks[l].rays[m].power.x -= 0.1;
                                                }
                                            }
                                            if (c.fireworks[l].rays[m].power.x < 0) {
                                                if ((c.fireworks[l].rays[m].power.x + 0.1) > 0) {
                                                    c.fireworks[l].rays[m].power.x = 0;
                                                } else {
                                                    c.fireworks[l].rays[m].power.x += 0.1;
                                                }
                                            }
                                            if (c.fireworks[l].rays[m].power.y < c.gravity) {
                                                c.fireworks[l].rays[m].power.y += 0.2;
                                            }
                                        }
                                        if ((a.now() - c.fireworks[l].timebegin) > c.fireworks[l].rays[m].lifetime) {
                                            c.fireworks[l].rays[m].islife = false;
                                            if (a(this).firemaks.settings.child_boom) {
                                                if ((c.fireworks[l].rays[m].boom) && ((c.fireworks[l].rays[m].x > 0) && (c.fireworks[l].rays[m].x < c.mw_width)) && ((c.fireworks[l].rays[m].y > 0) && (c.fireworks[l].rays[m].y < c.mw_height))) {
                                                    var s = {
                                                        r: 235,
                                                        g: 235,
                                                        b: 255
                                                    };
                                                    if ((typeof(a(this).firemaks.settings.color_child) == "string") && (a(this).firemaks.settings.color_child == "random")) {
                                                        s.r = c.getRandomInt(0, 255);
                                                        s.g = c.getRandomInt(0, 255);
                                                        s.b = c.getRandomInt(0, 255);
                                                    }
                                                    if ((typeof(a(this).firemaks.settings.color_child) == "string") && (a(this).firemaks.settings.color_child == "full_random")) {
                                                        s = "random";
                                                    }
                                                    if ((typeof(a(this).firemaks.settings.color_child) == "string") && (a(this).firemaks.settings.color_child == "inherit")) {
                                                        s = c.fireworks[l].rays[m].color;
                                                    }
                                                    if (typeof(a(this).firemaks.settings.color_child) == "object") {
                                                        s = a(this).firemaks.settings.color_child;
                                                    }
                                                    if (a.isArray(a(this).firemaks.settings.color_child)) {
                                                        if (a.isArray(a(this).firemaks.settings.color_child[0])) {
                                                            s = a(this).firemaks.settings.color_child[c.getRandomInt(0, a(this).firemaks.settings.color_child.length - 1)];
                                                        } else {
                                                            s = a(this).firemaks.settings.color_child;
                                                        }
                                                    }
                                                    var k = "random";
                                                    if ((typeof(a(this).firemaks.settings.type_child) == "string") && (a(this).firemaks.settings.type_child == "random")) {
                                                        k = c.getRandomInt(1, 3);
                                                    }
                                                    if ((typeof(a(this).firemaks.settings.type_child) == "string") && (a(this).firemaks.settings.type_child == "inherit")) {
                                                        k = c.fireworks[l].type;
                                                    }
                                                    if (typeof(a(this).firemaks.settings.type_child) == "number") {
                                                        k = parseInt(a(this).firemaks.settings.type_child);
                                                        if ((k < 1) || (k > 3)) {
                                                            k = "random";
                                                        }
                                                    }
                                                    var r = 0;
                                                    if (a(this).firemaks.settings.decrease_for_mobile) {
                                                        r = c.getRandomInt(10);
                                                    } else {
                                                        r = 30;
                                                    }
                                                    c.addfire(c.fireworks[l].rays[m].x, c.fireworks[l].rays[m].y, r, 1, 0, s, k);
                                                    if (a(this).firemaks.settings.sound) {
                                                        if (a(this).firemaks.settings.sound_file_child != "") {
                                                            var v = c.aud_shake.cloneNode(true);
                                                            v.play();
                                                        }
                                                    }
                                                }
                                            }
                                            c.fireworks[l].die++;
                                        }
                                    }
                                }
                                if (c.fireworks[l].rays.length == c.fireworks[l].die) {
                                    c.fireworks.splice(l, 1);
                                    l--;
                                }
                            }
                        }
                    }, 50);
                });
            },
            fire: function(f, j, h, i, g, e) {
                h = h || 35;
                i = i || "full_random";
                g = g || 0;
                e = e || 1.5;
                return this.each(function() {
                    if ((typeof(i) == "string") && (i == "random")) {
                        i = {
                            r: c.getRandomInt(0, 255),
                            g: c.getRandomInt(0, 255),
                            b: c.getRandomInt(0, 255)
                        };
                    }
                    if ((typeof(i) == "string") && (i == "full_random")) {
                        i = "random";
                    }
                    if (typeof(i) == "object") {
                        i = i;
                    }
                    if (a.isArray(i)) {
                        if (a.isArray(i[0])) {
                            i = i[c.getRandomInt(0, i.length - 1)];
                        } else {
                            i = i;
                        }
                    }
                    if ((typeof(g) == "string") && (g == "random")) {
                        g = c.getRandomInt(1, 3);
                    }
                    if (typeof(g) == "number") {
                        g = parseInt(g);
                        if ((g < 1) || (g > 3)) {
                            g = "random";
                        }
                    }
                    var k = c.addfire(f, j, h, e, 0, i, g);
                    a(this).firemaks.settings.fire = k;
                });
            },
            settimeofboom: function(f, e) {
                f = f || null;
                e = e || null;
                if ((f == null) && (e == null)) {
                    a(this).firemaks.settings.boom_time_from = a(this).firemaks.defaults.boom_time_from;
                    a(this).firemaks.settings.boom_time_to = a(this).firemaks.defaults.boom_time_to;
                    return false;
                }
                if (f == null) {
                    a(this).firemaks.settings.boom_time_from = 1.5;
                }
                if (e == null) {
                    a(this).firemaks.settings.boom_time_to = 4;
                }
                if (f <= e) {
                    a(this).firemaks.settings.boom_time_from = f;
                    a(this).firemaks.settings.boom_time_to = e;
                    return true;
                } else {
                    a(this).firemaks.settings.boom_time_from = 1.5;
                    a(this).firemaks.settings.boom_time_to = 4;
                }
            },
            setcountof: function(e) {
                if ((e > 0) && (e <= 10)) {
                    a(this).firemaks.settings.boom_count = parseInt(e);
                } else {
                    a(this).firemaks.settings.boom_count = a(this).firemaks.defaults.boom_count;
                }
            },
            setchilds: function(e) {
                e = e || true;
                if (e) {
                    a(this).firemaks.settings.child_boom = true;
                } else {
                    a(this).firemaks.settings.child_boom = false;
                }
            },
            settypes: function(e, f) {
                e = e || null;
                f = f || null;
                if (e != null) {
                    a(this).firemaks.settings.type = e;
                } else {
                    a(this).firemaks.settings.type = a(this).firemaks.defaults.type;
                }
                if (f != null) {
                    a(this).firemaks.settings.type_child = f;
                } else {
                    a(this).firemaks.settings.type_child = a(this).firemaks.defaults.type_child;
                }
            },
            setcolors: function(e, f) {
                e = e || null;
                f = f || null;
                if (e != null) {
                    a(this).firemaks.settings.color = e;
                } else {
                    a(this).firemaks.settings.color = a(this).firemaks.defaults.color;
                }
                if (f != null) {
                    a(this).firemaks.settings.color_child = f;
                } else {
                    a(this).firemaks.settings.color_child = a(this).firemaks.defaults.color_child;
                }
            },
            setsounds: function(e, f) {
                e = e || "";
                f = f || "";
                if ((e == "") && (f == "")) {
                    if (a(this).firemaks.settings.sound) {
                        a(this).firemaks.settings.sound = false;
                    }
                    return false;
                }
                a(this).firemaks.settings.sound = true;
                a(this).firemaks.settings.sound_file = e;
                a(this).firemaks.settings.sound_file_child = f;
                return true;
            }
        };
        if (b[d]) {
            return b[d].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof d === "object" || !d) {
                return b.init.apply(this, arguments);
            } else {
                a.error('Method "' + d + '" does not exist in firemaks plugin!');
            }
        }
    };
    a.fn.firemaks.defaults = {
        fire: null,
        decrease_for_mobile: false,
        boom_count: 2,
        type: "random",
        color: "random",
        child_boom: true,
        type_child: "inherit",
        color_child: "inherit",
        sound: false,
        sound_file: "",
        sound_file_child: "",
        // Time show firework
        boom_time_from: 1.5,
        boom_time_to: 4
    };
    a.fn.firemaks.settings = {};
})(jQuery);