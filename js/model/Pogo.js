define(["jquery","utils","config","Entity"], function($,utils,config,Entity) {
    
	var _gravity = -600, _bounceSpeed = 1, _jumpFrames = 24;
	var _jumpMidpoint = _jumpFrames/2 + 1;
	
    function Pogo(startingSpace) {
	    
	    Entity.call(this);
	    
	    this.setSize({
		    width: config.pogoWidth,
		    height: config.pogoWidth,
		    z: config.pogoHeight
	    });
	    
	    this.currentSpace = startingSpace;
	    
	    this.setPos({
		    x: this.currentSpace.pos.x,
		    y: this.currentSpace.pos.y,
		    z: this.currentSpace.size.z
	    });
	    
	    this.velocity = { x:0, y:0, z:0 }, 

	    this.bouncing = true;

	    
	    
	    this.bounceTime = 0;
	    
	    return this;
	    
	    
	    	    
/*
	    var moveDir = null;
	    	    
		
		function moveRight(e) {
			e.preventDefault();			
			if(currentSpace.onBoardEdge("right")) return;
			moveDir = "right";
		}
		function moveLeft(e) {
			e.preventDefault();	
			if(currentSpace.onBoardEdge("left")) return;		
			moveDir = "left";
		}
		function moveUp(e) {
			e.preventDefault();		
			if(currentSpace.onBoardEdge("top")) return;	
			moveDir = "up";
		}
		function moveDown(e) {
			e.preventDefault();	
			if(currentSpace.onBoardEdge("bottom")) return;		
			moveDir = "down";
		}
		
		function jump() {
			velocity.z = 300;
			bounceCount = 0;
		}
	    		
*/
	    
    }   
    
    Pogo.prototype = Object.create( Entity.prototype );
    
    Pogo.prototype.bounce = function() {		
		//normal bounce
/*
		var vel = _gravity / -3;
		
		//console.log(this.lastJump);
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.velocity.z = vel;
		
		this.lastJump = 0;
*/
		this.bouncing = true;
		this.bouncCount = 0;
    };
    
    Pogo.prototype.jump = function() {
	    var bounceVelocity = _gravity / -2;
	    this.velocity.z = bounceVelocity;
	    
	    if(this.jumpDir == Pogo.JUMP_DIRS.UP) {
		    this.velocity.y = config.spaceWidth * -1;
	    } else if (this.jumpDir == Pogo.JUMP_DIRS.DOWN) {
		    this.velocity.y = config.spaceWidth;
	    } else if (this.jumpDir == Pogo.JUMP_DIRS.LEFT) {
		    this.velocity.x = config.spaceWidth * -1;
	    } else if (this.jumpDir == Pogo.JUMP_DIRS.RIGHT) {
		    this.velocity.x = config.spaceWidth;
	    }
	    
	    this.jumpTriggered = false;
	    this.isJumping = true;
    };
    
    Pogo.prototype.triggerJump = function(dir) {
	    this.jumpTriggered = true;
	    this.jumpDir = dir;
    };
    
    Pogo.prototype.shoot = function() {
	    this.shotTriggered = false;
    }
    
    // t: current time, b: begInnIng value, c: change In value, d: duration
	Pogo.easeInQuart = function (t, b, c, d) {
		return c*(t/=d)*t + b;
	};
	Pogo.easeOutQuart =  function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	};    
    Pogo.prototype.bounceFunc = function(dt) {
		var bounceLength = 250;
		
		var downZ = this.currentSpace.size.z;
		var bHeight = 50;
		
		this.bounceTime += dt;
		
		if(this.bounceTime >= bounceLength) {
			this.bounceTime = bounceLength;
		}
		
		if(this.goingUp) {
			this.pos.z = Pogo.easeOutQuart(this.bounceTime, downZ, bHeight, bounceLength);
		} else {
			this.pos.z = Pogo.easeInQuart(this.bounceTime, downZ + bHeight, -bHeight, bounceLength);
		}
		
		if(this.bounceTime == bounceLength) {
			this.goingUp = !this.goingUp;
			this.bounceTime = 0;			
		}		
    }
        
    Pogo.prototype.update = function(dt) {

			if(this.bouncing) {
				this.bounceFunc(dt);
			}
			
			if(this.pos.z == this.currentSpace.size.z) {
				//console.log("bounce!");
			}

/*
			this.velocity.z += (_gravity*dt)/1000;
			var vx1 = (this.velocity.x*dt)/1000;
			var vy1 = (this.velocity.y*dt)/1000;
			var vz1 = (this.velocity.z*dt)/1000;
			
			this.pos.x += vx1;
			this.pos.y += vy1;
			this.pos.z += vz1;
			this.lastJump += dt;
*/
			
/*
			if(this.pos.z <= this.currentSpace.size.z && this.velocity.z < 0) {
				//On platform - bounce or jump
				this.isJumping = false;
				this.pos.z = this.currentSpace.size.z;
				
				if(this.jumpTriggered) {
					this.jump();
				} else {
					this.bounce();
				}
				
				if(this.shotTriggered) this.shoot();
			}
*/
			
/*
			if(this.isJumping) {
				var map = GAME_CONTROLLER.map;
				//console.log(pos,currentSpace.edges);
				if(this.pos.x >= this.currentSpace.edges.right) {
					this.currentSpace = map.getSpace(this.currentSpace.xIndex+1,this.currentSpace.yIndex);
				} else if(this.pos.x < this.currentSpace.edges.left) {
					this.currentSpace = map.getSpace(this.currentSpace.xIndex-1,this.currentSpace.yIndex);
				} else if(this.pos.y < this.currentSpace.edges.top) {
					this.currentSpace = map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex-1);
				} else if(this.pos.y >= this.currentSpace.edges.bottom) {
					this.currentSpace = map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex+1);
				}

			}
*/
    };
    
    Pogo.prototype.draw = function() {
		    var iso = utils.isoOffset(this.pos.x,this.pos.y,this.pos.z);
		    //console.log(iso);
		    
		    var canvas = document.querySelector("#canvas");
			var ctx = canvas.getContext("2d");

			ctx.drawImage(IMG,iso.x-this.size.width/2,iso.y-this.size.z);
			//ctx.fillRect(iso.x,iso.y,width,width);
    }
    
    Pogo.JUMP_DIRS = {
		LEFT: "left",    
		RIGHT: "right",    
		UP: "up",    
		DOWN: "down"    
    };
    
    return Pogo; 
});