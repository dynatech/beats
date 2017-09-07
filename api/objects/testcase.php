<?php
class Testcase {

	// database connection and table name
	private $conn;
	private $table_name = "test_cases";

	// object properties
	public $ts_id;
	public $id;
	public $name;
	public $desc;
	public $global_wait;
	public $steps;

	// constructor with $db as database connection
	public function __construct($db) {
		$this->conn = $db;
	}

	public function readAll() {
		// echo "Read Test Cases table \n";
		$query = "SELECT * FROM " . $this->table_name;
		$result = $this->conn->query($query);

		return $result;
	}

	// Used when viewing only one test suite or for updating
	public function readFromOneTestsuite() {
		// read records from one test suite
		$query = "SELECT tc.tc_id, tc.tc_name, tc.tc_desc, tc.global_wait, tc.steps" .
						" FROM tstc_transactions as tx" . 
						" INNER JOIN test_cases as tc" . 
						" ON tx.tc_id = tc.tc_id" . 
						" WHERE tx.ts_id=" . $this->ts_id . 
						" ORDER BY tc.tc_id";
		$result = $this->conn->query($query);

		return $result;
	}

	public function create() {
		$query = "INSERT INTO " . $this->table_name . " SET tc_name=?, tc_desc=?, global_wait=?, steps=?";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->desc = htmlspecialchars(strip_tags($this->desc));
		$this->global_wait = htmlspecialchars(strip_tags($this->global_wait));
		$this->steps = json_encode($this->steps);

		// bind values
		$stmt->bind_param('ssis', $this->name, $this->desc, $this->global_wait, $this->steps);

		// execute query
		if($stmt->execute()){
			return $stmt->insert_id;
		}
		else{
			return false;
		}
	}

	// public function update() {
	// 	// update query
	// 	$query = "UPDATE " . $this->table_name . " SET ts_name=?, ts_desc=? WHERE ts_id=? LIMIT 1";

	// 	// prepare query
	// 	$stmt = $this->conn->stmt_init();
	// 	$stmt = $this->conn->prepare($query);

	// 	// sanitize
	// 	$this->id = htmlspecialchars(strip_tags($this->id));
	// 	$this->name = htmlspecialchars(strip_tags($this->name));
	// 	$this->desc = htmlspecialchars(strip_tags($this->desc));

	// 	// bind values
	// 	$stmt->bind_param('ssi', $this->name, $this->desc, $this->id);

 //    // execute query
 //    if($stmt->execute()){
 //      return true;
 //    }
 //    else{
 //      return false;
 //    }
	// }

	// public function delete() {
	// 	// delete query
	// 	$query = "DELETE FROM " . $this->table_name . " WHERE ts_id=?";

	// 	// prepare query
	// 	$stmt = $this->conn->stmt_init();
	// 	$stmt = $this->conn->prepare($query);

	// 	// sanitize
	// 	$this->id = htmlspecialchars(strip_tags($this->id));

	// 	// bind values
	// 	$stmt->bind_param('i', $this->id);

	// 	// execute query
 //    if($stmt->execute()){
 //      return true;
 //    }
 //    else{
 //      return false;
 //    }
	// }
}