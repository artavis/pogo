define(["jquery","Enemy","config","utils","proxy"], function($,Enemy,config,utils,proxy) {
        
    function Chaser(space) {
		Enemy.call(this,space);
		
		this.dir = this.getStartingDirection();
		this.noTurn = false;
		
		this.setPower(config().gunPower.CHASER);
		this.setPointValue(config().pointValues.CHASER);
		
		this.chasing = false;
		
		return this;
    }
    
    Chaser.prototype = Object.create( Enemy.prototype );
    
    Chaser.prototype.onBounce = function(){
		
		if(this.chasing) {
			this.jumping = true;
			this.bouncing = false;
		} else {
			this.jumping = !this.jumping;
			this.bouncing = !this.bouncing;
		}
		
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
		if(this.chasing) this.shoot();
    };
    Chaser.prototype.onUpdate = function() {	    
	    var player = proxy().player;
	    var cfg = config();
	    
	    if(this.currentSpace.xIndex == player.currentSpace.xIndex) {
		    if(this.currentSpace.yIndex > player.currentSpace.yIndex) {
			    this.changeDir(cfg.DIRS.UP);
		    } else {
			    this.changeDir(cfg.DIRS.DOWN);
		    }
		    this.noTurn = true;
		    this.chasing = true
	    } else if(this.currentSpace.yIndex == player.currentSpace.yIndex) {
		    if(this.currentSpace.xIndex > player.currentSpace.xIndex) {
			    this.changeDir(cfg.DIRS.LEFT);
		    } else {
			    this.changeDir(cfg.DIRS.RIGHT);
		    }
		    this.noTurn = true;
		    this.chasing = true;
	   	} else {
		   	this.noTurn = false;
		   	this.chasing = false;
	   	}
    };
    
    function nextDirection() {
		var ind = utils.rand(0,4);
		
		switch(ind) {
			case 0:
				return config().DIRS.DOWN;
			case 1:
				return config().DIRS.LEFT;
			case 2:
				return config().DIRS.UP;
			case 3:
				return config().DIRS.RIGHT;
			default:
				return config().DIRS.RIGHT;
		}    
    }
        
    return Chaser;
    
});