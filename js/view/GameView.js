define(["jquery","config","pixi","ViewPort"], function($,config,pixi,ViewPort){
 
	var stage, renderer, gameObjects;
	
	var bgImg;
	var canvasRatio = config.canvasSize.width/config.canvasSize.height;
    // I return an initialized object.
    function GameView(){

        stage = new pixi.Stage(0x000000);
        renderer = pixi.autoDetectRenderer(config.canvasSize.width, config.canvasSize.height);
        
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
	        stage.addChild(bar);
	        console.log(bar);
        }
    };


    // Return the base Model constructor.
    return GameView;
    
});