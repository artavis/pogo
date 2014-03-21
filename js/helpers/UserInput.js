define(["jquery"], function($){
 
    // Private methods and static variables
    
    var KEY_NAMES = {
		LEFT: "left",
		RIGHT: "right",
		UP: "up",
		DOWN: "down",
		SPACE: "space"
	};
    
    var _keys = {};
    _keys[KEY_NAMES.LEFT] = false;
    _keys[KEY_NAMES.RIGHT] = false;
    _keys[KEY_NAMES.UP] = false;
    _keys[KEY_NAMES.DOWN] = false;
    _keys[KEY_NAMES.SPACE] = false;

    function UserInput(){
        return( this );
    }
    UserInput.createListeners = function() {
		$(document).keydown(function(e){
			var key = UserInput.getKeyNameFromCode(e.keyCode);
			if(key) _keys[key] = true;
		});
		$(document).keyup(function(e){
			var key = UserInput.getKeyNameFromCode(e.keyCode);
			if(key) _keys[key] = false;
		});
    };
        
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