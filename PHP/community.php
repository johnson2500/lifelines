<?php
$user = 'root';
$password = 'root';
$db = 'lifelines';
$host = 'localhost:3036';


$conn = mysqli_connect($host, $user, $password, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM Encouragement";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
			$counter = 1;
			echo '[';
			while ($row = mysqli_fetch_assoc($result)) {
				$obj = array( "recordID"=>$row['recordID'],"date"=>$row['date'] , 	"ownerUniqueID"=>$row['ownerUniqueID'] , "content"=> $row['content'] ,"active"=>$row['active'] ,"posVotes"=>$row['posVotes'], "negVotes"=>$row['negVotes']);
				echo json_encode($obj);
				if ($counter != mysqli_num_rows($result)){
					echo ",";
				}
				$counter++;
			}
	echo "]";
} else {
	echo "0";
}

if ($_POST['recordID'] !='') {
    $recordID = $_POST['recordID'];
    $date = $_POST['date'];
    $owner = $_POST['ownerUniqueID'];
    $content = $_POST['content'];
    $active = $_POST['active'];
    $posVotes = $_POST['posVotes'];
    $negVotes = $_POST['negVotes'];

    $conn = mysqli_connect($host, $user, $password, $db);
    $sql = "INSERT INTO Encouragement (recordID,date,ownerUniqueID,content,active,posVotes,negVotes) Values ('$recordID','$date','$owner','$content','$active','$posVotes','$negVotes')";
    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
