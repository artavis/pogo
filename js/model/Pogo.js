define(["jquery","utils","config","Entity"], function($,utils,config,Entity) {
    
	var _bounceLength = 250, _moveLength=_bounceLength*2, _bounceHeight = 50, _jumpHeight = 90;
	
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
	    this.jumping = false;

	    
	    
	    this.bounceTime = 0;
	    this.moveTime = 0;
	    
	    return this;	    
    }   
    
    Pogo.prototype = Object.create( Entity.prototype );
            
    Pogo.prototype.triggerJump = function(dir) {
	    this.jumpTriggered = true;
	    this.jumpDir = dir || null;
    };
    Pogo.prototype.getDestination = function(dir) {
	    if(dir == undefined || dir == null) return this.currentSpace;
	    
	    if(dir == Pogo.JUMP_DIRS.LEFT && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.LEFT)) {
		    return GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex-1,this.currentSpace.yIndex);
	    }
	    if(dir == Pogo.JUMP_DIRS.RIGHT && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.RIGHT)) {
		    return GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex+1,this.currentSpace.yIndex);
	    }
	    if(dir == Pogo.JUMP_DIRS.UP && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.UP)) {
		    return GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex-1);
	    }
	    if(dir == Pogo.JUMP_DIRS.DOWN && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.DOWN)) {
		    return GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex+1);
	    }
	    
	    return this.currentSpace;
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
	Pogo.noEasing = function(t, b, c, d) {
	    return c * t / d + b;
	}
    Pogo.prototype.bounceFunc = function(dt) {
		var downZ = this.currentSpace.size.z;
		
		this.bounceTime += dt;
		
		if(this.bounceTime >= _bounceLength) {
			this.bounceTime = _bounceLength;
		}
		
		if(this.goingUp) {
			this.pos.z = Pogo.easeOutQuart(this.bounceTime, downZ, _bounceHeight, _bounceLength);
		} else {
			this.pos.z = Pogo.easeInQuart(this.bounceTime, downZ + _bounceHeight, -_bounceHeight, _bounceLength);
		}
		
		if(this.bounceTime == _bounceLength) {
			this.goingUp = !this.goingUp;
			this.bounceTime = 0;			
		}		
    };
    Pogo.prototype.jumpFunc = function(dt) {
		var downZ = this.currentSpace.size.z;
		var topZ = downZ + _jumpHeight;
		
		this.bounceTime += dt;
		this.moveTime += dt;
		
		if(this.bounceTime >= _bounceLength) {
			this.bounceTime = _bounceLength;
		}
		if(this.moveTime >= _moveLength) {
			this.moveTime = _moveLength;
		}
		
		//Bounce Height
		if(this.goingUp) {
			this.pos.z = Pogo.easeOutQuart(this.bounceTime, downZ, _jumpHeight, _bounceLength);
		} else {
			this.pos.z = Pogo.easeInQuart(this.bounceTime, topZ, this.destSpace.size.z-topZ, _bounceLength);
		}
		
		//Moving across map
		this.pos.x = Pogo.noEasing(this.moveTime, this.currentSpace.pos.x, 
									this.destSpace.pos.x - this.currentSpace.pos.x, _moveLength);
		this.pos.y = Pogo.noEasing(this.moveTime, this.currentSpace.pos.y, 
									this.destSpace.pos.y - this.currentSpace.pos.y, _moveLength);
		
		
		
		
		
		if(this.bounceTime == _bounceLength) {
			this.goingUp = !this.goingUp;
			this.bounceTime = 0;			
		}		
		if(this.moveTime >= _moveLength) {
			this.moveTime = 0;
			
			this.currentSpace = this.destSpace;
		}

    };
        
    Pogo.prototype.update = function(dt) {
		if(this.bouncing) {
			this.bounceFunc(dt);
			
		} else if (this.jumping) {
			this.jumpFunc(dt);
		}
		
		if(this.pos.z == this.currentSpace.size.z) {
			this.onBounce();
		}
		
		this.onUpdate();
    };
    Pogo.prototype.onBounce = function(){ /* STUB FOR CHILD CLASSES */ }
    Pogo.prototype.onUpdate = function(){ /* STUB FOR CHILD CLASSES */ }
    
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