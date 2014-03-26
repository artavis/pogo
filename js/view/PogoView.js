define(["jquery","config","EntityView"], function($,config,EntityView){
 
    function PogoView(model){
        EntityView.call(this,model);
        
        //this.setImage("images/pogo.png");
        this.setUpFrame();

        return this;
    }
    
    PogoView.prototype = {
    	setDownFrame: function(frame) {
	    	frame = frame || PogoView.IMAGE_FRAMES.DOWN;
	    	this.setImageFromFrame(frame);
    	},
    	setUpFrame: function(frame) {
	    	frame = frame == undefined ? PogoView.IMAGE_FRAMES.UP : frame;
	    	this.setImageFromFrame(frame);
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