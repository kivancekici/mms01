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

function updateAccount(email, name, surname, pass, genderId, birthday, newsletter, optin, userId) {

    var accountdata = {
        'opr': 'updateuserdata',
        'id_gender': genderId,
        'company': '',
        'firstname': name,
        'lastname': surname,
        'email': email,
        'passwd': pass,
        'birthday': birthday,
        'newsletter': newsletter,
        'optin': optin,
        'id_customer': userId,
        'website': ''
    }

    var result = restfulPostCall(accountdata);


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

function checkAvaibleUserForAccountUpdate(email, userId) {

    var userdata = {
        'opr': 'checkbeforeupdateuserdata',
        'email': email,
        'id_customer': userId
    }

    var result = restfulPostCall(userdata);


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

    myApp.alert(userId);
    var userdata = {
        'opr': 'getuserinfo',
        'id_customer': userId
    }

    var result = restfulPostCall(userdata);



    if (result != "Error") {

        return result

    } else {
        return "NOK"
    }


}


function saveAddress(id_country, id_state, id_customer, alias, company, lastname, firstname, address1, address2, postcode, city, phone, vat_number, date_add, date_upd, active, deleted) {

    var data = {
        'opr': 'saveaddress',
        'id_country': id_country,
        'id_state': id_state,
        'id_customer': id_customer,
        'alias': alias,
        'company': company,
        'lastname': lastname,
        'firstname': firstname,
        'address1': address1,
        'address2': address2,
        'postcode': postcode,
        'city': city,
        'phone': phone,
        'vat_number': vat_number,
        'date_add': date_add,
        'date_upd': date_upd,
        'active': active,
        'deleted': deleted
    }

    var result = restfulPostCall(data);


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

function deleteaddress(id_customer, alias, id_address) {

    var data = {
        'opr': 'deleteaddress',
        'id_customer': id_customer,
        'alias': alias,
        'id_address': id_address
    }

    var result = restfulPostCall(data);


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

function updateAddress(id_country, id_state, id_customer, alias, company, lastname, firstname, address1, address2, postcode, city, phone, vat_number, date_add, date_upd, active, deleted) {

    var data = {
        'opr': 'updateaddress',
        'id_country': id_country,
        'id_state': id_state,
        'id_customer': id_customer,
        'alias': alias,
        'company': company,
        'lastname': lastname,
        'firstname': firstname,
        'address1': address1,
        'address2': address2,
        'postcode': postcode,
        'city': city,
        'phone': phone,
        'vat_number': vat_number,
        'date_add': date_add,
        'date_upd': date_upd,
        'active': active,
        'deleted': deleted
    }

    var result = restfulPostCall(data);


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


function getOpenOrdersList(id_customer) {

    var searchData = {
        "opr": "openorders",
        "id_customer": id_customer
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }
}

function getSearchResultList(searchKeyword) {

    var lang = 1;
    if (selectedLang == "de") {
        lang = 1;
    } else if (selectedLang == "tr") {
        lang = 2;
    } else {
        lang = 1;
    }
    var searchData = {
        "opr": "hpproductslist",
        "keyword": searchKeyword,
        "currency": "EUR",
        "langu": lang
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;


        }
    }
}



function getOpenOrderDetailsList(id_customer, id_order) {

    var searchData = {
        "opr": "openorderdetails",
        "id_customer": id_customer,
        "id_order": id_order
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;
        } else {
            return "NOK";
        }


    } else {
        return "NOK";
    }

}


function getOldOrdersList(id_customer) {

    var searchData = {
        "opr": "oldorders",
        "id_customer": id_customer
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}


function getAllManufacturersList(manufacturer) {

    var searchData = {
        'opr': 'manufacturers',
        'manufacturer': manufacturer
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}

function getSearchResultList(searchKeyword) {

    var lang = 1;
    if (selectedLang == "de") {
        lang = 1;
    } else if (selectedLang == "tr") {
        lang = 2;
    } else {
        lang = 1;
    }
    var searchData = {
        "opr": "hpproductslist",
        "keyword": searchKeyword,
        "currency": "EUR",
        "langu": lang
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        if (result.status != "NOK") {
            return result;
        } else {
            return "NOK";
        }

    } else {
        return "NOK"
    }

}



function getManufacturersMenuList(id_manufacturer) {
    if (id_manufacturer == 0) {
        //return;
    }
    var lang = 1;
    if (selectedLang == "de") {
        lang = 1;
    } else if (selectedLang == "tr") {
        lang = 2;
    } else {
        lang = 1;
    }
    var searchData = {
        "opr": "manufacturersmenu",
        "id_manufacturer": id_manufacturer,
        "langu": lang
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK"
    }

}





function getUserAddressesList(id_customer) {

    var searchData = {
        "opr": "getmyaddresses",
        "id_customer": id_customer
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK"
    }

}

function getMessagesList(id_customer) {

    var searchData = {
        "opr": "getmessages",
        "id_customer": id_customer
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK"
    }

}


function postMessages(id_customer, message) {

    var data = {
        'opr': 'postmessages',
        'id_customer': id_customer,
        'message': message,
    }

    var result = restfulPostCall(data);


    if (result != "Error") {

        if (result.status == "NOK") {
            return "OK";
        } else {
            return "NOK";
        }


    } else {
        return "NOK";
    }

}