<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
header('Content-Type: application/json');

require __DIR__ . '/config.php';
require __DIR__ . '/helpers.php';

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'fetchAuth':
        require __DIR__ . '/controllers/AuthController.php';
        AuthController::fetchAuth();
        break;
    case 'register':
        require __DIR__ . '/controllers/AuthController.php';
        AuthController::register();
        break;
    case 'fetchData':
        require __DIR__ . '/controllers/DataController.php';
        DataController::fetchData();
        break;
    case 'getDcs':
        require __DIR__ . '/controllers/DataController.php';
        DataController::getDcs();
        break;
    case 'getDcsData':
        require __DIR__ . '/controllers/EventController.php';
        EventController::getDcsData();
        break;
    default:
        if (isset($_GET['dateQuery'])) {
            require __DIR__ . '/controllers/EventController.php';
            EventController::dateQuery();
        } else {
            respondError(400, 'Invalid action');
        }
}