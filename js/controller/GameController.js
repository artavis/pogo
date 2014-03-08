define(["jquery","requestAnimFrame","Map","Pogo"], 
function($,requestAnimFrame,Map,Pogo) {
    
    var CURRENT_TIME;
    
    var view, canvas, ctx, pogo, gameMap;
    
    function init() {
	    canvas = document.querySelector("#canvas");
	    ctx = canvas.getContext("2d");
	    
		
		gameMap = new Map();
		
		var space = gameMap.spaces[gameMap.spaces.length-1];
		pogo = new Pogo(space.x,space.y,space.zHeight);
		

		
	    //Start the game loop
	    requestAnimFrame(game_loop);
    }
    
    function game_loop(t) {
	    //set clock and delta since last frame
	    var dt = CURRENT_TIME - t;
	    CURRENT_TIME = t;
	    
	    canvas.width = canvas.width;
	    gameMap.draw();
	    pogo.update();
	    
	    //fire next loop
	    requestAnimFrame(game_loop);
    }
    
    return function() {
		init();		
    };
    
});