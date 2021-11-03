<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$ch = curl_init();

$payload = [
    'grant_type' => 'client_credentials',
    'client_id' => 'ed9779dd-199f-4d95-8a81-6e7e08a424b5',
    'client_secret'   => 'sor3IFpqo4l+*rd#A].s,Q.-N}6l68+T>]F@A)_;'
    // 'grant_type' => 'client_credentials',
    // 'client_id' => 'abca7966-8a40-462d-896e-e1c396296245',
    // 'client_secret'   => '9jDwo9&(Mf_aeX8Ce!hcnTto6B[rTBr4n;?{_0qY'
];

curl_setopt($ch, CURLOPT_URL, 'https://services.sentinel-hub.com/oauth/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));

$headers = array();
$headers[] = 'Content-Type: application/x-www-form-urlencoded';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
else {
	echo $result;
}

curl_close($ch);

