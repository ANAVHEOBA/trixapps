curl -v \
-H "Authorization: Bearer bMmQu8V5U76R5MBLWgBcO6GNLI5vYUSJmNoue3yHe688783a" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "X-Requested-With: XMLHttpRequest" \
-X POST \
-d '{
    "id": "utme",
    "qty": 1,
    "account": "wisdomvolt@gmail.com",
    "phone": "09012345678",
    "pin": "1234"
}' \
"http://192.168.246.236:8001/api/payscribe/epins/purchase"


{
    "success": true,
    "message": "ePin transaction successful",
    "data": {
        "reference": "PS_EPIN_xxxxxxxx_1234567890",
        "amount": 6200.00,
        "quantity": 1,
        "new_balance": 43800.00,
        "epins": [
            {
                "pin": "12345678",
                "serial": "ABC123XYZ",
                "instructions": "Visit jamb.org.ng to use this pin"
            }
        ]
    }
}

