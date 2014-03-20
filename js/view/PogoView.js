define(["jquery","utils","pixi"], function($,utils,pixi){
 

    // I return an initialized object.
    function PogoView(model){
        this.pogo = model;
        
        this.setImage(PogoView.IMAGES.STANDARD);
        // Return this object reference.
        return( this );
    }
    
    // Define the class methods.
    PogoView.prototype = {
		updateDrawPosition: function() {
			var iso = utils.isoOffset(this.pogo.pos.x,this.pogo.pos.y,this.pogo.pos.z);
			
			this.img.x = iso.x-this.pogo.size.width/2,
			this.img.y = iso.y-this.pogo.size.z;
			
		},
		setImage: function(IMG) {
			switch(IMG) {
				case(PogoView.IMAGES.STANDARD):
				default:
					var texture = pixi.Texture.fromImage("images/pogo.png");
					this.img = new pixi.Sprite(texture);
			}
		}
    };
	
	PogoView.IMAGES = {
		STANDARD: 0,	
	};
	
    // Return the base Model constructor.
    return PogoView;
    
});