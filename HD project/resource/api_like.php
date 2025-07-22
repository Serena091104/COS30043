<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("feenix-mariadb.swin.edu.au", "s104480538", "091104", "s104480538_db");

// Check connection
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die(json_encode(["error" => "Connection failed"]));
}

// Handle liking a product
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];
        $productId = intval($_POST['product_id']);

        // Check if the user already liked the product
        $stmt = $conn->prepare("SELECT * FROM likes WHERE user_id = ? AND product_id = ?");
        $stmt->bind_param("ii", $userId, $productId);
        $stmt->execute();
        $result = $stmt->get_result();
        $like = $result->fetch_assoc();

        if (!$like) {
            // Insert new like
            $stmt = $conn->prepare("INSERT INTO likes (user_id, product_id) VALUES (?, ?)");
            $stmt->bind_param("ii", $userId, $productId);
            if ($stmt->execute()) {
                // Get the updated likes count
                $stmt = $conn->prepare("SELECT COUNT(*) as likes_count FROM likes WHERE product_id = ?");
                $stmt->bind_param("i", $productId);
                if ($stmt->execute()) {
                    $result = $stmt->get_result();
                    $likesCount = $result->fetch_assoc()['likes_count'];

                    echo json_encode(['status' => 'success', 'message' => 'Liked successfully', 'likes_count' => $likesCount]); //Json response with clicking likes count succesfully
                } else {
                    error_log($stmt->error);
                    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch likes count']);
                }
            } else {
                error_log($stmt->error);
                echo json_encode(['status' => 'error', 'message' => 'Failed to like the product']); //Json response with clicking likes count failed
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'You already liked this product']); //Json response with clicking likes count already liked
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    }
    exit; // Exit after handling the POST request
}

// If no valid request method is matched
echo json_encode(["error" => "Invalid request"]);
$conn->close();
?>