define(["jquery","utils","config","Entity","SpaceView"], 
	function($,   utils,  config,  Entity,  SpaceView) {
            
    function Space(xInd,yInd) {
	    
	    Entity.call(this);
	    
	    this.xIndex = xInd;
		this.yIndex = yInd;
		this.spaceIndex = (yInd*config.boardSpaceTotal.y) + xInd;
	    
	    this.init();
	    
	    return this;	    		
    }
    
    // Extend the Entity class
    Space.prototype = Object.create( Entity.prototype );

    Space.prototype.init = function() {
		this.blockHeight = initBlockHeight();
		this.setSize({
			width: config.spaceWidth,
			height: config.spaceWidth,
			z: config.platformHeight * this.blockHeight
		});
		this.setPos({
			x: this.xIndex * config.spaceWidth,
			y: this.yIndex * config.spaceWidth,
			z: 0
		});
		
		this.edges = {
			left: this.pos.x - config.spaceWidth/2,
			right: this.pos.x + config.spaceWidth/2,
			top: this.pos.y - config.spaceWidth/2,
			bottom: this.pos.y + config.spaceWidth/2,
		}
		
		this.view = new SpaceView(this);
	};
    
    Space.prototype.draw = function() {
	    this.view.draw();
    }

	Space.prototype.onBoardEdge = function(dir) {
		if(!dir) return false;
		
		
		if(dir === "right") return this.xIndex == config.boardSpaceTotal.x - 1;
		if(dir === "left") return this.xIndex == 0;
		if(dir === "bottom") return this.yIndex == config.boardSpaceTotal.y - 1;
		if(dir === "top") return this.yIndex == 0;
		
		return false;
	}


	function initBlockHeight() {
	    //return 2;
	    return Math.floor(Math.random()*config.maxBlockHeight);
    }
    
    return Space;
    
});