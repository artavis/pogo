define(["jquery","config","Entity","BulletView"], function($,config,Entity,BulletView) {
    
    function Bullet(pos,dir) {
	    Entity.call(this);
	    
	    this.setSize({

	    });
	    
	    this.setPos({

	    });
	    
	    this.view = new BulletView(this);
	    
	    return this;
    }
    
    Pogo.prototype = Object.create( Entity.prototype );
    
    return Bullet;
    
});