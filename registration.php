<?php

require('gamereqs.php');

$dataArray = array();

// function test_input($data) {
//   $data = trim($data);
//   $data = stripslashes($data);
//   $data = htmlspecialchars($data);
//   return $data;
// }

//IDENTIFY THE TABLE TO BE USED WITH THE REG FORM!
$table = 'users';

//start with null variables
// $title = $post = "";
// $data = array('success', 0);
$tag = $email = $password = "";

//test the variables if the method was POST
	$tagErr = $emailErr = $passErr = "";



if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
	$tag = test_input($_POST['tag']);
	$email = test_input($_POST['email']);
	$password = test_input($_POST['password']);




//TEST THE INPUTS FOR ERRORS, CLEAN IT UP

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["tag"])) {
     $nameErr = "Gamer tag is required";
   } else {
     $tag = test_input($_POST["tag"]);
     // check if tag only contains letters and whitespace
     if (!preg_match("/^[a-zA-Z ]*$/",$tag)) {
       $nameErr = "Only letters and white space allowed"; 
     }
   }
   
   if (empty($_POST["email"])) {
     $emailErr = "Email is required";
   } else {
     $email = test_input($_POST["email"]);
     // check if e-mail address is well-formed
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Invalid email format"; 
     }
   }
}
     
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



//IF THE VARIABLES ARE EMPTY, DISPLAY ERROR TO FILL OUT ALL FIELDS
	if ( empty($tag) || empty($email) || empty($password) ) {
		$status = 'Please fill out ALL fields';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["tag"])) {
     $tagErr = "Gamer tag is required";
   } else {
     $tag = test_input($_POST["tag"]);
     // check if tag only contains letters and whitespace
     if (!preg_match("/^[a-zA-Z ]*$/",$tag)) {
       $tagErr = "Only letters and white space allowed"; 
     }
   }
   
   if (empty($_POST["email"])) {
     $emailErr = "Email is required";
   } 
   else 
   {
     $email = test_input($_POST["email"]);
     // check if e-mail address is well-formed
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Invalid email format"; 
     }
   }

  if (empty($_POST["password"])) {
     $passErr = "Password is required (at least 4 chars, including letters and numbers)";
   } 
   else 
   {
     $password = test_input($_POST["password"]);
     // check that password matches criteria
 	if(!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{4,20}$/', $password)) 
 	{
    	$passErr = 'the password does not meet the requirements!';
	}

 } 


$submit = 0;

if(!$tagErr & !$emailErr & !$passErr ) {
	$submit = 1;
}
	if($tagErr){
		echo $tagErr . "<br/>";
	}
	if($emailErr){
		echo $emailErr . "<br/>";
	}
	if($passErr){
		echo $passErr . "<br/>";
	}

}
	if(isset($tag) & !empty($tag)) 
		{
			$tag = $tag;
		};
	if( isset($email) & !empty($email)) 
		{
			$email = $email;
		};
	if( isset($password) & !empty($password))
		{ 
			$password = '';
		};
	} else {

		$submit = 1;
   		$query = "INSERT into users(tag, email, password) VALUES(:tag, :email, :password)";
		$bindings = array(
			// 'table' => $table,
			'tag' => $tag,
			'email' => $email,
			'password' => md5($password)
			);

try {
	query($query, $bindings, $conn);	
	$status = 'Registration was successful!';
	echo $status;
	header('Location: success.php');
	die();
		// $prep->execute($values);
   // do other things if successfully inserted
} catch (PDOException $e) {
   if ($e->errorInfo[1] == 1062) {
      // duplicate entry, do something else
   	echo 'DUPLICATE EMAIL';
   	$status = "FAIL";
   	$submit = 0;
   } else {
      // an error other than duplicate entry occurred
   	echo 'SOME OTHER ERROR OCCURRED';
   	$status = "FAIL";
   	$submit = 0;
   }
}
		//ADD THE RECORD TO THE DB

		

	// $returnstmt = query($query, $bindings, $conn);	

	// var_dump($returnstmt);


	// $status = 'Registration was successful!';
			// $stmt = $conn->prepare($query);
	// $stmt->execute($bindings);

}




		echo "<br/>" . (boolval($submit)? 'true' : 'false') . "<br/>";

//IF REG IS SUCCESSFUL
		// echo $status;


	// echo '<br/>The tag: ' . $tag . ' <br/>The email: ' . $email;
	}

// if($data['success'] = 1) {
// 	$tag = 'TAG';
// 	$email = 'E-MAIL';
// 	$password = '';
// }

$dataArray = array(
	'tag' => $tag,
	'email' => $email,
	'password' => $password,
	'status' => ""
);

view('registration', $dataArray);

	// if ( empty($body) ) {
	// 	$issues . 'Body issue <br/>';
	// }





// define variables and set to empty values
// $name = $email = $gender = $comment = $website = "";


// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// 	$title = test_input($_POST['title']);
// 	$body = test_input($_POST['body']);
//   // $name = test_input($_POST["name"]);
//   // $email = test_input($_POST["email"]);
//   // $website = test_input($_POST["website"]);
//   // $comment = test_input($_POST["comment"]);
//   // $gender = test_input($_POST["gender"]);
// }


