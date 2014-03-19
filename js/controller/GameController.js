define(["jquery","requestAnimFrame","config","Map","Player","Pogo"], 
function($,       requestAnimFrame,  config,  Map,  Player,  Pogo) {
    
   	var _gameStartTime=0, 
   		_currentTime = 0, 
   		_lastFPSDisplay = 0,
   		paused = false, setSlowTick = false,
   		
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
		    
			this.createPlayer();
			//this.fillMapWithPogos();
			
			//console.log(player.currentSpace());
			
			$("#pauser").on("click",function(){ paused = !paused; });
			$("#slower").on("click",function(){ setSlowTick = !setSlowTick; });
			
			//Start the game loop
		    requestAnimFrame(this.gameLoop);
		    
		    $.publish("GameLoaded");

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
			
			if(setSlowTick) { requestAnimFrame(self.slowTick); return; }
		    //fire next loop
		    requestAnimFrame(self.gameLoop);
		    //setTimeout(function(){ self.gameLoop(+new Date); }, 100);
	    },
	    slowTick: function() {
		    tickTime = 500;
		    _currentTime += tickTime;
		    
		    if(paused) { setTimeout(self.slowTick,tickTime); return; }
		    
		    //Update all game entities
		    self.update(30);		    
		    
		    //Update the draw order
		    self.updateDrawOrder();
		    
		    //Draw the game
		    self.draw();
			
			if(!setSlowTick) { requestAnimFrame(self.gameLoop); return; }
		    //fire next loop
		    setTimeout(self.slowTick,tickTime);
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
	    },
	    
	    
	    createPlayer: function() {
		    this.player = new Player(this.map.spaces[4][4]);
			this.entities.push(this.player);
	    },
	    fillMapWithPogos: function() {
		    var pogos = [];
		    for(var y in this.map.spaces) {
			    for(var x in this.map.spaces[y]) {
				    var space = this.map.spaces[y][x];
				    var pogo = new Pogo(space);
				    
				    pogos.push(pogo);
				    
			    }
		    }
		    
		    var int = setInterval(function(){
			    var pogo = pogos.shift();
			    self.entities.push(pogo);
			    
			    if(pogos.length == 0) clearInterval(int);
		    }, 10);
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