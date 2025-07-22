<?php
// Reference:
// https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

// Use this API for demonstration purposes only

// Get the HTTP method, path, and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);

// Connect to the MySQL database, provide the appropriate credentials
$conn = mysqli_connect('feenix-mariadb.swin.edu.au', 's104480538', '091104', 's104480538_db');

if (!$conn) {
    die(json_encode(["error" => "Connection failed: " . mysqli_connect_error()]));
}

mysqli_set_charset($conn, 'utf8');

// Initialize the table name accordingly
$table = "products";

// Retrieve the search key field name and value from the path
$fld = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$key = array_shift($request);

// Retrieve the data to prepare set values
if (isset($input)) {
    $columns = preg_replace('/[^a-z0-9_]+/i', '', array_keys($input));
    $values = array_map(function ($value) use ($conn) {
        if ($value === null) return null;
        return mysqli_real_escape_string($conn, (string)$value);
    }, array_values($input));

    $set = '';
    for ($i = 0; $i < count($columns); $i++) {
        $set .= ($i > 0 ? ',' : '') . '`' . $columns[$i] . '`=';
        $set .= ($values[$i] === null ? 'NULL' : '"' . $values[$i] . '"');
    }
}

// Create SQL
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM `$table`" . ($key ? " WHERE $fld='$key'" : ''); 
        break;
    case 'PUT':
        if (isset($input['id'])) {
            $id = intval($input['id']); // Ensure it's an integer
            $sql = "UPDATE `$table` SET $set WHERE id = $id"; 
        } else {
            die(json_encode(["error" => "ID not provided for update."]));
        }
        break;
    case 'POST':
        $sql = "INSERT INTO `$table` SET $set"; 
        break;
    case 'DELETE':
        if (isset($input['id'])) {
            $id = intval($input['id']); // Ensure it's an integer
            $sql = "DELETE FROM `$table` WHERE id = $id"; 
        } else {
            die(json_encode(["error" => "ID not provided for deletion."]));
        }
        break;
    default:
        die(json_encode(["error" => "Invalid request method."]));
}

// Execute SQL statement
$result = mysqli_query($conn, $sql);
if ($result) {
    if ($method == 'GET') {
        header('Content-Type: application/json');
        echo '[';
        for ($i = 0; $i < mysqli_num_rows($result); $i++) {
            echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
        }
        echo ']';
    } elseif ($method == 'POST') {
        echo mysqli_insert_id($conn); // Return the ID of the inserted product
    } else {
        echo mysqli_affected_rows($conn); // Return the number of affected rows
    }
} else {
    // Log the error message for debugging
    error_log("SQL Error: " . mysqli_error($conn));
    die(json_encode(["error" => "SQL Error: " . mysqli_error($conn)]));
}

// Close MySQL connection
mysqli_close($conn);
?>
