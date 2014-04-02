define(["jquery","pixi","config"], function($,pixi,config){
	
	var bar, 
		pointDisplay, 
		timerDisplay, minutes=0, seconds=0,
		healthDisplay,
		enemiesDisplay
		;
    function StatusBar(){
		bar = new pixi.DisplayObjectContainer();
		
		bar.width = config().canvasSize.width;
		bar.height = config().canvasSize.height/6;
		bar.y = config().canvasSize.height*5/6;
		
		var fade = this.createBarBg();
        bar.addChild(fade);
        
		var boxWidth = bar.width/5;
		var boxHeight = bar.height*2/3;
        var boxSpace = bar.height/6;
        
        //Point Display
        var pointBox = this.createLightBox({
        	x: boxWidth - boxWidth/2 - boxSpace*2,
        	y: boxSpace
        });
        pointDisplay = this.createTextDisplay({
	        x: boxWidth/2,
	        y: boxHeight/2,
	        text: "points:\n0"
        });
        pointBox.addChild(pointDisplay);
        bar.addChild(pointBox);
          
        
        //Health Bar
        var healthBox = this.createLightBox({
        	x: boxWidth*2 - boxWidth/2 - boxSpace,
        	y: boxSpace
        });
        healthDisplay = this.createTextDisplay({
	        x: boxWidth/2,
	        y: boxHeight/2,
	        text: 'health:\n'+config().playerHealth,
        });
		healthBox.addChild(healthDisplay);
        bar.addChild(healthBox);


        //Enemies
        var enemyBox = this.createLightBox({
        	x: boxWidth*3 - boxWidth/2,
        	y: boxSpace
        });
        enemiesDisplay = this.createTextDisplay({
	        x: boxWidth/2,
	        y: boxHeight/2,
	        text: 'enemies:\n10',
        });
		enemyBox.addChild(enemiesDisplay);
        bar.addChild(enemyBox);

        
        //Timer Display
        var timerBox = this.createLightBox({
        	x: boxWidth*4 - boxWidth/2 + boxSpace,
        	y: boxSpace
        });
        timerDisplay = this.createTextDisplay({
	        x: boxWidth/2,
	        y: boxHeight/2,
	        text: '00:00',
	        font: 'bold 20pt Arial'
        });
		timerBox.addChild(timerDisplay);
        bar.addChild(timerBox);
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
		createLightBox: function(pos) {
			var lightBox = new pixi.Graphics();
			var boxWidth = bar.width/5;
			var boxHeight = bar.height*2/3;

			lightBox.width = boxWidth;
			lightBox.height = boxHeight;
			lightBox.x = pos.x;
			lightBox.y = pos.y;
			
			lightBox.beginFill(0xFFFFFF,.5);
	        lightBox.drawRect(0,0,lightBox.width,lightBox.height);
	        lightBox.endFill();
	        
	        return lightBox;
		},
		createTextDisplay: function(opts) {
			var fontStyle = opts.font || "bold 16pt Arial";
			var fill = opts.fill || "red";
			var textF = opts.text || "";
			
			var txt = new pixi.Text(textF,{
				font: fontStyle,
				fill: fill,
				align: "center"
			});
			txt.anchor.x = .5;
			txt.anchor.y = .5;
			txt.x = opts.x;
			txt.y = opts.y;
			return txt;
		}
    };
    
    StatusBar.updatePoints = function(pts) {
	    pointDisplay.setText("points\n"+pts);
    };
    StatusBar.updateEnemyCount = function(enemies) {
	    enemiesDisplay.setText("enemies\n"+enemies);
    };
    StatusBar.updatePlayerHealth = function(health) {
	    healthDisplay.setText("health\n"+health);
    };
    StatusBar.updateTimer = function() {
	    seconds += 1;
	    if(seconds == 60){ minutes++; seconds=0; }
	    var secDisp = seconds < 10 ? "0"+seconds : seconds;
	    var minDisp = minutes < 10 ? "0"+minutes : minutes;
	    
	    timerDisplay.setText(minDisp+":"+secDisp);
    };
    StatusBar.reset = function() {
	    pointDisplay.setText("points\n0");
	    enemiesDisplay.setText("enemies\n0");
	    healthDisplay.setText("health\n10");
	    timerDisplay.setText("00:00");
	    
	    seconds = 0;
	    minutes = 0;
    }

    return StatusBar;
});