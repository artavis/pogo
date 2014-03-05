define(["jquery","requestAnimFrame","Map"], 
function($,requestAnimFrame,Map) {
    
    var CURRENT_TIME;
    
    var view, canvas, ctx;
    
    function init() {
	    canvas = document.querySelector("#canvas");
	    ctx = canvas.getContext("2d");
	    
		
		var gameMap = new Map();
		
	    //Start the game loop
	    requestAnimFrame(game_loop);
    }
    
    function game_loop(t) {
	    //set clock and delta since last frame
	    var dt = CURRENT_TIME - t;
	    CURRENT_TIME = t;
	    
	    //fire next loop
	    requestAnimFrame(game_loop);
    }
    
    return function() {
		init();		
    };
    
});