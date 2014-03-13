define(["jquery"], function($){
 
    // Private methods and static variables
    var myFunc = function(){};
	var _count = 0;

    // I return an initialized object.
    function Entity(){
		
		this.index = _count;
		_count++;
        
        
        // Return this object reference.
        return( this );
    }
    
    // Define the class methods.
    Entity.prototype = {
        getIndex: function(){
            return this.index;
        }
    };

    // Static Methods
    Entity.getCount = function(){
		return _count;
    };

    // Return the base Model constructor.
    return Entity;
    
    
    
    /**
    * If extending a class, use the following 
    
 
        // I return an initialized object.
        function Entity(){
 
            // Call the super constructor.
            ParentConstructor.call( this );
  
            // Return this object reference.
            return( this );
 
        }

        // The Friend class extends the base Model class.
        Entity.prototype = Object.create( ParentConstructor.prototype );
 
 
        // Define the class methods.
        Entity.prototype.func = function(){
 
            return( this._name );
 
        };
	*/
});