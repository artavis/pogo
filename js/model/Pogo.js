define(["jquery","utils"], function($,utils) {
    

    function Pogo(x,y,z) {
	    var width = 24;
	    var zHeight = 48;
	    
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    
	    var bounceCount = 1;
	    var bounceSpeed = 1;
	    
		this.update = function(){
			this.bounce();
			this.draw();
		};
		
		this.bounce = function() {
			
			
			if(bounceCount < 9) {
				this.z += Math.round(((9/bounceCount)*bounceSpeed));
				bounceCount++;
			} else {
				this.z -= Math.round((9/(Math.abs(bounceCount - 17))*bounceSpeed));
				bounceCount++;
				if(bounceCount == 17){
					bounceCount = 1;
				}
			} 
		};

	    
	    this.draw = function() {
		    var iso = utils.isoOffset(this.x,this.y,this.z);
		    
		    //console.log(iso);
		    
		    var canvas = document.querySelector("#canvas");
			var ctx = canvas.getContext("2d");

			ctx.drawImage(IMG,iso.x-width/2,iso.y-zHeight);
			//ctx.fillRect(iso.x,iso.y,width,width);

	    };
    }   
    
    return Pogo; 
});