interface Point {
    x: number;
	y: number;
	z: number;
	t: number;
	dt: number;
}

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
	private cubic_bezier(B: Point, C: Point, dt: number = 0.01): Point[]{
		let result: Point[];
		let _i=0;
		for(let _t=0; _t<=1; _t+=dt){
			let _p: Point;
			_p.x = 0;
			_p.y = 0;
			_p.t = _t;
			_p.dt = dt;
			_p.z = 0;
			result[_i] = _p;
			_i++;
		}
		return result;
	}
	private cubic_bezier_multiplicator(points: Point[], ct: number, sd: number): number{
		return 0;
	}
//	private cubic_bezier_multiplier(B: number, C: number, ct: number, dt: number): number{
//		const t = ct/dt;
//		return 3*B*t*(1-2*t+t*t)+3*C*t*t*(1-t)+t*t*t;
//	}
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
//            let y = calc(dt, scrollFrom, pixelsToScroll, scrollDuration);
//			  let y = pixelsToScroll*parent.cubic_bezier_multiplier(0,1,dt,scrollDuration)+scrollFrom;
			let y = 1;
            parent.setScrollPos(elementToScroll, y);
            if(dt<scrollDuration){
                setTimeout(exec,durationStep);
            }
        }
        exec();
    }
    public easeInOutQuad(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
//		cubic-bezier(0.455, 0.03, 0.515, 0.955);	easeInOutQuad
//		cubic-bezier(0.68, -0.55, 0.265, 1.55);		easeInOutBack
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