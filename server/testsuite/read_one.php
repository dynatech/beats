<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/testsuite.php';

// instantiate database and testsuite object
$database = new Database();
$db = $database->getConnection();

// initialize object
$testsuite = new Testsuite($db);

// set ID property of test suite to be edited
$testsuite->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of test suite to be edited
$testsuite->readOne();

// create array
$testsuite_arr = array(
	"id" => $testsuite->id,
	"name" => $testsuite->name,
	"desc" => $testsuite->desc
);

// make it json format
print_r(json_encode($testsuite_arr));


?>