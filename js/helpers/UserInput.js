define(["jquery"], function($){
 
    // Private methods and static variables
    var _keys = {
		left: false,
		right: false,
		up: false,
		down: false,
		space: false,
		mouseL: false,
		mouseR: false,
		allKeysUp: function(){
			this.left = false;
			this.right = false;
			this.up = false;
			this.down = false;
			this.space = false;
		},
    }

    // I return an initialized object.
    function UserInput(){
		
        // Return this object reference.
        return( this );
    }
    UserInput.createListeners = function() {
		$(document).keydown(function(e){
			if(e.keyCode == 39 || e.keyCode == 68) {
				e.preventDefault();
				_keys.right = true;
			} else if (e.keyCode == 37 || e.keyCode == 65) {
				e.preventDefault();
				_keys.left = true;
			} else if (e.keyCode == 38 || e.keyCode == 87) {
				e.preventDefault();
				_keys.up = true;
			} else if (e.keyCode == 40 || e.keyCode == 83) {
				e.preventDefault();
				_keys.down = true;
			} else if (e.keyCode == 32) {
				e.preventDefault();
				_keys.space = true;
			}
		});
		$(document).keyup(function(e){
			//console.log(e.keyCode);
			_keys.allKeysUp();
		});
    }

    // Static Methods
    UserInput.keys = function(){
		return _keys;
    };

    // Return the base Model constructor.
    return UserInput;
    
    
});