<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testsuite.php';
include_once '../objects/testcase.php';

// instantiate database and testsuite object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testsuite = new Testsuite($db);
$testcase = new testcase($db);

// get posted data ONLY
$data = json_decode(file_get_contents("php://input"));

$results = null;
try {
	$testsuite->id = (isset($data->id) ? $data->id : null);

	if ($testsuite->id) {
		detailedView($testsuite, $testcase);
	}
	else {
		$results = $testsuite->read();
		listView($results);
	}
}
catch (Exception $e) {
	die("an exception has occurred");
}

function listView($results) {
	$num = $results->num_rows;

	// check if more than 0 record found
	if ($num > 0) {
		// test_suites array
		$test_suites_arr = array();
		$test_suites_arr["testsuites"] = array();

	  while ($row = $results->fetch_assoc()) {
	  	extract($row);
			$test_suite_item = array(
				"ts_id" => $ts_id,
				"ts_name" => $ts_name,
				"ts_desc" => $ts_desc,
				"numTestCases" => $numTestCases
			);

			array_push($test_suites_arr["testsuites"], $test_suite_item);
	  }

	  echo json_encode($test_suites_arr);
	} 
	else {
	  echo json_encode(
	    array("message" => "No testsuites found.")
	  );
	}
}

function detailedView($testsuite, $testcase) {
	$testsuite->readOne();

	// test_suites array
	$test_suites_arr = array();
	$test_suites_arr["testsuites"] = array();

	// test_cases array
	$test_cases_arr = array();

	// get all testcases for the test suite
	$testcase->ts_id = $testsuite->id;
	$results = $testcase->readFromOneTestsuite();

	// check if more than 0 record found
	if ($results) {
	  while ($row = $results->fetch_assoc()) {
	  	extract($row);
			$test_case_item = array(
				"tc_id" => $tc_id,
				"tc_name" => $tc_name
			);

			array_push($test_cases_arr, $test_case_item);
	  }
	} 

	$test_suite_item = array(
		"ts_id" => $testsuite->id,
		"ts_name" => $testsuite->name,
		"ts_desc" => $testsuite->desc,
		"testcases" => $test_cases_arr
	);

	array_push($test_suites_arr["testsuites"], $test_suite_item);
	echo json_encode($test_suites_arr);
}


?>