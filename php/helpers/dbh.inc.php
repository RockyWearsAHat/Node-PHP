<?php
$dbServername = "127.0.0.1";
$dbUsername = "root";
$dbPassword = "";
$dbName = "tysma";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_errno) {
  echo "Failed to connect to MySQL: " . $conn->connect_error;
  exit();
}
?>
