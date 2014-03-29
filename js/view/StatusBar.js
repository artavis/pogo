define(["jquery","pixi","config"], function($,pixi,config){
	
	var bar, pointDisplay, timerDisplay, minutes=0, seconds=0;
    function StatusBar(){
		bar = new pixi.DisplayObjectContainer();
		
		bar.width = config.canvasSize.width;
		bar.height = config.canvasSize.height/6;
		bar.y = config.canvasSize.height*5/6;
		
		var fade = this.createBarBg();
        bar.addChild(fade);
        
        
        //Point Display
        var pointBox = this.createLightBox();
		pointBox.x = bar.height/6;
		pointBox.y = bar.height/6;
        bar.addChild(pointBox);
        
        pointDisplay = this.createPointDisplay();
        pointBox.addChild(pointDisplay);
        pointDisplay.anchor.x = .5;
        pointDisplay.anchor.y = .5;
        pointDisplay.x = pointBox.width/2;
        pointDisplay.y = pointBox.height/2;
        
        
        //Timer Display
        var timerBox = this.createLightBox();
		timerBox.x = bar.width - timerBox.width - bar.height/6;
		timerBox.y = bar.height/6;
        bar.addChild(timerBox);
        
        timerDisplay = this.createTimerDisplay();
        timerBox.addChild(timerDisplay);
        timerDisplay.anchor.x = .5;
        timerDisplay.anchor.y = .5;
        timerDisplay.x = timerBox.width/2;
        timerDisplay.y = timerBox.height/2;
        
        return( bar );
    }
    
    StatusBar.prototype = {
		createBarBg: function() {
			var fade = new pixi.Graphics();
			fade.beginFill(0x333333,.5)
	        fade.drawRect(0,0,bar.width,bar.height);
	        fade.endFill();
	        
	        return fade;
		},
		createLightBox: function() {
			var lightBox = new pixi.Graphics();
			lightBox.width = bar.width/5;
			lightBox.height = bar.height*2/3;
			
			lightBox.beginFill(0xFFFFFF,.5);
	        lightBox.drawRect(0,0,lightBox.width,lightBox.height);
	        lightBox.endFill();
	        
	        return lightBox;
		},
		createPointDisplay: function() {
			var txt = new pixi.Text("points\n0",{
				font: 'bold 16pt Arial',
				fill: "red",
				align: "center"
			});
			return txt;
		},
		createTimerDisplay: function() {
			var txt = new pixi.Text("00:00",{
				font: 'bold 20pt Arial',
				fill: "red",
				align: "center"
			});
			return txt;
		}
    };
    
    StatusBar.updatePoints = function(pts) {
	    pointDisplay.setText("points\n"+pts);
    };
    StatusBar.updateTimer = function() {
	    seconds += 1;
	    if(seconds == 60){ minutes++; seconds=0; }
	    var secDisp = seconds < 10 ? "0"+seconds : seconds;
	    var minDisp = minutes < 10 ? "0"+minutes : minutes;
	    
	    timerDisplay.setText(minDisp+":"+secDisp);
    };

    return StatusBar;
});