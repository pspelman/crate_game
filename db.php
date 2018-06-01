<?php 

//INTERNAL, DEFAULT CONFIG, ACCESS TO THE OVERALL DB
$config = array(
	'username' => 'root',
	'password' => 'root',
	'database' => 'cratedb'
	);




function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
							//CONNECT TO THE DB WITH THIS FUNCTION
function connect($config) {
//function connect() {
//		$conn = new PDO('mysql:host=localhost; dbname=' . $config['database'],
    try {
//		$conn = new PDO('mysql:host=localhost;dbname=cratedb',
//
//			$config['username'],
//			$config['password']);

        $connection = new PDO('mysql:host=127.0.0.1;dbname='.$config['database'],$config['username'],$config['password']);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//        $conn = new PDO('mysql:host=localhost;dbname=crategame, root, root');
//        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//		$conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		// echo($config['database']);
		return $connection;
	} catch(Exception $e) {
        echo "error: " . $e;

        echo "there was an error connecting\r\n";

	return false;


	// $conn = mysqli_connect('localhost', $config['username'] , $config['password'] , $config['database']);

	// if ($conn->connect_errno) {
 //    	echo "Failed to connect to MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error;
	// } echo "Connected..." ;
	// return $conn;
	}

}



function insert($config, $conn, $query, $tableName) {
	connect($config);
	$db_select = mysqli_select_db($config['database']);



}



//$query is something like "SELECT * FROM users WHERE name = 'phil'"
//$bindings is something like $bindings = array( 'tag' => $tag );
//$conn is like new PDO('mysql:host=localhost; dbname=' . $config['database'],
			// $config['username'],
			// $config['password']);
function query($query, $bindings, $conn) {

	$stmt = $conn->prepare($query);
	$stmt->execute($bindings);
	return $stmt;
	// $results = $stmt->fetchAll();

	// return $results ? $results : false;

}

function update($query, $bindings, $conn) {
	$stmt = $conn->prepare($query);
	$stmt->execute($bindings);
	return $stmt;
}


function getAll($tableName, $conn)
{
	try {
		$result = $conn->query("SELECT * FROM " . $tableName);

		return ( $result->rowCount() > 0)
		? $result
		: false;
	} catch(Exception $e) {
		return false;
	}
}


function get($tableName, $conn, $limit = 10)
{
	try {
		$result = $conn->query("SELECT * FROM " . $tableName . " LIMIT " . $limit);

		return ( $result->rowCount() > 0)
		? $result
		: false;
	} catch(Exception $e) {
		return false;
	}
}

//ID IS SENT LAST AS THE BINDING

function get_by_id($seedlev, $conn)
{
	return query(
		'SELECT * FROM puzzles WHERE seedlev = :seedlev LIMIT 1',
		array('seedlev' => $seedlev), 			//THIS IS WHERE THE BINDING IS SENT TO THE FUNCTION
		$conn);

}



// $query = "SELECT * FROM $tableName WHERE id = $id";

	
// 	$stmt = $conn->prepare($query);
// 	$stmt->execute($bindings);

// 	$results = $stmt->fetchAll();

// 	return $results ? $results : false;




// 	if ($post) {
// 		return $post;
// 	} else {
// 		return false;
// 	}
// }

