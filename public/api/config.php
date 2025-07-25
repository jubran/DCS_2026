<?php
define('JWT_SECRET', 'abC123!');
define('JWT_ALGO', 'HS256');

// إعداد PDO
try {
    $conn = new PDO('sqlite:' . __DIR__ . '/../dcsVite.sqlite3');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed']);
    exit;
}