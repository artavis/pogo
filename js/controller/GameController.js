define(["jquery","requestAnimFrame","config","Map","Pogo"], 
function($,       requestAnimFrame,  config,  Map,  Pogo) {
    
    function GameController() {
	    var self = this;
	    
	    var _gameStartTime=0, _currentTime = 0;
	    
	    var view, canvas, ctx, pogo, gameMap;
	    var gameEntities = [], drawnEntities = [];
	    var stage;
	    var paused = false;

	    function init() {
			canvas = document.querySelector("#canvas");
		    ctx = canvas.getContext("2d");
			
			gameMap = new Map();
			
			for(var i in gameMap.spaces) {
				var pogo = new Pogo(gameMap.spaces[i]);
				gameEntities.push(pogo);
			}
						
		    //Start the game loop
		    requestAnimFrame(gameLoop);
		    
		    $("#pauser").on("click",function(){ paused = !paused; });
    
	    }
	    
	    function gameLoop(t) {
		    //set clock and delta since last frame
		    var dt = t - _currentTime;
		    _currentTime = t;
		    
		    if(paused) return;
		    //Update all game entities
		    update(dt);		    
		    
		    //Update the draw order
		    updateDrawOrder();
		    
		    //Draw the game
		    draw();

		    //fire next loop
		    requestAnimFrame(gameLoop);
	    }
	    
	    function update(dt) {
		    for(var i in gameEntities) gameEntities[i].update(dt);
	    }
	    function draw() {
		    canvas.width = canvas.width;
		    for(var i in drawnEntities) drawnEntities[i].draw();
	    }
	    function updateDrawOrder(){
		    drawnEntities = [];
		    for(var i in gameMap.spaces) {
			    drawnEntities.push(gameMap.spaces[i]);
			    for(var k in gameEntities) {
				    if(gameEntities[k].currentSpace().xIndex === gameMap.spaces[i].xIndex &&
				    	gameEntities[k].currentSpace().yIndex === gameMap.spaces[i].yIndex) drawnEntities.push(gameEntities[i]);
			    }
		    }
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