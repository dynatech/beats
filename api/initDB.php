<?php
/*
Created by: Prado Arturo Bognot
Position: SWAT Supervising SRS
Date: Sept 6, 2017
*/

$servername = "localhost";
$username = "root";
$password = "senslope";

// Connect to database
$conn = connectDB($servername, $username, $password);

// Create database
$dbname = "beatsdb";
createSchema($conn, $dbname);

// Connect to newly created database
$conn = connectDB($servername, $username, $password, $dbname);

// Create table for "Test Suites"
$sqlSuites = "CREATE TABLE `test_suites` (
						  `ts_id` INT NOT NULL AUTO_INCREMENT,
						  `ts_name` VARCHAR(64) NOT NULL,
						  `ts_desc` VARCHAR(256) NULL,
						  PRIMARY KEY (`ts_id`));";
executeQuery($conn, $sqlSuites, "Table: Test Suites created successfully!", "Failed table creation");

// Create table for "Test Cases"
$sqlCases = "CREATE TABLE `test_cases` (
						  `tc_id` INT NOT NULL AUTO_INCREMENT,
						  `tc_name` VARCHAR(64) NOT NULL,
						  `tc_desc` VARCHAR(256) NULL,
						  `global_wait` INT NULL DEFAULT 2000,
						  `steps` TEXT NULL,
						  PRIMARY KEY (`tc_id`));";
executeQuery($conn, $sqlCases, "Table: Test Cases created successfully!", "Failed table creation");

// Create table for "TS-TC transactions"
$sqlTsTcTx = "CREATE TABLE `tstc_transactions` (
						  `id` INT NOT NULL AUTO_INCREMENT,
						  `ts_id` INT NOT NULL,
						  `tc_id` INT NOT NULL,
						  PRIMARY KEY (`id`),
						  INDEX `ts_id_idx` (`ts_id` ASC),
						  INDEX `tc_id_idx` (`tc_id` ASC),
						  CONSTRAINT `ts_id`
						    FOREIGN KEY (`ts_id`)
						    REFERENCES `test_suites` (`ts_id`)
						    ON DELETE CASCADE
						    ON UPDATE CASCADE,
						  CONSTRAINT `tc_id`
						    FOREIGN KEY (`tc_id`)
						    REFERENCES `test_cases` (`tc_id`)
						    ON DELETE CASCADE
						    ON UPDATE CASCADE)
						COMMENT = 'Test Suite - Test Cases transaction table';";
executeQuery($conn, $sqlTsTcTx, "Table: TS-TC Transactions created successfully!", "Failed table creation");

$conn->close();

function connectDB($server, $usr, $pwd, $dbname=null)
{
	// Create connection
	if ($dbname) {
		$conn = new mysqli($server, $usr, $pwd, $dbname);
	} else {
		$conn = new mysqli($server, $usr, $pwd);
	}
	
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error . "<Br/>");
	} 

	return $conn;
}

function createSchema($dbconn, $dbname)
{
	$sql = "CREATE DATABASE $dbname";
	executeQuery($dbconn, $sql, "Database ($dbname) created successfully", "Error creating database");
}

function executeQuery($dbconn, $sql, $msgSuccess="Success!", $msgFailed="Failed...")
{
	if ($dbconn->query($sql) === TRUE) {
	  echo "$msgSuccess <Br/>";
	} 
	else {
	  echo "$msgFailed: " . $dbconn->error . "<Br/>";
	}
}

?>