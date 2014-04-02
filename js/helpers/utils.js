define(["jquery","ViewPort","config"], function($,ViewPort,config) {
    
    var isoZ = config().isoZFactor;

    function iso(x,y,z) {
	   	return {
/*
			x: Math.round(x - y),
			y: Math.round(((x + y) / 1.5) - z*isoZ)
*/
			
			x: Math.round(x - y),
			y: Math.round(((x + y) / 1.5) - z*isoZ)

	
		};
    }
    function isoOffset(x,y,z) {
	    var viewportPos = ViewPort.getPos();
	    var pts = iso(x,y,z);
	    pts.x -= viewportPos.x;
	    pts.y -= viewportPos.y;
	    return pts;
    }
    function oneOrNegOne() {
		var x = (Math.random() * 2) - 1;
		if (x < 0) { return -1; }
		if (x > 0) { return 1; }
	}
	function rand(min,max,includeMax) {
		roundFunc = includeMax ? Math.floor : Math.round;
		
		return roundFunc(Math.random()*(max-min)) + min;
	}
	function collides(a,b) {
		return a.pos.x + a.halfSize.width > b.pos.x - b.halfSize.width && 
	         a.pos.x - a.halfSize.width < b.pos.x + b.halfSize.width &&
	         a.pos.y + a.halfSize.height > b.pos.y - b.halfSize.height &&
	         a.pos.y - a.halfSize.height < b.pos.y + b.halfSize.height &&
	         a.pos.z < b.pos.z + b.size.z &&
	         a.pos.z + a.size.z > b.pos.z;
	         //a.space.blockHeight == b.space.blockHeight;
	}

    
    return {
	    iso: iso,
	    isoOffset: isoOffset,
	    oneOrNegOne: oneOrNegOne,
	    rand: rand,
	    collides: collides
    };
    
    
});