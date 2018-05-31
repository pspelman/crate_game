<?php
require 'gamereqs.php';
if(session_status() == PHP_SESSION_NONE) {
	session_start();
};

// var_dump($_POST);

if(isset($_SESSION['user'])!="")
{
	header("Location: index.php");
}

if(isset($_POST['button-login']))				//SCREEN THE CREDENTIALS
{
	$email = test_input($_POST['email']);
	$password = test_input($_POST['password']);
	$query = "SELECT * FROM users WHERE email='$email'";
	//Expecting email and password to log in
	$bindings = array(
		'email' => $email,
		'password' => $password);


												//SEND THE QUERY, SAVE THE RESULT AS $result_row
	// $result_row = query($query, $bindings, $conn) -> fetchAll();
	$result_row = query($query, $bindings, $conn) -> fetch(PDO::FETCH_ASSOC);

	// $result_pass = $result_row['password'];
	// echo $result_pass;

	// echo "<br/>results:";
	// // var_dump($result_row);
	// echo "<pre>";

//IF THE EMAIL IS NOT IN THE SYSTEM
	if(!$result_row) {
		$credentialError = 1;
						//VIEW LOGIN SCREEN AND SEND ERROR
	view('login2',array($credentialError));	// echo "No such email exists";
	} 

												//EMAIL EXISTS, MOVE ON TO CHECK PASSWORD

//IF THE PASSWORD IS CORRECT
	if(md5($password) == $result_row['password']) {
		echo "LOGIN SUCCESSFUL";


		//LOGIN + SET THE SESSION
		$_SESSION['username'] = $result_row['tag'];
		header("Location: index.php");
		
	}; 
//IF THE PASSWORD IS INCORRECT
	if(!(md5($password) == $result_row['password'])) {
			echo "<script> alert('Incorrect email or password'); </script>" ;


			//header("Location: index.php");
	}		

	// else {
	// 	header("Location: login2.php");
	// 	echo "INCORRECT PASSWORD<br/>";
	// 	echo "Password = ".$password;
	// 	echo "<br/>Result_row password = " . result_row['password'];
	// 	// header("Location: index.php");
	// }

	//print_r($result_row);
	echo "</pre>";
}


// if ( $_SERVER['REQUEST_METHOD' ] == 'POST' ) {
// 	echo '<br/>posted';
// }

// echo "<br/>attempt to login";

?>
