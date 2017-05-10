<?php

$firstName = "";
$lastName = "";

if ($_POST['lastName'] !== "") {
    $firstName  = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
}
$user = 'root';
$password = 'root';
$db = 'test';
$host = 'localhost:8889';


$conn = mysqli_connect($host, $user, $password, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT u_id, first_name, last_name FROM test";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while ($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["u_id"]. " - Name: " . $row["first_name"]. " " . $row["last_name"]. "<br>";
    }
} else {
    echo "0 results";
}
// creating new Table Entries 
if ($_POST['friend'] != '') {
    $lifeline = $_POST['lifeLine'];
    $friend = $_POST['friend'];
    $from = $_POST['from'];
    $sql = "INSERT INTO life_lines (life_line, sent_to, sent_from)
    VALUES ('$lifeline', '$friend','$from')";
    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

if ($_POST['activeUser'] !='') {
    echo "hey";
    $name = $_POST['activeUser'];
    $conn = mysqli_connect($host, $user, $password, $db);
    $sql = "SELECT * FROM lifelines WHERE sent_to = '$name'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
    // output data of each row
        while ($row = mysqli_fetch_assoc($result)) {
            echo "{ lifeline : " . $row['life_line'];
        }
    } else {
        echo "0 results";
    }
}

$conn->close();
mysqli_close($conn);
