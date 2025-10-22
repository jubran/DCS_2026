<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../helpers.php';

class AuthController {
    public static function fetchAuth() {
          global $conn;
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
                        'username' => $user['user_name'],
                    ],
                    'accessToken' => $token,
                ]);
    }

    public static function register() {
          global $conn;
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
    }
}