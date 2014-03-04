function initView(){
	view = {
		width: dc.width(),
		height: dc.height(),
		x: player.boardPos.x - (dc.width() / 2),
		y: 0,
		midX: dc.width() / 2,
		midY: dc.height() / 2,
		update: function(){
			//console.log(this.midX);
			var pX = player.boardPos.x;
			var pY = player.boardPos.y;
			
			var midX = this.midX;
			var midY = this.midY;

			this.x = pX - midX;
			this.y = pY - midY - (midY)/2;
			
			if(pX < midX) {
				this.x = 0;
			} else if(pX > bc.width - midX) {
				this.x = bc.width - this.width;
			} 
			
			if(pY < midY + (midY)/2) {
				this.y = 0;
			} else if(pY > bc.height - midY + (midY)/2) {
				this.y = bc.height - this.height;
			} 
		}
	};
}

function isInView(x,y) {
	var vX = view.x;
	var vY = view.y;
	var vH = view.height;
	var vW = view.width;
	
	return x >= vX && x <= vX+vW && y >= vY && y <= vY+vH;
}