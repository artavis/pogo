define(["jquery","utils","config","EntityView","pixi"], function($,utils,config,EntityView,pixi) {

	var spaceImages = null;
	
    function SpaceView(model) {
	    
	    EntityView.call(this,model);
	    createSpaceImages();
	    
		var space = model,
			buffer = this.getBuffer(space.blockHeight,SpaceView.BLOCK_TYPES.NORMAL);

		this.setImageFromCanvas(buffer);

	    this.updateDrawPosition = function() {
		    var iso = utils.isoOffset(space.pos.x,space.pos.y,space.size.z);
		    this.getImage().x = iso.x - buffer.points.ne.x/2, this.getImage().y = iso.y - buffer.points.psw.y;
	    };
	    this.resetBuffer = function(){
		    buffer = this.getBuffer(space.blockHeight,SpaceView.BLOCK_TYPES.NORMAL);
		    this.setImageFromCanvas(buffer);		    
	    }
	    		
		return this;
		
    }   
    
    SpaceView.prototype = Object.create( EntityView.prototype );
    SpaceView.prototype.getBuffer = function(BLOCK_HEIGHT,TYPE) {
	    return spaceImages[BLOCK_HEIGHT][TYPE];
    };
    
    SpaceView.BLOCK_TYPES = {
	    NORMAL: "normal"
    };

    
    function createBufferCanvas(blockHeight) {
		var size = config().platformHeight * blockHeight;
		var iso = isoPoints(0,size,true);
		
		var buffer = document.createElement("canvas");
		buffer.width = iso.totalWidth, buffer.height = iso.totalHeight;
		buffer.points = iso;
		
		var bcx = buffer.getContext('2d');
		var color = spaceColor(blockHeight);  
		
		for(var i=0; i<blockHeight; i++) {
			drawBlockOnBuffer(bcx,i,blockHeight);
		}
		
		drawPlatformOnBuffer(bcx,iso,color);
		
		return buffer;
    }
    
    function drawBlockOnBuffer(bcx,bH,blockHeight) {
	    var z1 = bH*config().platformHeight;
	    var z2 = z1 + config().platformHeight;
	    var iso = isoPoints(z1,z2);

	    var bR = blockHeight-bH-1;
	    var z3 = bR*config().platformHeight*config().isoZFactor;
    	
    	for(var i in iso) {
			iso[i].y += (z3);
		}			
	    
	    var color = spaceColor(bH+1);
	    
		bcx.beginPath();
		bcx.moveTo(iso.pne.x,iso.pne.y);
		bcx.lineTo(iso.ne.x,iso.ne.y);
		bcx.lineTo(iso.se.x,iso.se.y);
		bcx.lineTo(iso.pse.x,iso.pse.y);
		bcx.lineTo(iso.pne.x,iso.pne.y);
		bcx.closePath();
		bcx.fillStyle = color.light;
		bcx.fill();
		bcx.stroke();
		
		bcx.beginPath();
		bcx.moveTo(iso.pse.x,iso.pse.y);
		bcx.lineTo(iso.se.x,iso.se.y);
		bcx.lineTo(iso.sw.x,iso.sw.y);
		bcx.lineTo(iso.psw.x,iso.psw.y);
		bcx.lineTo(iso.pse.x,iso.pse.y);
		bcx.closePath;
		bcx.fillStyle = color.dark;
		bcx.fill();
		bcx.stroke();
    }
    
    function drawPlatformOnBuffer(bcx,iso,color) {
		bcx.beginPath();
		bcx.moveTo(iso.pnw.x,iso.pnw.y);
		bcx.lineTo(iso.pne.x,iso.pne.y);
		bcx.lineTo(iso.pse.x,iso.pse.y);
		bcx.lineTo(iso.psw.x,iso.psw.y);
		bcx.lineTo(iso.pnw.x,iso.pnw.y);
		bcx.closePath;
		bcx.fillStyle = color.dark;
		bcx.fill();
		bcx.stroke();
    }
        
    function createSpaceImages() {
	    if(spaceImages != null) return;
	    spaceImages = [];
	    for(var i=0; i<config().maxBlockHeight; i++) {
		    var blocks = {};
		    blocks[SpaceView.BLOCK_TYPES.NORMAL] = createBufferCanvas(i);
		    
		    spaceImages.push(blocks);
	    }
    }
    
    function isoPoints(z1,z2,restrictY) {
	    var left = 0,
		    right = config().spaceWidth,
		    top = 0,
		    bottom = config().spaceWidth;
		
		var points = {
			nw: utils.iso(left,top,z1),
			ne: utils.iso(right,top,z1),
			se: utils.iso(right,bottom,z1),
			sw: utils.iso(left,bottom,z1),
			
			pnw: utils.iso(left,top,z2),
			pne: utils.iso(right,top,z2),
			pse: utils.iso(right,bottom,z2),
			psw: utils.iso(left,bottom,z2)
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

    
    return SpaceView; 
});