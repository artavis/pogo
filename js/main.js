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
        proxy:   			'helpers/proxy',
        
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
        
        StartMenu:			'view/StartMenu',
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

    var controller = new GameController();
    UserInput.createListeners();
        
    window.setOpts = function(radio) {
		var val = radio.getAttribute("value");
		switch(val) {
			case "easy":
				var d=5,s=2,c=1,h=10,b=1;
				break;
			case "medium":
				var d=7,s=3,c=5,h=10,b=2;
				break;
			case "hard":
				var d=0,s=0,c=10,h=10,b=3;
				break;
			case "empty":
				var d=0,s=0,c=0,h=10,b=0;
				break;
		}
		
		$('#drones option:eq('+d+')').attr('selected', 'selected');
		$('#spinners option:eq('+s+')').attr('selected', 'selected');
		$('#chasers option:eq('+c+')').attr('selected', 'selected');
		$('#health option:eq('+h+')').attr('selected', 'selected');
		$('#bHeight option:eq('+b+')').attr('selected', 'selected');

    };    
});