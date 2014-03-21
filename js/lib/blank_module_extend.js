define(["jquery","config","Entity"], function($,config,Entity) {
    
    function Bullet() {
	    Entity.call(this);
	    
	    this.setSize({

	    });
	    
	    this.setPos({

	    });
	    
	    return this;
    }
    
    Bullet.prototype = Object.create( Entity.prototype );
    
    return Bullet;
    
});