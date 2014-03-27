define(["jquery","Enemy","config","utils"], function($,Enemy,config,utils) {
        
    function Spinner(space) {
		Enemy.call(this,space);
		
		this.dir = this.getStartingDirection();
		this.bounceCounter = 0;
		this.numBouncesBeforeJump = utils.oneOrNegOne() + 4;
		console.log(this.numBouncesBeforeJump);
		return this;
    }
    
    Spinner.prototype = Object.create( Enemy.prototype );
    
    Spinner.prototype.onBounce = function(){
		this.bounceCounter++;
		this.jumping = false;
		this.bouncing = true;

		var nextDir = nextDirection(this.dir);
		this.changeDir(nextDir);
		if(this.bounceCounter == this.numBouncesBeforeJump) {
			this.destSpace = this.getDestination(this.dir);
			if(this.destSpace) {
				this.jumping = true;
				this.bouncing = false;
			}
			this.bounceCounter = 0;
		}	
		
		this.shoot();
    };
    
    function nextDirection(dir) {
		switch(dir) {
			case config.DIRS.UP:
				return config.DIRS.RIGHT;
			case config.DIRS.RIGHT:
				return config.DIRS.DOWN;
			case config.DIRS.DOWN:
				return config.DIRS.LEFT;
			case config.DIRS.LEFT:
				return config.DIRS.UP;
		}    
    }
        
    return Spinner;
    
});