define(["jquery","Space"], function($,Space) {
    
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
		
		this.init();
    }
    
    return Map;
    
    
});