<?php
$servername = "localhost";
$username = "root";
$password = "DHARMIKgohil@2006";
$dbname = "splitmate_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$name = $_POST['name'];
$contact = $_POST['contact'];
$email = $_POST['email'];
$password = $_POST['password'];

// Input validation (basic)
if (empty($name) || empty($contact) || empty($email) || empty($password)) {
    die("All fields are required.");
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (name, contact, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $contact, $email, $password);

// Execute the statement
if ($stmt->execute()) {
    echo "Sign-Up Successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
