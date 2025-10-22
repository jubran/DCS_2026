<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
header('Content-Type: application/json');

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'fetchAuth':
        require_once __DIR__ . '/controllers/AuthController.php';
        AuthController::fetchAuth();
        break;

    case 'refreshToken':
        require_once __DIR__ . '/controllers/refresh-token.php';
        break;

    case 'register':
        require_once __DIR__ . '/controllers/AuthController.php';
        AuthController::register();
        break;

    case 'fetchData':
        require_once __DIR__ . '/controllers/DataController.php';
        DataController::fetchData();
        break;

    case 'getDcs':
        require_once __DIR__ . '/controllers/DataController.php';
        DataController::getDcs();
        break;

    case 'getUnitStatus':
    case 'getCOTPStatus':
    case 'getFUStatus':
    case 'getFT6Status':
    case 'getTankStatus':
        require_once __DIR__ . '/controllers/getStatus.php';
        UnitController::$action(); // ديناميكي
        break;

    default:
        if (isset($_GET['dateQuery'])) {
            require_once __DIR__ . '/controllers/EventController.php';
            EventController::dateQuery();
        } else {
            respondError(400, 'Invalid action');
        }
}
