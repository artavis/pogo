var bullets = [];

function Bullet(I) {
	I.active = true;
	I.id = Math.floor(Math.random()*1000);

	I.icon = new Image();
	if(I.type == "regular") {
		I.speed = spaceW/4;
		I.power = 1;
		I.icon.src = "images/bullet.png";
	}
	
	I.width = spaceW/4;
	I.height = spaceH/4;
	I.zHeight = platformHeight/2;
	
	I.hW = I.width / 2;
	I.hH = I.height / 2;
	I.hZ = I.zHeight / 2;
	
	switch(I.direction) {
		case "right":
			I.x = I.space.rightEdge + I.hW;
			I.y = I.space.y;
			break;
		case "left":
			I.x = I.space.leftEdge - I.hW;
			I.y = I.space.y;
			break;
		case "up":
			I.x = I.space.x;
			I.y = I.space.topEdge - I.hH;
			break;
		case "down":
			I.x = I.space.x;
			I.y = I.space.bottomEdge + I.hH;
			break;
	}		
	I.z = I.space.z + I.height + 3;
	//console.log(I.x+" "+I.y+" "+I.z);
	
	I.movedDistance = -I.width;

	//console.log(I.z);
	I.d = Iso(this.x,this.y,this.z);
	
    I.inBounds = function() {
    	return I.x >= 0 && I.x <= WIDTH && I.y >= 0 && I.y <= HEIGHT;
    }
	
	I.update = function() {
		var dir = this.direction;
		var speed = this.speed;
		
		switch(dir) {
			case "right":
				this.x += speed;
				break;
			case "left":
				this.x -= speed;
				break;
			case "up":
				this.y -= speed;
				break;
			case "down":
				this.y += speed;
				break;
		}

		this.movedDistance += speed;
		
		if(this.movedDistance % spaceW == 0) {
			switch(dir) {
				case "right":
					this.space = this.space.nextSpaceRight;
					break;
				case "left":
					this.space = this.space.nextSpaceLeft;
					break;
				case "up":
					this.space = this.space.nextSpaceUp;
					break;
				case "down":
					this.space = this.space.nextSpaceDown;
					break;
			}
						
			this.movedDistance = 0;	
			
			if(this.space != null && this.space.z > this.z) {
				this.space.blockHit(this.power);
				this.active = false;				
			}
		}
		
		this.active = this.active && this.inBounds();
		
		//if(this.space != null) {console.log(this.space.spaceX);}
	}
	I.draw = function() {
		this.d = Iso(this.x,this.y,this.z);
		
		var iconX = this.d.x - this.hW;
		var iconY = this.d.y - this.zHeight;
		//console.log(this.iconX+" "+this.iconY);
		bcx.drawImage(this.icon,iconX,iconY);
	}
	
	return I;
}