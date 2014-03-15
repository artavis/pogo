define(["jquery","Space","Pogo"], function($,Space,Pogo) {
    
    var X_SPACES = 5, 
        Y_SPACES = 5,
        SPACE_WIDTH = 48;

    function Map() {
	    this.init = function() {
			this.createSpaces();
			//$.publish("aha");
		}  
		
		this.createSpaces = function() {
			this.spaces = [];
			var counter = 0;
			for(var i=0; i<Y_SPACES; i++) {
				var row = [];
				for(var k=0; k<X_SPACES; k++) {
					var space = new Space(k,i);
					//space.spaceIndex = counter;
					row.push(space);
					counter++;
				}	
				this.spaces.push(row);			
			}

		}  
		
		this.getSpace = function(x,y) {
			if(this.spaces[y][x]) return this.spaces[y][x];
			return false;
		}
		this.getSpaceByPos = function(pos) {
			for(var y in this.spaces) {
				for(var x in this.spaces[y]) {
					var space = this.spaces[y][x];
					if(pos.x >= space.pos.x - space.size.width/2 && 
						pos.x < space.pos.x + space.size.width/2 &&
						pos.y >= space.pos.y - space.size.height/2 &&
						pos.y < space.pos.y + space.size.height/2) return space;
				}
				
			}
			return false;
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