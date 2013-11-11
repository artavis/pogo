var explosions = [];
var explosionImage = new Image();
explosionImage.src = "images/expl.png";

function smallExplosion(I) {
	//Gets an x,y,z pushed in
	I.active = true;
	I.step = 1;
	
	I.d = Iso(I.x,I.y,I.z);
	
	I.icon = explosionImage;
	I.draw = function(){
		if (this.active){
			
			bcx.drawImage(this.icon,this.d.x - 24,this.d.y);
		}
	}
	I.update = function() {
		if(this.step == 4) {
			this.active = false;
		}
		this.step++;
	}
	return I;
}

function tinyExplosion(I) {
	I.active = true;
	I.step = 1;
	
	I.d = Iso(I.x,I.y,I.z);
	
	I.icon = new Image();
	I.icon.src = "images/tinyexpl.png";
	
	I.draw = function(){
		if (this.active){
			
			bcx.drawImage(this.icon,this.d.x - 12,this.d.y);
		}
	}
	I.update = function() {
		if(this.step == 4) {
			this.active = false;
		}
		this.step++;
	}
	return I;
}

function bigExplosion(I){
	I.active = true;
	I.step = 1;
	
	I.origX = I.x;
	I.origY = I.y;
	I.origZ = I.z;
	
	I.d = Iso(I.x,I.y,I.z);
	
	I.icon = explosionImage;
	
	I.draw = function(){
		if (this.active){
			I.d = Iso(I.x,I.y,I.z);	
			bcx.drawImage(this.icon,this.d.x - 12,this.d.y);
		}
	}
	I.update = function() {
		var randXFact = Math.floor(Math.random()*11) * oneOrNegOne();
		var randYFact = Math.floor(Math.random()*11) * oneOrNegOne();
		var randZFact = Math.floor(Math.random()*11) * oneOrNegOne();
		this.x = this.origX += randXFact;
		this.y = this.origY += randYFact;
		this.z = this.origZ += randZFact;
		
		if(this.step == 16) {
			this.active = false;
		}
		this.step++;
	}
	return I;
}
