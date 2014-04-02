define(["jquery","config","Space","Pogo"], function($,config,Space,Pogo) {
    
    var X_SPACES = config().boardSpaceTotal.x, 
        Y_SPACES = config().boardSpaceTotal.y,
        SPACE_WIDTH = config().spaceWidth;

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
			if(this.spaces[y] && this.spaces[y][x]) return this.spaces[y][x];
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