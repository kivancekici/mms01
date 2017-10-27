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

function mobileRegister(email, name, surname, pass, genderId, birthday) {

    var registerdata = {
        'opr': 'register',
        'id_gender': genderId,
        'firstname': name,
        'lastname': surname,
        'email': email,
        'passwdOpen': pass,
        'birthday': birthday
    }

    var result = restfulPostCall(registerdata);


    if (result != "Error") {

        if (result.status != "NOK") {
            return "OK";
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

function getUserInfo(userId) {


    var userdata = {
        'opr': 'getuserinfo',
        'id_customer': userId
    }

    var result = restfulPostCall(userdata);

    myApp.alert(result);


    if (result != "Error") {

        return result;

    } else {
        return "NOK"
    }

}