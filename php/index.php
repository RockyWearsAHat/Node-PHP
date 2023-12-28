<?php
include_once "./helpers/headers.inc.php";
include_once "./helpers/dbh.inc.php";

// $sql = "INSERT INTO users (name) VALUES ('Alex')";
// $result = mysqli_query($conn, $sql);

$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);
while ($row = $result->fetch_assoc()) {
  echo $row["id"] . ", " . $row["name"] . "<br/>";
}
?>
