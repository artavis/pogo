define(["jquery","utils"], function($,utils) {
    
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


	    
	    this.init = function() {
			this.blockHeight = initBlockHeight();
			this.zHeight = PLATFORM_HEIGHT * this.blockHeight;
			this.color = spaceColor(this.blockHeight);
			
			this.createBufferCanvas();
		};    
		
		this.createBufferCanvas = function() {
			var iso = isoPoints(this.zHeight);
			
			console.log(iso);
			this.buffer = document.createElement("canvas");
			this.buffer.width = iso.totalWidth, this.buffer.height = iso.totalHeight;
			
			var bcx = this.buffer.getContext('2d');
			
			bcx.beginPath();
			bcx.moveTo(iso.pne.x,iso.pne.y);
			bcx.lineTo(iso.ne.x,iso.ne.y);
			bcx.lineTo(iso.se.x,iso.se.y);
			bcx.lineTo(iso.pse.x,iso.pse.y);
			bcx.lineTo(iso.pne.x,iso.pne.y);
			bcx.closePath();
			bcx.fillStyle = this.color.light;
			bcx.fill();
			bcx.stroke();
			
			bcx.beginPath();
			bcx.moveTo(iso.pse.x,iso.pse.y);
			bcx.lineTo(iso.se.x,iso.se.y);
			bcx.lineTo(iso.sw.x,iso.sw.y);
			bcx.lineTo(iso.psw.x,iso.psw.y);
			bcx.lineTo(iso.pse.x,iso.pse.y);
			bcx.closePath;
			bcx.fillStyle = this.color.dark;
			bcx.fill();
			bcx.stroke();
			
			bcx.beginPath();
			bcx.moveTo(iso.pnw.x,iso.pnw.y);
			bcx.lineTo(iso.pne.x,iso.pne.y);
			bcx.lineTo(iso.pse.x,iso.pse.y);
			bcx.lineTo(iso.psw.x,iso.psw.y);
			bcx.lineTo(iso.pnw.x,iso.pnw.y);
			bcx.closePath;
			bcx.fillStyle = this.color.dark;
			bcx.fill();
			bcx.stroke();

		}
		
		this.draw = function() {
			canvas = document.querySelector("#canvas");
			ctx = canvas.getContext("2d");
			
			var iso = utils.isoOffset(this.x,this.y,this.zHeight);
			ctx.drawImage(this.buffer,iso.x,iso.y);
			//ctx.fillRect(iso.x,iso.y,2,2);
			
			//ctx.fillText(this.xIndex+"/"+this.yIndex,iso.x,iso.y);

		};
		
		this.init();
    }
    
    function initBlockHeight() {
	    return Math.floor(Math.random()*MAX_BLOCK_HEIGHT);
    }
    
    function isoPoints(z) {
	    var left = 0,
		    right = WIDTH,
		    top = 0,
		    bottom = WIDTH;
		
		var points = {
			nw: utils.iso(left,top,0),
			ne: utils.iso(right,top,0),
			se: utils.iso(right,bottom,0),
			sw: utils.iso(left,bottom,0),
			
			pnw: utils.iso(left,top,z),
			pne: utils.iso(right,top,z),
			pse: utils.iso(right,bottom,z),
			psw: utils.iso(left,bottom,z)
		};
		
		var exL=0, exR=0, exT=0, exB=0;
		for(var i in points) {
			if(points[i].x < exL) exL = points[i].x;
			if(points[i].x > exR) exR = points[i].x;
			if(points[i].y < exT) exT = points[i].y;
			if(points[i].y > exB) exB = points[i].y;
		}
				
		//console.log(exL,exR,exT,exB);
		if(exL < 0) {
			for(var i in points) {
				points[i].x -= exL;
			}			
		}
		if(exT < 0) {
			for(var i in points) {
				points[i].y -= exT;
			}			
		}
		
		points.totalWidth = exR - exL;
		points.totalHeight = exB - exT;
		
		return points;

    }
    
    function spaceColor(z) {
		switch(z) {
			case 0:
				return {
					light: "#3366ff",
					dark: "#3333ff"
				};
			case 1:
				return {
					light: "#3366cc",
					dark: "#3333cc"
				};
			case 2:
				return {
					light: "#336699",
					dark: "#333399"
				};
			case 3:
				return {
					light: "#336666",
					dark: "#333366"
				};
			case 99:
				return {
					dark: "#ff0000",
					light: "#ff0000"
				};
	}
}

    
    
    return Space;
    
});