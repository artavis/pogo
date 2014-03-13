define(["jquery"], function($) {
    
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
	    var pts = iso(x,y,z);
	    pts.x += 300;
	    pts.y += 150;
	    return pts;
    }
    function oneOrNegOne() {
		var x = (Math.random() * 2) - 1;
		if (x < 0) { return -1; }
		if (x > 0) { return 1; }
	}

    
    return {
	    iso: iso,
	    isoOffset: isoOffset,
	    oneOrNegOne: oneOrNegOne
    };
    
    
});