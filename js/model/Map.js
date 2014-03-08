define(["jquery","Space","Pogo"], function($,Space,Pogo) {
    
    var X_SPACES = 5, 
        Y_SPACES = 5,
        SPACE_WIDTH = 48;

    function Map() {
	    this.init = function() {
			
			this.createSpaces();
		}  
		
		this.createSpaces = function() {
			this.spaces = [];
			for(var i=0; i<Y_SPACES; i++) {
				for(var k=0; k<X_SPACES; k++) {
					var space = new Space(k,i);
					space.draw();
					
					this.spaces.push(space);
					
				}				
			}

		}  
		
		this.draw = function() {
			for(var i in this.spaces) {
				this.spaces[i].draw();
			}
		}
		
		this.init();
    }
    
    return Map;
    
    
});