<body id="elements" onresize="resize_canvas()">

<h2><?php 

// $loggedIn = isset($_SESSION['username']);
isset($_SESSION['username']) ? $loggedIn = "true" : $loggedIn = "false";

isset($puzzle['score']) ? $recordScore = $puzzle['score'] : $recordScore = 99999999;
// if($recordScore = "UNSOLVED") 
// 	{
// 	$recordScore = "UNSOLVED";
// } else {
// 	$recordScore = $puzzle['score'];
// };

// echo "<script>
// 	var recordScore = ". $recordScore . ";
// 	var loggedIn = ". $loggedIn ."

// 	</script>";
isset($puzzle['recname']) ? $recname = $puzzle['recname'] : $recname = "NO ONE";
isset($_SESSION['username']) ? $tag = $_SESSION['username'] : $tag = "ANONYMOUS";
echo "<script>var tag = '".$tag."';</script>";
echo "<center>".$puzzle['puzname']."</center>";
echo "Best score: " . $recordScore ." by <u>". $recname. "</u><br>";
echo "<script> var recordScore=".$recordScore."; 
// alert('record score set to ' + recordScore);
				var tag =".$tag.";
				var tag =".$tag.";
				var puzname =".$puzzle['puzname'].";</script>";
// echo $tag;

$seedlev = $puzzle['seedlev'];
// echo $seedlev . "<br>";
?> </h2>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>

<div id="statusbar" class="statusbar">THINGS</div>
<div id="canvasDiv">

<canvas id="canvas"   ></canvas>
   
        </div>
        <script><?= "var seedlev = " . $seedlev . ";" ?></script>
<?php 
	include 'forms.php';
	echo "<div id='puzzleControls'>" . $puzzleNavForm . "</div>";
	// echo "<div id='puzzleControls'>" . $restartPuzzleForm . $randomPuzzleForm . "</div>";
// echo $restartPuzzleForm;
?>
        <script src="boardCanvas1.js"></script>
        <script src="crateLogic1.js"></script>




<?php
// $seedlev = 12345;

// include 'forms.php';


// echo "
	// <script>
	// 	var setRestartPuzzleSeed = 'single.php?seedlev=' + seedlev;
	// 	document.getElementById('restartCurrentPuzzle').action=' " + "setRestartPuzzleSeed" + ";
	// </script>"

//include('views/registration.view.php');

?>