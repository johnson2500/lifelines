<?php
$user = 'root';
$password = 'root';
$db = 'lifelines';
$host = 'localhost:8889';

$conn = mysqli_connect($host, $user, $password, $db);

if ($_POST['get'] != '') {
	$name = $_POST['get'];
	$sql = "SELECT * FROM lifeLines WHERE ownerUniqueID = '$name'";
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
}

//this will send the post

if ($_POST['recordID'] != '') {
    $recordID = $_POST['recordID'];
    $date = $_POST['date'];
    $owner= $_POST['ownerUniqueID'];
    $content = $_POST['content'];
    $sentTo = $_POST['sentTo'];
    $responseFlag = $_POST['reponseFlag'];
    $response = $_POST['response'];
    $active = $_POST['active'];
    $posVotes = $_POST['posVotes'];
    $negVotes = $_POST['negVotes'];

    $sql = "INSERT INTO lifeLines (recordID, date, ownerUniqueID,content,sentTo,responseFlag,response,active,posVotes,negVotes)
    VALUES ('$recordID','$date','$owner','$content','$sentTo','$responseFlag','$response','$active','$posVotes','$negVotes')";
    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
mysqli_close($conn);
