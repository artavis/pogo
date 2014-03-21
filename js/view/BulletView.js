define(["jquery","utils","EntityView"], function($,utils,EntityView){
 
    function BulletView(model){
        EntityView.call(this,model);
        
        this.setImage("images/bullet.png");

        return( this );
    }
    BulletView.prototype = Object.create( EntityView.prototype );
    
    BulletView.prototype = {

    };
	
    return BulletView;
    
});