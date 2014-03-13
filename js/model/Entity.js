define(["jquery"],
    function($){
  
        // I return an initialized object.
        function Entity(){            
            
            this.pos  	= {x:0,y:0,z:0};
            this.size 	= {width:0, height:0, z:0};
            // Return this object reference.
            return( this );
        }
        
        // Define the class methods.
        Entity.prototype = {
            getSize: function(){ return this.size; },
            getPos: function(){ return this.pos; },
            setPos: function(pos){ 
            	if(!pos || pos.x === undefined || pos.y === undefined || pos.z === undefined) return this;
            	this.pos = pos;
            	return this; 
            },
            setSize: function(size){ 
            	if(!size || size.width === undefined || size.height === undefined || size.z === undefined) return this;
            	this.size = size;
            	return this; 
            },
        };
  
        // Return the base Model constructor.
        return Entity;
    }
);