<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function respondError(int $code, string $msg) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}

// Database connections
try {
    $conn = new PDO('sqlite:../dcsVite.sqlite3');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $dcsViteDatabaseConnection = new PDO('sqlite:../dcsVite.sqlite3');
    $dcsViteDatabaseConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    respondError(500, 'Database connection failed: ' . $e->getMessage());
}

// JWT secret key (store in env variable in production)
define('JWT_SECRET', 'abC123!');
define('JWT_ALGO', 'HS256');

// Generate JWT token
function generateJWT($user_id) {
    $header = json_encode(['typ' => 'JWT', 'alg' => JWT_ALGO]);
    $payload = json_encode(['user_id' => $user_id, 'iat' => time(), 'exp' => time() + 3600]);
    $b64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $b64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', "$b64Header.$b64Payload", JWT_SECRET, true);
    $b64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    return "$b64Header.$b64Payload.$b64Signature";
}

// Fetch rows helper
function fetchData(PDO $connection, string $query, array $params = []): array {
    $stmt = $connection->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

try {
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
        switch ($action) {
            case 'fetchAuth':
                $input = json_decode(file_get_contents('php://input'), true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    respondError(400, 'Invalid JSON');
                }
                if (empty($input['user_name']) || empty($input['password'])) {
                    respondError(400, 'Username and password required');
                }
                $stmt = $conn->prepare(
                    'SELECT id, user_name, user_password_hash FROM users WHERE user_name = :uname'
                );
                $stmt->execute(['uname' => $input['user_name']]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$user) {
                    respondError(401, 'Invalid credentials');
                }
                if (!password_verify($input['password'], $user['user_password_hash'])) {
                    respondError(401, 'Invalid credentials');
                }
                $token = generateJWT($user['id']);
                echo json_encode([
                    'user' => [
                        'id'        => $user['id'],
                        'user_name' => $user['user_name'],
                    ],
                    'accessToken' => $token,
                ]);
                break;

            case 'register':
                $input = json_decode(file_get_contents('php://input'), true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    respondError(400, 'Invalid JSON');
                }
                if (empty($input['user_name']) || empty($input['password'])) {
                    respondError(400, 'Username and password required');
                }
                $hash = password_hash($input['password'], PASSWORD_BCRYPT);
                $stmt = $conn->prepare(
                    'INSERT INTO users (user_name, user_password_hash) VALUES (:uname, :hash)'
                );
                $stmt->execute([
                    'uname' => $input['user_name'],
                    'hash'  => $hash,
                ]);
                $uid   = (int) $conn->lastInsertId();
                $token = generateJWT($uid);
                echo json_encode([
                    'user' => [
                        'id'        => $uid,
                        'user_name' => $input['user_name'],
                    ],
                    'accessToken' => $token,
                ]);
                break;

            case 'fetchData':
                $raw  = file_get_contents('php://input');
                $body = json_decode($raw, true);
                if (json_last_error() === JSON_ERROR_NONE && isset($body['data'])) {
                    $email = trim($body['data']);
                } elseif (isset($_POST['data'])) {
                    $email = trim($_POST['data']);
                } else {
                    respondError(400, "'data' (email) is required");
                }
                $rows = fetchData(
                    $conn,
                    'SELECT password_hash FROM users WHERE email = :email',
                    ['email' => $email]
                );
                echo json_encode([
                    'data' => empty($rows) ? 'Not Auth' : $rows[0]['password_hash']
                ]);
                break;

            case 'getDcs':
                $email = 'jobran@hotmail.com';
                $rows = fetchData(
                    $conn,
                    'SELECT password_hash FROM users WHERE email = :email',
                    ['email' => $email]
                );
                echo json_encode([
                    'dcsToday' => empty($rows) ? 'Not Auth' : $rows[0]['password_hash']
                ]);
                break;

            case 'getDcsData':
                $rows = fetchData(
                    $dcsViteDatabaseConnection,
                    "SELECT * FROM events WHERE date1 = '2021-12-26'"
                );
                echo json_encode($rows);
                break;

            default:
                respondError(400, "Invalid action: $action");
        }

    } elseif (isset($_GET['dateQuery'])) {
        $date = trim($_GET['dateQuery']);
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            respondError(400, 'Invalid date format; expected YYYY-MM-DD');
        }
        $rows = fetchData(
            $dcsViteDatabaseConnection,
            'SELECT * FROM events WHERE date1 = :date',
            ['date' => $date]
        );
        echo json_encode($rows);

    } else {
        respondError(400, 'No valid action or dateQuery provided');
    }
} catch (PDOException $e) {
    respondError(500, 'DB error: ' . $e->getMessage());
} catch (Exception $e) {
    respondError(500, 'Server error: ' . $e->getMessage());
}
