<?php
session_start();
header('Content-Type: application/json');
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
//header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database connection
$host = 'feenix-mariadb.swin.edu.au';
$user = 's104480538';
$pass = '091104';
$db   = 's104480538_db';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// ---------- POST: Signup handler ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        echo json_encode(["error" => "Invalid JSON data"]);
        $conn->close();
        exit();
    }
    
    
    $first_name = isset($data['first_name']) ? trim($data['first_name']) : '';
    $last_name  = isset($data['last_name']) ? trim($data['last_name']) : '';
    $email      = isset($data['email']) ? trim($data['email']) : '';
    $password   = isset($data['password']) ? trim($data['password']) : '';
    $username   = isset($data['username']) ? trim($data['username']) : '';

    if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($username)) {
        echo json_encode(["error" => "All fields are required"]);
        $conn->close();
        exit();
    }

    // Check if username or email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Username or email already exists"]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Insert new user (using plain text password to match your login)
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $first_name, $last_name, $email, $username, $password);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "User registered successfully"
        ]);
    } else {
        echo json_encode(["error" => "Failed to register user"]);
    }

    $stmt->close();
    $conn->close();
    exit();
}

echo json_encode(["error" => "Invalid request method"]);
$conn->close();
exit();
?>