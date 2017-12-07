/**
 * @brief JavaScript class for smoth scroll animation a webpage without jQuery (pure js; written with TypeScript).
 * @author Piot <petrow17> Płaczek
 * @version 1.0
 * @date: 2017-12-02
 * @license: MIT
 */
var JsAnimScroll = /** @class */ (function () {
    function JsAnimScroll() {
        this.__gds__ = 20; //*< Global duration step(GDS).
        this.__gsd__ = 3000; //*< Global scroll duration (GSD).
    }
    /**
    * @brief Global duration step getter.
    * @return Value of global duration step.
    */
    JsAnimScroll.prototype.globalDurationStep = function () {
        return this.__gds__;
    };
    /**
    * @brief Global scroll duration getter.
    * @return Value of global scroll duration.
    */
    JsAnimScroll.prototype.globalScrollDuration = function () {
        return this.__gsd__;
    };
    /**
    * @brief Global duration step setter.
    * @param [in] number val New value of global duration step.
    */
    JsAnimScroll.prototype.setGlobalDurationStep = function (val) {
        this.__gds__ = val;
    };
    /**
    * @brief Global duration step setter.
    * @param [in] number val New value of global scroll duration.
    */
    JsAnimScroll.prototype.setGlobalScrollDuration = function (val) {
        this.__gsd__ = val;
    };
    /**
     * @brief Returns the start position of scrolling.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @return ScrollTop parameter if the elementToScroll is not a window otherwise it will be scrollY parameter.
     */
    JsAnimScroll.prototype.getScrollFrom = function (elementToScroll) {
        if (elementToScroll != window) {
            return elementToScroll.scrollTop;
        }
        else {
            return elementToScroll.scrollY;
        }
    };
    /**
     * @brief Scroll elementToScroll to given y position.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number y Scroll to this position.
     */
    JsAnimScroll.prototype.setScrollPos = function (elementToScroll, y) {
        if (elementToScroll != window) {
            elementToScroll.scrollTop = y;
        }
        else {
            elementToScroll.scrollTo(0, y);
        }
    };
    /**
     * @brief Creates an array with points of cubic bezier curve.
     * @param [in] number bx X coord value for second point of curve.
     * @param [in] number by Y coord value for second point of curve.
     * @param [in] number cx X coord value for third point of curve.
     * @param [in] number cy Y coord value for third point of curve.
     * @param [in] number dt Single step for t parameter of curve.
     * @return Array with points of cubic bezier curve.
     */
    JsAnimScroll.prototype.cubic_bezier_array = function (bx, by, cx, cy, dt) {
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
    /**
     * @brief This function maps the x coordinates to the value of the time parameter.
     * @param [in] array points Array with points of cubic bezier curve.
     * @param [in] number ct Current time of scroll.
     * @param [in] number sd Scroll duration.
     * @return The approximate value of the y coordinate at a given moment ct.
     */
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
    /**
     * @brief Execution of scroll timing function.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] array bezierPoints Array with points of cubic bezier curve.
     * @param [in] number dt Current time of scroll.
     * @param [in] number durationStep Scroll duration step.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number pixelsToScroll Sum of pixels to scroll.
     * @param [in] number scrollFrom Start position of scrolling.
     */
    JsAnimScroll.prototype.exec = function (elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom) {
        dt += durationStep;
        var y = pixelsToScroll * this.cubic_bezier_multiplicator(bezierPoints, dt, scrollDuration) + scrollFrom;
        this.setScrollPos(elementToScroll, y);
        var parent = this;
        if (dt < scrollDuration) {
            setTimeout(function () { parent.exec(elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom); }, durationStep);
        }
    };
    /**
     * @brief Scroll timing function.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    JsAnimScroll.prototype.linear = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier_array(0, 0, 1, 1);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    /**
     * @brief Scroll timing function.
      * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    JsAnimScroll.prototype.easeInOutQuad = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier_array(0.455, 0.03, 0.515, 0.955);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    /**
     * @brief Scroll timing function.
      * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    JsAnimScroll.prototype.easeInOutBack = function (elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier_array(0.68, -0.55, 0.265, 1.55);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    /**
     * @brief Scroll timing function.
     * @param [in] number px1 X coord value for second point of curve.
     * @param [in] number py1 Y coord value for second point of curve.
     * @param [in] number px2 X coord value for third point of curve.
     * @param [in] number py2 Y coord value for third point of curve.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    JsAnimScroll.prototype.cubic_bezier = function (px1, py1, px2, py2, elementToScroll, scrollTo, scrollDuration, durationStep) {
        if (scrollDuration === void 0) { scrollDuration = this.globalScrollDuration(); }
        if (durationStep === void 0) { durationStep = this.globalDurationStep(); }
        var parent = this;
        var bezierPoints = parent.cubic_bezier_array(px1, py1, px2, py2);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    };
    return JsAnimScroll;
}());
var jsAnimScroll = new JsAnimScroll; //*< Create a global object
