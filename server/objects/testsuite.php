<?php
class Testsuite {

	// database connection and table name
	private $conn;
	private $table_name = "test_suites";

	// object properties
	public $ts_id;
	public $ts_name;
	public $ts_desc;

	// constructor with $db as database connection
	public function __construct($db) {
		$this->conn = $db;
	}

	public function read() {
		// echo "Read Test Suites table \n";
		$query = "SELECT * FROM " . $this->table_name;
		$result = $this->conn->query($query);
		
		return $result;
	}
}