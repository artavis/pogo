define(["jquery","requestAnimFrame","config","Map","Pogo"], 
function($,       requestAnimFrame,  config,  Map,  Pogo) {
    
    function GameController() {
	    var self = this;
	    
	    var _gameStartTime=0, _currentTime = 0;
	    
	    var view, canvas, ctx, pogo, gameMap;
	    
	    var stage;

	    function init() {
			canvas = document.querySelector("#canvas");
		    ctx = canvas.getContext("2d");
			
			gameMap = new Map();
			
			var space = gameMap.spaces[gameMap.spaces.length-1];
			//pogo = new Pogo(space);
			
			
			stage = new createjs.Stage("canvas");
			var circle = new createjs.Shape();
			circle.graphics.beginFill("red").drawCircle(0, 0, 50);
			circle.x = 100;
			circle.y = 100;
			stage.addChild(circle);
			
			stage.update();
			
		    //Start the game loop
		    //requestAnimFrame(gameLoop);
    
	    }
	    
	    function gameLoop(t) {
		    //set clock and delta since last frame
		    var dt = t - _currentTime;
		    _currentTime = t;

		    canvas.width = canvas.width;
		    
		    //Update all game entities
		    update(dt);		    
		    
		    //Draw the game
		    draw();

		    //fire next loop
		    requestAnimFrame(gameLoop);
	    }
	    
	    function update(dt) {
		    pogo.update(dt);
	    }
	    function draw() {
		    gameMap.draw();
		    pogo.draw();
	    }
	    
	    //Exposed Public Methods
	    this.gameStartTime = function() {
		    return _gameStartTime;
	    };
	    this.getStage = function() {
		  	return stage;  
	    };
	    
	    init();
    }

    return GameController;
    
});