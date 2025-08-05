<?php
// src/Controllers/UnitController.php
namespace Controllers;

use Core\BaseController;
use PDO;

class UnitController extends BaseController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getUnitStatus(): void
    {
        $this->sendLatestStatus(
            "GT[0-9][0-9]",
            "CAST(SUBSTR(e.location, 3) AS INTEGER)",
            "CAST(SUBSTR(e.location, 3) AS INTEGER) BETWEEN 16 AND 30"
        );
    }

    public function getCOTPStatus(): void
    {
        $this->sendLatestStatus(
            "SKID#[0-9] SP#[0-9]",
            "CAST(SUBSTR(e.location, 6, INSTR(e.location, ' ') - 6) AS INTEGER), " .
            "CAST(SUBSTR(e.location, INSTR(e.location, 'SP#') + 3) AS INTEGER)"
        );
    }

    public function getFUStatus(): void
    {
        $this->sendLatestStatus(
            "FUS#*",
            "CAST(REPLACE(REPLACE(REPLACE(SUBSTR(e.location, 5), '(A)', ''), '(B)', ''), '#', '') AS INTEGER), e.location",
            "(e.location GLOB 'FUS#[1-9]' OR e.location GLOB 'FUS#[1-9][0-9]' OR " .
            "e.location GLOB 'FUS#[1-9](A)' OR e.location GLOB 'FUS#[1-9](B)' OR " .
            "e.location GLOB 'FUS#[1-9][0-9](A)' OR e.location GLOB 'FUS#[1-9][0-9](B)')"
        );
    }

    public function getFT6Status(): void
    {
        $this->sendLatestStatus(
            "BOP-29 SP#[0-9]",
            "CAST(SUBSTR(e.location, INSTR(e.location, 'SP#') + 3) AS INTEGER)"
        );
    }

    private function sendLatestStatus(string $locationPattern, string $orderBy, string $additionalWhere = "1=1"): void
    {
        try {
            $query = "
                SELECT e.location, e.status1, e.date1, e.time1
                FROM events e
                INNER JOIN (
                    SELECT location, MAX(date1 || ' ' || time1) AS max_dt
                    FROM events
                    WHERE location GLOB :pattern
                    GROUP BY location
                ) latest
                ON (e.date1 || ' ' || e.time1) = latest.max_dt AND e.location = latest.location
                WHERE e.location GLOB :pattern AND $additionalWhere
                ORDER BY $orderBy
            ";

            $stmt = $this->db->prepare($query);
            $stmt->execute([':pattern' => $locationPattern]);
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->jsonResponse($results);
            
        } catch (\PDOException $e) {
            $this->jsonResponse(['error' => 'Database error'], 500);
        }
    }
}