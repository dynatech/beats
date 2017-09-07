<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testcase.php';
include_once '../objects/tstc_transaction.php';

// instantiate database and testcase object
$database = new Database();
$db = $database->getConnection();

// initialize objects
$testcase = new Testcase($db);
$tstc_transaction = new Tstc_transaction($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set test suite id value
if ($data->ts_id != null) {
	$tstc_transaction->ts_id = $data->ts_id;
}
else {
	die("Failed: No Test Suite ID");
}

// set test case property values
$testcase->name = $data->name;
$testcase->desc = $data->desc;
$testcase->global_wait = $data->global_wait;
$testcase->steps = $data->steps;

// $testcase->create();

// create the test Case
if ($last_id = $testcase->create()) {
	$message = "Test Case was created. Insert ID = " . $last_id;

	// set test case id value from last insert
	$tstc_transaction->tc_id = $last_id;

	// create TSTC transaction table
	if ($tstc_transaction->create()) {
	  echo json_encode(
	    array("message" => $message)
	  );
	}
	else {
	  echo json_encode(
	    array("message" => "Created Test Case but failed to create TSTC transaction entry.")
	  );
	}
} 
else {
  echo json_encode(
    array("message" => "Unable to create Test Case.")
  );
}


?>