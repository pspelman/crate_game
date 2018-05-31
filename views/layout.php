<?php

if(session_status() == PHP_SESSION_NONE) {
	session_start();
};
isset($_SESSION['username']) ? $username = $_SESSION['username'] : $username = "guest";
?>
<!DOCTYPE html>
<html>
	<head>

		<title></title>

		<style>
/*			.container { width: 100%; margin: auto;}
			form ul {padding: 0;}
			form li {list-style: none;}
			.body {width: auto; margin: auto; }
			form input[type = text], form textarea { width: 50%; margin-bottom: 0em; }
			form textarea {width: 100%; height: 300px; }
			label { display: block;}*/
		</style>
<?php include('navbar.view.php') ?>

<!-- 	<body> -->
<!-- <div class="navbar">NAVIGATION</div>
 --><!-- in here I can load the necessary view, I will then echo the content that I pass  -->
<div id="bodyContent" class="bodyContent">
<?php include($path); ?>
</div>

	</body>
</html>