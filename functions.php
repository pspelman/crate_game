<?php


function view($path, $data = null) {
	if ( $data ) {
		extract($data);
		// var_dump($data);
	}
	$path = $path . '.view.php';
	include 'views/layout.php';
//	 include "views/{$path}.view.php";
};



// array(
// 	'name' => 'Phil',
// 	'age' => 29
// );


// $name = 'Phil';
// $age = 29;
