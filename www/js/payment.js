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




function createPayment(accessToken){
    
    var response;

    var paymentData = {
        "intent": "sale",
        "redirect_urls": {
          "return_url": "https://example.com/your_redirect_url.html",
          "cancel_url": "https://example.com/your_cancel_url.html"
        },
        "payer": {
          "payment_method": "paypal"
        },
        "transactions": [{
          "amount": {
            "total": "7.47",
            "currency": "USD"
          }
        }]
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


