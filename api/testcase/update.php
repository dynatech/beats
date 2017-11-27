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

// set ID property of test suite to be edited
$testcase->id = $data->id;
$testcase->name = (isset($data->name) ? $data->name : null);
$testcase->desc = (isset($data->desc) ? $data->desc : null);
$testcase->global_wait = (isset($data->global_wait) ? $data->global_wait : null);
$testcase->steps = (isset($data->steps) ? $data->steps : null);

// update the test suite
if ($testcase->update()) {
  echo json_encode(
    array("message" => "Test Case was updated.")
  );
} 
else {
  echo json_encode(
    array("message" => "Unable to update Test Case or No update was done.")
  );
}


?>