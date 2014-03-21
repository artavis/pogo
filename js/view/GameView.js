define(["jquery","config","pixi","ViewPort"], function($,config,pixi,ViewPort){
 
	var stage, renderer;
	
    // I return an initialized object.
    function GameView(){

        stage = new pixi.Stage(0x888888);
        renderer = pixi.autoDetectRenderer(config.canvasSize.width, config.canvasSize.height);
        
        document.getElementById("canvasHolder").appendChild(renderer.view);
        
        // Return this object reference.
        return( this );
    }
    
    // Define the class methods.
    GameView.prototype = {
        render: function(drawArray) {
	        this.updateDrawOrder(drawArray);

	        renderer.render(stage);
        },
        updateDrawOrder: function(drawArray) {
	        //console.log(drawArray);
	        for(var i in drawArray) {
		        var view = drawArray[i].view;
		        view.updateDrawPosition();
		        stage.addChildAt(view.getImage(),i);
	        }
        }
    };


    // Return the base Model constructor.
    return GameView;
    
});