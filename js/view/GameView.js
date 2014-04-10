define(["jquery","config","pixi","ViewPort"], function($,config,pixi,ViewPort){
 
	var stage, renderer, gameObjects;
	
	var bgImg, statusBar, overlay, _startMenu;
	var canvasRatio = config().canvasSize.width/config().canvasSize.height;
	
	var fadingOut = false;
	var fadeLevel = 0;
	var hitFlash, showFlash = false, hideFlash = false;
	
	_renderingGame = false;
    // I return an initialized object.
    function GameView(){

        stage = new pixi.Stage(0x000000,true);
        renderer = pixi.autoDetectRenderer(config().canvasSize.width, config().canvasSize.height);
        
        gameObjects = new pixi.DisplayObjectContainer();
        
        document.getElementById("canvasHolder").appendChild(renderer.view);
        
        bgImg = createBgImage();
        hitFlash = createHitFlash();
        
        drawBG();
        stage.addChild(gameObjects);
        renderer.render(stage);
        
        return( this );
    }
    
    function drawBG() {
        stage.addChild(bgImg);       
    }

    
    function createBgImage() {
		var texture = pixi.Texture.fromImage("images/starbg.png");
		return new pixi.Sprite(texture);
    }
    function createHitFlash() {
        graphic = new pixi.Graphics();
        graphic.width = config().canvasSize.width;
        graphic.height = config().canvasSize.height;
        
        graphic.beginFill(0xFF0000);
        graphic.drawRect(0,0,graphic.width,graphic.height);
        
        return graphic;
    }

    
    GameView.prototype = {
        renderGame: function(drawArray) {
	        if(!_renderingGame) return;
	        this.updateDrawOrder(drawArray);
			//if(window.DEBUG) console.log(drawArray);
			if(fadingOut) {
				overlay.alpha = fadeLevel;

				fadeLevel += 0.01;
				if(fadeLevel >= 1) fadeLevel = 1;
			}
			
			if(showFlash) this.showHitFlash();  
			
			
			//stage.addChildAt(bgImg,0);
	        renderer.render(stage);
	        
	        if(hideFlash) this.hideHitFlash();  
        },
        addStartMenu: function(menu) {
	        _startMenu = menu;
	        stage.addChild(_startMenu);
	        renderer.render(stage);
        },
        hideStartMenu: function() {
	        stage.removeChild(_startMenu);
        },
        beginGameRender: function() {
	        _renderingGame = true;
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
        triggerHitFlash: function() {
	        showFlash = true;
        },
        showHitFlash: function() {
	        stage.addChild(hitFlash);
	        showFlash = false;
	        hideFlash = true;
        },
        hideHitFlash: function() {
	        stage.removeChild(hitFlash);
	        hideFlash = false;
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