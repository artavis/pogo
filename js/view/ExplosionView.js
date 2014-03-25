define(["jquery","config","EntityView","pixi"], function($,config,EntityView,pixi){
 
    var allTextures = {}, texturesCreated = false;
 
    function ExplosionView(model,type){
        EntityView.call(this,model);

		createTextures();
		
	    var textures = getTextures(type);	   
	    
	    this.setMovieClip(textures,false,function(){ model.removeFromGame(); }); 

        return this;
    }
    
    ExplosionView.prototype = {
    	setDownFrame: function() {
	    	this.setImageFromFrame(PogoView.IMAGE_FRAMES.DOWN);
    	},
    	setUpFrame: function() {
	    	this.setImageFromFrame(PogoView.IMAGE_FRAMES.UP);
    	},
    };
	
	ExplosionView.IMAGE_FRAMES = {
		UP: "pogo_4",	
		DOWN: "pogo_1"	
	};
	ExplosionView.ANIMS = {
		BOUNCE: "images/pogo_sprite.png"	
	};
	ExplosionView.TYPES = {
	    NORMAL: "normal"
    };

	
  
    function createTextures() {
	    if(texturesCreated) return;
	    
	    allTextures[ExplosionView.TYPES.NORMAL] = [];
		for (var i=1; i < 26; i++) {
		 	allTextures[ExplosionView.TYPES.NORMAL].push(pixi.Texture.fromFrame("expl_" + (i)));
		};
    }
    
    function getTextures(type) {
	    if(!type) return [];
	    return allTextures[type];
    }
	
    return ExplosionView;    
});