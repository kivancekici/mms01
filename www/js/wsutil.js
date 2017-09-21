
var servicePath="http://baklava7.de/mapi/Msvc.php";

function restfulGetCall(restSuccess) {
    $.get(servicePath, function (data) {
        restSuccess(data);
    }).fail(function () {
        //msgWarning("Uyarı!", "Bilgiler Alınamıyor...");
    });


}


function restfulPostCall(sendData, restSuccess) {
    $$.ajax({
        url: servicePath ,
        method: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(sendData),
        success: function (data) {
            restSuccess(data);
        }
    });
}

function mobileLogin(email,passwd) {

    var ansdata = {
            'opr': 'login',
            'email': email,
            'pswd': passwd
    }

    restfulCall(ansdata, function (data) {

        if (data!='NOK') {
            return data;

        } else {
            return null;
        }
    });
}

