<?php

require('../gamereqs.php');

// // FETCH THE puzzle
// $puzzle = get_by_id((int)$_GET['seedlev'], $conn);



if( $puzzle ) {
	$puzzle = $puzzle[0];
	$seedlev = $_GET['seedlev'];
	view('single', array(
		'puzzle' => $puzzle)	);
} else {
	// header('location:index.php');
};



view('registration');
?>