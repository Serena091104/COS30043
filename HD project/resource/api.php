<?php
// Database connection parameters
$servername = "feenix-mariadb.swin.edu.au";
$username = "s104480538";
$password = "091104";
$dbname = "s104480538_db";

// Fetch products from the external API
$apiUrl = "https://fakestoreapi.in/api/products?limit=20";
$response = file_get_contents($apiUrl);

if ($response === false) {
    echo json_encode(['error' => 'Failed to fetch products from external API']);
    exit;
}

$products = json_decode($response, true);

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO products (id, title, image, price, description, brand, model, color, category, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(['error' => 'Failed to prepare statement: ' . $conn->error]);
    exit;
}
$stmt->bind_param("issdsssssi", $id, $title, $image, $price, $description, $brand, $model, $color, $category, $discount);

// Loop through products and insert into the database
foreach ($products as $product) {
    $id = $product['id'];
    $title = $product['title'];
    $image = $product['image'];
    $price = $product['price'];
    $description = $product['description'];
    $brand = $product['brand'];
    $model = $product['model'];
    $color = $product['color'];
    $category = $product['category'];
    $discount = isset($product['discount']) ? $product['discount'] : 0;

    // Execute the prepared statement
    if (!$stmt->execute()) {
        echo json_encode(['error' => 'Failed to insert product: ' . $stmt->error]);
        exit;
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

echo json_encode([
    'success' => 'Products fetched and inserted successfully!',
    'products' => $products // Include the fetched products in the response
]);
?>