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
}