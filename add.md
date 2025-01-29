ab@ab:~/Trix-API$ # 1. Initialize new transaction
curl -v \         # 1. Initialize new transaction
curl -v \rization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \quest" \
-H "X-Requested-With: XMLHttpRequest" \
-X POST \
-d '{amount": 5000,
    "amount": 5000,mvolt@gmail.com"
    "email": "wisdomvolt@gmail.com"
}' \p://192.168.246.236:8001/api/paystack/initialize"
"http://192.168.246.236:8001/api/paystack/initialize"
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying 192.168.246.236:8001...
* Connected to 192.168.246.236 (192.168.246.236) port 8001 (#0)
> POST /api/paystack/initialize HTTP/1.1
> Host: 192.168.246.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> Content-Length: 59
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Host: 192.168.246.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Wed, 22 Jan 2025 11:58:28 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":true,"message":"Transaction initialized","data":{"status":true,"message":"Authorization URL created","data":{"authorization_url":"https:\/\/checkout.paystack.com\/6yp5lzwzn7tcow4","access_code":"6yp5lzwzn7tcow4","reference":"rrkx7elgcurl -v \ab:~/Trix-API$ curl -v \
-H "Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
"http://192.168.246.236:8001/api/paystack/verify/rrkx7elg67"
*   Trying 192.168.246.236:8001...
* Connected to 192.168.246.236 (192.168.246.236) port 8001 (#0)
> GET /api/paystack/verify/rrkx7elg67 HTTP/1.1
> Host: 192.168.246.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a
> Content-Type: application/json
> Accept: application/json
> X-Requested-With: XMLHttpRequest
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Host: 192.168.246.236:8001
< Connection: close
< X-Powered-By: PHP/8.4.1
< Cache-Control: no-cache, private
< Date: Wed, 22 Jan 2025 11:59:42 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
* Closing connection 0
{"success":true,"message":"Transaction already processed","data":{"status":"completed","amount":"5000.00","reference":"rrkx7elg67","created_at":"2025-01-22T11:58:56.000000Z"}}ab@ab:~/Trix-API$ 