//Game Perspective
function Iso(x,y,z) {
	return {
		x: ((x - y * 1)) + 960 + 20,
		y: ((((x + y) / 1.5) - z*1.5) + 100) * 1
/*
		x: x,
		y: y
*/
/*
		x: (x - y/4) + 980,
		y: (y/4-z)*2
*/
	};
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


function collides(a,b) {
	//console.log(a.space.blockHeight+" "+b.space.blockHeight);
	return a.x + a.hW > b.x - b.hW && 
         a.x - a.hW < b.x + b.hW &&
         a.y + a.hH > b.y - b.hH &&
         a.y - a.hH < b.y + b.hH &&
         a.z < b.z + b.zHeight &&
         a.z + a.zHeight > b.z;
         //a.space.blockHeight == b.space.blockHeight;
}

function oneOrNegOne() {
	var x = (Math.random() * 2) - 1;
	if (x < 0) { return -1; }
	if (x > 0) { return 1; }
}


function winGame() {
	$("#gameOver").html("You Win!");
	$("#gameOver").show();
	$("#pauser").hide();
	$("#playAgain").show();
}

function gameOver() {
	$("#gameOver").html("Game Over");
	$("#gameOver").show();
	$("#pauser").hide();
	$("#playAgain").show();
}