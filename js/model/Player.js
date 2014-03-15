define(["jquery","Pogo"], function($,Pogo) {
        
    function Player(space) {
		Pogo.call(this,space);
		
		var self = this;
		$(document).on("keydown", function(e){
			if(e.keyCode == 32) {
				//space bar
				e.preventDefault();
				self.shotTriggered = true;
			} else if(e.keyCode == 37 || e.keyCode == 65){
				// left/a
				e.preventDefault();
				self.triggerJump(Pogo.JUMP_DIRS.LEFT);
			} else if(e.keyCode == 38 || e.keyCode == 87) {
				// up/w
				e.preventDefault();
				self.triggerJump(Pogo.JUMP_DIRS.UP);
			} else if(e.keyCode == 39 || e.keyCode == 68) { 
				// right/d
				e.preventDefault();
				self.triggerJump(Pogo.JUMP_DIRS.RIGHT);
			} else if(e.keyCode == 40 || e.keyCode == 83) {
				// down/s
				e.preventDefault();
				self.triggerJump(Pogo.JUMP_DIRS.DOWN);
			}
		});
		
		$(document).on("keyup", function(e){
			//self.jumpTriggered = false;
		});
		
		return this;
    }
    
    Player.prototype = Object.create( Pogo.prototype );
    
    return Player;
    
});