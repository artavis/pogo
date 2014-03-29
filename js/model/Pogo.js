define(["jquery","utils","config","Entity","PogoView","Bullet","Explosion"], function($,utils,config,Entity,PogoView,Bullet,Explosion) {
    
	var _bounceLength = config.spaceWidth*5,
		_jumpLength = config.spaceWidth*6,
		_moveLength =_jumpLength*2, 
		_bounceHeight = config.pogoHeight*2/3, 
		_jumpHeight = config.pogoHeight*4/3;
	
    function Pogo(startingSpace) {
	    
	    Entity.call(this);
	    
	    this.setSize({
		    width: config.pogoWidth,
		    height: config.pogoWidth,
		    z: config.pogoHeight
	    });
	    this.checkCollide = true;
	    this.health = 1;
	    
	    this.currentSpace = startingSpace;
	    this.currentSpace.occupy();
	    
	    this.setPos({
		    x: this.currentSpace.pos.x,
		    y: this.currentSpace.pos.y,
		    z: this.currentSpace.size.z
	    });

	    this.bouncing = true;
	    this.jumping = false;
	    
	    this.bounceTime = 0;
	    this.moveTime = 0;
	    this.dir = Pogo.JUMP_DIRS.UP;
	    
	    this.gunHeight = config.pogoGunHeight;
	    
	    this.view = new PogoView(this);
	    
	    return this;	    
    }   
    
    Pogo.prototype = Object.create( Entity.prototype );
    
    Pogo.prototype.setPower = function(power) {
	  	// {shot: 1, block:1}
	  	this.power = power;  
    };
    Pogo.prototype.getPower = function() {
	    return this.power;
    }
    
    Pogo.prototype.getHit = function(bullet) {
	    this.health -= bullet.power.shot;
	    
	    if(this.health <= 0) {
	    	this.kill();
	    } else {
		    this.onHit();
	    }
    };
    Pogo.prototype.kill = function() {
	    var currentSpace = this.currentSpace;
	    var pos = this.pos;
	    for(var i=0; i<4; i++) {
			setTimeout(function(){
				var randX = Math.floor(Math.random()*24);
				var randY = Math.floor(Math.random()*24);
				var randZ = Math.floor(Math.random()*24);
				var expl = new Explosion({
					currentSpace: currentSpace,
					pos: {x:pos.x+randX,y:pos.y+randY,z:pos.z+randZ}
				});    
			},i*100);
	    }
	    this.onKill();
	    this.removeFromGame();
    };
    Pogo.prototype.triggerJump = function() {
	    this.jumpTriggered = true;
    };
    Pogo.prototype.changeDir = function(dir) {
		this.dir = dir;
		//todo - change the view's frame to the new direction  
    };
    Pogo.prototype.triggerShot = function() {
	    this.shotTriggered = true;
    };
        
    Pogo.prototype.shoot = function() {
	    var b = new Bullet(this);
		GAME_CONTROLLER.addEntity(b);
	    
	    this.shotTriggered = false;
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
		//console.log(space);
		//GAME_CONTROLLER.pausePlay();
		//if(space === GAME_CONTROLLER.player.currentSpace) debugger;
		return (space.blockHeight - this.currentSpace.blockHeight > 1 || space.isOccupied()) ? false : true;
    };
    
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
		
		if(this.bounceTime == 0 && this.goingUp) this.moveTime = 0;

		this.bounceTime += dt;
		this.moveTime += dt;
		
		if(this.bounceTime >= _jumpLength) {
			this.bounceTime = _jumpLength;
		}
		if(this.moveTime >= _moveLength) {
			this.moveTime = _moveLength;
		}
		
		//Bounce Height
		if(this.goingUp) {
			this.pos.z = Pogo.easeOutQuart(this.bounceTime, downZ, _jumpHeight, _jumpLength);
		} else {
			this.pos.z = Pogo.easeInQuart(this.bounceTime, topZ, this.destSpace.size.z-topZ, _jumpLength);
		}
		
		
		//Moving across map
/*
		if(window.DEBUG) console.log("move time",this.moveTime);
		if(window.DEBUG) console.log("move length",_moveLength);
		if(window.DEBUG) console.log(this.destSpace.pos.x - this.currentSpace.pos.x);
		if(window.DEBUG) console.log(this.destSpace.pos.y - this.currentSpace.pos.y);
		if(window.DEBUG) console.log(this.pos);
		if(window.DEBUG) console.log("****");
*/
		
		this.pos.x = Pogo.noEasing(this.moveTime, this.currentSpace.pos.x, 
									this.destSpace.pos.x - this.currentSpace.pos.x, _moveLength);
		this.pos.y = Pogo.noEasing(this.moveTime, this.currentSpace.pos.y, 
									this.destSpace.pos.y - this.currentSpace.pos.y, _moveLength);		
		
		if(this.bounceTime == _jumpLength) {
			this.goingUp = !this.goingUp;
			this.bounceTime = 0;			
		}		
		if(this.moveTime == _moveLength) {
			this.moveTime = 0;
			
			this.currentSpace.unoccupy();
			this.destSpace.occupy();
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
			//this.view.setDownFrame();
			if(this.shotTriggered) this.shoot();

			this.onBounce();
		} else {
			//this.view.setUpFrame();
		}
		
		
		this.onUpdate();
    };
    Pogo.prototype.onBounce = function(){ /* STUB FOR CHILD CLASSES */ };
    Pogo.prototype.onUpdate = function(){ /* STUB FOR CHILD CLASSES */ };
    Pogo.prototype.onKill = function(){ /* STUB FOR CHILD CLASSES */ };
    Pogo.prototype.onHit = function(){ /* STUB FOR CHILD CLASSES */ };
    
    Pogo.JUMP_DIRS = {
		LEFT: config.DIRS.LEFT,    
		RIGHT: config.DIRS.RIGHT,    
		UP: config.DIRS.UP,    
		DOWN: config.DIRS.DOWN    
    };
    
    return Pogo; 
});