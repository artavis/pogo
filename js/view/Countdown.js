define(["jquery","pixi","config"], function($,pixi,config){
	
	var counter, textReadout;
    function Countdown(){
		counter = new pixi.DisplayObjectContainer();
        counter.width = config().canvasSize.width;
        counter.height = config().canvasSize.height;
        
        textReadout = new pixi.Text(3,{
	        font: 'bold 96px Arial',
	        fill: 'red'
        });
        textReadout.anchor.x = .5;
        textReadout.anchor.y = .5;
        textReadout.x = config().canvasSize.width/2;
        textReadout.y = config().canvasSize.height/2;
        
        counter.addChild(textReadout);
        
        return( counter );
    }
    
    Countdown.updateCounter = function(count) {
		textReadout.setText(count);
    };
    Countdown.removeCounter = function() {
		counter.parent.removeChild(counter);
    };

    return Countdown;
});