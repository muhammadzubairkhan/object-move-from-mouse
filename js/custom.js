$(document).ready(function() {
    Math.Vector = function(d, e) {
        this.x = d;
        this.y = e;
    };
    Math.Vector.prototype = {
        clone: function() {
            return new Math.Vector(this.x, this.y);
        },
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        },
        neg: function() {
            return this.clone().negate();
        },
        addeq: function(d) {
            this.x += d.x;
            this.y += d.y;
            return this;
        },
        subeq: function(d) {
            return this.addeq(d.neg());
        },
        add: function(d) {
            return this.clone().addeq(d);
        },
        sub: function(d) {
            return this.clone().subeq(d);
        },
        multeq: function(d) {
            this.x *= d;
            this.y *= d;
            return this;
        },
        diveq: function(d) {
            this.x /= d;
            this.y /= d;
            return this;
        },
        mult: function(d) {
            return this.clone().multeq(d);
        },
        div: function(d) {
            return this.clone().diveq(d);
        },
        dot: function(d) {
            return this.x * d.x + this.y * d.y;
        },
        length: function() {
            return Math.sqrt(this.dot(this));
        },
        normal: function() {
            return this.clone().diveq(this.length());
        }
    };
    function a(k) {
        var g = $(this), i = g.offset(), d = {
            x: i.left + g.outerWidth() / 2,
            y: i.top + g.outerHeight() / 2
        }, f = new Math.Vector(d.x - k.pageX, d.y - k.pageY), e = g.outerWidth() / 2;
        if (f.length() >= e) {
            return;
        }
        var j = f.normal().multeq(e).sub(f), l = {
            left: i.left + j.x,
            top: i.top + j.y
        };
        var h = parseInt(g.css("padding-left"));
        if (l.left < -h) {
            l.left = -h;
        } else {
            if (l.left + g.outerWidth() - h > $(document).width()) {
                l.left = $(document).width() - g.outerWidth() + h;
            }
        }
        if (l.top < -h) {
            l.top = -h;
        } else {
            if (l.top + g.outerHeight() - h > $(document).height()) {
                l.top = $(document).height() - g.outerHeight() + h;
            }
        }
        g.offset(l);
    }
    function b() {
        $(this).bind("mousemove", a);
    }
    function c() {
        $(this).unbind("mousemove", a);
    }
    $(function() {
        $(".option").bind("mouseover", b);
        $(".option").bind("mouseout", c);
    });
});