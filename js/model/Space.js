define(["jquery","utils","config","Entity","SpaceView","Explosion"], 
	function($,   utils,  config,  Entity,  SpaceView,  Explosion) {
            
    function Space(xInd,yInd) {
	    
	    Entity.call(this);
	    
	    this.xIndex = xInd;
		this.yIndex = yInd;
		this.spaceIndex = (yInd*config().boardSpaceTotal.y) + xInd;
		
		this.occupied = false;
		this.strength = config().blockStrength;
	    
	    this.init();
	    
	    return this;	    		
    }
    
    // Extend the Entity class
    Space.prototype = Object.create( Entity.prototype );

    Space.prototype.init = function() {
		this.blockHeight = initBlockHeight();
		this.setSize({
			width: config().spaceWidth,
			height: config().spaceWidth,
			z: config().platformHeight * this.blockHeight
		});
		this.setPos({
			x: this.xIndex * config().spaceWidth,
			y: this.yIndex * config().spaceWidth,
			z: 0
		});
		
		this.edges = {
			left: this.pos.x - config().spaceWidth/2,
			right: this.pos.x + config().spaceWidth/2,
			top: this.pos.y - config().spaceWidth/2,
			bottom: this.pos.y + config().spaceWidth/2,
		}
		
		this.view = new SpaceView(this);
	};
	Space.prototype.occupy = function(){ this.occupied = true; };
	Space.prototype.unoccupy = function(){ 
		this.occupied = false; 
	};
	Space.prototype.isOccupied = function(){ return this.occupied; };
    
    Space.prototype.draw = function() {
	    this.view.draw();
    }

	Space.prototype.onBoardEdge = function(dir) {
		if(!dir) return false;		
		
		if(dir === "right") return this.xIndex == config().boardSpaceTotal.x - 1;
		if(dir === "left") return this.xIndex == 0;
		if(dir === "down") return this.yIndex == config().boardSpaceTotal.y - 1;
		if(dir === "up") return this.yIndex == 0;
		
		return false;
	};
	Space.prototype.blockHit = function(bullet) {
		this.strength -= bullet.power.block;
		if(this.strength <= 0) {
			this.lower();
			bullet.multExplosion(3);
			if(bullet.shooter() == GAME_CONTROLLER.player) $.publish("addPoints",config().pointValues.BLOCK.lower);
		} else {
			bullet.explode();
			//this.addHit();
		}
	};
	Space.prototype.lower = function() {
		this.strength = config().blockStrength;
		this.blockHeight -= 1;
		this.setSize({
			width: config().spaceWidth,
			height: config().spaceWidth,
			z: config().platformHeight * this.blockHeight
		});
		this.view.resetBuffer();
		
	};


	function initBlockHeight() {
	    //return 3;
	    return Math.floor(Math.random()*config().maxBlockHeight);
    }
    
    return Space;
    
});