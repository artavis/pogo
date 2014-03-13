define(["jquery","utils","GameController"], function($,utils,GameController) {
    

    function Pogo(startingSpace) {
	    var width = 24;
	    var zHeight = 48;
	    
	    var size, pos, velocity, bounceCount, bounceStart;
	    
	    var currentSpace = startingSpace;
	    	    
	    var gravity = -600;
	    var moveDir = null;
	    var isJumping = false;
	    
	    function init() {
		    		    
		    size = { w:width, h:width, z:zHeight };
		    pos = { x:currentSpace.pos.x, y:currentSpace.pos.y, z:currentSpace.size.z + Math.floor(Math.random()*200) };
		    velocity = { x:0, y:0, z:Math.floor(Math.random()*200) };
	
		    bounceCount = 0;
		    bounceStart = 0;
		    
	    }
	    
	    function bounce() {			
			//console.log(GAME_CONTROLLER);
			
			if(moveDir != null) {
				if(moveDir == "right") {
					velocity.x = currentSpace.size.width;
				}else if(moveDir == "left") {
					velocity.x = currentSpace.size.width * -1;
				}else if(moveDir == "up") {
					velocity.y = currentSpace.size.height * -1;
				}else if(moveDir == "down") {
					velocity.y = currentSpace.size.height;
				}
				
				moveDir = null;
				isJumping = true;
				jump();
			} else {
				//normal bounce
				velocity.x = 0;
				velocity.y = 0;
				velocity.z = 200;
				isJumping = false;
			}
		};
		
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
	    
		this.update = function(dt){
			//if(pos.z <= currentSpace.zHeight) bounce();
			
			//pos.z += Math.floor((dt/1000) * (velocity.z + (dt/1000) * gravity));
			//velocity.z += (dt/1000) * gravity;
			
			
			
			velocity.z += (gravity*dt)/1000;
			var vx1 = (velocity.x*dt)/1000;
			var vy1 = (velocity.y*dt)/1000;
			var vz1 = (velocity.z*dt)/1000;
			
			pos.x += vx1;
			pos.y += vy1;
			pos.z += vz1;
			
			if(pos.z <= currentSpace.size.z && velocity.z < 0) {
				pos.z = currentSpace.size.z;
				bounce();
			}
			
			if(isJumping) {
/* 				console.log("jumping"); */
				var map = GAME_CONTROLLER.map;
				//console.log(pos,currentSpace.edges);
				if(pos.x >= currentSpace.edges.right) {
					currentSpace = map.getSpace(currentSpace.xIndex+1,currentSpace.yIndex);
				} else if(pos.x < currentSpace.edges.left) {
					currentSpace = map.getSpace(currentSpace.xIndex-1,currentSpace.yIndex);
				} else if(pos.y < currentSpace.edges.top) {
					currentSpace = map.getSpace(currentSpace.xIndex,currentSpace.yIndex-1);
				} else if(pos.y >= currentSpace.edges.bottom) {
					currentSpace = map.getSpace(currentSpace.xIndex,currentSpace.yIndex+1);
				}
				
			}

						
		};
		

	    this.currentSpace = function() {
			return currentSpace;
	    };
	    
	    this.draw = function() {
		    var iso = utils.isoOffset(pos.x,pos.y,pos.z);
		    
		    //console.log(iso);
		    
		    var canvas = document.querySelector("#canvas");
			var ctx = canvas.getContext("2d");

			ctx.drawImage(IMG,iso.x-size.w/2,iso.y-size.z);
			//ctx.fillRect(iso.x,iso.y,width,width);

	    };
	    this.moveRight = moveRight;
	    this.moveLeft = moveLeft;
	    this.moveUp = moveUp;
	    this.moveDown = moveDown;
	    
	    init();
    }   
    
    return Pogo; 
});