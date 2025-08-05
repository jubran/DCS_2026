<?php
// config/database.php
return [
    'dsn' => 'sqlite:' . __DIR__ . '/../storage/database.sqlite3',
    'username' => null,
    'password' => null,
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];