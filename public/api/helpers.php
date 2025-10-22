<?php
/**
 * Validate a JWT token and optionally refresh it.
 *
 * @param string $token The JWT token to validate
 * @return string New JWT token if valid, otherwise exits with JSON error
 */
function respondError(int $code, string $msg) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}

function generateJWT($user_id) {
      $header = json_encode(['typ' => 'JWT', 'alg' => JWT_ALGO]);
    // $payload = json_encode(['user_id' => $user_id, 'iat' => time(),    'exp' => time() + 20 ]);
    $payload = json_encode(['user_id' => $user_id, 'iat' => time(),    'exp' => time() + 1 * 24 * 60 * 60]);
    $b64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $b64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', "$b64Header.$b64Payload", JWT_SECRET, true);
    $b64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    return "$b64Header.$b64Payload.$b64Signature";
    
}

function validateToken(string $token): string {
    // فك التوكن والتحقق من صحته
    $decoded = decodeJWT($token);

    if (!$decoded) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token signature']);
        exit;
    }

    // الوقت الحالي
    $now = time();

    // إذا انتهت صلاحية التوكن
    if ($decoded['exp'] <= $now) {
        http_response_code(401);
        echo json_encode(['error' => 'Token expired']);
        exit;
    }

    // ✅ إذا كان التوكن صالحًا → توليد توكن جديد لنفس المستخدم
    return generateJWT($decoded['user_id']);
}

function decodeJWT(string $token): ?array {
    list($b64Header, $b64Payload, $b64Signature) = explode('.', $token);
    $header = json_decode(base64_decode(strtr($b64Header, '-_', '+/')), true);
    $payload = json_decode(base64_decode(strtr($b64Payload, '-_', '+/')), true);
    $signature = base64_decode(strtr($b64Signature, '-_', '+/'));
    $validSignature = hash_hmac('sha256', "$b64Header.$b64Payload", JWT_SECRET, true);
    if ($signature === $validSignature) {
        return $payload;
    }
    return null;
}

function fetchData(PDO $db, string $query, array $params = []): array {
    $stmt = $db->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}