define(["jquery","Enemy","config","utils"], function($,Enemy,config,utils) {
        
    function Chaser(space) {
		Enemy.call(this,space);
		
		this.dir = this.getStartingDirection();
		this.noTurn = false;
		
		this.setPower(config.gunPower.CHASER);
		this.setPointValue(config.pointValues.CHASER);
		
		return this;
    }
    
    Chaser.prototype = Object.create( Enemy.prototype );
    
    Chaser.prototype.onBounce = function(){
		
		this.jumping = !this.jumping;
		this.bouncing = !this.bouncing;
		
		if(this.jumping) {
			this.destSpace = this.getDestination(this.dir);
			if(!this.destSpace) {
				if(this.noTurn) {
					this.jumping = false;
					this.bouncing = true;
				} else {
					var nextDir = nextDirection(this.dir);
					this.changeDir(nextDir);
					this.destSpace = this.getDestination(this.dir);
					if(!this.destSpace) {
						this.jumping = false;
						this.bouncing = true;
					}				
				}
			}
		}
		if(this.bouncing) this.shoot();
    };
    Chaser.prototype.onUpdate = function() {	    
	    if(this.currentSpace.xIndex == GAME_CONTROLLER.player.currentSpace.xIndex) {
		    if(this.currentSpace.yIndex > GAME_CONTROLLER.player.currentSpace.yIndex) {
			    this.changeDir(config.DIRS.UP);
		    } else {
			    this.changeDir(config.DIRS.DOWN);
		    }
		    this.noTurn = true;
	    } else if(this.currentSpace.yIndex == GAME_CONTROLLER.player.currentSpace.yIndex) {
		    if(this.currentSpace.xIndex > GAME_CONTROLLER.player.currentSpace.xIndex) {
			    this.changeDir(config.DIRS.LEFT);
		    } else {
			    this.changeDir(config.DIRS.RIGHT);
		    }
		    this.noTurn = true;
	   	} else {
		   	this.noTurn = false;
	   	}
    };
    
    function nextDirection() {
		var ind = utils.rand(0,4);
		switch(ind) {
			case 0:
				return config.DIRS.DOWN;
			case 1:
				return config.DIRS.LEFT;
			case 2:
				return config.DIRS.UP;
			case 3:
				return config.DIRS.RIGHT;
			default:
				return config.DIRS.RIGHT;
		}    
    }
        
    return Chaser;
    
});