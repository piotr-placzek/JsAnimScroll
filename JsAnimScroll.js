/*

The MIT License (MIT)

Copyright (c) Fri Nov 24 2017 Piotr <petrow17> Płaczek piotr.placzek.91@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
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
