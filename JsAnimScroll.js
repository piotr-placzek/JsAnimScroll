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
    JsAnimScroll.prototype.cubic_bezier = function (bx, by, cx, cy, dt) {
        if (dt === void 0) { dt = 0.01; }
        var result = [];
        for (var t = 0; t <= (1 + dt); t += dt) {
            var x = 3 * bx * t * (1 - 2 * t + t * t) + 3 * cx * t * t * (1 - t) + t * t * t;
            var y = 3 * by * t * (1 - 2 * t + t * t) + 3 * cy * t * t * (1 - t) + t * t * t;
            var _p = [x, y];
            result.push(_p);
        }
        return result;
    };
    JsAnimScroll.prototype.cubic_bezier_multiplicator = function (points, ct, sd) {
        var temp = 0;
        var x = ct / sd;
        for (var i = 0; i < points.length; i++) {
            if (points[i][0] < x) {
                temp = points[i][0];
            }
            else {
                if ((points[i][0] - x) < (x - temp)) {
                    return points[i][1];
                }
                else {
                    return points[i - 1][1];
                }
            }
        }
    };
    JsAnimScroll.prototype.exec = function (elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom) {
        dt += durationStep;
        var y = pixelsToScroll * this.cubic_bezier_multiplicator(bezierPoints, dt, scrollDuration) + scrollFrom;
        this.setScrollPos(elementToScroll, y);
        var parent = this;
        if (dt < scrollDuration) {
            setTimeout(function () { parent.exec(elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom); }, durationStep);
        }
    };
    JsAnimScroll.prototype.linear = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier(0, 0, 1, 1);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    JsAnimScroll.prototype.easeInOutQuad = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier(0.455, 0.03, 0.515, 0.955);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    return JsAnimScroll;
}());
var jsAnimScroll = new JsAnimScroll;
