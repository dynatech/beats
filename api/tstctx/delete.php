<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tstc_transaction.php';

// instantiate database and tstc_transaction object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tstc_transaction = new tstc_transaction($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set ID property of test suite to be deleted
$tstc_transaction->id = (isset($data->id) ? $data->id : null);

if ($tstc_transaction->id == null) {
  echo json_encode(
    array("message" => "Unable to delete TSTC transaction entry. Missing input data.")
  );
} 
else {
	// delete the test suite
	if ($tstc_transaction->delete()) {
	  echo json_encode(
	    array("message" => "TSTC transaction was deleted.")
	  );
	} 
	else {
	  echo json_encode(
	    array("message" => "Unable to delete TSTC transaction.")
	  );
	}
}


?>