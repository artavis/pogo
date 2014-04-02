define(["jquery","config"], function($,config){
 
    // Private methods and static variables
    
    var KEY_NAMES = {
		LEFT: config().DIRS.LEFT,
		RIGHT: config().DIRS.RIGHT,
		UP: config().DIRS.UP,
		DOWN: config().DIRS.DOWN,
		SPACE: "space",
		MOUSE_L: "mouse_l"
	};
    
    var _keys = {};
    _keys[KEY_NAMES.LEFT] = false;
    _keys[KEY_NAMES.RIGHT] = false;
    _keys[KEY_NAMES.UP] = false;
    _keys[KEY_NAMES.DOWN] = false;
    _keys[KEY_NAMES.SPACE] = false;
    _keys[KEY_NAMES.MOUSE_L] = false;

    function UserInput(){
        return( this );
    }
    UserInput.createListeners = function() {
		var self = this;
		$(document).keydown(function(e){
			var key = UserInput.getKeyNameFromCode(e.keyCode);
			if(key) _keys[key] = true;
		});
		$(document).keyup(function(e){
			var key = UserInput.getKeyNameFromCode(e.keyCode);
			if(key) _keys[key] = false;
		});
		$(document).mousedown(function(e){
			var key = KEY_NAMES.SPACE;
			if(key) _keys[key] = true;
		});
		$(document).mouseup(function(e){
			var key = KEY_NAMES.SPACE;
			if(key) _keys[key] = false;
		});
		$("#canvasHolder").mousemove(function(e){
			var dir = self.getDirectionFromMousePosition(e);
			$.publish("mouseMoveFromUI",dir);
		});
    };
    UserInput.getDirectionFromMousePosition = function(e) {
		var moveX = e.offsetX;
		var moveY = e.offsetY;
		var dir;
		if(moveY > config().canvasSize.height/2) {
			if(moveX > config().canvasSize.width/2) {
				//mouse is in lower right - do right
				return config().DIRS.RIGHT;
			} else {
				//mouse is in lower left - go down
				return config().DIRS.DOWN;
			}
		} else {
			if(moveX > config().canvasSize.width/2) {
				//mouse is in upper right - go up
				return config().DIRS.UP;
			} else {
				//mouse is in upper left - go left
				return config().DIRS.LEFT;
			}
		}
    }
        
    UserInput.getKeyNameFromCode = function(code) {
	    switch(code) {
		    case 39:	//R-Arrow
		    case 68:	//D key
		    	return KEY_NAMES.RIGHT;
		    case 37:	//L-Arrow
		    case 65:	//A key
		    	return KEY_NAMES.LEFT;
		    case 38:	//UP-Arrow
		    case 87:	//W key
		    	return KEY_NAMES.UP;
		    case 40:	//UP-Arrow
		    case 83:	//W key
		    	return KEY_NAMES.DOWN;
		    case 32:
		    	return KEY_NAMES.SPACE;
		    default:
		    	return false;
	    }
    }

    // Static Methods
    UserInput.keys = function(){
		return _keys;
    };
	
    // Return the base Model constructor.
    return UserInput;
    
    
});