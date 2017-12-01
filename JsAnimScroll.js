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
    JsAnimScroll.prototype.cubic_bezier = function (B, C, dt) {
        if (dt === void 0) { dt = 0.01; }
        var result;
        var _i = 0;
        for (var _t = 0; _t <= 1; _t += dt) {
            var _p = void 0;
            _p.x = 0;
            _p.y = 0;
            _p.t = _t;
            _p.dt = dt;
            _p.z = 0;
            result[_i] = _p;
            _i++;
        }
        return result;
    };
    JsAnimScroll.prototype.cubic_bezier_multiplicator = function (points, ct, sd) {
        return 0;
    };
    //	private cubic_bezier_multiplier(B: number, C: number, ct: number, dt: number): number{
    //		const t = ct/dt;
    //		return 3*B*t*(1-2*t+t*t)+3*C*t*t*(1-t)+t*t*t;
    //	}
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
            //            let y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            var y = pixelsToScroll * parent.cubic_bezier_multiplier(0, 1, dt, scrollDuration) + scrollFrom;
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
        //		cubic-bezier(0.455, 0.03, 0.515, 0.955);	easeInOutQuad
        //		cubic-bezier(0.68, -0.55, 0.265, 1.55);		easeInOutBack
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
