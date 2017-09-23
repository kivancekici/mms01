var servicePath = "http://baklava7.de/mapi/Msvc.php";

function restfulGetCall(restSuccess) {
    $.get(servicePath, function(data) {
        restSuccess(data);
    }).fail(function() {
        //msgWarning("Uyarı!", "Bilgiler Alınamıyor...");
    });


}


function restfulPostCall(sendData) {

    var response;

    $$.ajax({
        method: 'POST',
        async: false,
        url: servicePath,
        data: JSON.stringify(sendData),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data, status, xmlRequest) {



            console.log("success" + data[0].status);
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
            console.log("Error");
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



    var result = restfulPostCall(lgndata);

    myApp.alert(JSON.stringify(result));
}