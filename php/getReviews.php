<?php
include_once "./helpers/headers.inc.php";
include_once "./helpers/dbh.inc.php";

$productId;
$sql;
if (isset($_GET["productId"])) {
  $productId = $_GET["productId"];

  //Again vunerable to injection
  $sql = "SELECT * FROM productreviewlinks WHERE productId=" . $productId . ";";
} else {
  $productName = $_GET["productName"];
  $sql = "SELECT (id) FROM products WHERE name=\"" . $productName . "\";";
  $res = mysqli_query($conn, $sql);
  while ($row = $res->fetch_assoc()) {
    $productId = $row["id"];
  }
  //Again vunerable to injection
  $sql = "SELECT * FROM productreviewlinks WHERE productId=" . $productId . ";";
}
$res = mysqli_query($conn, $sql);

$rtn = "{";

$reviewTotal = 0;
$reviewCount = 0;

$rtn .= "\"reviews\":[";
while ($row = $res->fetch_assoc()) {
  $sql = "SELECT * FROM reviews WHERE reviewId=" . $row["reviewId"] . ";";
  $res2 = mysqli_query($conn, $sql);

  while ($row2 = $res2->fetch_assoc()) {
    $reviewTotal += $row2["rating"];
    $reviewCount++;

    $rtn .= "{\"user\":\"" . $row2["username"] . "\",";
    $rtn .= "\"rating\":" . $row2["rating"] . ",";
    $rtn .= "\"images\":\"" . $row2["imageLinks"] . "\",";
    $rtn .= "\"verified\":" . $row2["verifiedPurchase"] . "},";
  }
}

if (substr($rtn, -1) == ",") {
  $rtn = substr($rtn, 0, strlen($rtn) - 1);
}

$rtn .= "],";

$rtn .= "\"reviewAvg\"" . ":" . bcdiv($reviewTotal, $reviewCount, 2) . ",";

if (substr($rtn, -1) == ",") {
  $rtn = substr($rtn, 0, strlen($rtn) - 1);
}
$rtn .= "}";

echo json_encode($rtn);
?>
