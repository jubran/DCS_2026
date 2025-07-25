<?php

function respondError(int $code, string $msg) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}

function generateJWT($user_id) {
      $header = json_encode(['typ' => 'JWT', 'alg' => JWT_ALGO]);
    $payload = json_encode(['user_id' => $user_id, 'iat' => time(), 'exp' => time() + 3600]);
    $b64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $b64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', "$b64Header.$b64Payload", JWT_SECRET, true);
    $b64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    return "$b64Header.$b64Payload.$b64Signature";
    
}

function validateJWT(string $token) {
  
}

function fetchData(PDO $db, string $query, array $params = []): array {
    $stmt = $db->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}