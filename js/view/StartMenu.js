define(["jquery","config","pixi"], function($,config,pixi){
	
	var w, h, x=0, y=0;
    function StartMenu(){
		var cfg = config();
		
		var view = new pixi.DisplayObjectContainer();
		view.width = cfg.canvasSize.width;
		view.height = cfg.canvasSize.height;
		view.x = 0;
		view.y = 0;
        
        //Add title
        
        //add graphic
        
        
        //Add Mode Selectors
        var easy = menuSelector("EASY",{x:500,y:100});
        easy.mouseup = function(){$.publish("startGame",config().GAME_MODES.EASY);};
        view.addChild(easy);
        
        var medium = menuSelector("MEDIUM",{x:500,y:200});
        medium.mouseup = function(){$.publish("startGame",config().GAME_MODES.MEDIUM);};
        view.addChild(medium);
        
        var hard = menuSelector("HARD",{x:500,y:300});
        hard.mouseup = function(){$.publish("startGame",config().GAME_MODES.HARD);};
        view.addChild(hard);
        
        return( view );
    }
    
    function menuSelector(txt,pos) {
	    var selector = new pixi.DisplayObjectContainer();
	    selector.width = 150;
	    selector.height = 50;
	    selector.x = pos.x;
	    selector.y = pos.y;
	    
	    var box = createLightBox({width: 150, height: 50});
		
	    selector.addChild(box);
	    selector.addChild(createTextDisplay({text:txt,x:75,y:25}));
		selector.setInteractive(true);
	    
	    return selector;
    }
    
    function createLightBox(size) {
		var lightBox = new pixi.Graphics();
		var boxWidth = size.width;
		var boxHeight = size.height;

		lightBox.width = boxWidth;
		lightBox.height = boxHeight;
		
		lightBox.beginFill(0xFFFFFF,.5);
        lightBox.drawRect(0,0,lightBox.width,lightBox.height);
        lightBox.endFill();
        lightBox.hitArea = new pixi.Rectangle(0, 0, size.width, size.height);
        
        return lightBox;
	}
	function createTextDisplay(opts) {
		var fontStyle = opts.font || "bold 16pt Arial";
		var fill = opts.fill || "red";
		var textF = opts.text || "";
		
		var txt = new pixi.Text(textF,{
			font: fontStyle,
			fill: fill,
			align: "center"
		});
		txt.anchor.x = .5;
		txt.anchor.y = .5;
		txt.x = opts.x;
		txt.y = opts.y;
		return txt;
	}

    
    StartMenu.prototype = {

    };

    return StartMenu;
});