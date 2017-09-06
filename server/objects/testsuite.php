<?php
class Testsuite {

	// database connection and table name
	private $conn;
	private $table_name = "test_suites";

	// object properties
	public $id;
	public $name;
	public $desc;

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

	public function create() {
		// echo "Create a Test Suite entry \n";
		$query = "INSERT INTO " . $this->table_name . " SET ts_name=?, ts_desc=?";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->desc = htmlspecialchars(strip_tags($this->desc));

		// bind values
		$stmt->bind_param('ss', $this->name, $this->desc);

    // execute query
    if($stmt->execute()){
      return true;
    }
    else{
      return false;
    }
	}

	// Used when viewing only one test suite or for updating
	public function readOne() {
		// read single record
		$query = "SELECT ts_id, ts_name, ts_desc FROM " . $this->table_name . " WHERE ts_id=? LIMIT 1";
		// echo "$query";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		//bind id of test suite to be updated
		$stmt->bind_param("i", $this->id);

		// execute query
		$stmt->execute();
		// bind result variables
		$stmt->bind_result($ts_id, $ts_name, $ts_desc);
		// fetch row
		$stmt->fetch();

		// set values to object properties
		$this->id = $ts_id;
		$this->name = $ts_name;
		$this->desc = $ts_desc;
	}

	public function update() {
		// update query
		$query = "UPDATE " . $this->table_name . " SET ts_name=?, ts_desc=? WHERE ts_id=? LIMIT 1";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->desc = htmlspecialchars(strip_tags($this->desc));

		// bind values
		$stmt->bind_param('ssi', $this->name, $this->desc, $this->id);

    // execute query
    if($stmt->execute()){
      return true;
    }
    else{
      return false;
    }
	}

	public function delete() {
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE ts_id=?";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));

		// bind values
		$stmt->bind_param('i', $this->id);

		// execute query
    if($stmt->execute()){
      return true;
    }
    else{
      return false;
    }
	}
}