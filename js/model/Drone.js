define(["jquery","Enemy","config","utils"], function($,Enemy,config,utils) {
        
    function Spinner(space) {
		Enemy.call(this,space);
		
		this.dir = this.getStartingDirection();

		this.setPower(config().gunPower.DRONE);
		this.setPointValue(config().pointValues.DRONE);

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
			case config().DIRS.UP:
				return config().DIRS.DOWN;
			case config().DIRS.RIGHT:
				return config().DIRS.LEFT;
			case config().DIRS.DOWN:
				return config().DIRS.UP;
			case config().DIRS.LEFT:
				return config().DIRS.RIGHT;
		}    
    }
        
    return Spinner;
    
});