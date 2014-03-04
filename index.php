<html>
<head>
<title>Killer Pogos!</title>

<link rel="stylesheet" href="style.css" />

<script data-main="js/main" src="js/lib/require.js"></script>

<!--
<script src="js/functions.js"></script>
<script src="js/pogo.js"></script>
<script src="js/player.js"></script>
<script src="js/enemies.js"></script>
<script src="js/explosions.js"></script>
<script src="js/space.js"></script>
<script src="js/bullet.js"></script>
<script src="js/view.js"></script>
<script src="js/js.js"></script>
-->

</head>
<body>
<div id="middle">
	<div id="canvasHolder">
		<canvas id="canvas" width="720px" height="480px"></canvas>
	</div>
	<input class="button" type="button" id="pauser" value="Pause" />
	<input class="button" type="button" id="playAgain" value="Play Again" style="display:none" />
	<p class="stats">Health: <span id="health"></span>/10</p>
	<p class="stats">Remaining enemies: <span id="remainingEnemies"></span></p>
	<p id="gameOver">GAME OVER!</p>
	
	<div id="instructions">
		<h2>Instructions</h2>
		
		<h3>Objective</h3>
		Kill all enemy pogos
		
		<h3>Moves</h3>
			
			<h4>Keyboard</h4>
			Arrow keys: jump to next tile<br />
			Space bar: shoot:<br />
			
			<h4>Mouse</h4>
			Move mouse around game screen to change direction.<br />
			Left click: jump to next tile<br />
			Right click: shoot
			<br />
			<strong>You can only jump to a space that is one unit higher or lower than your current height.</strong>
						
			<h4>Shooting</h4>
			Shots get fired when your pogo hits the ground after a bounce or jump. Shooting an enemy reduces its health by 1.<br>
			You can shoot the blocks around you to destroy them.
			
			
		
		<h3>Enemies</h3>
		All enemies have a health of 4. Look out, they will turn and shoot you.
		
		
	
	</div>

</div>

</body>
</html>
