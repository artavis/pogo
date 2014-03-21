define(["jquery","config","EntityView"], function($,config,EntityView){
 
    function PogoView(model){
        EntityView.call(this,model);
        
        //this.setImage("images/pogo.png");
        this.setUpFrame();

        return this;
    }
    
    PogoView.prototype = {
    	setDownFrame: function() {
	    	this.setImageFromFrame(PogoView.IMAGE_FRAMES.DOWN);
    	},
    	setUpFrame: function() {
	    	this.setImageFromFrame(PogoView.IMAGE_FRAMES.UP);
    	},
    };
	
	PogoView.IMAGE_FRAMES = {
		UP: "pogo_4",	
		DOWN: "pogo_1"	
	};
	PogoView.ANIMS = {
		BOUNCE: "images/pogo_sprite.png"	
	};
	
    return PogoView;    
});