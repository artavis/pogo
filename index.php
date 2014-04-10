<html>
<head>
<title>Killer Pogos!</title>

<link rel="stylesheet" href="style.css" />

<script data-main="js/main" src="js/lib/require.js"></script>

</head>
<body>
<div id="middle">
	
	<div id="canvasHolder"></div>

<!--	
	<input class="button" type="button" id="pauser" value="Pause" />
	<input class="button" type="button" id="slower" value="Slow" />
	<p id="fps"></p>
	
	Drones:
	<select id="drones">
		<?php 
			$text = "";
			for($i=0;$i<20;$i++){ 
				$text .= "<option";	
				$text .= $i == 7 ? " selected" : "";
				$text .= ">{$i}</option>";	
			}
			echo $text;	
		?>
	</select>
	Spinners:
	<select id="spinners">
		<?php 
			$text = "";
			for($i=0;$i<20;$i++){ 
				$text .= "<option";	
				$text .= $i == 3 ? " selected" : "";
				$text .= ">{$i}</option>";	
			}
			echo $text;	
		?>
	</select>
	Chasers:
	<select id="chasers">
		<?php 
			$text = "";
			for($i=0;$i<20;$i++){ 
				$text .= "<option";	
				$text .= $i == 5 ? " selected" : "";
				$text .= ">{$i}</option>";	
			}
			echo $text;	
		?>
	</select>
	Player Health:
	<select id="health">
		<?php 
			$text = "";
			for($i=0;$i<20;$i++){ 
				$text .= "<option";	
				$text .= $i == 10 ? " selected" : "";
				$text .= ">{$i}</option>";	
			}
			echo $text;	
		?>
	</select>
	Block Height:
	<select id="bHeight">
		<option>1</option>
		<option>2</option>
		<option selected>3</option>
		<option>4</option>
	</select>
	

	<br>
	EASY:<input type="radio" name="preset" value="easy" onclick="setOpts(this);" />
	MEDIUM:<input type="radio" name="preset" value="medium" onclick="setOpts(this);" checked />
	HARD:<input type="radio" name="preset" value="hard" onclick="setOpts(this);" />
	EMPTY:<input type="radio" name="preset" value="empty" onclick="setOpts(this);" />
	<br /><br>
		<input type="button" id="start" value="START" />	
-->
</div>
</body>
</html>
