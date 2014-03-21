define(["jquery","EntityView"], function($,EntityView){
 
    function PogoView(model){
        EntityView.call(this,model);
        
        this.setImage(PogoView.IMAGES.STANDARD);

        return this;
    }
    
    PogoView.prototype = {
    };
	
	PogoView.IMAGES = {
		STANDARD: "images/pogo.png",	
	};
	
    return PogoView;    
});