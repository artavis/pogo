var highestBlock = 3;

function Space(I){
	
	I.width = spaceW;
	I.height = spaceH;
	
	I.blockHeight = Math.floor(Math.random() * highestBlock);
	
	I.z = I.blockHeight * platformHeight;
	I.zh = I.z;
	
	I.blockStrength = 5;
	I.CurStrength = I.blockStrength;
	
	I.color = spaceColor(I.blockHeight);
	I.gotHit = false;
	//I.hitColor = "#ff0000";
	
	I.leftEdge = I.x - (spaceW/2);
	I.rightEdge = I.x + (spaceW/2);
	I.topEdge = I.y - (spaceH/2);
	I.bottomEdge = I.y + (spaceH/2);
	
	I.NW = Iso(I.leftEdge,I.topEdge,0);
	I.NE = Iso(I.rightEdge,I.topEdge,0);
	I.SE = Iso(I.rightEdge,I.bottomEdge,0);
	I.SW = Iso(I.leftEdge,I.bottomEdge,0);
	I.middle = Iso(I.x,I.y,0);
	
	I.platNW = Iso(I.leftEdge,I.topEdge,I.z);
	I.platNE = Iso(I.rightEdge,I.topEdge,I.z);
	I.platSE = Iso(I.rightEdge,I.bottomEdge,I.z);
	I.platSW = Iso(I.leftEdge,I.bottomEdge,I.z);
	I.platMiddle = Iso(I.x,I.y,I.z);
	
	I.occupied = false;
			
	I.blockHit = function(power){
		this.CurStrength -= power;
		this.gotHit = true;
		if(this.CurStrength <= 0){
			this.lower();
		}
	}
	
	I.lower = function(){
		this.CurStrength = 5;
		this.resetPlots(-1);
		explosions.push(bigExplosion({
			x: this.x,
			y: this.y,
			z: this.z
		}));
		pogos.foreach(function(pogo){
			if(this == pogo.space){
				pogo.z = this.z;
			}
		});
	}
	
	I.resetPlots = function(diff) {
		this.blockHeight += diff;
		this.z = this.blockHeight * platformHeight;
		
		this.platNW = Iso(this.leftEdge,this.topEdge,this.z);
		this.platNE = Iso(this.rightEdge,this.topEdge,this.z);
		this.platSE = Iso(this.rightEdge,this.bottomEdge,this.z);
		this.platSW = Iso(this.leftEdge,this.bottomEdge,this.z);
		this.platMiddle = Iso(this.x,this.y,this.z);
		
		this.color = spaceColor(this.blockHeight);
	}
		
	I.update = function(){
	
	};
	
	I.drawPlatform = function() {
		if(this == player.space && initiated) {
			var color = "#990000";
		} else if (this.gotHit) {
			var color = "#ff0000";
		} else {
			var color = spaceColor(this.blockHeight).light;
		}
		bcx.beginPath();
		
		bcx.moveTo(this.platNW.x,this.platNW.y);
		bcx.lineTo(this.platNE.x,this.platNE.y);
		bcx.lineTo(this.platSE.x,this.platSE.y);
		bcx.lineTo(this.platSW.x,this.platSW.y);
		bcx.lineTo(this.platNW.x,this.platNW.y);
		
		bcx.closePath;
		
		bcx.fillStyle = color;
		bcx.fill();
		bcx.stroke();
	}
	
	I.drawBlock = function(bH) {
		var z = bH * platformHeight;
		var z2 = (bH * platformHeight) + platformHeight;
		if(this.gotHit) {
			var color = spaceColor(99);
		} else {
			var color = spaceColor(bH + 1);
		}
		
		var bNW = Iso(this.leftEdge,this.topEdge,z);
		var bNE = Iso(this.rightEdge,this.topEdge,z);
		var bSE = Iso(this.rightEdge,this.bottomEdge,z);
		var bSW = Iso(this.leftEdge,this.bottomEdge,z);

		var tNW = Iso(this.leftEdge,this.topEdge,z2);
		var tNE = Iso(this.rightEdge,this.topEdge,z2);
		var tSE = Iso(this.rightEdge,this.bottomEdge,z2);
		var tSW = Iso(this.leftEdge,this.bottomEdge,z2);
		
		bcx.beginPath();
		
		bcx.moveTo(tNE.x,tNE.y);
		bcx.lineTo(bNE.x,bNE.y);
		bcx.lineTo(bSE.x,bSE.y);
		bcx.lineTo(tSE.x,tSE.y);
		bcx.lineTo(tNE.x,tNE.y);
		
		bcx.closePath();
		bcx.fillStyle = color.light;
		bcx.fill();
		bcx.stroke();
		
		bcx.beginPath();

		bcx.moveTo(tSE.x,tSE.y);
		bcx.lineTo(bSE.x,bSE.y);
		bcx.lineTo(bSW.x,bSW.y);
		bcx.lineTo(tSW.x,tSW.y);
		bcx.lineTo(tSE.x,tSE.y);
		
		bcx.closePath;
		bcx.fillStyle = color.dark;
		bcx.fill();
		bcx.stroke();


	}	
	
	I.draw = function(){	
	
		if(this.blockHeight != 0){
			for(var i = 0; i < this.blockHeight; i++) {
				this.drawBlock(i);
			}
		}
		
		this.drawPlatform(); 
		
		bullets.forEach(function(bullet){
			bcx.strokeStyle = "#003300";
			if(bullet.space != null) {
				//console.log(bullet.space.spaceX+" "+I.spaceX);
				if(bullet.space.spaceX == I.spaceX && bullet.space.spaceY == I.spaceY) { 
					//console.log("draw");
					bullet.draw(); 
					//continue;
				}
			}
		});
		
		pogos.forEach(function(pogo) {
			if(I.spaceX == pogo.spaceX && I.spaceY == pogo.spaceY) {
				pogo.draw();
			}
		});
				
		
		this.gotHit = false;
		
	};
	
	return I;
}