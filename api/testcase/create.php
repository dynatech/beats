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

// instantiate database and testcase object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testcase = new testcase($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set test case property values
$testcase->name = $data->name;
$testcase->desc = $data->desc;
$testcase->global_wait = $data->global_wait;
$testcase->steps = $data->steps;

// $testcase->create();

// create the test Case
if ($testcase->create()) {
  echo json_encode(
    array("message" => "Test Case was created.")
  );
} 
else {
  echo json_encode(
    array("message" => "Unable to create Test Case.")
  );
}


?>