define(["jquery","Enemy","config","utils"], function($,Enemy,config,utils) {
        
    function Spinner(space) {
		Enemy.call(this,space);
		
		this.dir = getStartingDirection();
		this.setPower({shot:1,block:.5});
		return this;
    }
    
    Spinner.prototype = Object.create( Enemy.prototype );
    
    Spinner.prototype.onBounce = function(){
		this.jumping = !this.jumping;
		this.bouncing = !this.bouncing;
		
		if(this.jumping) {
			this.destSpace = this.getDestination(this.dir);
			if(!this.destSpace) {
				var nextDir = nextDirection(this.dir);
				this.changeDir(nextDir);
				this.destSpace = this.getDestination(this.dir);
				
				if(!this.destSpace) {
					this.jumping = false;
					this.bouncing = true;
				}				
			}
		}
		if(this.bouncing) this.shoot();
    };
    
    function nextDirection(dir) {
		switch(dir) {
			case config.DIRS.UP:
				return config.DIRS.DOWN;
			case config.DIRS.RIGHT:
				return config.DIRS.LEFT;
			case config.DIRS.DOWN:
				return config.DIRS.UP;
			case config.DIRS.LEFT:
				return config.DIRS.RIGHT;
		}    
    }
    function getStartingDirection() {
	    var num1 = utils.oneOrNegOne();
	    var num2 = utils.oneOrNegOne();
	    if(num1 < 0) {
		    if(num2 < 0) {
			    return config.DIRS.RIGHT; 
		    } else {
			    return config.DIRS.LEFT;
		    }
	    } else {
		    if(num2 < 0) {
			    return config.DIRS.UP;
		    } else {
			    return config.DIRS.DOWN;
		    }
	    }
    }
        
    return Spinner;
    
});