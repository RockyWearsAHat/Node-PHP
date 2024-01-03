<?php
include_once "./helpers/headers.inc.php";
include_once "./helpers/dbh.inc.php";

$actual_link =
  (empty($_SERVER["HTTPS"]) ? "http" : "https") .
  "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$sql =
  "INSERT INTO products (name, price, description) VALUES ('Smiley Beanie', 10.00, 'Testing description')";

$res = mysqli_query($conn, $sql);

// echo json_encode($res);
echo $actual_link;
?>
