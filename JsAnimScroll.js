var JsAnimScroll = /** @class */ (function () {
    function JsAnimScroll() {
        this.__gds__ = 20;
        this.__gsd__ = 3000;
    }
    JsAnimScroll.prototype.globalDurationStep = function () {
        return this.__gds__;
    };
    JsAnimScroll.prototype.globalScrollDuration = function () {
        return this.__gsd__;
    };
    JsAnimScroll.prototype.setGlobalDurationStep = function (val) {
        this.__gds__ = val;
    };
    JsAnimScroll.prototype.setGlobalScrollDuration = function (val) {
        this.__gsd__ = val;
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
    JsAnimScroll.prototype.linear = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var scrollFrom = parent.getScrollFrom(elementToScroll);
        var pixelsToScroll = scrollTo - scrollFrom;
        var dt = 0;
        var calc = function (t, b, c, d) {
            return (t / parent.ts()) * ((c * parent.ts()) / d) + b;
        };
        var exec = function () {
            dt += durationStep;
            var y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if (dt < scrollDuration) {
                setTimeout(exec, durationStep);
            }
        };
        exec();
    };
    JsAnimScroll.prototype.easeInOutQuad = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
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
            dt += durationStep;
            var y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if (dt < scrollDuration) {
                setTimeout(exec, durationStep);
            }
        };
        exec();
    };
    return JsAnimScroll;
}());
var jsAnimScroll = new JsAnimScroll;
