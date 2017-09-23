var servicePath = "http://baklava7.de/mapi/Msvc.php";

function restfulGetCall(restSuccess) {
    $.get(servicePath, function(data) {
        restSuccess(data);
    }).fail(function() {
        //msgWarning("Uyarı!", "Bilgiler Alınamıyor...");
    });


}


function restfulPostCall(sendData) {
    myApp.alert("hi rest");
    var response;

    $$.ajax({
        method: 'POST',
        async: false,
        url: servicePath,
        data: JSON.stringify(sendData),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data, status, xmlRequest) {

            myApp.alert("success");
            console.log(data[0].status);
            response = data;

            /*
            myApp.alert(JSON.stringify(data));

            if (data[0].status != "NOK") {
                mainView.router.loadPage({ url: 'create_order.html', ignoreCache: true });
            }
            */

        },
        error: function(request, status, error) {
            response = "Error";
            myApp.alert("error");
            /*
            myApp.hidePreloader();
            //myApp.alert(JSON.stringify(data));
            myApp.alert("Request error");
            */
        }

    });

    return response;


}

function mobileLogin(email, passwd) {

    var lgndata = {
        'opr': 'login',
        'email': email,
        'pswd': passwd
    }

    myApp.alert(JSON.stringify(lgndata));

    var result = restfulPostCall(lgndata);

    myApp.alert(JSON.stringify(result));
}