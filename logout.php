<?php

session_start();

if(isset($_GET['logout']))
{
	session_destroy();
	unset($_SESSION['username']);
	header("Location: index.php");
}

session_destroy();
?>