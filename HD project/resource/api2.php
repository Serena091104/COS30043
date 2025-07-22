<?php
header('Content-Type: application/json');
// Connect to the database
$conn = new mysqli("feenix-mariadb.swin.edu.au", "s104480538", "091104", "s104480538_db");

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Query to fetch all products
$sql = "SELECT id, title, image, price, description, brand, color, category FROM products";
$result = $conn->query($sql);

if (!$result) {
    error_log("SQL Error: " . $conn->error); // Log SQL errors
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

// Fetch all products
$products = [];
while ($row = $result->fetch_assoc()) {
    $row['price'] = (float)$row['price']; // Ensure price is a float
    $products[] = $row;
}

// Return JSON
echo json_encode($products);

// Close connection
$conn->close();
?>

