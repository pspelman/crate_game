<?php
// if( $_SERVER['REQUEST_METHOD'] === 'POST' ) 
// 	{
// 	$tag = test_input($_POST['tag']);
// 	$email = test_input($_POST['email']);
// 	$password = test_input($_POST['password']);
// 	} else 
// 	{
// 		$tag = "";
// 		$email = "";
// 		$password = "";
// 	}

//Extract the variables passed from the controller
!isset($tag) ? $tag = "" : $tag=$tag;
!isset($email) ? $email = "" : $email = $email;
!isset($password) ? $password = "" : $password = "";


extract($data);
	$tag = $tag;
	$email = $email;
	$password = $password;

	// $tagErr = $emailErr = $passErr = "";


// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    if (empty($_POST["tag"])) {
//      $tagErr = "Gamer tag is required";
//    } else {
//      $tag = test_input($_POST["tag"]);
//      // check if tag only contains letters and whitespace
//      if (!preg_match("/^[a-zA-Z ]*$/",$tag)) {
//        $tagErr = "Only letters and white space allowed"; 
//      }
//    }
   
//    if (empty($_POST["email"])) {
//      $emailErr = "Email is required";
//    } 
//    else 
//    {
//      $email = test_input($_POST["email"]);
//      // check if e-mail address is well-formed
//      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//        $emailErr = "Invalid email format"; 
//      }
//    }

//   if (empty($_POST["password"])) {
//      $passErr = "password is required";
//    } 
//    else 
//    {
//      $password = test_input($_POST["password"]);
//      // check that password matches criteria
//  	if(!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{4,20}$/', $password)) 
//  	{
//     	$passErr = 'the password does not meet the requirements!';
// 	}

//  } 


// 	if($tagErr){
// 		echo $tagErr . "<br/>";
// 	}
// 	if($emailErr){
// 		echo $emailErr . "<br/>";
// 	}
// 	if($passErr){
// 		echo $passErr . "<br/>";
// 	}

// }

	 	






     
//    if (empty($_POST["website"])) {
//      $website = "";
//    } else {
//      $website = test_input($_POST["website"]);
//      // check if URL address syntax is valid (this regular expression also allows dashes in the URL)
//      if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)) {
//        $websiteErr = "Invalid URL"; 
//      }
//    }

//    if (empty($_POST["comment"])) {
//      $comment = "";
//    } else {
//      $comment = test_input($_POST["comment"]);
//    }

//    if (empty($_POST["gender"])) {
//      $genderErr = "Gender is required";
//    } else {
//      $gender = test_input($_POST["gender"]);
//    }
// }
 /* 
require('registration.php');

//test the variables if the method was POST
if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
	$tag = test_input($_POST['tag']);
	$email = test_input($_POST['email']);
	$password = test_input($_POST['password']);
}
if($data['success'] = 1) {
	$tag = 'TAG';
	$email = 'E-MAIL';
	$password = '';
} 

COMMENTED OUT BECAUSE THIS IS LOGIC AND SHOULD BE IN THE MAIN REGISTRATION FILE
*/ 
?>

<h1>Registration</h1>

<form method="post" action = "<?php echo htmlentities('registration.php'); ?>" >

	<ul>
		<li>
		<label for="tag"></label>Gamer Tag: <input type="text" name="tag" id="tag" value="<?= $tag ?>">
		</li>
	</ul>
	<ul>
		<label for="email"></label>E-mail: <input type="text" name="email" id="email" value="<?php
	if( isset($email) & !empty($email)) { 
			print $email;};		
?>">
	</ul>		
	<ul>
		<li><label for="password"></label>Password: <input type="password" name="password" id="password"></li>
	</ul>
		<input type="submit" value="Register" >
	</ul>

</form>
<br/>
<a href="./index.php">Back</a>