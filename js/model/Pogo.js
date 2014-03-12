define(["jquery","utils"], function($,utils) {
    

    function Pogo(startingSpace) {
	    var width = 24;
	    var zHeight = 48;
	    
	    var size, pos, velocity, bounceCount, bounceStart;
	    
	    var currentSpace = startingSpace;
	    	    
	    var gravity = -600;
	    
	    function init() {
		    		    
		    size = { w:width, h:width, z:zHeight };
		    pos = { x:currentSpace.x, y:currentSpace.y, z:currentSpace.zHeight + Math.floor(Math.random()*200) };
		    velocity = { x:0, y:0, z:Math.floor(Math.random()*200) };
	
		    bounceCount = 0;
		    bounceStart = 0;
		    
	    }
	    
	    function bounce() {			
			//console.log("bounce");
			if(bounceCount == 5) {
				jump();
			} else {
				velocity.z = 200;
				bounceCount++;
			}
		};
		
		function jump() {
			velocity.z = 300;
			bounceCount = 0;
		}
	    
		this.update = function(dt){
			//if(pos.z <= currentSpace.zHeight) bounce();
			
			//pos.z += Math.floor((dt/1000) * (velocity.z + (dt/1000) * gravity));
			//velocity.z += (dt/1000) * gravity;
			
			
			
			velocity.z += (gravity*dt)/1000;
			var vz1 = (velocity.z*dt)/1000;
			
			pos.x += velocity.x;
			pos.y += velocity.y;
			pos.z += vz1;
			
			if(pos.z <= currentSpace.zHeight && velocity.z < 0) {
				pos.z = currentSpace.zHeight;
				bounce();
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
	    
	    init();
    }   
    
    return Pogo; 
});