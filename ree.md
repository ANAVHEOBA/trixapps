anavheoba@anavheoba:~/Trix-API$ curl -v   -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71"   -H "Content-Type: application/json"   -H "Accept: application/json"   -H "X-Requested-With: XMLHttpRequest"   "http://192.168.172.236:8001/api/payscribe/bouquets?service=dstv"
*   Trying 192.168.172.236:8001...
* Connected to 192.168.172.236 (192.168.172.236) port 8001 (#0)
> GET /api/payscribe/bouquets?service=dstv HTTP/1.1
> Host: 192.168.172.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
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
< Date: Tue, 21 Jan 2025 09:01:19 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
{"success":true,"message":"DSTV lookup successfully.","data":{"service":"dstv","plans":[{"id":"RWpqNXRDckJTNHVpeUN3QU11dlM2QT09","name":"Padi","alias":"NLTESE36","amount":3600,"priceOptions":[]},{"id":"K2U2dU1Wd0NuSnMrYmpkNUNKTEhIQT09","name":"GWALLE36 - Great Wall Standalone Bouquet E36 + Showmax","alias":"SHOWGWALLE36","amount":4950,"priceOptions":[]},{"id":"cklmYzI3RzY2aVQ3L0xjMTM1Qkd3Zz09","name":"DStv Yanga Bouquet E36","alias":"NNJ1E36","amount":5100,"priceOptions":[]},{"id":"K1dGb3o5UmtlL0x4T0UzbnVyOTBTdz09","name":"DStv Yanga OTT Streaming Subscription","alias":"YANGAOTT","amount":5100,"priceOptions":[]},{"id":"YmZ2ZnNLK0owRHdQWTd2N0p2UDRKdz09","name":"DStv Padi Bouquet E36 + Showmax","alias":"SHOWNLTESE36","amount":6100,"priceOptions":[]},{"id":"YXdibXNSUGJIdmhUR0I5QmhOSUhuZz09","name":"DStv Yanga Bouquet E36 + Showmax","alias":"SHOWNNJ1E36","amount":6550,"priceOptions":[]},{"id":"amRMUDBOa05pYkV1VXNiMmpqUmFnZz09","name":"Padi + HDPVR\/XtraView","alias":"NLTESE36","amount":8600,"priceOptions":[]},{"id":"TnpRK0N5Z2hwbElEa0srdjJXQnBUdz09","name":"DStv Confam Bouquet E36","alias":"NNJ2E36","amount":9300,"priceOptions":[]},{"id":"K2lCZkY3eXBNQWxLZTcva1Q5WHJJQT09","name":"DStv Comfam Streaming Subscription","alias":"COMFAMOTT","amount":9300,"priceOptions":[]},{"id":"ZVBTMGN5K0xoYzRtSG1KL1FjVjhqZz09","name":"GWALLE36 - Great Wall Standalone Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWGWALLE36","amount":9950,"priceOptions":[]},{"id":"a3pTUkk3Y2pJM3E5VTIxajdwbWVTQT09","name":"DStv Yanga Bouquet E36 + HDPVR\/XtraView","alias":"NNJ1E36","amount":10100,"priceOptions":[]},{"id":"SXNCN2NzRExpRmxGcnN1ajk0SkpKUT09","name":"DStv Yanga OTT Streaming Subscription + HDPVR\/XtraView","alias":"YANGAOTT","amount":10100,"priceOptions":[]},{"id":"dVdUZGJwMzRJT1NyaGt3em8xaEV5dz09","name":"DStv Comfam Bouquet E36 + Showmax","alias":"SHOWNNJ2E36","amount":10750,"priceOptions":[]},{"id":"dUxqVDJ4VG9UWXFHRDJ5RXA1NFRYdz09","name":"DStv Padi Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWNLTESE36","amount":11100,"priceOptions":[]},{"id":"SWpBMUVqdStoL2dIeFREeUhwYlJMUT09","name":"DStv Yanga Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWNNJ1E36","amount":11550,"priceOptions":[]},{"id":"ZFVYMi9lTmY0Vy96QVFsRlJiK0ZhUT09","name":"Asian Bouqet","alias":"ASIAE36","amount":12400,"priceOptions":[]},{"id":"NU1QaVhpMG1PWlUzT2pvK2pBQVVYQT09","name":"DStv Confam Bouquet E36 + HDPVR\/XtraView","alias":"NNJ2E36","amount":14300,"priceOptions":[]},{"id":"eXpQNHNUVzkvZm5QOWdZYUtubGMzQT09","name":"DStv Comfam Streaming Subscription + HDPVR\/XtraView","alias":"COMFAMOTT","amount":14300,"priceOptions":[]},{"id":"akU3bW9vbW5qYzFmaVU1YTV0T1lGQT09","name":"ASIAE36 - Asian Bouquet E36 + Showmax","alias":"SHOWASIAE36","amount":14900,"priceOptions":[]},{"id":"WDdqUUgrMVBtaFVOL0p2Wk01dm5SUT09","name":"DStv Compact","alias":"COMPE36","amount":15700,"priceOptions":[]},{"id":"RUwxbUZlSDd2L0FmVmxNN0lVd1JaZz09","name":"DStv Compact Streaming Subscription","alias":"COMPOTT","amount":15700,"priceOptions":[]},{"id":"K3FGMG5wS0x0eXVuSkMyUXdJcm1JQT09","name":"DStv Comfam Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWNNJ2E36","amount":15750,"priceOptions":[]},{"id":"bzNqS04yWngyd0k4UHB6T1FQRHFRQT09","name":"DStv Compact Bouquet E36 + Showmax","alias":"SHOWCOMPE36","amount":17150,"priceOptions":[]},{"id":"Z0llZkdQOVlFUGFFMGhGd3g1OVE5QT09","name":"Asian Bouqet + HDPVR\/XtraView","alias":"ASIAE36","amount":17400,"priceOptions":[]},{"id":"ZUlqdmMvVHRJTlJ4Nk5DejhIRldxUT09","name":"ASIAE36 - Asian Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWASIAE36","amount":19900,"priceOptions":[]},{"id":"RDJhb0xweVR6VjNLY0kyT2hhWkVsQT09","name":"DStv Compact + HDPVR\/XtraView","alias":"COMPE36","amount":20700,"priceOptions":[]},{"id":"V3BoSmMrWmJoRFJpdUZ0NXBjdGNMZz09","name":"DStv Compact Streaming Subscription + HDPVR\/XtraView","alias":"COMPOTT","amount":20700,"priceOptions":[]},{"id":"dVFGRVdXNW9FMllSblluM29aVDRzQT09","name":"DStv Compact Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWCOMPE36","amount":22150,"priceOptions":[]},{"id":"VmFrcm9tQW9JcHNmTFJhS093VFE5QT09","name":"DStv Compact Plus","alias":"COMPLE36","amount":25000,"priceOptions":[]},{"id":"U0E2L016b3JaYlN2cDVPOFVmc3REQT09","name":"DStv Compact Plus Streaming Subscription","alias":"COMPLSOTT","amount":25000,"priceOptions":[]},{"id":"SXQwM00xUlFLOTVmUk9HaENtT1M2QT09","name":"DStv Compact Plus Bouquet E36 + Showmax","alias":"SHOWCOMPLE36","amount":26450,"priceOptions":[]},{"id":"Q2hQZUN3emthcVFjMTJVQTZJZnhEQT09","name":"PRWASIE36-Premium W\/Afr E36 + ASIAE36 + Showmax","alias":"SHOWPRWASIE36","amount":27500,"priceOptions":[]},{"id":"RjBGeHE2bkRSUkNTVUZCRUlGblNhdz09","name":"DStv Compact Plus + HDPVR\/XtraView","alias":"COMPLE36","amount":30000,"priceOptions":[]},{"id":"Z25oZnhqNkRLcDVDZ2d5Z3ZUa0NhZz09","name":"DStv Compact Plus Streaming Subscription + HDPVR\/XtraView","alias":"COMPLSOTT","amount":30000,"priceOptions":[]},{"id":"REhGTEh6N0pFU0pLNm5JZmk0THZRdz09","name":"DStv Compact Plus Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWCOMPLE36","amount":31450,"priceOptions":[]},{"id":"Z3ZhUkEyaDV5clpyaWpxNzdGZGt6QT09","name":"PRWASIE36-Premium W\/Afr E36 + ASIAE36 + Showmax + HDPVR\/XtraView","alias":"SHOWPRWASIE36","amount":32500,"priceOptions":[]},{"id":"TnNSdkxhdVdmMG1SUTBaajVIOGhYQT09","name":"DStv Premium","alias":"PRWE36","amount":37000,"priceOptions":[]},{"id":"aUZnR3VEOEpPUEV0UmJUOW54R2s1QT09","name":"DStv Premium W\/Afr E36 + Showmax","alias":"SHOWPRWE36","amount":37000,"priceOptions":[]},{"id":"MzdXM2Y1VjRyYU4xN2tsNkxvS3ZSZz09","name":"DStv Premium Streaming Subscription","alias":"PREMOTT","amount":37000,"priceOptions":[]},{"id":"ejFuT2FSTXErSzMwT0JVNnlVbElQZz09","name":"DStv Premium Asia","alias":"PRWASIE36","amount":42000,"priceOptions":[]},{"id":"STc5enQvSVBab2RXR1J0ZU80bkhrQT09","name":"DStv Premium + HDPVR\/XtraView","alias":"PRWE36","amount":42000,"priceOptions":[]},{"id":"bFlnejdybXBOaVhKNlBPNjN4OVF2dz09","name":"DStv Premium W\/Afr E36 + Showmax + HDPVR\/XtraView","alias":"SHOWPRWE36","amount":42000,"priceOptions":[]},{"id":"SDRRaEMzeWtsRUQ0SWlwNzNyLzByQT09","name":"DStv Premium Streaming Subscription + HDPVR\/XtraView","alias":"PREMOTT","amount":42000,"priceOptions":[]},{"id":"R3dzU3BGdFdENzVqWVB2QnhqRjl1Zz09","name":"DStv Premium Asia + HDPVR\/XtraView","alias":"PRWASIE36","amount":47000,"priceOptions":[]},{"id":"VFFnRWo1MWRPTGpoZWZNU3Ric2lvQT09","name":"DStv Premium French","alias":"PRWFRNSE36","amount":57500,"priceOptions":[]},{"id":"Z1lqTlErQUI2MDZvdVh5MHRlMCtPZz09","name":"DStv Premium W\/Afr + French Bonus Bouquet E36 + Showmax","alias":"SHOWPRWFRNSE36","amount":57500,"priceOptions":[]},{"id":"cTRIZmpEQldTelhoZFdhYmd4UkhGdz09","name":"DStv Premium French + HDPVR\/XtraView","alias":"PRWFRNSE36","amount":62500,"priceOptions":[]},{"id":"YWtpVUt0UGdDazFCeTFaTHRxMnZpZz09","name":"DStv Premium W\/Afr + French Bonus Bouquet E36 + Showmax + HDPVR\/XtraView","alias":"SHOWPRWFRNSE36","amount":62500,"priceOptions":[]},{"id":"aXdOZGE0VmE3eGFITjRZbGd6SElDUT09","name":"DStv Prestige","alias":"PRESTIGENGE36","amount":850000,"priceOptions":[]},{"id":"T3JETjIrWlJMM1hBekFNbjArR2pSUT09","n* Closing connection 0
ame":"DStv Prestige + HDPVR\/XtraView","alias":"PRESTIGENGE36","amount":855000,"priceOptions":[]}]}}anavheoba@anavheoba:~/Trix-API$ 



anavheoba@anavheoba:~/Trix-API$ curl -v \
  -H "Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  "http://192.168.172.236:8001/api/payscribe/bouquets?service=gotv"
*   Trying 192.168.172.236:8001...
* Connected to 192.168.172.236 (192.168.172.236) port 8001 (#0)
> GET /api/payscribe/bouquets?service=gotv HTTP/1.1
> Host: 192.168.172.236:8001
> User-Agent: curl/7.81.0
> Authorization: Bearer 28|nqgNyn0E1Roc8UcDpP6JTDWXgJbFcoxUezoAUDlX038cae71
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
< Date: Tue, 21 Jan 2025 09:03:21 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
{"success":true,"message":"GOTV lookup successfully.","data":{"service":"gotv","plans":[{"id":"WWdHcERRS05zMmpBYUEvNHhteEpWdz09","name":"GOtv Smallie - monthly","alias":"GOHAN","amount":1575,"priceOptions":[]},{"id":"T2NKUzNkY1ZVakIyNGJSVjRHZGpNUT09","name":"GOtv Jinja Bouquet","alias":"GOTVNJ1","amount":3300,"priceOptions":[]},{"id":"NWZBN1ZUSkJadG0xY3BKZEEwNWpoQT09","name":"GOtv Smallie - quarterly","alias":"GOLITE","amount":4175,"priceOptions":[]},{"id":"cnMyZUpYcGhLSUV1eWllOGhmTzF0dz09","name":"GOtv Jolli Bouquet","alias":"GOTVNJ2","amount":4850,"priceOptions":[]},{"id":"UUwra1dKRWJpaWQxUEZPTW9YUDQ0QT09","name":"GOtv Max","alias":"GOTVMAX","amount":7200,"priceOptions":[]},{"id":"dVhXUnpsenZhcTBWSmhwQWZUMHY1dz09","name":"GOtv Supa","alias":"GOTVSUPA","amount":9600,"priceOptions":[]},{"id":"RGExckQyT1Zwc0hXMjI3UXhqMS9LZz09","name":"GOtv Smallie - yearly","alias":"GOLTANL","amount":12300,"priceOptions":[]},{"id":"aldhSXorLzgwVVdydzFSZFdkcWtZdz09","name":"GOtv Supa Plus","alias":"GOTVSUPAPLUS","amount":15700,* Closing connection 0
"priceOptions":[]}]}}anavheoba@anavheoba:~/Trix-API$ 



ab@ab:~/Trix-API$ curl -v \
-H "Authorization: Bearer 5|bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
"http://192.168.172.236:8001/api/payscribe/bouquets?service=startimes"
*   Trying 192.168.172.236:8001...
* Connected to 192.168.172.236 (192.168.172.236) port 8001 (#0)
> GET /api/payscribe/bouquets?service=startimes HTTP/1.1
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
< Date: Tue, 21 Jan 2025 14:16:04 GMT
< Content-Type: application/json
< Access-Control-Allow-Origin: *
< 
{"success":true,"message":"STARTIMES lookup successfully.","data":{"service":"startimes","plans":[{"id":"YkhCeHlZeHFqRTkvdFdTRi94dTY4UT09","name":"Nova (Antenna) - Weekly","alias":"novaweek","amount":500,"priceOptions":[]},{"id":"RzVQUjVNUm40SVlLWnJBMmpjZlVNUT09","name":"Nova (Dish) - Weekly","alias":"novadishweek","amount":600,"priceOptions":[]},{"id":"RS9qbHVnZzVNc3pKRzlieFdickluQT09","name":"Basic (Antenna) - Weekly","alias":"basicweek","amount":1100,"priceOptions":[]},{"id":"aUFnUDQ0TVJsWXd1eFdIVzBHYkxQZz09","name":"Basic (Dish) - Weekly","alias":"smartweek","amount":1400,"priceOptions":[]},{"id":"cEJVVjVyK05LY1hKMk5aOXluYXFhQT09","name":"Classic (Antenna) - Weekly","alias":"classicweek","amount":1700,"priceOptions":[]},{"id":"T3NHTGkvMFJpTEh0NDhBQlJOQm44QT09","name":"Nova (Antenna) - Monthly","alias":"nova","amount":1700,"priceOptions":[]},{"id":"c2ZjNlY2eGdGeFdqMTdrVDZRb3JWUT09","name":"Nova (Dish) - Monthly","alias":"novadish","amount":1700,"priceOptions":[]},{"id":"UkM5THhGRTk1bUVtUWJSOFY5SmZXQT09","name":"Super (Antenna) - Weekly","alias":"superweek-antenna","amount":2700,"priceOptions":[]},{"id":"aUJSaVVNMy9uWENLengwdWZtUHhvUT09","name":"Super (Dish) - Weekly","alias":"superweek","amount":2800,"priceOptions":[]},{"id":"b3hkOGFtaFBZMzE4dXFkNm8wTDRDUT09","name":"Basic (Antenna) - Monthly","alias":"basic","amount":3300,"priceOptions":[]},{"id":"enNMNzZZV01OMXFwbERFZUFxZk4wZz09","name":"Basic (Dish) - Monthly","alias":"smart","amount":4200,"priceOptions":[]},{"id":"ZFBNNUtMZUdwK1VEcXYxSlZlUGtrdz09","name":"Classic (Antenna) - Monthly","alias":"classic","amount":5000,"priceOptions":[]},{"id":"M2ttTE9IaXUvRmZpcWpjeDAxUGRaUT09","name":"Global (Dish) - Weekly","alias":"global-dish-weekly","amount":6000,"priceOptions":[]},{"id":"d1VQMVU4N1hsdnNsdWIvT25jQzlqQT09","name":"Classic (Dish) - Monthly","alias":"special","amount":6200,"priceOptions":[]},{"id":"c09icm1XOGpqclUwbStxRTRLYWwvdz09","name":"Super (Antenna) - Monthly","alias":"super-antenna","amount":8000,"priceOptions":[]},{"id":"TVRqdk5yYU1kdGpBa3ordzJsemdBQ* Closing connection 0
T09","name":"Super (Dish) - Monthly","alias":"super","amount":8200,"priceOptions":[]},{"id":"QTA0SmdHMEZoUWZxMDBpNDlSc0xlQT09","name":"Startimes Chinese (Dish) - Monthly","alias":"chinese","amount":16000,"priceOptions":[]},{"id":"c0NmMGtRa0p6ZUlZUlhicmZZVlprZz09","name":"Global (Dish) - Monthly","alias":"global-dish","amount":17000,"priceOptions":[]}]}}ab@ab:~/Trix-API$ 