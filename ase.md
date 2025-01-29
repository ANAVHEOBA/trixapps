ab@ab:~/Trix-API$ curl -X GET \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Accept: application/json" \
  "http://192.168.246.236:8001/api/payscribe/betting/validate?bet_id=bet9ja&customer_id=422984"
{"success":true,"message":"Validation successful","data":{"name":"Olisaemeka Ezeuchenne","account":"422984"}}ab@ab:~/Trix-API$ curl -X POST \
  -H "Authorizatiocurl -X POST \eURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{t_id": "bet9ja",
    "bet_id": "bet9ja",984",
    "customer_id": "422984",meka Ezeuchenne",
    "customer_name": "Olisaemeka Ezeuchenne",
    "amount": 1000,
    "pin": "1234"
  }' \://192.168.246.236:8001/api/payscribe/betting/fund
  http://192.168.246.236:8001/api/payscribe/betting/fund
{"success":false,"message":"An error occurred while funding bet wallet"}ab@ab:~/Trix-API$ curl -X POST   -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1"   -H "Content-Type: application/json"   -H "Accept: application/json"   -d '{
    "bet_id": "bet9ja",
    "customer_id": "422984",
    "customer_name": "Olisaemeka Ezeuchenne",
    "amount": 100,
    "pin": "1234"
  }'   http://192.168.246.236:8001/api/payscribe/betting/fund
{"message":"Class \"App\\Services\\Payscribe\\Validator\" not found","code":0}ab@ab:~/Trix-API$ curl -X POST   -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1"   -H "Content-Type: application/json"   -H "Accept: application/json"   -d '{
    "bet_id": "bet9ja",
    "customer_id": "422984",
    "customer_name": "Olisaemeka Ezeuchenne",
    "amount": 100,
    "pin": "1234"
  }'   http://192.168.246.236:8001/api/payscribe/betting/fund
{"success":true,"message":"BET9JA payment successful.","data":{"reference":"PS_BET_54LLekz4ik_1737916897","amount":100,"status":"completed","new_balance":"4234310.00","details":{"trans_id":"8587b910-a683-450c-b4fb-fd802a1af298","transaction_status":"success","ref":"PS_BET_54LLekz4ik_1737916897","account":"422984","bet_id":"bet9ja","created_at":"2025-01-26curl -X GET \ab@ab:~/Trix-API$ curl -X GET \
  -H "Authorization: Bearer aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Accept: application/json" \
  "http://192.168.246.236:8001/api/payscribe/bouquets?service=dstvshowmax"
{"success":false,"message":"Unable to fetch bouquet plans at the moment.","data":{"error_code":"FETCH_FAILED"}}ab@ab:~/Trix-API$ cucurl -X GET \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Accept: application/json" \
  "http://192.168.246.236:8001/api/payscribe/bouquets?service=gotv"
{"success":false,"message":"Service is temporarily unavailable.","data":{"error_code":"SYSTEM_ERROR"}}ab@ab:~/Trix-API$ curl -X GET   -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1"   -H "Accept: application/json"   "http://192.168.246.236:8001/api/payscribe/bouquets?service=gotv"
{"success":true,"message":"GOTV lookup successfully.","data":{"service":"gotv","plans":[{"id":"WWdHcERRS05zMmpBYUEvNHhteEpWdz09","name":"GOtv Smallie - monthly","alias":"GOHAN","amount":1575,"priceOptions":[]},{"id":"T2NKUzNkY1ZVakIyNGJSVjRHZGpNUT09","name":"GOtv Jinja Bouquet","alias":"GOTVNJ1","amount":3300,"priceOptions":[]},{"id":"NWZBN1ZUSkJadG0xY3BKZEEwNWpoQT09","name":"GOtv Smallie - quarterly","alias":"GOLITE","amount":4175,"priceOptions":[]},{"id":"cnMyZUpYcGhLSUV1eWllOGhmTzF0dz09","name":"GOtv Jolli Bouquet","alias":"GOTVNJ2","amount":4850,"priceOptions":[]},{"id":"UUwra1dKRWJpaWQxUEZPTW9YUDQ0QT09","name":"GOtv Max","alias":"GOTVMAX","amount":7200,"priceOptions":[]},{"id":"dVhXUnpsenZhcTBWSmhwQWZUMHY1dz09","name":"GOtv Supa","alias":"GOTVSUPA","amount":9600,"priceOptions":[]},{"id":"RGExckQyT1Zwc0hXMjI3UXhqMS9LZz09","name":"GOtv Smallie - yearly","alias":"GOLTANL","amount":12300,"priceOptions":[]},{"id":"aldhSXorLzgwVVdydzFSZFdkcWtZdz09","name":"GOtv Supa Plus","alias":"GOTVSUPAPLUS","amount":15700,"priceOptiocurl -X POST \b:~/Trix-API$ curl -X POST \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service": "dstv",
    "account": "8062415043",
    "month": 1,
    "plan_id": "RDJhb0xweVR6VjNLY0kyT2hhWkVsQT09"
  }' \
  http://192.168.246.236:8001/api/payscribe/multichoice/validate
{"success":false,"message":"Service is temporarily unavailable.","data":{"error_code":"SYSTEM_ERROR"}}ab@ab:~/Trix-API$ curl -X POST   -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1"   -H "Content-Type: application/json"   -H "Accept: application/json"   -d '{
    "service": "dstv",
    "account": "8062415043",
    "month": 1,
    "plan_id": "RDJhb0xweVR6VjNLY0kyT2hhWkVsQT09"
  }'   http://192.168.246.236:8001/api/payscribe/multichoice/validate
{"success":true,"message":"Validation successful","data":{"customer_name":"OKEOWO LIYIIKDSA","account_info":{"outstandingBalance":"20400","accountNumber":"8062415043","currentBouquet":"dstv compact","currentBouquetPlan":{"items":[{"code":"ng_dstv_compe36","name":"DStv Compact","price":15700,"description":"DStv Compact gives you access to a wide variety of programmes and hours "}],"amount":15700}},"service":"dstv","account":"8062415043","reference":"VAL_kCBZPfyPVc41"}}ab@ab:~/Trix-API$ curl -X POST \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service": "gotv",
    "account": "2009594253",
    "month": 1,
    "plan_id": "WWdHcERRS05zMmpBYUEvNHhteEpWdz09",
    "amount": 1575,
    "pin": "1234"
  http://192.168.246.236:8001/api/payscribe/multichoice/payment
{"success":false,"curl -X POST \ed to process payment"}ab@ab:~/Trix-API$ curl -X POST \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service": "gotv",
    "account": "2009594253",
    "month": 1,
    "plan_id": "WWdHcERRS05zMmpBYUEvNHhteEpWdz09"
  }' \
  http://192.168.246.236:8001/api/payscribe/multichoice/validate
{"success":true,"message":"Validation successful","data":{"customer_name":"ADEBAYO MOSUNMOLA","account_info":{"outstandingBalance":"4850","accountNumber":"2009594253","currentBouquet":"","currentBouquetPlan":{"items":[],"amount":0}},"service":"gotv","account":"2009594253","reference":"VAL_V4VF4kmMX9Lz"}}ab@ab:~/Trix-API$ curl -X POST \
  -H "Authorization: Bearer 45|aeURB61yA5sFPc7HKcvtnDQFEL0YzhtuF5LFGQIw855cccc1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "service": "gotv",
    "account": "2009594253",
    "customer_name": "CUSTOMER_NAME_FROM_VALIDATION",
    "plan_id": "WWdHcERRS05zMmpBYUEvNHhteEpWdz09",
    "months": 1,
    "pin": "1234"
  http://192.168.246.236:8001/api/payscribe/multichoice/payment
{"success":true,"message":"GOTV payment successful.","data":{"reference":"PS_MC_fhdPe4DqGV_1737918219","amount":1575,"service":"gotv","account":"2009594253","plan":"GOtv Smallie - monthly","months":1,"transaction_details":{"trans_id":"e4f2be59-7ce0-4077-a47a-015342489234","transaction_status":"success","account":"2009594253","service":"gotv","plan":"GOHAN","plan_id":"WWdHcERRS05zMmpBYUEvNHhteEpWdz09","ref":"PS_MC_fhdPe4DqGV_1737918219","amount":1575,"discount":14.175,"total_charged":1560.825,"currency":"NGN","created_at":"2025-01-26 19:03:40"},"new_balance":"4232735.00"}}ab@ab:~/Trix-API$ 