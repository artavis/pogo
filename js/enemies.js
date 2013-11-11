function RegularEnemy(newSpace) {
	I = new Pogo({
		space: newSpace
	});
	
	I.strength = 4;
	I.icon.src = "images/pogoenemy.png";
	
	var t = oneOrNegOne();
	if(t == 1){
		I.turnDirection = "clock";
	} else {
		I.turnDirection = "counterclock";
	}
	
	I.spacesJumped = 0;
	I.update = function() {
		var bC = this.bounceCount;
		
		var dir = this.direction;
		var myXSp = this.space.spaceX;
		var myYSp = this.space.spaceY;
		var myX = this.x;
		var myY = this.y;
		var pX = player.x;
		var pY = player.y;
		var pXSp = player.space.spaceX;
		var pYSp = player.space.spaceY;
		
		this.space = map[this.spaceY][this.spaceX];
		this.space.occupied = true;
		
		
		if(bC == this.jumpFrames) {
			if(!this.jumping) { this.jumpTriggered = true; }
			if(this.jumping) { this.shotTriggered = true; }
			this.spacesJumped++;
			if(this.spacesJumped == 5) {
				if(this.turnDirection == "clock") {
					this.turnClock(dir);
				} else {
					this.turnCounterClock(dir);
				}
			}
		}
		
		//Shoot			
		if(bC == 1) {
			if(this.shotTriggered) {
				this.shoot();
				this.shotTriggered = false;
			}
			if(pXSp == myXSp && this.space.z == player.space.z) {
				if(myY > pY) {
					switch(dir) {
						case "left":
							this.turnClock(dir);
							break;
						case "right":
							this.turnCounterClock(dir);
							break;
						case "down":
							this.turnAround();
							break;
					}
				} else {
					switch(dir) {
						case "right":
							this.turnClock(dir);
							break;
						case "left":
							this.turnCounterClock(dir);
							break;
						case "up":
							this.turnAround();
							break;
					}
				}
			} else if(pYSp == myYSp && this.space.z == player.space.z) {
				if(myX > pX) {
					switch(dir) {
						case "down":
							this.turnClock(dir);
							break;
						case "up":
							this.turnCounterClock(dir);
							break;
						case "right":
							this.turnAround();
							break;
					}
				} else {
					switch(dir) {
						case "up":
							this.turnClock(dir);
							break;
						case "down":
							this.turnCounterClock(dir);
							break;
						case "left":
							this.turnAround();
							break;
					}
				}
			}
		}
		if(this.hitWall) {
			if(this.turnDirection == "clock") {
				this.turnClock(dir);
			} else {
				this.turnCounterClock(dir);
			}
			
			this.hitWall = false;
		}
		
		//Bounce//jump							    
	    this.bounceOrJump();
	    this.drawn = false;
	}
	
	return I;
}
