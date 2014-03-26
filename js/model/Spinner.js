define(["jquery","Enemy","config"], function($,Enemy,config) {
        
    function Spinner(space) {
		Enemy.call(this,space);
		
		return this;
    }
    
    Spinner.prototype = Object.create( Enemy.prototype );
    
    Spinner.prototype.onBounce = function(){
		this.jumping = true;
		this.bouncing = false;
		var nextDir = nextDirection(this.dir);
		this.changeDir(nextDir);
		this.destSpace = this.getDestination(this.dir);
		if(!this.destSpace) {
			this.jumping = false;
			this.bouncing = true;
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