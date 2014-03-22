define(["jquery","config","Entity","BulletView"], function($,config,Entity,BulletView) {
    
    var _bulletSpeed = config.spaceWidth*config.bulletVelocityFactor;
    
    function Bullet(shooter,type) {
	    Entity.call(this);
	    
	    this.isProjectile = true;
	    this.type = type || Bullet.TYPES.NORMAL;
	    this.currentSpace = shooter.currentSpace || GAME_CONTROLLER.map.getSpace(0,0);
	    this.setSize({
			width: config.bulletSize,
			height: config.bulletSize,
			z: config.bulletSize
	    });
		
		this.dir = shooter.dir || config.DIRS.LEFT;
	    this.setOriginPos(shooter,this.dir);
	    this.getNextSpace();
	    
	    this.setVelocity(this.dir);
	    this.setPower();
	    
	    
	    this.view = new BulletView(this);
	    
	    return this;
    }
    
    Bullet.prototype = Object.create( Entity.prototype );
    Bullet.prototype.setPower = function() {
	    switch(this.type) {
		    case Bullet.TYPES.NORMAL:
		    default:
		    	this.power = 1;
	    }
    };
    Bullet.prototype.setOriginPos = function(shooter,dir) {
	    var origPos;
	    if(dir == config.DIRS.LEFT) {
		    origPos = {x: shooter.pos.x - shooter.size.width, y: shooter.pos.y, z: shooter.gunHeight};
	    } else if(dir == config.DIRS.RIGHT) {
		    origPos = {x: shooter.pos.x + shooter.size.width, y: shooter.pos.y, z: shooter.gunHeight};
	    } else if(dir == config.DIRS.UP) {
		    origPos = {x: shooter.pos.x, y: shooter.pos.y - shooter.size.height, z: shooter.gunHeight};
	    } else if(dir == config.DIRS.DOWN) {
		    origPos = {x: shooter.pos.x, y: shooter.pos.y + shooter.size.height, z: shooter.gunHeight};
	    } else {
		    origPos = {x: shooter.pos.x, y: shooter.pos.y, z: shooter.gunHeight};
	    }
	    this.setPos(origPos);
    };
    Bullet.prototype.setVelocity = function(dir) {
	    if(dir == config.DIRS.LEFT) {
		    this.velocity = {x: -_bulletSpeed, y: 0 };
	    } else if(dir == config.DIRS.RIGHT) {
		    this.velocity = {x: _bulletSpeed, y: 0 };
	    } else if(dir == config.DIRS.UP) {
		    this.velocity = {x: 0, y: -_bulletSpeed };
	    } else if(dir == config.DIRS.DOWN) {
		    this.velocity = {x: 0, y: _bulletSpeed };
	    } else {
		    this.velocity = {x: 10000, y: 10000 };
	    }
    };
    Bullet.prototype.getNextSpace = function(){
	    var map = GAME_CONTROLLER.map;
	    if(this.dir == config.DIRS.LEFT) {
		    this.nextSpace = map.getSpace(this.currentSpace.xIndex-1,this.currentSpace.yIndex);
	    } else if(this.dir == config.DIRS.RIGHT) {
		    this.nextSpace = map.getSpace(this.currentSpace.xIndex+1,this.currentSpace.yIndex);
	    } else if(this.dir == config.DIRS.UP) {
		    this.nextSpace = map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex-1);
	    } else if(this.dir == config.DIRS.DOWN) {
		    this.nextSpace = map.getSpace(this.currentSpace.xIndex,this.currentSpace.yIndex+1);
	    } 
    };
    Bullet.prototype.leavingCurrentSpace = function() {
	    return (this.pos.x < this.currentSpace.edges.left && this.dir == config.DIRS.LEFT) || 
	    	(this.pos.x >= this.currentSpace.edges.right && this.dir == config.DIRS.RIGHT) || 
	    	(this.pos.y < this.currentSpace.edges.top && this.dir == config.DIRS.UP) || 
	    	(this.pos.y >= this.currentSpace.edges.bottom && this.dir == config.DIRS.DOWN);
    }
    Bullet.prototype.update = function(dt) {
	    this.pos.x += (dt*this.velocity.x)/1000;
	    this.pos.y += (dt*this.velocity.y)/1000;
	    
	    if(this.leavingCurrentSpace()) {
	    	if(this.nextSpace === false) {
		    	this.removeFromGame();
	    	} else {
		    	if(this.nextSpace.size.z > this.pos.z) {
			    	this.nextSpace.blockHit(this.power);
			    	this.removeFromGame();
		    	} else {
			    	this.currentSpace = this.nextSpace;
			    	this.getNextSpace();	
		    	}
	    	}
    	} 
    };
    
    Bullet.TYPES = {
		NORMAL: "normal"  
    };
    
    return Bullet;
    
});