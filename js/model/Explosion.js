define(["jquery","config","utils","Entity","pixi","ExplosionView"], function($,config,utils,Entity,pixi,ExplosionView) {
        
    function Explosion(emitter,type) {
	    Entity.call(this);
		
		this.currentSpace = emitter.currentSpace;
	    this.setSize({
			width: 64,
			height: 64,
			z: 64
	    });
	    this.setPos({
	    	x: emitter.pos.x,
	    	y: emitter.pos.y,
	    	z: emitter.pos.z
	    })
	    
	    this.view = new ExplosionView(this,type);
	    //var pos = utils.isoOffset(emitter.pos.x-this.size.width/2,emitter.pos.y,emitter.pos.z);
	    
	    GAME_CONTROLLER.addEntity(this);
	    return this;
    }
    
    Explosion.prototype = Object.create( Entity.prototype );
    Explosion.prototype.update = function(){};
    Explosion.TYPES = {
	    NORMAL: "normal"
    };
    
    return Explosion;
    
});


