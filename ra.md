ab@ab:~/Trix-API$ curl -v \
-H "Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
"http://192.168.172.236:8001/api/payscribe/epins"
*   Trying 192.168.172.236:8001...
* Connected to 192.168.172.236 (192.168.172.236) port 8001 (#0)
> GET /api/payscribe/epins HTTP/1.1
> Host: 192.168.172.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Host: 192.168.172.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Tue, 21 Jan 2025 17:21:18 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":true,"message":"Epins lookup successfully.","data":{"epins":[{"name":"Educational Voucher","collection":[{"id":"de","name":"JAMB DE","amount":6200,"available":20},{"id":"utme_mock","name":"JAMB UTME MOCK","amount":7700,"available":20},{"id":"utme","name":"JAMB UTME","amount":6200,"available":20},{"id":"neco","name":"NECO Result Checker","amount":1200,"available":20},{"id":"waec","name":"WAEC Result Checker","amount":3750,"available":20}]}]}}ab@ab:~/Trix-API$ 




ab@ab:~/Trix-API$ curl -X POST "http://192.168.246.236:8001/api/payscribe/airtime" \
-H "Authorization: Bearer 27|UN64T5twrGeqLVI1ND7wd49RWbJHzdVp85ApRuoE47e8cd8a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "network": "mtn",
    "recipient": "08136789012",
    "amount": 50,
    "ported": false,
    "pin": "1234"
}'
{"success":true,"message":"Order received. Transaction in progress.","data":{"reference":"PS_LblS2IEVNP_1737643486","transaction_id":"ba408b4d-a65e-4c0b-a238-c32a59024069","amount":50,"status":"processing","new_balance":"4266400.00","discount":1.1}}ab@ab:~/Trix-API$ 

ab@ab:~/Trix-API$ curl -X POST "http://192.168.246.236:8001/api/payscribe/airtime" \pi/payscribe/airtime" \
-H "Authorization: Bearer 27|UN64T5twrGeqLVI1ND7wd49RWbJHzdVp85ApRuoE47e8cd8a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "network": "airtel",
    "recipient": "08023456789",
    "amount": 50,
    "ported": false,
    "pin": "1234"
}'
{"success":true,"message":"Order received. Transaction in progress.","data":{"reference":"PS_dd3PblGRMr_1737643521","transaction_id":"6ebb85b4-8bd8-4563-b13f-b48183623512","amount":50,"status":"processing","new_balance":"4266350.00","discount":1}}ab@ab:~/Trix-API$ 



ab@ab:~/Trix-API$ curl -X POST "http://192.168.246.236:8001/api/payscribe/airtime" \
-H "Authorization: Bearer 27|UN64T5twrGeqLVI1ND7wd49RWbJHzdVp85ApRuoE47e8cd8a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "network": "glo",
    "recipient": "08057891234",
    "amount": 50,
    "ported": false,
    "pin": "1234"
}'
{"success":true,"message":"Order received. Transaction in progress.","data":{"reference":"PS_KoTclLbLlz_1737643577","transaction_id":"59473b1e-7284-4b05-8b5e-5910e389caf0","amount":50,"status":"processing","new_balance":"4266300.00","discount":2.5}}ab@ab:~/Trix-API$ 

ab@ab:~/Trix-API$ curl -X POST "http://192.168.246.236:8001/api/payscribe/airtime" \
-H "Authorization: Bearer 27|UN64T5twrGeqLVI1ND7wd49RWbJHzdVp85ApRuoE47e8cd8a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "network": "9mobile",
    "recipient": "08098765432",
    "amount": 50,
    "ported": false,
    "pin": "1234"
}'
{"success":true,"message":"Order received. Transaction in progress.","data":{"reference":"PS_BcVbnuDHYx_1737643616","transaction_id":"e8a5a08f-1824-4d57-a975-f82ddbe9d63c","amount":50,"status":"processing","new_balance":"4266250.00","discount":1.5}}ab@ab:~/Trix-API$ 

