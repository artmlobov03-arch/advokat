<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(array $data, int $status = 200)
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(['error' => 'Метод не поддерживается'], 405);
}

if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') {
    respond(['error' => 'Запрос с другого сайта запрещён'], 403);
}

$declaredLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($declaredLength > 12000) {
    respond(['error' => 'Запрос слишком большой'], 413);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 12000) {
    respond(['error' => 'Некорректный запрос'], 400);
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    respond(['error' => 'Некорректный запрос'], 400);
}

function clean($value, int $maxLength): string
{
    if (!is_string($value)) return '';
    return trim(mb_substr($value, 0, $maxLength, 'UTF-8'));
}

// Скрытое поле заполняют боты; реальному пользователю оно недоступно.
if (clean($body['company'] ?? '', 120) !== '') {
    respond(['ok' => true]);
}

$fullName = preg_replace('/[\r\n]+/u', ' ', clean($body['fullName'] ?? '', 120)) ?? '';
$email = mb_strtolower(clean($body['email'] ?? '', 160), 'UTF-8');
$phone = preg_replace('/[\r\n]+/u', ' ', clean($body['phone'] ?? '', 40)) ?? '';
$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
$problem = clean($body['problem'] ?? '', 5000);
$consentVersion = clean($body['consentVersion'] ?? '', 32);

if (
    mb_strlen($fullName, 'UTF-8') < 3 ||
    filter_var($email, FILTER_VALIDATE_EMAIL) === false ||
    strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15 ||
    mb_strlen($problem, 'UTF-8') < 10 ||
    ($body['consent'] ?? false) !== true ||
    $consentVersion !== '2026-08-04'
) {
    respond(['error' => 'Заполните все поля и подтвердите согласие'], 400);
}

// Не более пяти заявок с одного IP за десять минут.
$clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$clientIp = trim(explode(',', $clientIp)[0]);
$rateFile = sys_get_temp_dir() . '/advokat-contact-' . hash('sha256', $clientIp) . '.json';
$now = time();
$recent = [];
$handle = @fopen($rateFile, 'c+');

if ($handle !== false) {
    flock($handle, LOCK_EX);
    $stored = stream_get_contents($handle);
    $timestamps = is_string($stored) ? json_decode($stored, true) : [];
    if (!is_array($timestamps)) $timestamps = [];
    $recent = array_values(array_filter($timestamps, static fn ($value): bool => is_int($value) && $now - $value < 600));

    if (count($recent) >= 5) {
        flock($handle, LOCK_UN);
        fclose($handle);
        header('Retry-After: 600');
        respond(['error' => 'Слишком много заявок. Повторите попытку позже'], 429);
    }

    $recent[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($recent));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

$recipient = '9842@apmo.ru';
$subjectText = 'Заявка с сайта — ' . $fullName;
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$receivedAt = gmdate('c');
$message = implode("\r\n", [
    'ФИО: ' . $fullName,
    'Электронная почта: ' . $email,
    'Телефон: ' . $phone,
    '',
    'Описание ситуации:',
    $problem,
    '',
    'Согласие на обработку ПД: версия ' . $consentVersion,
    'Получено: ' . $receivedAt,
]);

$from = 'no-reply@xn----7sbbahcndsmamrwi2a7b2a6n.xn--p1ai';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Сайт адвоката <' . $from . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$sent = @mail($recipient, $subject, $message, $headers, '-f' . $from);
if (!$sent) {
    respond(['error' => 'Сервис отправки временно недоступен'], 502);
}

respond(['ok' => true]);
