define(["jquery","Pogo","UserInput","utils","ViewPort"], function($,Pogo,UserInput,utils,ViewPort) {
        
    function Enemy(space) {
		Pogo.call(this,space);
		
		var self = this;
		
		this.health = 3;
		this.setPower({shot:1,block:0});
		this.view.setUpFrame(Enemy.FRAMES.UP);
		return this;
    }
    
    Enemy.prototype = Object.create( Pogo.prototype );
    
/*
    Enemy.prototype.onBounce = function(){

    };
    Enemy.prototype.onUpdate = function(){

    };
*/
    
    Enemy.FRAMES = {
		UP: "enemy_4",	
		DOWN: "enemy_1"
    };
    
    return Enemy;
    
});