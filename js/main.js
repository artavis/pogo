requirejs.config({

    paths: {
        //Lib
        jquery: 			'lib/jquery-2.1.0.min',
        requestAnimFrame:   'lib/requestAnimFrame',
        
        //Game
        GameController:     'controller/GameController',
        
        //Models
        Map:				'model/Map',
        Space:				'model/Space',
        Pogo:				'model/Pogo',
        Player:				'model/Player',
        Enemy:				'model/Enemy',
        Bullet:				'model/Bullet',
        Explosion:			'model/Explosion'
        
    }
});

// Start the main app logic.
requirejs(['jquery', 'GameController'],
function   ($,        GameController) {
    
    var controller = new GameController();
});