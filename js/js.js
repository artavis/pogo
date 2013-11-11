var debug = true;
var paused = false;
var initiated = false;

var dc;
var dcx;
var dcX;
var dcY;

var bc;
var bcx;

var WIDTH = 960;
var HEIGHT = 960;

var view;
var snapshot;

var player;

var pogos = [];

var playerW = 16;
var playerH = 16;

var boardBG = new Image();
var bg = new Image();
bg.src = "images/bg2.jpg";

var map = [];
var spaceH = 48;
var spaceW = 48;
var xSpaces = WIDTH / spaceW;
var ySpaces = HEIGHT / spaceH;
var platformHeight = 24;

var tile_width = 96;
var tile_height = 64;
var tilt = 4;

var speed = 16;

var enemyCount = 0;



var keydown = {
	left: false,
	right: false,
	up: false,
	down: false,
	space: false,
	mouseL: false,
	mouseR: false,
	allKeysUp: function(){
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.space = false;
	}
};

/* ------------INITIALIZING FUNCTIONS------------ */
function init(){
	dc = $("#canvas");
	dcx = $('#canvas')[0].getContext("2d");
	
	//console.log($("#canvas").position().left);
	
	dcX = $("#canvas").position().left;
	dcY = $("#canvas").position().top;
	
	bc = document.createElement("canvas");
	bc.width = WIDTH + 1000;
	bc.height = HEIGHT + 500;
	bcx = bc.getContext("2d");
	
	initMap();
	
	player = initPlayer(Pogo({
		space: map[xSpaces - 2][xSpaces - 2]
	}));
	
	pogos.push(player);
	
	var numEnemies = 10;
	
	for(var i=0;i<numEnemies;i++){
		var x = Math.floor(Math.random() * xSpaces);
		var y = Math.floor(Math.random() * ySpaces);
		if(x == player.spaceX && y ==player.spaceY) {
			x += oneOrNegOne();
			y += oneOrNegOne();
		}
		pogos.push(RegularEnemy(map[y][x]));
		enemyCount++
	}
	
	
	$("#remainingEnemies").html(enemyCount);
	$("#health").html(player.strength);
	
	initView();
		
	setInterval("gameLoop()",1000/30);
		
	$(document).keydown(function(e){
		//console.log(e.which);
		if(e.which == 39) {
			e.preventDefault();
			keydown.right = true;
		} else if (e.which == 37) {
			e.preventDefault();
			keydown.left = true;
		} else if (e.which == 38) {
			e.preventDefault();
			keydown.up = true;
		} else if (e.which == 40) {
			e.preventDefault();
			keydown.down = true;
		} else if (e.which == 32) {
			e.preventDefault();
			keydown.space = true;
		}
	});
	$(document).keyup(function(e){
		//console.log(e.which);
		keydown.right = false;
		keydown.left = false;
		keydown.up = false;
		keydown.down = false;
		keydown.space = false;
		if(e.which == 32){

		}
	});
	
	$("#canvas").mousemove(function(e){
		var moveX = e.pageX - $("#canvas").position().left;
		var moveY = e.pageY - $("#canvas").position().top;
		
		if(moveY > $("#canvas").height()/2) {
			if(moveX > $("#canvas").width()/2) {
				//mouse is in lower right
				player.direction = "right";
			} else {
				//mouse is in lower left
				player.direction = "down";
			}
		} else {
			if(moveX > $("#canvas").width()/2) {
				//mouse is in upper right - go up
				player.direction = "up";
			} else {
				//mouse is in upper left - go left
				player.direction = "left";
			}
		}
		//console.log(player.direction);
		
		
	});
	
	$("#canvas").mousedown(function(e){
		//e.preventDefault();
		if (e.which == 1) {
			player.jumpTriggered = true;
		}
		if (e.which == 3) {
			keydown.space = true;
		}
		//console.log(e.which);
	});
	
	$("#canvas").mouseup(function(e){
		keydown.allKeysUp();
	});
	
	//console.log(player.boardPos.x);
	//console.log(view.x);
	//console.log(view.midX);
	//console.log(bc.width);
	//console.log(bc.height);
	
	initiated = true;

}


function initMap(){
	for(var i=0;i<ySpaces;i++){
		var row = [];
				
		if(i % 2 == 0) {
			var rowK = "even";
		} else {
			var rowK = "odd";
		}
		for(var c=0;c<xSpaces;c++){			
			row.push(Space({
				x: c * spaceW + (spaceW/2),
				y: i*spaceH + (spaceH/2),
				spaceX: c,
				spaceY: i,
				rowKind: rowK
			}));
		}
		map.push(row);
	}
	
	for(var i=0;i<ySpaces;i++) {
		for(var c=0;c<xSpaces;c++){
			var space = map[i][c];
			
			if(i != 0) {
				space.nextSpaceUp = map[i-1][c];
			} else {
				space.nextSpaceUp = null;
			}
			
			if(c != 0) {
				space.nextSpaceLeft = map[i][c-1];
			} else {
				space.nextSpaceLeft = null;
			}
			
			if(i+1 != ySpaces) {
				space.nextSpaceDown = map[i+1][c];
			} else {
				space.nextSpaceDown = null;
			}
			
			if(c+1 != xSpaces) {
				space.nextSpaceRight = map[i][c+1];
			} else {
				space.nextSpaceRight = null;
			}
			
		}
	}
	//var space = map[1][1];
	
}


//var cosAngle = Math.cos(30 * (Math.PI/180));
//var sinAngle = Math.sin(35 * (Math.PI/180));

function initEnemies(numEnemies) {
	for(var i=0;i<numEnemies-1;i++) {
		enemies.push(Enemy({
			space: map[Math.floor(Math.random() * ySpaces)][Math.floor(Math.random() * xSpaces)],
			kind: "regular"
		}));
	}
}

/* ------------GAME LOOP FUNCTIONS------------ */
function gameLoop(){
	if(!paused) {
		update();
		draw();
	}
}

function clear() {
  bcx.fillStyle="#000000";
  bcx.fillRect(0, 0, bc.width, bc.height);
  //bcx.clearRect(0, 0, bc.width, bc.height);
}

function draw(){	
								
	
	dcx.clearRect(0, 0, view.width, view.height);
	bcx.drawImage(bg,view.x,view.y,view.width,view.height,view.x,view.y,view.width,view.height);

	bcx.strokeStyle = "#003300";
	drawMap();
	
	explosions.forEach(function(explosion){
		explosion.draw();
	});
	
	pogos.forEach(function(pogo) {
		if(!pogo.drawn){
			if (isInView(pogo.d.x,pogo.d.y)) {
				pogo.draw();
			}
		}
	});

	dcx.drawImage(bc,view.x,view.y,view.width,view.height,0,0,view.width,view.height);
		
		
	
}


function drawMap(){
	for(var i=0;i<ySpaces;i++){
		
		for(var c=0;c < xSpaces;c++){
 			var sp = map[i][c];
 			if(sp.platNE.x > view.x && sp.platSW.x < (view.x + view.width) && sp.SE.y > view.y && sp.platNW.y < (view.y + view.height)) {
 				map[i][c].draw();
 			}
 		}
	}
}


function takeSnapshot(){
	snapshot = bcx.getImageData(view.x,view.y,view.width,view.height);
}

function takeMapSnapshot(){
	clear();
	drawMap();
	boardBG.src = bc.toDataURL();
}


function drawSnapshot(){
	//dcx.putImageData(snapshot,0,0);
	dcx.drawImage(boardBG,view.x,view.y,view.width,view.height,0,0,view.width,view.height);
}

function update(){
	if(!paused) {
		//player.update();
		view.update();
		
		//update positions
	    bullets.forEach(function(bullet){
	    	bullet.update();
	    });	    
	    pogos.forEach(function(pogo){
	    	pogo.update();
	    });	    
	    explosions.forEach(function(explosion){
	    	explosion.update();
	    });    	    
	    
	    //Calculate collisions
	    handleCollision();
	    
	    //Filter out inactive objects
	    pogos = pogos.filter(function(pogo){
	    	return pogo.active;	    	
	    });
	    bullets = bullets.filter(function(bullet){
	    	return bullet.active;	    	
	    });
	    explosions = explosions.filter(function(explosion){
	    	return explosion.active;	    	
	    });
	    
	    if(!player.active) {
	    	gameOver();
	    } 
	}
	//console.log(bullets.length);
}

function handleCollision(){
	bullets.forEach(function(bullet) {
		pogos.forEach(function(pogo) {
			if(collides(bullet,pogo)) {
				pogo.hit();
				bullet.active = false;
			}
		});
	});
}

$(function(){
	init();
	
	$("#pauser").click(function(){
		if(paused) {
			paused = false;
			$(this).val("Pause");
		} else {
			paused = true;
			$(this).val("Play");
		}
	});
	
	$("#playAgain").click(function(){
		window.location.reload();
	});
	
	$("#canvas").bind("contextmenu",function(e){
        return false;
    });
});