<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../helpers.php';

class EventController {
    public static function getDcsData() {

    }

    public static function dateQuery() {
          global $conn;
        $date = trim($_GET['dateQuery']);
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            respondError(400, 'Invalid date format; expected YYYY-MM-DD');
        }
        $rows = fetchData(
            $conn,
            'SELECT * FROM events WHERE date1 = :date',
            ['date' => $date]
        );
        echo json_encode($rows);
    }
}