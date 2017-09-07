<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testcase.php';

// instantiate database and testcase object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testcase = new testcase($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

try {
	$testcase->ts_id = (isset($data->ts_id) ? $data->ts_id : null);
	if ($testcase->ts_id) {
		// echo "with test suite id: " . $testcase->ts_id;
		$results = $testcase->readFromOneTestsuite();
	} 
	else {
		// echo "No test suite id";
		$results = $testcase->readAll();
	}
}
catch (Exception $e) {
	echo "an exception has occurred";
}

// query test_cases
$num = $results->num_rows;

// check if more than 0 record found
if ($num > 0) {
	// test_cases array
	$test_cases_arr = array();
	$test_cases_arr["records"] = array();

  while ($row = $results->fetch_assoc()) {
  	extract($row);
		$test_case_item = array(
			"tc_id" => $tc_id,
			"tc_name" => $tc_name,
			"tc_desc" => $tc_desc,
			"global_wait" => $global_wait,
			"steps" => json_decode($steps)
		);

		array_push($test_cases_arr["records"], $test_case_item);
  }

  echo json_encode($test_cases_arr);
} 
else {
  echo json_encode(
    array("message" => "No products found.")
  );
}


?>