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

	// count number of valid variables (aside from the ids)
	private function getNumValidVariables() {
		$validVars = 0;

		if ($this->name)
			$validVars++;
		if ($this->desc)
			$validVars++;
		if ($this->global_wait)
			$validVars++;
		if ($this->steps)
			$validVars++;

		return $validVars;
	}

	// returns a ',' if $count is less than valid variables count
	private function compareVarCount($count) {
		$validVars = $this->getNumValidVariables();
		// echo "Valids: $validVars, Count: $count \n";
		if ($count < $validVars) {
			return ",";
		} else {
			return "";
		}
		
	}

	public function readAll() {
		// echo "Read Test Cases table \n";
		$query = "SELECT tc_id, tc_name FROM " . $this->table_name;
		$result = $this->conn->query($query);

		return $result;
	}

	// Used when viewing only one test suite or for updating
	public function readFromOneTestsuite() {
		// read records from one test suite
		$query = "SELECT tc.tc_id, tc.tc_name" .
						" FROM tstc_transactions as tx" . 
						" INNER JOIN test_cases as tc" . 
						" ON tx.tc_id = tc.tc_id" . 
						" WHERE tx.ts_id=" . $this->ts_id . 
						" ORDER BY tc.tc_id";
		$result = $this->conn->query($query);

		return $result;
	}

	// Used when viewing the details of one test case
	public function readOne() {
		$query = "SELECT * FROM " . $this->table_name . " WHERE tc_id=" . $this->id;
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

	public function update() {
		// variable counter
		$countVar = 0;

		// construct update query
		$query = "UPDATE " . $this->table_name . " SET";

		if ($this->name) {
			$this->name = htmlspecialchars(strip_tags($this->name));
			$query = $query . " tc_name='" . $this->name . "'" . $this->compareVarCount(++$countVar);
		}
		if ($this->desc) {
			$this->desc = htmlspecialchars(strip_tags($this->desc));
			$query = $query . " tc_desc='" . $this->desc . "'" . $this->compareVarCount(++$countVar);
		}
		if ($this->global_wait) {
			$this->global_wait = htmlspecialchars(strip_tags($this->global_wait));
			$query = $query . " global_wait=" . $this->global_wait . $this->compareVarCount(++$countVar);
		}
		if ($this->steps) {
			$this->steps = json_encode($this->steps);
			$query = $query . " steps=" . $this->steps . $this->compareVarCount(++$countVar);
		}

		$this->id = htmlspecialchars(strip_tags($this->id));
		$query = $query . " WHERE tc_id=" . $this->id;

		$this->conn->query($query);
		return $this->conn->affected_rows;
	}

	public function delete() {
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE tc_id=?";

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