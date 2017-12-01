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
	private cubic_bezier(bx: number, by: number, cx: number, cy: number, dt: number = 0.01){
        let result = [];	
        for (let t = 0; t <= (1+dt); t += dt) {
            let x = 3*bx*t*(1-2*t+t*t)+3*cx*t*t*(1-t)+t*t*t;
            let y = 3*by*t*(1-2*t+t*t)+3*cy*t*t*(1-t)+t*t*t;
            let _p = [x,y];
            result.push(_p);
        }
        return result;
	}
	private cubic_bezier_multiplicator(points, ct: number, sd: number): number{
        let temp = 0;
        const x = ct/sd;
        for(let i=0; i<points.length; i++){
            if(points[i][0]<x){
                temp = points[i][0];
            }
            else{
                if((points[i][0]-x)<(x-temp)){
                    return points[i][1];
                }
                else{
                    return points[i-1][1];
                }
            }
        }
	}
    private exec(elementToScroll: any, bezierPoints, dt:number, durationStep: number, scrollDuration: number, pixelsToScroll: number, scrollFrom: number){
        dt += durationStep;
        let y = pixelsToScroll*this.cubic_bezier_multiplicator(bezierPoints, dt ,scrollDuration)+scrollFrom;
        this.setScrollPos(elementToScroll, y);
        let parent = this;
        if(dt<scrollDuration){
            setTimeout(function(){parent.exec(elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom);},durationStep);
        }
    }
	public linear(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let bezierPoints = parent.cubic_bezier(0,0,1,1);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    }
    public easeInOutQuad(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{

		let parent: any = this;
        let scrollFrom: number = parent.getScrollFrom(elementToScroll);
        let pixelsToScroll: number = scrollTo - scrollFrom;
        let dt = 0;
        let bezierPoints = parent.cubic_bezier(0.455,0.03,0.515,0.955);
        let exec = function(){
            dt += durationStep;
            let y = pixelsToScroll*parent.cubic_bezier_multiplicator(bezierPoints, dt,scrollDuration)+scrollFrom;
            parent.setScrollPos(elementToScroll, y);
            if(dt<scrollDuration){
                setTimeout(exec,durationStep);
            }
        }
        exec();
    }
}
var jsAnimScroll = new JsAnimScroll;