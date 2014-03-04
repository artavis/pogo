function initPlayer(I){
	I.isPlayer = true;
	//Default Player strength
	I.strength = 10;
	//I.bounceCount = 1;
			
	
	I.update = function(){		
		//Set Space params
		this.space = map[this.spaceY][this.spaceX];
		this.space.occupied = true;
		
		if(!this.jumping) {		
			//this.determineBoundaries();
		}
		
		//Register user input
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
		
		//Shoot			
		if(this.bounceCount == 1) {
			if(this.shotTriggered) {
				this.shoot();
				this.shotTriggered = false;
			}

		}
		
		//Bounce//jump							    
	    this.bounceOrJump();
	    
	    if(pogos.length == 1) {
	    	winGame();
	    }
	    
	    this.drawn = false;
	};
	
	
	//console.log(I.x+" "+I.y);
	//console.log(I.d.x+" "+I.d.y);
	//console.log(I.xRatio+" "+I.yRatio);
	
	return I;
}