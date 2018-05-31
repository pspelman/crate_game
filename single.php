<?php
require 'gamereqs.php';


// FETCH THE puzzle
$puzzle = get_by_id((int)$_GET['seedlev'], $conn) -> fetchAll();
// echo $_GET['seedlev'];

//DOES THE PUZZLE EXIST?
$testSeed = $_GET['seedlev'];  //grab the global value for 'seedlev' and test if it is a number

if(is_numeric($testSeed)) 
	{
		// echo "<br/>IT IS NUMERIC<br/>";
	$seedlev = $testSeed;
	isset($puzzle['score']) ? $recordScore = $_GET['score'] : $recordScore = 'UNSOLVED';
	echo "<script>var isRandomLevel = false;</script>";

	// echo "<br/>SCORE IS SET<br/>";
	} 
else 
	{
		echo "NOT A VALID LEVEL!";
		$seedlev = 0;
		$recordScore = "NOT A REAL LEVEL";
	};

// if(!$puzzle) {
// 	echo "<br/>NOT puzzle<br/>";
// }
// $tag = $_SESSION['username'];
// echo "<script>var tag = ".$tag.";</script>";
$recordScoreEchoCode = "<script> 
								var recordScore='NOT SET'; 
								// alert('Single.php score set to ' + recordScore);
								var isRandomLevel = true;
							</script>";


if( $puzzle ) {
	// echo "dollars puzzle HAPPENED";
	$puzzle = $puzzle[0]; //assigns the values of the first result set in $puzzle
	// $seedlev = $_GET['seedlev'];
//use View() function and pass the data for the puzzle that was looked up by seedlev
	view('single', array(
		'puzzle' => $puzzle,
		'score' => $recordScore,
		)	);
											//IF THERE IS A SEED (like from restarting a random puzzle) but no result from DB
} else if ($seedlev > 0 & !$puzzle) {
	// echo "<br/>SEED > ZERO!<br/>";
// echo "<script> var recordScore=9999999; alert('Single.php score set to ' + recordScore);</script>";
echo $recordScoreEchoCode;
	$puzzle = array(
		'puzname' => "RANDOM PUZZLE",
		'seedlev' => $seedlev,
		'score' => $recordScore );
	view('single', array(
		'puzzle' => $puzzle)	);

} else if ($seedlev == 0) {					//IF THE SEED IS 0 then we are asking for a NEW random puzzle
// echo "<script> var recordScore='NOT SET!'; alert('Single.php score set to ' + recordScore);</script>";
echo $recordScoreEchoCode;
	$puzzle = array(
		'puzname' => "RANDOM PUZZLE",
		'seedlev' => 0,
		'score' => $recordScore );
	view('single', array(
		'puzzle' => $puzzle)	);
};
// else {
// 	// header('location:index.php');
// };



// print_r($post);





// //GET A POST BY ID
// $id = $_GET['id'];
// $tableName = 'posts';




// if( $post ) {
// 	$post = $post[0];
// 	$id = $_GET['id'];
// 	$whichView = 'single';
// 	include('views/layout.php');
// } else {
// 	header('location:index.php');
// };

//IF user asks for a post that does NOT exist...redirect to index



