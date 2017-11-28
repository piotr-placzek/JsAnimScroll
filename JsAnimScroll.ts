class JsAnimScroll{
   private ts() :number{
       return 20;
   }
   private getScrollFrom(elementToScroll: any): number{
         if(elementToScroll != window){
            return elementToScroll.scrollTop;
        }
        else{
            return elementToScroll.scrollY;
        }
    }
    private setScrollPos(elementToScroll: any, y: number): void{
        if(elementToScroll != window)
        {
            elementToScroll.scrollTop = y;
        }
        else{
            elementToScroll.scrollTo(0,y);
        }
    }
    public easeInOutQuad(elementToScroll: any, scrollTo: number, scrollDuration: number): void{
		let parent: any = this;
        let scrollFrom: number = parent.getScrollFrom(elementToScroll);
        let pixelsToScroll: number = scrollTo - scrollFrom;
        let dt = 0;
        let calc = function(t, b, c, d){
            t /= d/2;
            if (t < 1){
                return c/2*t*t + b;
            }
            else{
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            }
        }
        let exec = function(){
            dt += parent.ts();
            let y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if(dt<scrollDuration){
                setTimeout(exec,parent.ts());
            }
        }
        exec();
    }
}
var jsAnimScroll = new JsAnimScroll;