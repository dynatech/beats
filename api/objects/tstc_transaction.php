<?php
class Tstc_transaction {

	// database connection and table name
	private $conn;
	private $table_name = "tstc_transactions";

	// object properties
	public $id;
	public $ts_id;
	public $tc_id;

	// constructor with $db as database connection
	public function __construct($db) {
		$this->conn = $db;
	}

	public function readAll() {
		// echo "Read TSTC Transaction table \n";
		$query = "SELECT * FROM " . $this->table_name;
		$result = $this->conn->query($query);

		return $result;
	}

	// Used when viewing only one test suite or for updating
	public function readOne() {
		// read single record
		$query = "SELECT id, ts_id, tc_id FROM " . $this->table_name . " WHERE id=" . $this->id . " LIMIT 1";
		$result = $this->conn->query($query);

		return $result;
	}

	// Used when viewing only one test suite or for updating
	public function readFromOneTestsuite() {
		// read records from one test suite
		$query = "SELECT id, ts_id, tc_id FROM " . $this->table_name . " WHERE ts_id=" . $this->ts_id;
		$result = $this->conn->query($query);

		return $result;
	}

	public function create() {
		$query = "INSERT INTO " . $this->table_name . " SET ts_id=?, tc_id=?";

		// prepare query
		$stmt = $this->conn->stmt_init();
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->ts_id = htmlspecialchars(strip_tags($this->ts_id));
		$this->tc_id = htmlspecialchars(strip_tags($this->tc_id));

		// bind values
		$stmt->bind_param('ii', $this->ts_id, $this->tc_id);

		// execute query
		if($stmt->execute()){
			return true;
		}
		else{
			return false;
		}
	}

	public function update() {
		// update query
		$query = "UPDATE " . $this->table_name . " SET ts_id=" . $this->ts_id . 
							", tc_id=" . $this->tc_id . " WHERE id=" . $this->id;

		$this->conn->query($query);
		return $this->conn->affected_rows;
	}

	public function delete() {
		// sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));

		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id=" . $this->id;

		$this->conn->query($query);
		return $this->conn->affected_rows;
	}
}