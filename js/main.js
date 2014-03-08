requirejs.config({

    paths: {
        //Lib
        jquery: 			'lib/jquery-2.1.0.min',
        requestAnimFrame:   'lib/requestAnimFrame',
        
        //Helpers
        utils:   'helpers/utils',
        config:   'helpers/config',
        
        //Game
        GameController:     'controller/GameController',
        
        //Models
        Map:				'model/Map',
        Space:				'model/Space',
        
        Entity:				'model/Entity',
        Pogo:				'model/Pogo',
        Player:				'model/Player',
        Enemy:				'model/Enemy',
        Bullet:				'model/Bullet',
        Explosion:			'model/Explosion',
        
        //Views
        SpaceView:			'view/SpaceView'
        
    }
});

var IMG = new Image();
IMG.src = "images/pogo.png";


// Start the main app logic.
requirejs(['jquery', 'GameController'],
function   ($,        GameController) {
    
    window.GAME_CONTROLLER = new GameController();
});