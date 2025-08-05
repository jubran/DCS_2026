<?php
// src/Core/BaseController.php
namespace Core;

abstract class BaseController
{
    protected function jsonResponse(array $data, int $statusCode = 200): void
    {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

    protected function validateRequestMethod(string $allowedMethod): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== $allowedMethod) {
            $this->jsonResponse(['error' => 'Method not allowed'], 405);
        }
    }

    protected function getQueryParam(string $key, $default = null)
    {
        return $_GET[$key] ?? $default;
    }
}