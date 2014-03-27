define(["jquery","config","Pogo","UserInput","utils","ViewPort"], function($,config,Pogo,UserInput,utils,ViewPort) {
        
    function Enemy(space) {
		Pogo.call(this,space);
		
		var self = this;
		
		this.health = 3;
		this.setPower({shot:1,block:0});
		this.view.setUpFrame(Enemy.FRAMES.UP);
		return this;
    }
    
    Enemy.prototype = Object.create( Pogo.prototype );
    
    Enemy.prototype.getStartingDirection = function() {
	    var num1 = utils.oneOrNegOne();
	    var num2 = utils.oneOrNegOne();
	    if(num1 < 0) {
		    if(num2 < 0) {
			    return config.DIRS.RIGHT; 
		    } else {
			    return config.DIRS.LEFT;
		    }
	    } else {
		    if(num2 < 0) {
			    return config.DIRS.UP;
		    } else {
			    return config.DIRS.DOWN;
		    }
	    }
    }
    
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