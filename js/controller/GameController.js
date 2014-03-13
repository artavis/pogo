define(["jquery","requestAnimFrame","config","Map","Player","Pogo"], 
function($,       requestAnimFrame,  config,  Map,  Player,  Pogo) {
    
   	var _gameStartTime=0, 
   		_currentTime = 0, 
   		_lastFPSDisplay = 0,
   		paused = false,
   		
		canvas = document.querySelector("#canvas"),
	    ctx = canvas.getContext("2d"),
   		
   		self;
    
    function GameController() {
	    self = this;
	    
	    this.entities = [], 
	    this.drawArray = [];	        
	    
	    this.init();
    }
    
    GameController.prototype = {
	    init: function() {
		    this.map = new Map();
		    
		    var player = new Player(this.map.spaces[4][4]);
			this.entities.push(player);
			
			//console.log(player.currentSpace());
			
			$("#pauser").on("click",function(){ paused = !paused; });
			
			//Start the game loop
		    requestAnimFrame(this.gameLoop);

	    },
	    gameLoop: function(t) {
		    //set clock and delta since last frame
		    var dt = t - _currentTime;
		    _currentTime = t;
		    updateFPS(dt);
		    
		    if(paused) { requestAnimFrame(self.gameLoop); return; }
		    
		    //Update all game entities
		    self.update(dt);		    
		    
		    //Update the draw order
		    self.updateDrawOrder();
		    
		    //Draw the game
		    self.draw();

		    //fire next loop
		    requestAnimFrame(self.gameLoop);
		    //setTimeout(function(){ self.gameLoop(+new Date); }, 100);
	    },
	    update: function(dt) {
		    for(var i in this.entities) this.entities[i].update(dt);
	    },
	    updateDrawOrder: function() {
		    this.drawArray = [];
		    //console.log(this.entities[0].currentSpace());
		    for(var y in this.map.spaces) {
			    for(var x in this.map.spaces[y]) {
					this.drawArray.push(this.map.spaces[x][y]);    
				    for(var i in this.entities) {
					    if(this.entities[i].currentSpace == this.map.spaces[x][y]) {
					    	this.drawArray.push(this.entities[i]);
					    }
				    }
					
			    }
			    
		    }
	    },
	    draw: function() {
		    canvas.width = canvas.width;
		    for(var i in this.drawArray) this.drawArray[i].draw();
	    }
    };
    
    GameController.gameStartTime = function() {
	    return _gameStartTime;
    };
    GameController.game = function() {
	  	return _game;  
    };
    GameController.currentTime = function() {
	  	return _currentTime;  
    };
    
    function updateFPS(dt) {
	    _lastFPSDisplay += dt;
	    if(_lastFPSDisplay >= 500) {
		    $("#fps").html(Math.round(1000/dt));
		    _lastFPSDisplay = 0;
	    }
    }


    return GameController;
    
});