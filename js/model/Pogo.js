define(["jquery","utils","config","Entity","PogoView"], function($,utils,config,Entity,PogoView) {
    
	var _bounceLength = config.spaceWidth*5, _moveLength=_bounceLength*2, _bounceHeight = 50, _jumpHeight = 90;
	
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

	    this.bouncing = true;
	    this.jumping = false;

	    
	    
	    this.bounceTime = 0;
	    this.moveTime = 0;
	    
	    
	    this.view = new PogoView(this);
	    return this;	    
    }   
    
    Pogo.prototype = Object.create( Entity.prototype );
            
    Pogo.prototype.triggerJump = function(dir) {
	    this.jumpTriggered = true;
	    this.jumpDir = dir || null;
    };
    Pogo.prototype.getDestination = function(dir) {
	    var dest;
	    
	    if(dir == undefined || dir == null) return false;
	    
	    if(dir == Pogo.JUMP_DIRS.LEFT && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.LEFT)) {
		    dest = GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex-1,this.currentSpace.yIndex);
	    } else if(dir == Pogo.JUMP_DIRS.RIGHT && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.RIGHT)) {
		    dest = GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex+1,this.currentSpace.yIndex);
	    } else if(dir == Pogo.JUMP_DIRS.UP && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.UP)) {
		    dest = GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex-1);
	    } else if(dir == Pogo.JUMP_DIRS.DOWN && !this.currentSpace.onBoardEdge(Pogo.JUMP_DIRS.DOWN)) {
		    dest = GAME_CONTROLLER.map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex+1);
	    } else {
			return false;    
	    }
	    
	    if(this.canJumpToSpace(dest)) return dest;
	    return false;
    };
    
    Pogo.prototype.canJumpToSpace = function(space) {		
		return (space.blockHeight - this.currentSpace.blockHeight > 2 && !space.isOccupied()) ? false : true;
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
/* 		if(window.DEBUG) console.log("dt",dt); */
		
		var downZ = this.currentSpace.size.z;
		var topZ = downZ + _jumpHeight;
		
		if(this.bounceTime == 0 && this.goingUp) this.moveTime = 0;
		
/*
		if(window.DEBUG) console.log("bounce time",this.bounceTime);
		if(window.DEBUG) console.log("move time",this.moveTime);
*/

		this.bounceTime += dt;
		this.moveTime += dt;
		
/*
		if(window.DEBUG) console.log("bounce time",this.bounceTime);
		if(window.DEBUG) console.log("move time",this.moveTime);
*/
		
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
/*
		if(window.DEBUG) console.log("move time",this.moveTime);
		if(window.DEBUG) console.log("move length",_moveLength);
		if(window.DEBUG) console.log(this.destSpace.pos.x - this.currentSpace.pos.x);
		if(window.DEBUG) console.log(this.destSpace.pos.y - this.currentSpace.pos.y);
		if(window.DEBUG) console.log(this.pos);
*/
		
		
		this.pos.x = Pogo.noEasing(this.moveTime, this.currentSpace.pos.x, 
									this.destSpace.pos.x - this.currentSpace.pos.x, _moveLength);
		this.pos.y = Pogo.noEasing(this.moveTime, this.currentSpace.pos.y, 
									this.destSpace.pos.y - this.currentSpace.pos.y, _moveLength);		
		
		
/*
		if(window.DEBUG) console.log(this.pos);
		if(window.DEBUG) console.log("****");
		if(window.DEBUG) console.log("****");
		if(window.DEBUG) console.log("****");
		if(window.DEBUG) console.log("****");
*/
		
		if(this.bounceTime == _bounceLength) {
			this.goingUp = !this.goingUp;
			this.bounceTime = 0;			
		}		
		if(this.moveTime == _moveLength) {
			this.moveTime = 0;
			
			this.currentSpace.unoccupy();
			this.currentSpace = this.destSpace;
			this.currentSpace.occupy();
		}

    };
        
    Pogo.prototype.update = function(dt) {
		if(this.bouncing) {
			this.bounceFunc(dt);
			
		} else if (this.jumping) {
			this.jumpFunc(dt);
		}
		
		if(this.pos.z == this.currentSpace.size.z) {
			this.view.setDownFrame();
			this.onBounce();
		} else {
			this.view.setUpFrame();
		}
		
		this.onUpdate();
    };
    Pogo.prototype.onBounce = function(){ /* STUB FOR CHILD CLASSES */ }
    Pogo.prototype.onUpdate = function(){ /* STUB FOR CHILD CLASSES */ }
    
    Pogo.JUMP_DIRS = {
		LEFT: "left",    
		RIGHT: "right",    
		UP: "up",    
		DOWN: "down"    
    };
    
    return Pogo; 
});