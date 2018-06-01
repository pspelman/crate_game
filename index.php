<?php
require 'gamereqs.php';
//Get ALL the posts
$puzzles = get('puzzles', $conn, 10);

//require "views/index.view.php";

view('index', array(
	'puzzles' => $puzzles)
	);

// view('navbar');



//FILTER through and display in the INDEX view




//this goes to the functions file to make the connection to the DB...then we can call
//on our connection with the $conn shortcut

// $id = 2; //temporary

//This is going to try to connect to the DB with the parameters that are passed in
//if it doesn't work, we'll get an error message that will be echoed out

// try {
// 	$conn = new PDO('mysql:host=localhost;dbname=' . $config['database'], $config['username'], $config['password']);
// 	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 	$results = $conn->query("SELECT * FROM posts WHERE id = ".$id);


// // // THIS FUNCTION PRINTS OUT THE SELECTED POST as an object
// 	// foreach($results as $row) {
// 	// 	print_r($row);
// 	// }
// } catch(PDOException $e) {
// 	echo 'ERROR: ' . $e->getMessage();
// }

// if (!$conn ) die('Problem connecting to the db.');




// foreach ($posts as $post) {
// 	print_r($post);
// }


// filter through and display on the page

//Display the posts in the index view


// include 'views/index.view.php';

?>
