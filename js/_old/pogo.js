function Pogo(I) {
	//I gets pushed in with a space object property
	
	I.active = true;	
	I.isPlayer = false;
	
	//Get location data from the space object
	I.spaceX = I.space.spaceX;
	I.spaceY = I.space.spaceY;
	I.x = I.space.x;
	I.y = I.space.y;
	I.z = I.space.z;	
	I.blockheight = I.space.blockHeight;

	//Set default width/height 
	I.width = spaceW/2;
	I.height = spaceH/2;
	I.zHeight = platformHeight*2;
	
	I.hW = I.width / 2;
	I.hH = I.height / 2;
	I.hZ = I.zHeight / 2;
	
	//Determine edges
	I.topY = I.y - (I.height/2);
	I.botY = I.y + (I.height/2);
	I.leftX = I.x - (I.width/2);
	I.rightX = I.x + (I.width/2);
	I.head = I.z + I.zHeight;
	I.foot = I.z;
	
	//Default strength is 1
	I.strength = 1;
	
	//Default speed and direction
	I.speed = 16;
	I.direction = "right";
	I.moving = false;
	
	//Initialize an icon object and default icon
	I.icon = new Image();
	I.icon.src = "images/pogo.png";		
	
	I.movedDistance = 0;
	I.hitWall = false;
	
	//Default Weapon
	I.shotTriggered = false;
	I.bulletKind = "regular";
	
	//Default Bounce params
	I.bounceSpeed = 1;
	I.bounceH = 0;
	I.bounceCount = Math.ceil(Math.random() * 16);
	
	//Default Jump params
	I.jumpSpeed = 2;
	I.jumpSpaces = 1;
	I.jumpFrames = I.speed;
	I.jumpDir = I.direction;
	I.jumpTriggered = false;
	
	I.drawn = false;	
	
	I.startingBounceHeight = function() {
		var bC = this.bounceCount;
		var bS = this.bounceSpeed
		
		var returnz = this.z;
		if(bC == 1) {
			return returnz;
		} else {
			for(var i=1;i<bC;i++) {
				if(i < 9) {
					returnz += Math.round(((9/i)*bS));
				} else {
					returnz -= Math.round((9/(Math.abs(i - 17))*bS));
				}
			}
			
			return returnz;
		}
	}
	
	//Initialize draw points on canvas
	I.z = I.startingBounceHeight();
	I.d = Iso(I.x,I.y,I.z);
	I.boardPos = Iso(I.x,I.y,0);
	
	//Bounce action
	I.bounce = function() {
		var bC = this.bounceCount;
		var bS = this.bounceSpeed;
		
		if(!this.jumping) {
			if(bC < 9) {
				this.z += Math.round(((9/bC)*bS));
				this.bounceCount++;
			} else {
				this.z -= Math.round((9/(Math.abs(bC - 17))*bS));
				this.bounceCount++;
				if(bC == this.jumpFrames){
					this.bounceCount = 1;
				}
			} 
		}
	};
	
	I.turnAround = function() {
		var dir = this.direction;
		switch(dir) {
			case "right": 
				this.direction = "left";
				break;
			case "left": 
				this.direction = "right";
				break;
			case "up": 
				this.direction = "down";
				break;
			case "down": 
				this.direction = "up";
				break;
		}
	}
	
	I.turnClock = function(dir) {
		switch(dir) {
			case "right":
				this.direction = "down";
				break;
			case "down":
				this.direction = "left";
				break;
			case "left":
				this.direction = "up";
				break;
			case "up":
				this.direction = "right";
				break;
		}
	}
	I.turnCounterClock = function(dir) {
		switch(dir) {
			case "right":
				this.direction = "up";
				break;
			case "down":
				this.direction = "right";
				break;
			case "left":
				this.direction = "down";
				break;
			case "up":
				this.direction = "left";
				break;
		}
	}
	
	//Jump functions
	I.jump = function() {
		//console.log("jumping "+this.direction);
		var jD = this.jumpDir;
		var bC = this.bounceCount;
		var jF = this.jumpFrames;
		var jS = this.jumpSpeed;
		var jSpa = this.jumpSpaces;
		
		this.jumping = true;
		this.startZ = this.z;
		
		this.movedDistance += ((jSpa * spaceW)/(jF));
		
		switch(jD) {
			case "right":
				if(this.canGoRight) { this.moveRight(jSpa,jF); }
				break;
			case "left":
				if(this.canGoLeft) { this.moveLeft(jSpa,jF); }
				break;
			case "up":
				if(this.canGoUp) { this.moveUp(jSpa,jF); }
				break;
			case "down":
				if(this.canGoDown) { this.moveDown(jSpa,jF); }
				break;
			
		}
		
		
		if(this.movedDistance == spaceW) {
			this.movedDistance = 0;
			this.determineBoundaries();
		}
				
		
		if(bC < jF / 2 + 1) {
			this.z += (((jF / 2 + 1)/bC)*jS);
			this.bounceCount++;
		} else {
			this.z -= (((jF / 2 + 1)/(Math.abs(bC - (jF + 1))))*jS);
			this.bounceCount++;
		}
								
		if(bC == (jF)){
			this.z = this.space.z;
			this.jumping = false;
			this.bounceCount = 1;
		}
	}
	
	//Move functions
	I.moveRight = function(jSpa,jF) {
		
		this.x += ((jSpa * spaceW)/(jF));
		
		if(this.movedDistance == spaceW / 2) {
			this.space.occupied = false;
			this.spaceX++;
		}
	
	};
	I.moveLeft = function(jSpa,jF) {
		
		this.x -= ((jSpa * spaceW)/(jF));
		
		if(this.movedDistance == spaceW / 2) {
			this.space.occupied = false;
			this.spaceX--;
		}
	};
	I.moveUp = function(jSpa,jF) {		
		this.y -= ((jSpa * spaceH)/(jF));
		
		if(this.movedDistance == spaceW / 2) {
			this.space.occupied = false;
			this.spaceY--;
		}
	};
	I.moveDown = function(jSpa,jF) {
		
		this.y += ((jSpa * spaceH)/(jF));
		
		if(this.movedDistance == spaceW / 2) {
			this.space.occupied = false;
			this.spaceY++;
		}
	};
	
	I.determineBoundaries = function() {
		if(this.spaceX == 0 || 
				Math.abs(this.space.blockHeight - this.space.nextSpaceLeft.blockHeight) > this.jumpSpeed/2
				) {
			this.canGoLeft = false;
			if(this.direction == "left") { this.hitWall = true; }
		} else if(this.space.nextSpaceLeft.occupied == true) {
			this.canGoLeft = false;
		} else {
			this.canGoLeft = true;
		}
	
		if(this.spaceY == 0 || 
				Math.abs(this.space.blockHeight - this.space.nextSpaceUp.blockHeight) > this.jumpSpeed/2
				) {
			this.canGoUp = false;
			if(this.direction == "up") { this.hitWall = true; }
		} else if(this.space.nextSpaceUp.occupied == true) {
			this.canGoUp = false;
		} else {
			this.canGoUp = true;
		}
		
		if(this.space.nextSpaceRight == null || 
				Math.abs(this.space.blockHeight - this.space.nextSpaceRight.blockHeight) > this.jumpSpeed/2
				) {
			this.canGoRight = false;
			if(this.direction == "right") { this.hitWall = true; }
		} else if(this.space.nextSpaceRight.occupied == true) {
			this.canGoRight = false;
		} else {
			this.canGoRight = true;
		}
		
		if(this.space.nextSpaceDown == null || 
				Math.abs(this.space.blockHeight - this.space.nextSpaceDown.blockHeight) > this.jumpSpeed/2
				) {
			this.canGoDown = false;
			if(this.direction == "down") { this.hitWall = true; }
		} else if(this.space.nextSpaceDown.occupied == true) {
			this.canGoDown = false;
		} else {
			this.canGoDown = true;
		}
		
	}
	
	I.shoot = function() {
		var newBullet = Bullet({
			type: this.bulletKind,
			direction: this.direction,
			space: this.space
		});
		bullets.push(newBullet);
		//console.log(bullets.length);
	};
	
	I.hit = function() {
		this.strength--;
		explosions.push(smallExplosion({
			x: this.x,
			y: this.y,
			z: this.z + this.hZ
		}));
		if(this.isPlayer){
			$("#health").html(this.strength);
		}
		if(this.strength <= 0) {
			this.die();
		}
	}
	
	I.die = function() {
		this.active = false;
		this.space.occupied = false;
		explosions.push(bigExplosion({
			x: this.x,
			y: this.y,
			z: this.z + this.hZ
		}));
		if(!this.isPlayer){
			enemyCount--;
			$("#remainingEnemies").html(enemyCount);
		}
	}
	
	I.bounceOrJump = function() {
	    if(this.bounceCount == 1) { this.determineBoundaries(); }
	    
	    if(this.jumpTriggered && this.bounceCount == 1) {
    		this.jumpDir = this.direction;
    		this.jump();
    		this.jumpTriggered = false;
	    } else if(this.jumping) {
	    	this.jump();
	    } else {
	    	this.bounce();
	    }
	}
	
	
	//Draw
	I.draw = function(){
	    this.d = Iso(this.x,this.y,this.z);
	    this.boardPos = Iso(this.x,this.y,0);
	    
		this.iconX = this.d.x - this.hW;
		this.iconY = this.d.y - this.zHeight;
		bcx.drawImage(this.icon,this.iconX,this.iconY);		
		this.drawn = true;					
	};
	
	//Be sure to give every pogo an update method
	
	return I;
}