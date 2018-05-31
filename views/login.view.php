<?php 
	if(isset($credentialError)) {
		echo 'There was an error in the username or password';
	};
?>
<form name="loginForm" method="POST" action="./login.php" class="navLoginForm">

<li>
	<label for="email"></label>E-mail:<input type="text" name="email" id="email" >
</li>

<li>
	<label for="password"></label>Password:<input type="password" name="password" id="password" >
</li>

<li>
	<input type="submit" value="Login" class="navSubmit" id="navSubmit" name="button-login">
</li>

</form>