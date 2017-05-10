<?php

$user = 'root';
$password = 'root';
$db = 'lifelines';
$host = 'localhost:8889';

$conn = mysqli_connect($host, $user, $password, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
if ($_POST['activeUser'] !='') {
    $active_User = $_POST['activeUser'];
}

$sql = "SELECT * FROM lifeLines WHERE sentTo = '$active_User'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
	$counter = 1;
	echo '[';
    while ($row = mysqli_fetch_assoc($result)) {
        $obj = array( "recordID"=>$row['recordID'],"date"=>$row['date'] , "ownerUniqueID"=>$row['ownerUniqueID'] , "content"=> $row['content'] ,"sentTo"=>$row['sentTo'] ,"responseFlag"=>$row['responseFlag'] , "response"=>$row['response'], "active"=>$row['active'] ,"posVotes"=>$row['posVotes'], "negVotes"=>$row['negVotes']);
			echo json_encode($obj);
			if ($counter != mysqli_num_rows($result)){
				echo ",";
			}
			$counter++;
    }
} else {
        echo "0 results";
}
echo "]";

$conn->close();
mysqli_close($conn);
