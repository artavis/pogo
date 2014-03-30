define(["jquery","requestAnimFrame","config","utils","pixi","GameView","StatusBar","Map","Player","Pogo","EnemyController"], 
function($,       requestAnimFrame,  config,  utils,  pixi,  GameView,  StatusBar,  Map,  Player,  Pogo,  EnemyController) {
    
   	var _gameStartTime=0, 
   		_currentTime = 0, 
   		_lastFPSDisplay = 0,
   		_lastTimerUpdate = 0,
   		paused = false, setSlowTick = false,
   		
   		_totalPoints = 0,
   		_totalEnemies = 0,
   		
   		_gameMap,
   		self;
    
    function GameController() {
	    self = this;
	    
	    this.entities = [], 
	    this.drawArray = [];
	    this.scheduledTasks = [];	
	    
	    var assetsToLoad = ["images/pogo.json","images/enemy.json","images/explosion.json"];
		loader = new pixi.AssetLoader(assetsToLoad);
		loader.onComplete = this.init.bind(this);
		loader.load();        
    }
    
    GameController.prototype = {
	    init: function() {
		    this.view = new GameView();
		    this.statusBar = new StatusBar();
		    this.view.addStatusBar(this.statusBar);
		    
		    _gameMap = new Map();
		    this.map = _gameMap;
		    
			this.createPlayer();
			this.createEnemies();
			
			//console.log(player.currentSpace());
			
			$("#pauser").on("click",function(){ paused = !paused; });
			$("#slower").on("click",function(){ setSlowTick = !setSlowTick; });
			
			//Start the game loop
		    requestAnimFrame(this.gameLoop);
		    
		    $.publish("GameLoaded");

	    },
	    pausePlay: function() {
		    paused = !paused;
	    },
	    gameLoop: function(t) {
		    window.DEBUG = false;
			
		    //set clock and delta since last frame
		    var dt = t - _currentTime;
		    _currentTime = t;
		    updateFPS(dt);
		    self.updateTimer(dt);
		    
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
		    window.DEBUG = true;
		    
		    var then = +new Date;
		    
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
		    
		    var now = +new Date;
		    //console.log("execution time:", now - then);
		    setTimeout(self.slowTick,tickTime);
	    },
	    update: function(dt) {
		    for(var i in this.entities) this.entities[i].update(dt);
		    this.handleCollision();
	    },
	    handleCollision: function() {
			//entA is a projectile, entB is not
			for(var a in this.entities) {
				var entA = this.entities[a];
				if(!entA.isProjectile || !entA.checkCollide) continue;
				
				for(var b in this.entities) {
					var entB = this.entities[b];
					if(entB.isProjectile || !entB.checkCollide) continue;

					if(utils.collides(entA,entB)) {
						entA.explode();
						entB.getHit(entA);
					}
				}
			}
	    },
	    updateDrawOrder: function() {
		    this.drawArray = [];
		    //console.log(this.entities[0].currentSpace());
		    for(var y in _gameMap.spaces) {
			    for(var x in _gameMap.spaces[y]) {
					this.drawArray.push(_gameMap.spaces[x][y]);    
				    for(var i in this.entities) {
					    if(this.entities[i].currentSpace == _gameMap.spaces[x][y]) {
					    	this.drawArray.push(this.entities[i]);
					    }
				    }
					
			    }
			    
		    }
	    },
	    draw: function() {
		    this.view.renderGame(this.drawArray);
	    },
	    addEntity: function(ent) {
		    if(!ent) return;
		    this.entities.push(ent);
	    },
	    removeEntity: function(ent) {
		    for(var i in this.entities) {
			    if(this.entities[i] === ent) {
				    this.entities.splice(i, 1);
			    }
		    }
	    },
	    createPlayer: function() {
		    this.player = new Player(_gameMap.spaces[config.boardSpaceTotal.y-2][config.boardSpaceTotal.x-2]);
			this.entities.push(this.player);
	    },
	    createEnemies: function() {
		    var enemyController = new EnemyController();
		    
		    _totalEnemies = enemyController.createEnemies();
		    StatusBar.updateEnemyCount(_totalEnemies);
	    },
	    addPoints: function(pts) {
		    _totalPoints += pts;
		    StatusBar.updatePoints(_totalPoints);
	    },
	    reduceEnemyCount: function() {
		    _totalEnemies--;
		    StatusBar.updateEnemyCount(_totalEnemies);
		    
		    if(_totalEnemies === 0) {
			    //END GAME!!!!
			    
		    }
	    },
	    updateTimer: function(dt) {
		    _lastTimerUpdate += dt;
		    if(_lastTimerUpdate >= 1000) {
			    _lastTimerUpdate = 0;
			    StatusBar.updateTimer();
		    }
		    
	    }
    };
    
    GameController.GAME_MODES = {
	    EASY: "easy",
	    MEDIUM: "medium",
	    HARD: "hard"
    };
    
    GameController.getMap = function() {
	    return _gameMap;
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