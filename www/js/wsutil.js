var servicePath = "http://baklava7.de/mapi/Msvc.php";

function restfulGetCall(restSuccess) {
    $.get(servicePath, function(data) {
        restSuccess(data);
    }).fail(function() {

    });


}


function restfulPostCall(sendData) {

    myApp.showPreloader();

    var response;

    $$.ajax({
        method: 'POST',
        async: false,
        url: servicePath,
        data: JSON.stringify(sendData),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data, status, xmlRequest) {
            myApp.hidePreloader();
            response = data;
        },
        error: function(request, status, error) {
            myApp.hidePreloader();
            response = "Error";
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

    if (result != "Error") {

        if (result[0].status != "NOK") {
            return result[0].id_customer;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}

function mobileRegister(email) {

    var registerdata = {
        'opr': 'register',
        'email': email
    }

    var result = restfulPostCall(registerdata);

    myApp.alert(result.status);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result.pswd;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}

function checkAvaibleUser(email) {

    var registerdata = {
        'opr': 'checkAvaibleUser',
        'email': email
    }

    var result = restfulPostCall(registerdata);


    if (result != "Error") {

        if (result.status == "NOK") {
            return "OK";
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}