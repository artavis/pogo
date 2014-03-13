define(["jquery","utils","config","Entity"], function($,utils,config,Entity) {
    
	var _gravity = -600;
	
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
	    
	    this.velocity = { x:0, y:0, z:Math.floor(Math.random()*200) }, 
	    this.isJumping = false;
	    //bounceCount = 0, 
	    //bounceStart = 0;
	    
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
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.velocity.z = 200;
		this.isJumping = false;
    };
    
    Pogo.prototype.update = function(dt) {
			this.velocity.z += (_gravity*dt)/1000;
			var vx1 = (this.velocity.x*dt)/1000;
			var vy1 = (this.velocity.y*dt)/1000;
			var vz1 = (this.velocity.z*dt)/1000;
			
			this.pos.x += vx1;
			this.pos.y += vy1;
			this.pos.z += vz1;
			
			if(this.pos.z <= this.currentSpace.size.z && this.velocity.z < 0) {
				this.pos.z = this.currentSpace.size.z;
				this.bounce();
			}
    };
    
    Pogo.prototype.draw = function() {
		    var iso = utils.isoOffset(this.pos.x,this.pos.y,this.pos.z);
		    //console.log(iso);
		    
		    var canvas = document.querySelector("#canvas");
			var ctx = canvas.getContext("2d");

			ctx.drawImage(IMG,iso.x-this.size.width/2,iso.y-this.size.z);
			//ctx.fillRect(iso.x,iso.y,width,width);
    }
    
    return Pogo; 
});