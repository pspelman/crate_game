<?php


isset($_SESSION['username']) ? $loglink = '"logout.php?logout">Sign out</a>' : $loglink = '"login2.php">Login</a>' ;

?>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div id="navbar" name="navbar">
	<div id="navLeft">
		<div id="navProfileView">
		<?php include('user_profile.view.php'); ?>
		<br/><a href="./index.php">Home</a> || <a href=<?=$loglink ?>
		</div> 
	</div>


	<div id="navRight">
		<div id="navLoginDiv">
			<?php include('login.view.php') ?>
		</div>
		<div id="navRegisterDiv">
			<a href="registration.php" >Register here</a> to access additional features!

		</div>	
	</div>
</div>