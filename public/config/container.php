<?php
// config/container.php
$container = new \DI\Container();

$container->set(PDO::class, function () {
    $dbConfig = require __DIR__ . '/database.php';
    return new PDO(
        $dbConfig['dsn'],
        $dbConfig['username'],
        $dbConfig['password'],
        $dbConfig['options']
    );
});

$container->set(UnitController::class, function ($container) {
    return new UnitController($container->get(PDO::class));
});

// Add other controllers similarly...

return $container;