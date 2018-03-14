var clientId = "Aa7TvwMfjbKQeFTCwWU1EkUfIxjK_OwAInx5rRCs-dVFzTOOjXx_4IGS364i8sIUQwNhwA91JQFLaqQl";
var secret = "EMVlv2AtqyKrPkBUnxiiM6hp_PICwqr2GTlnCFsXChEZIQKMvvRiz_-mhoIupBJv7iP-UCou1uj465UU";

function getAccessToken() {

    var response;


    $$.ajax({
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "Authorization": "Basic " + btoa(clientId + ":" + secret)
        },
        async: false,
        url: "https://api.sandbox.paypal.com/v1/oauth2/token",
        method: "POST",
        dataType: 'json',
        data: "grant_type=client_credentials",
        success: function(data, status, xmlRequest) {
            //  myApp.hidePreloader();
            response = data;
        },
        error: function(request, status, error) {
            //  myApp.hidePreloader();
            response = "Error";
        }
    });

    return response;

}




function createPayment(accessToken) {

    var response;

    var paymentData = {
        "intent": "sale",
        "experience_profile_id": "XP-4LYG-9TWE-XREQ-9ZMF",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": "30.11",
                "currency": "USD",
                "details": {
                    "subtotal": "30.00",
                    "tax": "0.07",
                    "shipping": "0.03",
                    "handling_fee": "1.00",
                    "shipping_discount": "-1.00",
                    "insurance": "0.01"
                }
            },
            "description": "The payment transaction description.",
            "custom": "EBAY_EMS_90048630024435",
            "invoice_number": "48787589673",
            "payment_options": {
                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
            "soft_descriptor": "ECHI5786786",
            "item_list": {
                "items": [{
                        "name": "hat",
                        "description": "Brown hat.",
                        "quantity": "5",
                        "price": "3",
                        "tax": "0.01",
                        "sku": "1",
                        "currency": "USD"
                    },
                    {
                        "name": "handbag",
                        "description": "Black handbag.",
                        "quantity": "1",
                        "price": "15",
                        "tax": "0.02",
                        "sku": "product34",
                        "currency": "USD"
                    }
                ],
                "shipping_address": {
                    "recipient_name": "Brian Robinson",
                    "line1": "4th Floor",
                    "line2": "Unit #34",
                    "city": "San Jose",
                    "country_code": "US",
                    "postal_code": "95131",
                    "phone": "011862212345678",
                    "state": "CA"
                }
            }
        }],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }


    $$.ajax({
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        async: false,
        url: "https://api.sandbox.paypal.com/v1/payments/payment",
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(paymentData),
        success: function(data, status, xmlRequest) {
            //  myApp.hidePreloader();
            response = data;
        },
        error: function(request, status, error) {
            //  myApp.hidePreloader();
            console.log('my message' + error);
        }
    });

    return response;

}

