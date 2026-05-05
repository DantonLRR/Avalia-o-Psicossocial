<?php
header('Content-Type: application/json');

// Função simples para gerar UUID v4 (36 caracteres)
function generate_uuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cpf = $_POST['cpf'] ?? '';

    // Aqui futuramente entrará a busca no banco de dados 
    // Por enquanto, apenas simulamos o sucesso
    echo json_encode([
        'success' => true,
        'uuid' => generate_uuid()
    ]);
}