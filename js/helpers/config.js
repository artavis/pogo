define(["jquery"], function($) {
    
    return {
	    canvasSize: { width:720, height:480 },
	    
	    //Board Spaces
	    spaceWidth: 48,
	    platformHeight: 24,
	    maxBlockHeight: 4,
	    boardSpaceTotal: { x: 15, y:15 },
	    blockStrength: 2,
	    
	    //Pogos
	    pogoWidth: 24,
	    pogoHeight: 48,
	    pogoGunHeight: 16,
	    
	    //Bullets
	    bulletSize: 12,
	    bulletVelocityFactor: 8,
	    
	    //helpers
	    isoZFactor: 1.5,
	    DIRS: {
		    LEFT: "left",
		    RIGHT: "right",
		    UP: "up",
		    DOWN: "down"
	    }
    };
    
    
});