var JsAnimScroll = /** @class */ (function () {
    function JsAnimScroll(incrementation) {
        if (incrementation === void 0) { incrementation = 20; }
        this.obj = function () {
            return this.__obj;
        };
        this.__timeIncrementation = incrementation;
    }
    JsAnimScroll.prototype.setScrollObjectById = function (id) {
        this.__obj = document.getElementById(id);
    };
    JsAnimScroll.prototype.scroll = function (topx, duration, element) {
        if (element === void 0) { element = this.__obj; }
        this.__obj = element;
        this.__startPosition = element.scrollTop;
        this.__pxDiff = topx - this.__startPosition;
        this.__timeDuration = duration;
        this.__currentTime = 0;
        this.execute();
    };
    JsAnimScroll.prototype.execute = function () {
        var _this = this;
        this.__currentTime += this.__timeIncrementation;
        var newScrollTopValue = this.easeInOutQuad();
        this.__obj.scrollTop = newScrollTopValue;
        if (this.__currentTime < this.__timeDuration) {
            this.__timer = setTimeout(function () { return _this.execute(); }, this.__timeIncrementation);
        }
    };
    JsAnimScroll.prototype.easeInOutQuad = function () {
        //copied from https://gist.github.com/andjosh/6764939
        var t = this.__currentTime; //t = current time
        var b = this.__startPosition; //b = start value
        var c = this.__pxDiff; //c = change in value
        var d = this.__timeDuration; //d = duration
        t /= d / 2;
        if (t < 1)
            return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    return JsAnimScroll;
}());
;
var jsAnimScroll = new JsAnimScroll(20);
