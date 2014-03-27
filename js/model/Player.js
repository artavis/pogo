define(["jquery","Pogo","UserInput","utils","ViewPort"], function($,Pogo,UserInput,utils,ViewPort) {
        
    function Player(space) {
		Pogo.call(this,space);
		
		var self = this;
		
		this.health = 10;
		this.setPower({shot:1,block:1});
				
		$.subscribe("keyPressed",handleInput);
		//Register user input

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
		
		//this.currentSpace.watch("occupied", function(){ console.error(); });
		return this;
    }
    
    Player.prototype = Object.create( Pogo.prototype );
    
    Player.prototype.onBounce = function(){
		if(this.jumpTriggered) {
			this.jumping = true;
			this.bouncing = false;
			
			this.destSpace = this.getDestination(this.dir);
			
			if(!this.destSpace) {
				this.jumping = false;
				this.bouncing = true;
			}
			
		} else {
			this.jumping = false;
			this.bouncing = true;
		}
		
		this.jumpTriggered = false;
		//console.log(this.currentSpace);
    }
    Player.prototype.onUpdate = function(){
		var keys = UserInput.keys();
		if(!this.jumping || !this.goingUp) {
			if(keys.left) { this.changeDir(Pogo.JUMP_DIRS.LEFT); this.triggerJump(); }
			if(keys.right) { this.changeDir(Pogo.JUMP_DIRS.RIGHT); this.triggerJump(); }
			if(keys.up) { this.changeDir(Pogo.JUMP_DIRS.UP); this.triggerJump(); }
			if(keys.down) { this.changeDir(Pogo.JUMP_DIRS.DOWN); this.triggerJump(); }			
		}
		
		if(keys.space) this.triggerShot();
		
		//set viewport
		var drawPos = utils.iso(this.pos.x,this.pos.y,0);
		ViewPort.setPosByPlayerPosition(drawPos);
    }
    
    return Player;
    
});