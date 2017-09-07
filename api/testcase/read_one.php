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
	$testcase->id = (isset($data->id) ? $data->id : null);
	if ($testcase->id) {
		// echo "with test case id: " . $testcase->id;
		$results = $testcase->readOne();
	} 
	else {
		die("No test case id");
	}
}
catch (Exception $e) {
	die("an exception has occurred");
}

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