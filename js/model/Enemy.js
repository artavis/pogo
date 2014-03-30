define(["jquery","config","Pogo","utils"], function($,config,Pogo,utils) {
        
    function Enemy(space) {
		Pogo.call(this,space);
		
		var self = this;
		
		this.health = 3;

		this.view.setUpFrame(Enemy.FRAMES.UP);
		return this;
    }
    
    Enemy.prototype = Object.create( Pogo.prototype );
    
    Enemy.prototype.onKill = function() {
	    GAME_CONTROLLER.addPoints(this.pointValue.kill);
	    GAME_CONTROLLER.reduceEnemyCount();
    };
    Enemy.prototype.onHit = function() {
	    GAME_CONTROLLER.addPoints(this.pointValue.hit);
    };
    
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
    };
    
    Enemy.prototype.setPointValue = function(val) {
	    this.pointValue = val;
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