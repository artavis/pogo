define(["jquery","config"], function($,config){
 	 	
 	var _size = { width: config().canvasSize.width, height: config().canvasSize.height };
 	var _pos = { x:0, y:0 };

    // I return an initialized object.
    function ViewPort(){

        
        // Return this object reference.
        return( this );
    }
    
    // Define the class methods.
    ViewPort.prototype = {
        
    };

	ViewPort.setPosByPlayerPosition = function(pos) {
		adjPos = {
			x: pos.x - _size.width/2,
			y: pos.y - _size.height*3/4
		}
		_pos = adjPos;
	};
	ViewPort.setPos = function(pos) {
		_pos = pos;
	};
	ViewPort.getPos = function() {
		return _pos;
	};
	ViewPort.getSize = function() {
		return _size;
	};
    // Return the base Model constructor.
    return ViewPort;
});