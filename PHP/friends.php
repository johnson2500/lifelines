<?php
$user = 'root';
$password = 'root';
$db = 'lifelines';
$host = 'localhost:8889';


$conn = mysqli_connect($host, $user, $password, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM member";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row["uniqueID"] . ",";
    }
} else {
    echo "0 results";
}


$conn->close();
mysqli_close($conn);
