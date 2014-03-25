define(["jquery","config","utils","Entity","pixi","ExplosionView"], function($,config,utils,Entity,pixi,ExplosionView) {
        
    function Explosion(_opts) {
	    Entity.call(this);
				
		this.currentSpace = _opts.currentSpace || 0;
		var type = _opts.type || Explosion.TYPES.NORMAL;
		var pos = _opts.pos || {x:0,y:0,z:0};
		
	    this.setSize({
			width: 64,
			height: 64,
			z: 64
	    });

	    this.setPos(pos);
	    
	    this.view = new ExplosionView(this,type);
	    
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


