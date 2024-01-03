<?php
include_once "./helpers/headers.inc.php";
if (!isset($_GET["product"])) {
} else {
  include_once "./helpers/dbh.inc.php";

  //VUNERABLE TO INJECTION, MUST CHECK PRODUCT NAME BEFORE RUNNING
  $sql = "SELECT * FROM products WHERE name='" . $_GET["product"] . "';";

  $rtn = "{";
  $res = mysqli_query($conn, $sql);
  while ($row = $res->fetch_assoc()) {
    $i = 0;
    foreach ($row as $val) {
      $valIsNum = preg_match("/^[0-9]*$/", $val);
      $valIsArray = preg_match("/^\[/", $val);
      if (!$valIsNum && !$valIsArray) {
        $rtn .=
          "\"" .
          mysqli_fetch_field_direct($res, $i)->name .
          "\"" .
          ":\"" .
          $val .
          "\",";
      } else {
        $rtn .=
          "\"" .
          mysqli_fetch_field_direct($res, $i)->name .
          "\"" .
          ":" .
          $val .
          ",";
      }
      $i++;
    }
    if (substr($rtn, -1) == ",") {
      $rtn = substr($rtn, 0, strlen($rtn) - 1);
    }
  }
  $rtn .= "}";
}
if ($rtn == "{}") {
  // echo json_encode("{\"error\":1}");
  echo "{\"error\":1}";
} else {
  // echo json_encode($rtn);
  echo $rtn;
}

// $rtn = [];
// if (isset()) {
//   $rtn["productPrice"] = $res . price;
// }
// $rtn["productName"] = "Smiley Beanie";
// $rtn["productDescription"] = "123 abc this shit simple fuckin watch me";

// echo json_encode($rtn);

?>
