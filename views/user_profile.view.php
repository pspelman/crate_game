<?php

isset($_SESSION['username']) ? $userName = $_SESSION['username'] : $userName = "GUEST USER";


echo "HELLO " . $userName ."! <br/>";

//TEMPORARY

function signedIn() {
	return 1;
}


signedIn() ? $loggedIn = 'yes' : $loggedIn = 'no';

// echo $loggedIn;


// echo "<a href='./logout.php'>Log out</a>" : echo "Not signed in";

?>