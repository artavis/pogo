define(["jquery","config","pixi","ViewPort"], function($,config,pixi,ViewPort){
 
	var stage, renderer, gameObjects;
	
	var bgImg, statusBar, overlay;
	var canvasRatio = config().canvasSize.width/config().canvasSize.height;
	
	var fadingOut = false;
	var fadeLevel = 0;
    // I return an initialized object.
    function GameView(){

        stage = new pixi.Stage(0x000000);
        renderer = pixi.autoDetectRenderer(config().canvasSize.width, config().canvasSize.height);
        
        gameObjects = new pixi.DisplayObjectContainer();
        
        document.getElementById("canvasHolder").appendChild(renderer.view);
        
        createBgImage();
        
        stage.addChild(bgImg);
        stage.addChild(gameObjects);
        
        return( this );
    }
    
    function createBgImage() {
		var texture = pixi.Texture.fromImage("images/starbg.png");
		bgImg = new pixi.Sprite(texture);
    }
    
    GameView.prototype = {
        renderGame: function(drawArray) {
	        this.updateDrawOrder(drawArray);
			//if(window.DEBUG) console.log(drawArray);
			if(fadingOut) {
				overlay.alpha = fadeLevel;

				fadeLevel += 0.01;
				if(fadeLevel >= 1) fadeLevel = 1;
			}
			//stage.addChildAt(bgImg,0);
	        renderer.render(stage);
        },
        updateDrawOrder: function(drawArray) {
	        //console.log(drawArray);
	        for(var i in drawArray) {
		        var view = drawArray[i].view;
		        view.updateDrawPosition();
		        gameObjects.addChildAt(view.getImage(),i);
	        }
        },
        getStage: function() {
	        return stage;
        },
        addStatusBar: function(bar){
	        statusBar = bar;
	        stage.addChild(statusBar);
	        //console.log(bar);
        },
        addCountdown: function(ctdn) {
	        stage.addChild(ctdn);
        },
        fadeOutGame: function() {
	        fadingOut = true;
        },
        showGameOverScreen: function() {
	        overlay = new pixi.Graphics();
	        overlay.width = config().canvasSize.width;
	        overlay.height = config().canvasSize.height;
	        
	        overlay.beginFill(0xFFFFFF);
	        overlay.drawRect(0,0,overlay.width,overlay.height);
	        
	        var textReadout = new pixi.Text("GAME OVER",{
		        font: 'bold 48px Arial',
		        fill: 'red'
	        });
	        textReadout.anchor.x = .5;
	        textReadout.anchor.y = .5;
	        textReadout.x = config().canvasSize.width/2;
	        textReadout.y = config().canvasSize.height/2;
	        
	        overlay.addChild(textReadout);
	        stage.addChild(overlay);
	        fadingOut = true;
        },
        showVictoryScreen: function(time,points) {
	        overlay = new pixi.Graphics();
	        overlay.width = config().canvasSize.width;
	        overlay.height = config().canvasSize.height;
	        
	        overlay.beginFill(0xFFFFFF);
	        overlay.drawRect(0,0,overlay.width,overlay.height);
	        
	        var textReadout = new pixi.Text("VICTORY",{
		        font: 'bold 48px Arial',
		        fill: 'red'
	        });
	        textReadout.anchor.x = .5;
	        textReadout.anchor.y = .5;
	        textReadout.x = config().canvasSize.width/2;
	        textReadout.y = config().canvasSize.height*1/3;
	        
	        var min = Math.floor(time/60000);
	        var sec = Math.round((time % 60000)/1000);
	        var statsText  = "time: "+min+":"+sec+"\n";
	        	statsText += "points: "+points+"\n";
	        	
	        var statsReadout = new pixi.Text(
	        	statsText,
	        	{
		        	font: 'bold 48px Arial',
					fill: 'red'
				});
	        statsReadout.anchor.x = .5;
	        statsReadout.anchor.y = .5;
	        statsReadout.x = config().canvasSize.width/2;
	        statsReadout.y = config().canvasSize.height*2/3;
	        
	        overlay.addChild(textReadout);
	        overlay.addChild(statsReadout);
	        stage.addChild(overlay);
	        fadingOut = true;
        }
    };


    // Return the base Model constructor.
    return GameView;
    
});