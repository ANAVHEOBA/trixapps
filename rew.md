anavheoba@anavheoba:~/Trix-API$ # Get betting providers
curl -v \
  -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  "http://192.168.211.236:8001/api/payscribe/betting/providers"
*   Trying 192.168.211.236:8001...
* Connected to 192.168.211.236 (192.168.211.236) port 8001 (#0)
> GET /api/payscribe/betting/providers HTTP/1.1
> Host: 192.168.211.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Host: 192.168.211.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Mon, 20 Jan 2025 14:23:59 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":true,"message":"Betting service provider fetched successfully","data":[{"id":"supabet","title":"SupaBet","active":true},{"id":"sportybet","title":"SportyBet","active":true},{"id":"paripesa","title":"Paripesa","active":true},{"id":"onexbet","title":"One X Bet","active":true},{"id":"nairabet","title":"Naira Bet","active":true},{"id":"naijabet","title":"Naija Bet","active":true},{"id":"mylottohub","title":"MyLotto Hub","active":true},{"id":"mssport","title":"MsSport","active":true},{"id":"merrybet","title":"MerryBet","active":true},{"id":"betway","title":"BetWay","active":true},{"id":"betking","title":"BetKing","active":true},{"id":"bet9ja","title":"Bet9ja","active":true},{"id":"bangbet","title":"BangBet","active":true}]}anavheoba@anavheoba:~/Trix-API$ 


anavheoba@anavheoba:~/trixapps$ curl -v \
  -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  "http://192.168.211.236:8001/api/payscribe/betting/validate?bet_id=bet9ja&customer_id=12345678"
*   Trying 192.168.211.236:8001...
* Connected to 192.168.211.236 (192.168.211.236) port 8001 (#0)
> GET /api/payscribe/betting/validate?bet_id=bet9ja&customer_id=12345678 HTTP/1.1
> Host: 192.168.211.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Host: 192.168.211.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Mon, 20 Jan 2025 14:28:29 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":true,"message":"Validation successful","data":{"name":"HASSANA SAIDU","account":"12345678"}}anavheoba@anavheoba:~/trixapps$ # SportyBet valid# SportyBet validation
curl -v \
  -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  "http://192.168.211.236:8001/api/payscribe/betting/validate?bet_id=sportybet&customer_id=SB12345678"
*   Trying 192.168.211.236:8001...
* Connected to 192.168.211.236 (192.168.211.236) port 8001 (#0)
> GET /api/payscribe/betting/validate?bet_id=sportybet&customer_id=SB12345678 HTTP/1.1
> Host: 192.168.211.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 400 Bad Request
< Host: 192.168.211.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Mon, 20 Jan 2025 14:29:08 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":false,"message":"An error occurred while validating betting account"}anavheoba@anavheoba:~/trixapps$ # SportyBet validation                  # SportyBet validation
curl -v \
  -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  "http://192.168.211.236:8001/api/payscribe/betting/validate?bet_id=sportybet&customer_id=SB12345678"
*   Trying 192.168.211.236:8001...
* Connected to 192.168.211.236 (192.168.211.236) port 8001 (#0)
> GET /api/payscribe/betting/validate?bet_id=sportybet&customer_id=SB12345678 HTTP/1.1
> Host: 192.168.211.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 400 Bad Request
< Host: 192.168.211.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Mon, 20 Jan 2025 14:29:18 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":false,"message":"Account name not found, please try again with a valid account id"}anavheoba@anavheoba:~/trixapps$ 