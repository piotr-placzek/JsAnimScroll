class JsAnimScroll{
	private __gds__ :number = 20;
	private __gsd__ :number = 3000;
   public globalDurationStep() :number{
       return this.__gds__;
   }
   public globalScrollDuration() :number{
	   return this.__gsd__;
   }
   public setGlobalDurationStep(val: number){
	   this.__gds__ = val;
   }
   public setGlobalScrollDuration(val: number){
	   this.__gsd__ = val;
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
	public linear(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let scrollFrom: number = parent.getScrollFrom(elementToScroll);
        let pixelsToScroll: number = scrollTo - scrollFrom;
        let dt = 0;
        let calc = function(t, b, c, d){
			return (t/parent.ts())*((c*parent.ts())/d)+b;
        }
        let exec = function(){
            dt += durationStep;
            let y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if(dt<scrollDuration){
                setTimeout(exec,durationStep);
            }
        }
        exec();
    }
    public easeInOutQuad(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
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
            dt += durationStep;
            let y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
            parent.setScrollPos(elementToScroll, y);
            if(dt<scrollDuration){
                setTimeout(exec,durationStep);
            }
        }
        exec();
    }
}
var jsAnimScroll = new JsAnimScroll;