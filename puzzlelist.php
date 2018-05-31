<?php

require 'gamereqs.php';



				//BECOME AWARE OF THE PAGE NUMBER
if(isset($_GET['page'])) {
	$page = preg_replace("#[^0-9]#","",$_GET['page']);	
} else {
	$page = 1;
};


		//SELECT ALL THE PUZZLES TO COUNT THEM
$query = "SELECT COUNT(seedlev) FROM puzzles";
$stmt = $conn->prepare($query);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_NUM);
$count = $result[0];

// echo "Number of puzzles: " . $count . "<br/>";
// echo is_numeric($count);
$count = $count+0;
// echo $countMath;

			//HOW MANY PUZZLES PER PAGE
$resultsPerPage = 6;
			//CALCULATE NUMBER OF PAGES NEEDED
$lastPage = ceil($count/$resultsPerPage);
//echo "Page: ".$page."<br/>";
//echo "resultsPerPage: ".$resultsPerPage."<br/>";
$resultsLeft = ($count - ($page * $resultsPerPage));
//echo "Number of puzzles left to display: " . $resultsLeft."<br/>";

// echo "you will have " .$lastPage. " pages<br/>";
// echo "with " . $resultsPerPage. " results per page<br/>";




				//DONT LET PAGE NUMBER GO BELOW 1
if($page<1) {
	$page = 1;
} else if ($page > $lastPage) {
	$page = $lastPage;
};

$pagination="";
		//IF there is MORE than 1 page of results
if($lastPage != 1) {
	if($page != 1) {
		$prev = $page - 1;
		$pagination .= " | <a href='puzzlelist.php?page=". $prev ."''>Previous</a> | ";
	}
	if($page != $lastPage) {
		$nextPage = $page+1;
		// echo "next page = " . $nextPage . "<br/>";
		$pagination .= " | <a href='puzzlelist.php?page=". $nextPage ."'>Next</a> | ";
	};
}

// echo "CURRENT PAGE: ". $page. " <br/>";



// echo "pagination: <br/>";
// echo($pagination);
// echo "<br/>";
if($page == 1) {
	$startQuery = 0;
} else if ($page != $lastPage) {
	$startQuery = ($page-1)*$resultsPerPage;
	// echo("startQuery = ".$startQuery."<br/>");
} else if($page == $lastPage) {
	$startQuery = ($page-1)*$resultsPerPage;
	$resultsLeft = ($count - (($page-1) * $resultsPerPage));
	// echo "Number of puzzles left to display: " . $resultsLeft;
	$resultsPerPage = $resultsLeft;
	
	// $count = $count - (($lastPage - 1)*$resultsPerPage);
} 




try {
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$query = $conn->query('SELECT * FROM puzzles LIMIT '. $startQuery.','. $resultsPerPage);

	while($row = $query->fetch(PDO::FETCH_ASSOC)) {
		$results[] = $row;

	}

// echo("<pre>");
// 	print_r($results);

} catch(PDOException $e) {
	echo 'ERROR: '. $e->getMessage();
}


// 	//THIS GOES INTO THE QUERY
// $limit = "LIMIT " . ($page-1)*$perPage . ",$perPage";


// 		//SET UP THE QUERY FOR THE CURRENT PAGE
// $query = "SELECT seedlev FROM users ORDER BY seedlev DESC $limit";


// while($row = mysql_fetch_array($query)) {
// 	$output.=$row['puzname'].'<hr/>';
// }




// $puzzles = getAll('puzzles', $conn);

// //SELECT ALL THE PUZZLES TO COUNT THEM
// $query = "SELECT COUNT(seedlev) FROM puzzles LIMIT ". $limit;
// $stmt = $conn->prepare($query);
// $stmt->execute();

// $result = $stmt->fetch(PDO::FETCH_NUM);


// // $countArray = getAll('puzzles', $conn) -> fetch(PDO::FETCH_ASSOC);

// // $count = $stmt->fetchALL(PDO::FETCH_OBJ);

// // var_dump($countArray);
// // var_dump($stmt);
// // print_r($result[0]);
// // echo("<script>alert('number of rows = '".var_dump($count).");</script>");



view('puzzlelist', array(
	'puzzles' => $results,
	'pagination' => $pagination,
	'page' => $page,
	'lastPage' => $lastPage)
	);

?>