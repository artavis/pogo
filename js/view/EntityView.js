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
        this.setImageFromFrame = function(FRAME) {
			this.removeFromStage();
			_img = pixi.Sprite.fromFrame(FRAME);
        };
        this.setImageFromCanvas = function(CANVAS) {
			var texture = pixi.Texture.fromCanvas(CANVAS);
			_img = new pixi.Sprite(texture);
        };
        this.setTexture = function(IMG) {
			var texture = pixi.Texture.fromImage(IMG);
			_img.setTexture(texture);
        };
        this.setTextureFromCanvas = function(CANVAS) {
			var texture = pixi.Texture.fromCanvas(CANVAS);
			_img.setTexture(texture);
        };
		this.getImage = function() {
			return _img;
		}
		
		this.removeFromStage = function() {
			if(_img && _img.stage)_img.stage.removeChild(_img);
		}

        return this;
    }
    
    EntityView.prototype = {};
	
    return EntityView;    
});