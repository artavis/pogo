define(["jquery","config","Spinner","Drone","Chaser","utils"], function($,config,Spinner,Drone,Chaser,utils){

    function EnemyController(){

        
        return( this );
    }
    
    EnemyController.prototype = {
		createEnemies: function(game_mode) {
			//debugger;
			var count = 0;
			
			this.addDrones(config.enemyCounts[game_mode].DRONE);
			this.addSpinners(config.enemyCounts[game_mode].SPINNER);
			this.addChasers(config.enemyCounts[game_mode].CHASER);
			
			count = config.enemyCounts[game_mode].DRONE +
					config.enemyCounts[game_mode].SPINNER +
					config.enemyCounts[game_mode].CHASER;
					
			return count;
		},
		addDrones: function(numEnemies) {
			for(var i=0; i<numEnemies; i++) {
				var space = this.findUnoccupiedSpace();
				var drone = new Drone(space);
				GAME_CONTROLLER.addEntity(drone);
			}
		},
		addSpinners: function(numEnemies) {
			for(var i=0; i<numEnemies; i++) {
				var space = this.findUnoccupiedSpace(true);
				var spinner = new Spinner(space);
				GAME_CONTROLLER.addEntity(spinner);
			}
		},
		addChasers: function(numEnemies) {
			for(var i=0; i<numEnemies; i++) {
				var space = this.findUnoccupiedSpace();
				var chaser = new Chaser(space);
				GAME_CONTROLLER.addEntity(chaser);
			}
		},
		findUnoccupiedSpace: function(topOfTheWorld) {
			topOfTheWorld = topOfTheWorld || false;
			var map = GAME_CONTROLLER.map;
			
			var found = false;
			while(!found) {
				var x = utils.rand(0,config.boardSpaceTotal.x);
				var y = utils.rand(0,config.boardSpaceTotal.y);
				
				var space = map.getSpace(x,y);
				if(!space) continue;
				if(!space.occupied) {
					if(!topOfTheWorld) return space;
					if(space.blockHeight == config.maxBlockHeight-1) return space;
				}
			}
		}
    };

    return EnemyController;
});