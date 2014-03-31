define(["jquery"], function($) {
    
    return {
	    canvasSize: { width:720, height:480 },
	    
	    //Board Spaces
	    spaceWidth: 48,
	    platformHeight: 24,
	    maxBlockHeight: 1,
	    boardSpaceTotal: { x: 15, y:15 },
	    blockStrength: 2,
	    
	    //Pogos
	    pogoWidth: 24,
	    pogoHeight: 48,
	    pogoGunHeight: 16,
	    
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
		    "easy": {DRONE: 5, SPINNER: 5, CHASER: 3},
		    "medium": {DRONE: 7, SPINNER: 7, CHASER: 6},
		    "hard": {DRONE: 15, SPINNER: 15, CHASER: 10},
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
    
    
});