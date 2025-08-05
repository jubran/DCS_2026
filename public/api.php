<?php
// public/api.php
error_reporting(E_ALL);
ini_set('display_errors', '1');
header('Content-Type: application/json');

// Manual requires (adjust paths as needed)
require __DIR__ . '/api1/config.php';
require __DIR__ . '/api1/helpers.php';
require __DIR__ . '/api1/controllers/getStatus.php';

$action = $_GET['action'] ?? null;

try {
        
    $db = new PDO('sqlite:' . __DIR__ . '/storage/database.sqlite3');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $controller = new UnitController($db);

    switch ($action) {
        case 'getUnitStatus':
        case 'getCOTPStatus':
        case 'getFUStatus':
        case 'getFT6Status':
            $controller->$action();
            break;
            
        default:
            throw new Exception('Invalid action', 400);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
} catch (Exception $e) {
    http_response_code($e->getCode() >= 400 ? $e->getCode() : 500);
    echo json_encode(['error' => $e->getMessage()]);
}