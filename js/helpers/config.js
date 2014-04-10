define(["jquery"], function($) {
    
    var screenW = $(window).width();
    var screenH = $(window).height();
    //console.log(screenW,screenH);
    
    var _configOpts = {
	    //canvasSize: { width:720, height:480 },
	    canvasSize: { width:screenW, height:screenH },
	    
	    //Board Spaces
	    spaceWidth: 48,
	    platformHeight: 24,
	    maxBlockHeight: 4,
	    blockHeightModes: {
			"easy": 2,  
			"medium": 3,  
			"hard": 4,  
	    },
	    boardSpaceTotal: { x: 15, y:15 },
	    blockStrength: 2,
	    
	    //Pogos
	    pogoWidth: 24,
	    pogoHeight: 48,
	    pogoGunHeight: 16,
	    
	    playerHealth: 10,
	    
	    //Enemies
	    gunPower: {
		    DRONE: {shot:1,block:.5},
		    SPINNER: {shot:1,block:.5},
		    CHASER: {shot:1,block:.5}
	    },
	    pointValues: {
		    DRONE: {hit: 25, kill: 50},
		    SPINNER: {hit: 25, kill: 100},
		    CHASER: {hit: 25, kill: 200},
		    BLOCK: {hit: 0, lower: 10}
	    },
	    enemyCounts: {
		    "easy": {DRONE: 3, SPINNER: 4, CHASER: 3},
		    "medium": {DRONE: 5, SPINNER: 5, CHASER: 5},
		    "hard": {DRONE: 0, SPINNER: 0, CHASER: 10},
	    },
	    
	    //Bullets
	    bulletSize: 12,
	    bulletVelocityFactor: 12,
	    
	    //helpers
	    isoZFactor: 1.5,
	    DIRS: {
		    LEFT: "left",
		    RIGHT: "right",
		    UP: "up",
		    DOWN: "down"
	    },
	    GAME_MODES: {
		    EASY: "easy",
		    MEDIUM: "medium",
		    HARD: "hard"
	    }
    };
    
    function Config() {
	    return _configOpts;
    }
    
    Config.update = function(prop,val) {
	    if(typeof _configOpts[prop] === typeof val) {
			_configOpts[prop] = val;    
	    }	    
    }
    return Config;
    
    
});