/**
 * @brief JavaScript class for smoth scroll animation a webpage without jQuery (pure js; written with TypeScript).
 * @author Piot <petrow17> Płaczek
 * @version 1.0
 * @date: 2017-12-02
 * @license: MIT
 */
class JsAnimScroll{
   private __gds__ :number = 20;  //*< Global duration step(GDS).
   private __gsd__ :number = 3000; //*< Global scroll duration (GSD).
    /**
    * @brief Global duration step getter.
    * @return Value of global duration step.
    */
   public globalDurationStep() :number{
       return this.__gds__;
   }
    /**
    * @brief Global scroll duration getter.
    * @return Value of global scroll duration.
    */
   public globalScrollDuration() :number{
	   return this.__gsd__;
   }
    /**
    * @brief Global duration step setter.
    * @param [in] number val New value of global duration step.
    */
   public setGlobalDurationStep(val: number){
	   this.__gds__ = val;
   }
    /**
    * @brief Global duration step setter.
    * @param [in] number val New value of global scroll duration.
    */
   public setGlobalScrollDuration(val: number){
	   this.__gsd__ = val;
   }
    /**
     * @brief Returns the start position of scrolling.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @return ScrollTop parameter if the elementToScroll is not a window otherwise it will be scrollY parameter.
     */
   private getScrollFrom(elementToScroll: any): number{
         if(elementToScroll != window){
            return elementToScroll.scrollTop;
        }
        else{
            return elementToScroll.scrollY;
        }
    }
    /**
     * @brief Scroll elementToScroll to given y position.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number y Scroll to this position.
     */
    private setScrollPos(elementToScroll: any, y: number): void{
        if(elementToScroll != window)
        {
            elementToScroll.scrollTop = y;
        }
        else{
            elementToScroll.scrollTo(0,y);
        }
    }
    /**
     * @brief Creates an array with points of cubic bezier curve.
     * @param [in] number bx X coord value for second point of curve.
     * @param [in] number by Y coord value for second point of curve.
     * @param [in] number cx X coord value for third point of curve.
     * @param [in] number cy Y coord value for third point of curve.
     * @param [in] number dt Single step for t parameter of curve.     
     * @return Array with points of cubic bezier curve.
     */
	private cubic_bezier_array(bx: number, by: number, cx: number, cy: number, dt: number = 0.01){
        let result = [];	
        for (let t = 0; t <= (1+dt); t += dt) {
            let x = 3*bx*t*(1-2*t+t*t)+3*cx*t*t*(1-t)+t*t*t;
            let y = 3*by*t*(1-2*t+t*t)+3*cy*t*t*(1-t)+t*t*t;
            let _p = [x,y];
            result.push(_p);
        }
        return result;
	}
    /**
     * @brief This function maps the x coordinates to the value of the time parameter.
     * @param [in] array points Array with points of cubic bezier curve.
     * @param [in] number ct Current time of scroll.
     * @param [in] number sd Scroll duration.
     * @return The approximate value of the y coordinate at a given moment ct.
     */
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
    private exec(elementToScroll: any, bezierPoints, dt:number, durationStep: number, scrollDuration: number, pixelsToScroll: number, scrollFrom: number){
        dt += durationStep;
        let y = pixelsToScroll*this.cubic_bezier_multiplicator(bezierPoints, dt ,scrollDuration)+scrollFrom;
        this.setScrollPos(elementToScroll, y);
        let parent = this;
        if(dt<scrollDuration){
            setTimeout(function(){parent.exec(elementToScroll, bezierPoints, dt, durationStep, scrollDuration, pixelsToScroll, scrollFrom);},durationStep);
        }
    }
    /**
     * @brief Scroll timing function.
     * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
	public linear(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let bezierPoints = parent.cubic_bezier_array(0,0,1,1);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    }
    /**
     * @brief Scroll timing function.
      * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    public easeInOutQuad(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let bezierPoints = parent.cubic_bezier_array(0.455,0.03,0.515,0.955);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    }
    /**
     * @brief Scroll timing function.
      * @param [in] any elementToScroll Object of element to be scrolled.
     * @param [in] number scrollTo End Scroll position.
     * @param [in] number scrollDuration Scroll duration.
     * @param [in] number durationStep Scroll duration step.
     */
    public easeInOutBack(elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let bezierPoints = parent.cubic_bezier_array(0.68,-0.55,0.265,1.55);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    }
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
    public cubic_bezier(px1: number, py1: number, px2: number, py2: number, elementToScroll: any, scrollTo: number, scrollDuration: number = this.globalScrollDuration(), durationStep: number = this.globalDurationStep()): void{
		let parent: any = this;
        let bezierPoints = parent.cubic_bezier_array(px1, py1, px2, py2);
        parent.exec(elementToScroll, bezierPoints, 0, durationStep, scrollDuration, (scrollTo - parent.getScrollFrom(elementToScroll)), parent.getScrollFrom(elementToScroll));
    }
}
var jsAnimScroll = new JsAnimScroll;  //*< Create a global object