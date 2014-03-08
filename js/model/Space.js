define(["jquery","utils","SpaceView","Pogo"], 
	function($,   utils,  SpaceView,  Pogo) {
    
    var WIDTH = 48,
        MAX_BLOCK_HEIGHT = 3,
        PLATFORM_HEIGHT = 24;
        
    function Space(xInd,yInd) {
	    this.xIndex = xInd;
		this.yIndex = yInd;
		
		this.x = this.xIndex * WIDTH;
		this.y = this.yIndex * WIDTH;
		
		this.width = WIDTH;
		this.height = WIDTH;
		
		this.leftEdge = this.x - (WIDTH/2);
		this.rightEdge = this.x + (WIDTH/2);
		this.topEdge = this.y - (WIDTH/2);
		this.bottomEdge = this.y + (WIDTH/2);

		var view;
	    
	    this.init = function() {
			this.blockHeight = initBlockHeight();
			this.zHeight = PLATFORM_HEIGHT * this.blockHeight;
			

			
			view = new SpaceView(this);
		};    
		
		this.initView = function() {
			
		};
		
		
		this.draw = function() {
			view.draw();

		};
		
		this.init();
    }
    
    function initBlockHeight() {
	    //return 2;
	    return Math.floor(Math.random()*MAX_BLOCK_HEIGHT);
    }
    
    


    
    
    return Space;
    
});