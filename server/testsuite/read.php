<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testsuite.php';

// instantiate database and testsuite object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testsuite = new Testsuite($db);

// query test_suites
$results = $testsuite->read();
$num = $results->num_rows;

// check if more than 0 record found
if ($num > 0) {
	// test_suites array
	$test_suites_arr = array();
	$test_suites_arr["records"] = array();

  while ($row = $results->fetch_assoc()) {
  	extract($row);
		$test_suite_item = array(
			"ts_id" => $ts_id,
			"ts_name" => $ts_name,
			"ts_desc" => $ts_desc
		);

		array_push($test_suites_arr["records"], $test_suite_item);
  }

  echo json_encode($test_suites_arr);
} 
else {
  echo json_encode(
    array("message" => "No products found.")
  );
}


?>