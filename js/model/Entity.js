define(["jquery"],
    function($){
  
        // I return an initialized object.
        function Entity(){            
            
            this.pos  	= {x:0,y:0,z:0};
            this.size 	= {width:0, height:0, z:0};
            
            this.isVisualFX	  = false;
            this.isProjectile = false;
            this.checkCollide = false;
            
            
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
            	this.halfSize = { width: size.width/2, height: size.height/2 };
            	return this; 
            },
            getBounds: function() {
	            return {
		            left: this.pos.x - this.size.width/2,
		            right: this.pos.x + this.size.width/2,
		            top: this.pos.y - this.size.height/2,
		            bottom: this.pos.y + this.size.height/2,
		            zTop: this.pos.z - this.size.z,
		            zBottom: this.pos.z,
	            }
            },
            removeFromGame: function() {
	            this.view.removeFromStage();
	            if(this.currentSpace && !this.isProjectile && !this.isVisualFX) this.currentSpace.unoccupy();
				$.publish("removeEntity",this);
            }
        };
  
        // Return the base Model constructor.
        return Entity;
    }
);