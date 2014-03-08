define(["jquery","utils"], function($,utils) {
    

    function Pogo(startingSpace) {
	    var width = 24;
	    var zHeight = 48;
	    
	    var currentSpace = startingSpace;
	    
	    var size = { w:width, h:width, z:zHeight };
	    var pos = { x:currentSpace.x, y:currentSpace.y, z:currentSpace.zHeight };
	    var velocity = { x:0, y:0, z:0 };

	    var bounceSpeed = 1;
	    
	    var gravity = 10;
	    
	    function bounce() {			
			//console.log("bounce");
			velocity.z = 3;
		};
	    
		this.update = function(dt){
			//velocity.x;
			//velocity.y;
			
			velocity.z -= gravity*dt/1000;
			
			pos.x += velocity.x;
			pos.y += velocity.y;
			pos.z = Math.floor(pos.z + velocity.z);
			
			//console.log(pos.z);
			if(pos.z <= currentSpace.zHeight) {
				pos.z = currentSpace.zHeight;
				bounce();	
			}
			
		};
		

	    
	    this.draw = function() {
		    var iso = utils.isoOffset(pos.x,pos.y,pos.z);
		    
		    //console.log(iso);
		    
		    var canvas = document.querySelector("#canvas");
			var ctx = canvas.getContext("2d");

			ctx.drawImage(IMG,iso.x-size.w/2,iso.y-size.z);
			//ctx.fillRect(iso.x,iso.y,width,width);

	    };
    }   
    
    return Pogo; 
});