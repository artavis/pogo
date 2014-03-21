define(["jquery","utils","pixi"], function($,utils,pixi){
 
    function EntityView(model){
        var _model = model;
        var _img;
        
        this.updateDrawPosition = function() {
			var iso = utils.isoOffset(_model.pos.x,_model.pos.y,_model.pos.z);
			
			_img.x = iso.x-_model.size.width/2,
			_img.y = iso.y-_model.size.z;
        };
        
        this.setImage = function(IMG) {
			var texture = pixi.Texture.fromImage(IMG);
			_img = new pixi.Sprite(texture);
        };
        this.setImageFromCanvas = function(CANVAS) {
			var texture = pixi.Texture.fromCanvas(CANVAS);
			_img = new pixi.Sprite(texture);
        };
		this.getImage = function() {
			return _img;
		}

        return this;
    }
    
    EntityView.prototype = {};
	
    return EntityView;    
});