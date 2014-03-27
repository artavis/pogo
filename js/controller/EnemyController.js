define(["jquery","config","Spinner","Drone","Chaser"], function($,config,Spinner,Drone,Chaser){

    function EnemyController(){

        
        return( this );
    }
    
    EnemyController.prototype = {
		createEnemies: function() {
			//this.addSpinners();
			this.addDrones();
			//this.addChasers();
		},
		addDrones: function() {
			var space = GAME_CONTROLLER.map.spaces[config.boardSpaceTotal.y-1][config.boardSpaceTotal.x-1];
			var drone = new Drone(space);
			GAME_CONTROLLER.addEntity(drone);
		},
		addSpinners: function() {
			var space = GAME_CONTROLLER.map.spaces[config.boardSpaceTotal.y-1][config.boardSpaceTotal.x-1];
			var spinner = new Spinner(space);
			GAME_CONTROLLER.addEntity(spinner);
		},
		addChasers: function() {
			var space = GAME_CONTROLLER.map.spaces[config.boardSpaceTotal.y-1][config.boardSpaceTotal.x-1];
			var chaser = new Chaser(space);
			GAME_CONTROLLER.addEntity(chaser);
		},
/*
		addSpinners: function() {
			var tallBlocks = [];
			var map = GAME_CONTROLLER.map;
			for(var y in map.spaces) {
				for(var x in map.spaces[y]) {
					var space = map.spaces[y][x];
					if(space.blockHeight == config.maxBlockHeight-1) tallBlocks.push(space);
				}
			}
			
			var spinnerLocs = [];
			for(var i=0; i<config.numberOfSpinners; i++) {
				var spaceSplice = tallBlocks.splice(Math.floor(Math.random()*tallBlocks.length), 1);
				var space = spaceSplice[0];
				
				var crossFound = false;
				for(var k in spinnerLocs) {
					if(spinnerLocs[k].xIndex == space.xIndex || 
						spinnerLocs[k].yIndex == space.yIndex ||
						space.xIndex == 0 ||
						space.yIndex == 0 ||
						space.xIndex == config.boardSpaceTotal.x-1 ||
						space.yIndex == config.boardSpaceTotal.y-1
						) {
						crossFound = true;
					} 
				}
				
				if(crossFound) {
					i -= 1;
				} else {
					spinnerLocs.push(space);
					var spinner = new Spinner(space);
					space.occupy();
					GAME_CONTROLLER.addEntity(spinner);
				}
			}	
		}
*/
    };

    return EnemyController;
});