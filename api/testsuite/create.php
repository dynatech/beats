<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/testsuite.php';

// instantiate database and testsuite object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testsuite = new Testsuite($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set test suite property values
$testsuite->name = $data->name;
$testsuite->desc = $data->desc;

// create the test suite
if ($testsuite->create()) {
  echo json_encode(
    array("message" => "Test Suite was created.")
  );
} 
else {
  echo json_encode(
    array("message" => "Unable to create Test Suite.")
  );
}


?>