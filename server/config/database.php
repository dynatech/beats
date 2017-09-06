<?php
/*
Created by: Prado Arturo Bognot
Position: SWAT Supervising SRS
Date: Sept 6, 2017
*/

class Database {
 
    // specify your own database credentials
    private $host = "localhost";
    private $username = "root";
    private $password = "senslope";
    private $dbname = "beatsdb";
    public $conn;
 
    // get the database connection
    public function getConnection(){
        $this->conn = null;

        // Create connection
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);
        
        // Check connection
        if ($this->conn->connect_error) {
          die("Connection failed: " . $this->conn->connect_error . "<Br/>");
        } 

        return $this->conn;
    }

    // public function executeQuery($dbconn, $sql, $msgSuccess="Success!", $msgFailed="Failed...")
    // {
    //     if ($dbconn->query($sql) === TRUE) {
    //       echo "$msgSuccess <Br/>";
    //     } 
    //     else {
    //       echo "$msgFailed: " . $dbconn->error . "<Br/>";
    //     }
    // }
}
?>