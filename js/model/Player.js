define(["jquery","Pogo","UserInput"], function($,Pogo,UserInput) {
        
    function Player(space) {
		Pogo.call(this,space);
		
		var self = this;
				
		$.subscribe("keyPressed",handleInput);
		//Register user input
/*
		if (keydown.space) {
			this.shotTriggered = true;
		}
	
		if (keydown.right) {
			this.direction = "right";
			if(!this.jumping || this.bounceCount > this.jumpFrames / 2) {
				this.jumpTriggered = true;
			}
		}
		if (keydown.left) {
			this.direction = "left";
			if(!this.jumping || this.bounceCount > this.jumpFrames / 2) {
				this.jumpTriggered = true;
			}
		}
		if (keydown.up) {
			this.direction = "up";
			if(!this.jumping || this.bounceCount > this.jumpFrames / 2) {
				this.jumpTriggered = true;
			}
		}
		if (keydown.down) {
			this.direction = "down";
			if(!this.jumping || this.bounceCount > this.jumpFrames / 2) {
				this.jumpTriggered = true;
			}
		}
*/

		function handleInput(key) {
			if(!this.jumping || !this.goingUp) {
				switch(key) {
					case Pogo.JUMP_DIRS.LEFT:
					case Pogo.JUMP_DIRS.RIGHT:
					case Pogo.JUMP_DIRS.UP:
					case Pogo.JUMP_DIRS.DOWN:
					case "space":
				}
			}
		};
		return this;
    }
    
    Player.prototype = Object.create( Pogo.prototype );
    
    Player.prototype.onBounce = function(){
		if(this.jumpTriggered) {
			this.jumping = true;
			this.bouncing = false;
			
			this.destSpace = this.getDestination(this.jumpDir);
			
			
		} else {
			this.jumping = false;
			this.bouncing = true;
		}
		
		this.jumpTriggered = false;
    }
    Player.prototype.onUpdate = function(){
		var keys = UserInput.keys();
		if(!this.jumping || !this.goingUp) {
			if(keys.left) this.triggerJump(Pogo.JUMP_DIRS.LEFT);
			if(keys.right) this.triggerJump(Pogo.JUMP_DIRS.RIGHT);
			if(keys.up) this.triggerJump(Pogo.JUMP_DIRS.UP);
			if(keys.down) this.triggerJump(Pogo.JUMP_DIRS.DOWN);			
		}
    }
    
    return Player;
    
});