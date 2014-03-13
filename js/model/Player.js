define(["jquery","Pogo"], function($,Pogo) {
        
    function Player(space) {
		var pogo = new Pogo(space);
		
		
		$(document).on("keyup", function(e){
			if(e.keyCode == 37) pogo.moveLeft(e);
			if(e.keyCode == 38) pogo.moveUp(e);
			if(e.keyCode == 39) pogo.moveRight(e);
			if(e.keyCode == 40) pogo.moveDown(e);
		});
		
		return pogo;
    }
    
    
    return Player;
    
});