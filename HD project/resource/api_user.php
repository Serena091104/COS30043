<?php
session_start();
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("feenix-mariadb.swin.edu.au", "s104480538", "091104", "s104480538_db");
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// ---------- GET: Check session status ----------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['user_id']) && isset($_SESSION['username'])) {
        echo json_encode([
            "logged_in" => true,
            "user_id" => $_SESSION['user_id'],
            "username" => $_SESSION['username']
        ]);
    } else {
        echo json_encode([
            "logged_in" => false,
            "message" => "No active session"
        ]);
    }
    $conn->close();
    exit();
}

// ---------- POST: Handle login ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = isset($data['username']) ? trim($data['username']) : '';
    $password = isset($data['password']) ? trim($data['password']) : '';

    if (empty($username) || empty($password)) {
        echo json_encode(["error" => "Username and password required"]);
        $conn->close();
        exit();
    }

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // NOTE: Replace with password_verify() in production
    if ($user && $user['password'] === $password) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user_id" => $user['id'],
            "username" => $user['username']
        ]);
    } else {
        echo json_encode(["error" => "Invalid username or password"]);
    }

    $stmt->close();
    $conn->close();
    exit();
}
// ---------- DELETE: Handle logout ----------
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    session_destroy();
    echo json_encode(["success" => true, "message" => "Logged out successfully"]);
    $conn->close();
    exit();
}
// ---------- Unsupported method ----------
echo json_encode(["error" => "Invalid request"]);
$conn->close();
exit();
?>
