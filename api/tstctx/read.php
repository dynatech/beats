<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/tstc_transaction.php';

// instantiate database and tstc_transaction object
$database = new Database();
$db = $database->getConnection();

// initialize object
$tstc_transaction = new tstc_transaction($db);

// get posted data ONLY
$data = json_decode(file_get_contents("php://input"));

try {
	$tstc_transaction->ts_id = (isset($data->ts_id) ? $data->ts_id : null);
	$tstc_transaction->id = (isset($data->id) ? $data->id : null);

	if ($tstc_transaction->ts_id) {
		$results = $tstc_transaction->readFromOneTestSuite();
		listView($results);
	}
	elseif ($tstc_transaction->id) {
		$results = $tstc_transaction->readOne();
		detailedView($results);
	}
	else {
		$results = $tstc_transaction->readAll();
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
		// test_cases array
		$tstctx_arr = array();
		$tstctx_arr["tstc_transactions"] = array();

	  while ($row = $results->fetch_assoc()) {
	  	extract($row);
			$tstctx_item = array(
				"id" => $id,
				"ts_id" => $ts_id,
				"tc_id" => $tc_id
			);

			array_push($tstctx_arr["tstc_transactions"], $tstctx_item);
	  }

	  echo json_encode($tstctx_arr);
	} 
	else {
	  echo json_encode(
	    array("message" => "No test suite - test case transactions found.")
	  );
	}
}

function detailedView($results) {
	$num = $results->num_rows;

	// check if more than 0 record found
	if ($num > 0) {
		// test_cases array
		$tstctx_arr = array();
		$tstctx_arr["tstc_transactions"] = array();

	  while ($row = $results->fetch_assoc()) {
	  	extract($row);
			$tstctx_item = array(
				"id" => $id,
				"ts_id" => $ts_id,
				"tc_id" => $tc_id
			);

			array_push($tstctx_arr["tstc_transactions"], $tstctx_item);
	  }

	  echo json_encode($tstctx_arr);
	} 
	else {
	  echo json_encode(
	    array("message" => "No test suite - test case transactions found.")
	  );
	}
}

?>