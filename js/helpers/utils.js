define(["jquery","ViewPort"], function($,ViewPort) {
    
    function iso(x,y,z) {
	   	return {
/*
			x: ((x - y * 1)) + 960 + 20,
			y: ((((x + y) / 1.5) - z*1.5) + 100) * 1
*/			
/*
			x: x,
			y: y
*/
	
/*
			x: (x - y/4) + 980,
			y: (y/4-z)*2
*/
/*
			x: ((x - y)),
			y: (((x + y) / 1.5) - z*1.5)
*/
			
			x: Math.round(x - y),
			y: Math.round(((x + y) / 1.5) - z*1.5)

	
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
	    collides: collides
    };
    
    
});