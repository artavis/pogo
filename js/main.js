requirejs.config({

    paths: {
        //Lib
        jquery: 			'lib/jquery-2.1.0.min',
        pubsub: 			'lib/jquery.ba-tinypubsub.min',
        requestAnimFrame:   'lib/requestAnimFrame',
        
        //CreateJS
        easeljs:   			'lib/easeljs-0.7.1.min',
        preloadjs:   		'lib/preloadjs-0.4.1.min',
        soundjs:   			'lib/soundjs-0.5.2.min',
        
        //Helpers
        utils:   			'helpers/utils',
        config:   			'helpers/config',
        
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
        
    },
    
    shim: {
        'easeljs': { exports: 'createjs' },
        'preloadjs': { exports: 'createjs' },
        'soundjs': { exports: 'createjs' },
    }
});

var IMG = new Image();
IMG.src = "images/pogo.png";


// Start the main app logic.
requirejs(['jquery', 'easeljs', 'preloadjs', 'soundjs', 'GameController'],
function   ($,        createjs,  preloadjs,   soundjs,   GameController) {

    

    window.GAME_CONTROLLER = new GameController();
});