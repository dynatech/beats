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

// set ID property of test suite to be deleted
$testcase->id = $data->id;

// delete the test suite
if ($testcase->delete()) {
  echo json_encode(
    array("message" => "Test Case was deleted.")
  );
} 
else {
  echo json_encode(
    array("message" => "Unable to delete Test Case.")
  );
}


?>