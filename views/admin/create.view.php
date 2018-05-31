<h1>Registeration</h1>
<form method="post" action = "<?php $_SERVER['PHP_SELF']; ?>" >

<?php 
//IF THERE IS AN ERROR, THEN PUT THE STUFF BACK WHERE IT WAS, OTHERWISE IT SHOULD CLEAR
	if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
		$title = test_input($_POST['title']);
		$body = test_input($_POST['body']);
};
?>

	<ul>
		<label for="tag">tag:</label>
		<input type="text" name="tag" id="tag" value="<?php
	if( isset($tag) & !empty($tag)) { 
			print $tag;};		
?>">
	</ul>
	<ul>
		<label for="password">tag:</label>
		<input type="password" name="password" id="password">
	</ul>
	<ul>
		<label for="tag">tag:</label>
		<input type="text" name="tag" id="tag" value="<?php
	if( isset($tag) & !empty($tag)) { 
			print $tag;};		
?>">
	</ul>		

		<input type="submit" value="Create Post" >
	</ul>

</form>
