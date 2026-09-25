<?php

header('Content-Type: application/json');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// =========================================================
// LOKASI FILE PENYIMPANAN (di luar public_html)
// =========================================================

$dataFile = '/home/rajamadu/user-testimonials.json';
if (!is_writable(dirname($dataFile))) {
    $dataFile = __DIR__ . '/user-testimonials.json';
}

$mlen = static function (string $v): int {
    return function_exists('mb_strlen') ? mb_strlen($v) : strlen($v);
};

$readEntries = static function () use ($dataFile): array {
    if (!is_file($dataFile)) {
        return [];
    }
    $raw = @file_get_contents($dataFile);
    $decoded = json_decode((string) $raw, true);
    return is_array($decoded) ? $decoded : [];
};

// =========================================================
// GET — ambil semua komentar pengguna (terbaru di depan)
// =========================================================

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($readEntries(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// =========================================================
// POST — tambah komentar baru
// =========================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method tidak didukung.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Data request tidak valid.']);
    exit;
}

$name    = trim((string) ($input['name'] ?? ''));
$city    = trim((string) ($input['city'] ?? ''));
$comment = trim((string) ($input['comment'] ?? ''));
$rating  = max(1, min(5, (int) ($input['rating'] ?? 5)));

if ($name === '' || $city === '' || $comment === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nama, kota, dan komentar wajib diisi.']);
    exit;
}

if ($mlen($name) > 80 || $mlen($city) > 80 || $mlen($comment) > 600) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Panjang data melebihi batas.']);
    exit;
}

$entry = [
    'name'   => $name,
    'city'   => ['id' => $city, 'en' => $city],
    'rating' => $rating,
    'date'   => ['id' => 'Baru saja', 'en' => 'Just now'],
    'text'   => ['id' => $comment, 'en' => $comment],
];

$entries = $readEntries();
array_unshift($entries, $entry);
$entries = array_slice($entries, 0, 600);

if (@file_put_contents($dataFile, json_encode($entries, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal menyimpan komentar di server.']);
    exit;
}

echo json_encode(['success' => true, 'entries' => $entries], JSON_UNESCAPED_UNICODE);