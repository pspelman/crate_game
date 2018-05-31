<?php
require 'gamereqs.php';



			//START WITH JUTS THE UPDATE
//prepare an update query



//query the DB to UPDATE
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



//$query = "UPDATE" . $tableName . " SET score = " .  $_SESSION['email'] 
//$email = $_SESSION['email'];
//$newseedlev = $_SESSION['seedlev'];

// echo "EMAIL: " . $email;
// echo "seedlev : " . $newseedlev;



// $query = <<<SQL
// UPDATE puzzles 
// 	SET recname = "$tag",
// 		puzzles.score = "$newRecordScore"
// 	WHERE puzzles.seedlev = "$seedlev"
// SQL;

	$update = "UPDATE puzzles SET recname = :tag, 
								 score = :score 
								 WHERE seedlev = :seedlev";
	$stmt = $conn->prepare($update);
	$stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
	$stmt->bindParam(':score', $newRecordScore, PDO::PARAM_INT);
	$stmt->bindParam(':seedlev', $seedlev, PDO::PARAM_INT);
try {
	$stmt->execute();
	$status = "Update successful!";
	echo $status;
	$currentLocation = "Location: single.php?seedlev=".$seedlev;
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


	// $query = "INSERT into users(tag, email, password) VALUES(:tag, :email, :password)";

// 	$bindings = array(
// 		// 'table' => $table,
// 		'tag' => $tag,
// 		'score' => $newRecordScore,

// 		);

// try {
// 	query($query, $bindings, $conn);	
// 	$status = 'Score updated!';
// 	echo $status;
// 	// header('Location: success.php');
// 	die();
// 		// $prep->execute($values);
//    // do other things if successfully inserted
// } catch (PDOException $e) {
//    if ($e->errorInfo[1] == 1062) {
//       // duplicate entry, do something else
//    	echo 'DUPLICATE';
//    	$status = "FAIL";
//    	$submit = 0;
//    } else {
//       // an error other than duplicate entry occurred
//    	echo 'SOME OTHER ERROR OCCURRED';
//    	$status = "FAIL";
//    	$submit = 0;
//    }
// }




// function query($query, $bindings, $conn) {

// query($query);
header("Location: single.php?seedlev=" + $seedlev);


// UPDATE puzzles 
// 	SET recname = (
// 			SELECT users.tag
// 			FROM users
// 			WHERE users.email = 'poop@phil.com'
// 			),
// 		puzzles.score = 999
// 	WHERE puzzles.seedlev = 6421




//if it is a new level, prepare an INSERT 

