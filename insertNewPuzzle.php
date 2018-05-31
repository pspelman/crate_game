<?php
require 'gamereqs.php';



if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
	// $tag = test_input($_POST['tag']);
	// $email = test_input($_POST['email']);
	// $password = test_input($_POST['password']);
	print_r($_POST);
	echo "<br/>POST HAPPENED AFTER BUTTON PRESS<br/>";
}

extract($_POST);
echo $tag . "<br/>";
echo $seedlev . "<br/>";
echo $newRecordScore . "<br/>";

	$insert = "INSERT into puzzles(seedlev, name, recname, puzname, score) VALUES(:seedlev, :tag, :tag, :puzname, :score)";
	$bindings = array(
			// 'table' => $table,
			'seedlev' => $seedlev,
			'tag' => $tag,
			'puzname' => $newPuzName,
			'score' => $newRecordScore
			);

	$stmt = $conn->prepare($insert);
	$stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
	$stmt->bindParam(':score', $newRecordScore, PDO::PARAM_INT);
	$stmt->bindParam(':seedlev', $seedlev, PDO::PARAM_INT);
	$stmt->bindParam(':puzname', $newPuzName, PDO::PARAM_STR);
try {
	$stmt->execute();
	$status = "Update successful!";
	echo $status;
	// $currentLocation = "Location: single.php?seedlev=".$seedlev;
	$currentLocation = "Location: index.php";
	header($currentLocation);
} catch (PDOException $e){
	if ($e->errorInfo[1] == 1062) {
		echo 'THIS IS A DUPLICATE THING';
		$status = "FAIL";
		$submit = 0;
	} else {
	echo 'SOMETHING ELSE WENT WRONG';
	$status = "FAIL";
	$submit = 0;
	};
};
