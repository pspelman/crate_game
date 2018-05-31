<?php

$restartPuzzleLogic = <<<EOD
	<script>
		var setRestartPuzzleSeed = 'single.php?seedlev=' + seedlev;
		document.getElementById('restartCurrentPuzzle').action=' " + "setRestartPuzzleSeed" + ";
	</script>
EOD;

$puzzleNavForm = <<<EOD
    <form class="restartPuzzle" id="restartCurrentPuzzle" method="post" action="">
		<input type="submit" id="restartPuzzleButton" name="restartPuzzleButton" class="controlButton" value="START OVER">
	</form>
	<form class="randomPuzzle" action='single.php?seedlev=0' method='post'>
		<input type='submit' id='randomPuzzleButton' name='randomPuzzleButton' class='controlButton' value='NEW RANDOM PUZZLE'>
	</form>
EOD;


$restartPuzzleForm = <<<EOD
    <form class="restartPuzzle" id="restartCurrentPuzzle" method="post" action="">
		<input type="submit" id="restartPuzzleButton" name="restartPuzzleButton" class="controlButton" value="START OVER">
	</form>
EOD;

$randomPuzzleForm = <<<EOD
	<form class="randomPuzzle" action='single.php?seedlev=0' method='post'>
		<input type='submit' id='randomPuzzleButton' name='randomPuzzleButton' class='controlButton' value='NEW RANDOM PUZZLE'>
	</form>
EOD;


// if(isset($_SESSION['username']) & $_SESSION['username'] != "ANONYMOUS") {
// 	$username = $_SESSION['username'];
// } else {
// 	$username = "ANONYMOUS";
// }
// if(isset($_SESSION['username']) & $_SESSION['username'] != "ANONYMOUS") {
// 	$username = $_SESSION['username'];
// } else {
// 	$username = "ANONYMOUS";
// }
// $updateScoreButton = <<<EOD
// 	<form class='updateScore' action='updateHighScore.php' method='post'>
// 		<input type='hidden' id='updateScoreButton' name='updateScoreButton' class='controlButton' value="SAVE NEW HIGH SCORE">
// 		<input type='text' id='tag' name='tag' value="$username">
// 		<input type='text' id='seedlev' name='seedlev' value="$seedlev">
// 		<input type='text' id='updateScoreMISC' name='updatScoreMISC' value="WHACK!">
// 	</form>
// EOD;


