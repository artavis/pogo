define(["jquery","pixi","config"], function($,pixi,config){
	
	var bar, pointDisplay;
    function StatusBar(){
		bar = new pixi.DisplayObjectContainer();
		
		bar.width = config.canvasSize.width;
		bar.height = config.canvasSize.height/6;
		bar.y = config.canvasSize.height*5/6;
		
		var fade = this.createBarBg();
        bar.addChild(fade);
        
        var pointBox = this.createPointBox();
        bar.addChild(pointBox);
        
        pointDisplay = this.createPointDisplay();
        pointBox.addChild(pointDisplay);
        pointDisplay.anchor.x = .5;
        pointDisplay.anchor.y = .5;
        pointDisplay.x = pointBox.width/2;
        pointDisplay.y = pointBox.height/2;
        
        
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
		createPointBox: function() {
			var lightBox = new pixi.Graphics();
			lightBox.x = bar.height/6;
			lightBox.y = bar.height/6;
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
		}
    };
    
    StatusBar.updatePoints = function(pts) {
	    pointDisplay.setText("points\n"+pts);
    };

    return StatusBar;
});