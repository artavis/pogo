<html>
<head>
<title>Killer Pogos!</title>

<link rel="stylesheet" href="style.css" />

<script data-main="js/main" src="js/lib/require.js"></script>

</head>
<body>
<div id="middle">
	
	<div id="canvasHolder"></div>
	
	<input class="button" type="button" id="pauser" value="Pause" />
	<input class="button" type="button" id="slower" value="Slow" />
	<p id="fps"></p>
	
	Drones:
	<select id="drones">
	<?php $i=1; while($i<=20): ?>
		<option<?php echo $i==7 ? " selected" : "" ?>><?php echo $i; ?></option>
	<?php $i++; endwhile; ?>
	</select>
	Spinners:
	<select id="spinners">
	<?php $i=1; while($i<=20): ?>
		<option<?php echo $i==3 ? " selected" : "" ?>><?php echo $i; ?></option>
	<?php $i++; endwhile; ?>
	</select>
	Chasers:
	<select id="chasers">
	<?php $i=1; while($i<=20): ?>
		<option<?php echo $i==5 ? " selected" : "" ?>><?php echo $i; ?></option>
	<?php $i++; endwhile; ?>
	</select>
	Player Health:
	<select id="health">
	<?php $i=1; while($i<=20): ?>
		<option<?php echo $i==10 ? " selected" : "" ?>><?php echo $i; ?></option>
	<?php $i++; endwhile; ?>
	</select>
	
	<input type="button" id="start" value="START" />
</div>

</body>
</html>
