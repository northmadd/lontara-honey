<?php

header('Content-Type: application/json');
header('Cache-Control: no-store');


// Hanya menerima POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);


    echo json_encode([
        'success' => false,
        'message' => 'Method tidak didukung.',
    ]);


    exit;
}


// =========================================================
// LOAD CLOUDFLARE TURNSTILE SECRET KEY
// File berada di luar public_html
// =========================================================


$configFile = '/home/rajamadu/turnstile-config.php';


if (!is_file($configFile)) {
    http_response_code(500);


    echo json_encode([
        'success' => false,
        'message' => 'File konfigurasi Turnstile tidak ditemukan.',
    ]);


    exit;
}


$config = require $configFile;


$secretKey = $config['secret_key'] ?? '';


if (!$secretKey) {
    http_response_code(500);


    echo json_encode([
        'success' => false,
        'message' => 'TURNSTILE_SECRET_KEY belum dikonfigurasi di server.',
    ]);


    exit;
}


// =========================================================
// AMBIL DATA DARI REQUEST
// =========================================================


$input = json_decode(file_get_contents('php://input'), true);


if (!is_array($input)) {
    http_response_code(400);


    echo json_encode([
        'success' => false,
        'message' => 'Data request tidak valid.',
    ]);


    exit;
}


$token = $input['token'] ?? '';


if (!$token) {
    http_response_code(400);


    echo json_encode([
        'success' => false,
        'message' => 'Token verifikasi tidak ditemukan.',
    ]);


    exit;
}


// =========================================================
// VERIFIKASI KE CLOUDFLARE TURNSTILE
// =========================================================


$postData = http_build_query([
    'secret' => $secretKey,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
]);


$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => $postData,
        'timeout' => 10,
    ],
]);


$response = file_get_contents(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    false,
    $context
);


// =========================================================
// CEK RESPONSE CLOUDFLARE
// =========================================================


if ($response === false) {
    http_response_code(502);


    echo json_encode([
        'success' => false,
        'message' => 'Gagal menghubungi server verifikasi Cloudflare.',
    ]);


    exit;
}


$result = json_decode($response, true);


if (!is_array($result)) {
    http_response_code(502);


    echo json_encode([
        'success' => false,
        'message' => 'Response dari Cloudflare tidak valid.',
    ]);


    exit;
}


// =========================================================
// HASIL VERIFIKASI
// =========================================================


if (!($result['success'] ?? false)) {
    http_response_code(403);


    echo json_encode([
        'success' => false,
        'message' => 'Verifikasi Turnstile gagal. Silakan coba lagi.',
    ]);


    exit;
}


// =========================================================
// BERHASIL
// =========================================================


echo json_encode([
    'success' => true,
]);
