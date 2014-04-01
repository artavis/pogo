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
        
        //PixiJS
        pixi:   			'lib/pixi',
        
        //Helpers
        utils:   			'helpers/utils',
        config:   			'helpers/config',
        UserInput:   		'helpers/UserInput',
        ViewPort:   		'helpers/ViewPort',
        
        //Game
        GameController:     'controller/GameController',
        
        //Models
        Map:				'model/Map',
        Space:				'model/Space',
        
        Entity:				'model/Entity',
        Pogo:				'model/Pogo',
        Player:				'model/Player',
        Bullet:				'model/Bullet',
        Explosion:			'model/Explosion',
        
        //Enemies
        EnemyController:	'controller/EnemyController',
        Enemy:				'model/Enemy',
        Drone:				'model/Drone',
        Spinner:			'model/Spinner',
        Chaser:				'model/Chaser',
        
        //Views
        GameView:			'view/GameView',
        EntityView:			'view/EntityView',
        SpaceView:			'view/SpaceView',
        PogoView:			'view/PogoView',
        BulletView:			'view/BulletView',
        ExplosionView:		'view/ExplosionView',
        
        StatusBar:			'view/StatusBar',
        Countdown:			'view/Countdown'
        
    },
    
    shim: {
        'easeljs': { exports: 'createjs' },
        'preloadjs': { exports: 'createjs' },
        'soundjs': { exports: 'createjs' },
        'pixi': { exports: 'pixi' },
    }
});

var IMG = new Image();
IMG.src = "images/pogo.png";


// Start the main app logic.
requirejs(['jquery', 'pubsub', 'UserInput', 'GameController'],
function   ($,        pubsub,   UserInput,   GameController) {

    window.GAME_CONTROLLER = new GameController();
    UserInput.createListeners();
});