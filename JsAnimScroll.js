var JsAnimScroll = /** @class */ (function () {
    function JsAnimScroll() {
    }
    JsAnimScroll.prototype.ts = function () {
        return 20;
    };
    JsAnimScroll.prototype.getScrollFrom = function (elementToScroll) {
        if (elementToScroll != window) {
            return elementToScroll.scrollTop;
        }
        else {
            return elementToScroll.scrollY;
        }
    };
    JsAnimScroll.prototype.setScrollPos = function (elementToScroll, y) {
        if (elementToScroll != window) {
            elementToScroll.scrollTop = y;
        }
        else {
            elementToScroll.scrollTo(0, y);
        }
    };
    JsAnimScroll.prototype.linear = function (elementToScroll, scrollTo, scrollDuration) {
        var parent = this;
        var scrollFrom = parent.getScrollFrom(elementToScroll);
        var pixelsToScroll = scrollTo - scrollFrom;
        var dt = 0;
        var calc = function (t, b, c, d) {
            return (t / parent.ts()) * ((c * parent.ts()) / d) + b;
        };
        var exec = function () {
            dt += parent.ts();
            var y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if (dt < scrollDuration) {
                setTimeout(exec, parent.ts());
            }
        };
        exec();
    };
    JsAnimScroll.prototype.easeInOutQuad = function (elementToScroll, scrollTo, scrollDuration) {
        var parent = this;
        var scrollFrom = parent.getScrollFrom(elementToScroll);
        var pixelsToScroll = scrollTo - scrollFrom;
        var dt = 0;
        var calc = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t + b;
            }
            else {
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        };
        var exec = function () {
            dt += parent.ts();
            var y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if (dt < scrollDuration) {
                setTimeout(exec, parent.ts());
            }
        };
        exec();
    };
    return JsAnimScroll;
}());
var jsAnimScroll = new JsAnimScroll;
