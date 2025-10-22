<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../helpers.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    respondError(400, 'Invalid JSON');
}

if (empty($input['token'])) {
    respondError(400, 'Token required');
}

$token = $input['token'];
$decoded = decodeJWT($token);

if (!$decoded) {
    respondError(401, 'Invalid token signature');
}

// تحقق إن التوكن مازال صالحاً (لم ينتهِ بعد)
if ($decoded['exp'] > time()) {
    // 🔁 توليد توكن جديد بنفس user_id
    $newToken = generateJWT($decoded['user_id']);
    echo json_encode(['accessToken' => $newToken]);
} else {
    respondError(401, 'Token expired');
}
