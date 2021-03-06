define(function(require){

	var $ 					= require('jquery'),
	    requestAnimFrame 	= require('requestAnimFrame'),
	    config 				= require('config'),
	    proxy 				= require('proxy'),

	    utils 				= require('utils'),
	    pixi 				= require('pixi'),
	    GameView 			= require('GameView'),
	    StatusBar 			= require('StatusBar'),
	    StartMenu 			= require('StartMenu'),
	    Map 				= require('Map'),
	    Player 				= require('Player'),
	    Pogo 				= require('Pogo'),
	    EnemyController 	= require('EnemyController'),
	    Countdown 			= require('Countdown'),
	    ViewPort 			= require('ViewPort'),

	
//define(["jquery","requestAnimFrame","config","utils","pixi","GameView","StatusBar","Map","Player","Pogo","EnemyController","ViewPort"], 
//function($,       requestAnimFrame,  config,  utils,  pixi,  GameView,  StatusBar,  Map,  Player,  Pogo,  EnemyController,  ViewPort) {
    
   	 	_gameStartTime=0, 
   		_currentTime = 0, 
   		_lastFPSDisplay = 0,
   		_lastTimerUpdate = 0,
   		paused = false, setSlowTick = false,
   		
   		_totalPoints = 0,
   		_totalEnemies = 0,
   		
   		_transitionOffset = {x:-150,y:-150},
   		_gameMap,
   		self;
   		
   	var GAME_LOADED = false;
    
    function GameController() {
	    self = this;
	    
	    this.entities = [], 
	    this.drawArray = [];
	    this.scheduledTasks = [];	
	    
	    var assetsToLoad = ["images/pogo.json","images/enemy.json","images/explosion.json","images/starbg.png"];
		loader = new pixi.AssetLoader(assetsToLoad);
		loader.onComplete = this.init.bind(this);
		loader.load();    
		
		return this;    
    }
    
    GameController.prototype = {
	    init: function() {
			this.view = new GameView();
			
			this.view.addStartMenu(new StartMenu());
			
			$("#pauser").on("click",function(){ paused = !paused; });
			$("#slower").on("click",function(){ setSlowTick = !setSlowTick; });
			$("#start").on("click",function(){ 
				if(GAME_LOADED) { window.location.reload(); return; }
				$(this).val("RELOAD");
				$(this).blur();
				var counts = {
					"easy": {
						DRONE: parseInt($("#drones").val()), 
						SPINNER: parseInt($("#spinners").val()), 
						CHASER: parseInt($("#chasers").val())
					}
				}
				var health = parseInt($("#health").val());
				var height = parseInt($("#bHeight").val());
				
				config.update("enemyCounts",counts);
				config.update("playerHealth",health);
				config.update("maxBlockHeight",height);
				
				$.publish("startGame",config().GAME_MODES.EASY);
				//self.initNewGame();
			});
			
			this.addListeners();
			
			$.publish("PageLoaded");
	    },
	    addListeners: function() {
			var delegate = window.top.gameDelegate;
			
			$.subscribe("addPoints",function(e,pnts){
				self.addPoints(pnts);
			});  
			$.subscribe("addEntity",function(e,entity){
				self.addEntity(entity);
			});  
			$.subscribe("entityKilled",function(){
				self.reduceEnemyCount();
			}); 
			$.subscribe("removeEntity",function(e,entity){
				self.removeEntity(entity);
			});
			$.subscribe("endGame", function(e,win){
				self.endGame(win);
			}); 
			$.subscribe("hitFlash", function(){
				self.view.triggerHitFlash();
			});
			$.subscribe("startGame", function(e,mode){
				self.initNewGame(mode);
			});
			
			$.subscribe("PageLoaded", function(){
				//Google analytics
				//todo
				delegate.sendEvent("PageLoaded")
			});
			$.subscribe("GameStarted", function(e,mode){
				//Google analytics
				//todo
			});
			$.subscribe("GameEnded", function(e,stats){
				//Google analytics
				//todo
			});
			$.subscribe("GameRestarting", function(){
				//Google analytics
				//todo
			});
			
			window.addEventListener('message', function(e){
				switch(e.data) {
					case ("startGame"):
						//$.publish("startGame",config().GAME_MODES.EASY);
						break;
				}
			}, false);
	    },
	    removeListeners: function() {
		    
	    },
	    initNewGame: function(mode) {
		    config.update("maxBlockHeight",config().blockHeightModes[mode]);
		    
		    this.statusBar = new StatusBar();
		    this.view.hideStartMenu();
		    this.view.addStatusBar(this.statusBar);
		    
		    _gameMap = new Map();
		    this.map = _gameMap;
		    proxy.addObject("gameMap",_gameMap);
		    
			this.createPlayer();
			this.createEnemies(mode);
			
		    this.startGame();
		    
		    GAME_LOADED = true;
		    $.publish("GameStarted");
	    },
	    clearGame: function() {
		    
	    },
	    startGame: function() {
			var drawPos = utils.iso(_transitionOffset.x,_transitionOffset.y,0);
			ViewPort.setPosByPlayerPosition(drawPos);
		    
		    this.view.beginGameRender();
		    
		    this.gameReady = false;
		    proxy.addObject("gameReady",false);
		    
		    //Start the game loop
		    requestAnimFrame(this.gameLoop);
	    },
	    endGame: function(win) {
			if(win) {
				this.view.showVictoryScreen(_currentTime,_totalPoints);
			} else {
				this.view.showGameOverScreen();  	
			}
			
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
		    
		    if(!self.gameReady) {
				if(!self.transitioned) {
					var drawPos = utils.iso(_transitionOffset.x,_transitionOffset.y,0);
					ViewPort.setPosByPlayerPosition(drawPos);
					
					if(_transitionOffset.x < self.player.pos.x) _transitionOffset.x += 3;
					if(_transitionOffset.y < self.player.pos.y) _transitionOffset.y += 3;
					
					
					if(_transitionOffset.x >= self.player.pos.x && _transitionOffset.y >= self.player.pos.y) self.initCountdown();
				} else {
					self.updateCountdown(dt);
				}
		    }
		    
		    if(paused) { requestAnimFrame(self.gameLoop); return; }
		    
		    if(self.gameReady) self.updateTimer(dt);
		    
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
	    initCountdown: function() {
		    this.transitioned = true;
		    var counter = new Countdown();
		    this.view.addCountdown(counter);
		    
		    this.count = 4;
		    this.countTime = 0;
	    },
	    updateCountdown: function(dt) {
		    this.countTime += dt;
		    if(this.countTime >= 1000) {
			    this.count--;
			    if(this.count > 1) {
				    Countdown.updateCounter(this.count-1);
				    this.countTime = 0;
			    } else if (this.count > 0) {
				    Countdown.updateCounter("GO!");
				    this.countTime = 0;
			    } else {
				    this.gameReady = true;
				    proxy.addObject("gameReady",true);
				    Countdown.removeCounter();
			    }
		    }
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
		    var y = Math.round(config().boardSpaceTotal.y/2);
		    var x = Math.round(config().boardSpaceTotal.x/2);
		    this.player = new Player(_gameMap.spaces[y][x]);
			this.entities.push(this.player);
			proxy.addObject("player",this.player);			
	    },
	    createEnemies: function(mode) {
		    var enemyController = new EnemyController();
		    
		    _totalEnemies = enemyController.createEnemies(mode);
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
			    this.endGame(true);
		    }
	    },
	    updateTimer: function(dt) {
		    _lastTimerUpdate += dt;
		    if(_lastTimerUpdate >= 1000) {
			    _lastTimerUpdate = 0;
			    StatusBar.updateTimer();
		    }
		    
	    },
	    resetStatusBar: function() {
		    StatusBar.reset();
	    }
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