<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// 配置
$placeId = 'ChIJeeVS1S9TaDQRF8HFHKVqbm4';  // 海放你基地的 Place ID
$apiKey = getenv('GOOGLE_MAPS_API_KEY');     // 從環境變數獲取 API Key
$cacheFile = 'review_cache.json';            // 快取檔案
$cacheExpiry = 24 * 60 * 60;                 // 快取過期時間（24小時）

// 檢查 API Key
if (!$apiKey) {
    http_response_code(500);
    die(json_encode(['error' => '未設定 Google Maps API Key']));
}

// 檢查快取
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheExpiry)) {
    $cachedData = file_get_contents($cacheFile);
    if ($cachedData) {
        echo $cachedData;
        exit;
    }
}

// 構建 API URL
$url = "https://maps.googleapis.com/maps/api/place/details/json?".
       "place_id={$placeId}&".
       "fields=reviews&".
       "key={$apiKey}&".
       "language=zh-TW";

// 使用 cURL 獲取數據
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'HaveFunnyBase/1.0'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 檢查回應
if ($httpCode !== 200) {
    http_response_code($httpCode);
    die(json_encode(['error' => '無法獲取評論，HTTP狀態碼: ' . $httpCode]));
}

$data = json_decode($response, true);
if (!$data || isset($data['error'])) {
    http_response_code(500);
    die(json_encode(['error' => '解析評論失敗']));
}

// 對評論進行排序和篩選
if (isset($data['result']['reviews'])) {
    $reviews = $data['result']['reviews'];
    
    // 按評分和時間排序
    usort($reviews, function($a, $b) {
        if ($a['rating'] === $b['rating']) {
            return strtotime($b['time']) - strtotime($a['time']);
        }
        return $b['rating'] - $a['rating'];
    });
    
    $data['result']['reviews'] = array_slice($reviews, 0, 10); // 只取前10則評論
}

// 儲存到快取
file_put_contents($cacheFile, json_encode($data));

// 返回評論數據
echo json_encode($data);
