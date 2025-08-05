<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../helpers.php';

class UnitController 
{
    public static function getUnitStatus()
    {
        self::sendLatestStatus(
            "GT[0-9][0-9]",
            "CAST(SUBSTR(e.location, 3) AS INTEGER)",
            "CAST(SUBSTR(e.location, 3) AS INTEGER) BETWEEN 16 AND 30"
        );
    }

    public static function getCOTPStatus()
    {
        self::sendLatestStatus(
            "SKID#[0-9] SP#[0-9]",
            "CAST(SUBSTR(e.location, 6, INSTR(e.location, ' ') - 6) AS INTEGER), CAST(SUBSTR(e.location, INSTR(e.location, 'SP#') + 3) AS INTEGER)",
            
        );
    }
public static function getFUStatus()
{
    self::sendLatestStatus(
        "FUS#*",  // استخدام GLOB بدلاً من التعبير المنتظم
        "CAST(REPLACE(REPLACE(REPLACE(SUBSTR(e.location, 5), '(A)', ''), '(B)', ''), '#', '') AS INTEGER), e.location",
        "(e.location GLOB 'FUS#[1-9]' OR e.location GLOB 'FUS#[1-9][0-9]' OR e.location GLOB 'FUS#[1-9](A)' OR e.location GLOB 'FUS#[1-9](B)' OR e.location GLOB 'FUS#[1-9][0-9](A)' OR e.location GLOB 'FUS#[1-9][0-9](B)')"
    );
}


    public static function getFT6Status()
    {
        // مثال: BOP-29 SP#1 إلى BOP-29 SP#6
        self::sendLatestStatus(
            "BOP-29 SP#[0-9]",
            "CAST(SUBSTR(e.location, INSTR(e.location, 'SP#') + 3) AS INTEGER)"
        );
    }
    public static function getTankStatus()
    {
        self::sendLatestStatus(
         "TANK#*", 
        "CAST(SUBSTR(TRIM(e.location), 6) AS INTEGER)", 
        "1", // يمكنك تخصيص شرط إضافي إذا أردت
        "TRIM(location)" // ← هذا هو الأهم لتجميع النتائج الصحيحة
    );
        }
private static function sendLatestStatus($locationPattern, $orderBy, $additionalWhere = "1=1", $groupBy = "location")
    {
        global $conn;

            $stmt = $conn->query("
            SELECT e.location, e.status1, e.date1, e.time1
            FROM events e
            INNER JOIN (
                SELECT location, MAX(date1 || ' ' || time1) AS max_dt
                FROM events
                WHERE location GLOB '$locationPattern'
                GROUP BY $groupBy
            ) latest
            ON (e.date1 || ' ' || e.time1) = latest.max_dt AND TRIM(e.location) = TRIM(latest.location)
            WHERE e.location GLOB '$locationPattern' AND $additionalWhere
            ORDER BY $orderBy
        ");


        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($rows);
    }
}
