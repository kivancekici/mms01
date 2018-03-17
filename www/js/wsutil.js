var servicePath = "https://baklava7.de/mapi/Msvc.php";





function restfulGetCall(restSuccess) {
    $.get(servicePath, function(data) {
        restSuccess(data);
    }).fail(function() {

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
        return "NOK";
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
        return "NOK";
    }

}

function updateAccount(email, name, surname, genderId, birthday, newsletter, optin, userId, oldemail, pswd) {

    var accountdata = {
        'opr': 'updateuserdata',
        'id_gender': genderId,
        'company': '',
        'firstname': name,
        'lastname': surname,
        'email': oldemail,
        'birthday': birthday,
        'newsletter': newsletter,
        'optin': optin,
        'id_customer': userId,
        'website': '',
        'emailnew': email,
        'pswd': pswd
    }


    var result = restfulPostCall(accountdata);


    if (result != "Error") {

        if (result.status != "OK") {
            return "NOK";
        } else {
            return "OK";
        }

    } else {
        return "NOK";
    }

}

function checkAvaibleUser(email) {

    var registerdata = {
        'opr': 'checkAvaibleUser',
        'email': email
    }

    var result = restfulPostCall(registerdata);


    if (result != "Error") {

        if (result.status == "OK") {
            return "NOK";
        } else {
            return "OK";
        }


    } else {
        return "NOK";
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
        return "NOK";
    }

}

function getUserInfo(userId, email, pswd) {

    var userdata = {
        'opr': 'getuserinfo',
        'id_customer': userId,
        'email':email,
        'pswd': pswd
    }

    var result = restfulPostCall(userdata);



    if (result != "Error") {

        return result;

    } else {
        return "NOK";
    }


}


function saveAddress(id_country, id_customer, alias, company, lastname, firstname, address1, address2, postcode, city, phone, mobile_phone, vat_number, email, password) {

    var data = {
        'opr': 'saveaddress',
        'id_country': id_country,
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
        'phone_mobile': mobile_phone,
        'vat_number': vat_number,
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(data);


    if (result != "Error") {

        if (result == "NOK") {
            return "NOK";
        } else {
            return "OK";
        }


    } else {
        return "NOK";
    }

}

function deleteAddress(id_customer, id_address, email, password) {

    var data = {
        'opr': 'deleteaddress',
        'id_customer': id_customer,
        'id_address': id_address,
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(data);


    if (result != "Error") {

        if (result == "OK") {
            return "OK";
        } else {
            return "NOK";
        }

    } else {
        return "NOK";
    }

}

function updateAddress(id_country, id_address, alias, company, lastname, firstname, address1, address2, postcode, city, phone, phone_mobile, vat_number, email, password) {

    var data = {
        'opr': 'updateaddress',
        'id_country': id_country,
        'id_address': id_address,
        'alias': alias,
        'company': company,
        'lastname': lastname,
        'firstname': firstname,
        'address1': address1,
        'address2': address2,
        'postcode': postcode,
        'city': city,
        'phone': phone,
        'phone_mobile': phone_mobile,
        'vat_number': vat_number,
        'other': "",
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(data);


    if (result != "Error") {

        if (result == "OK") {
            return "OK";
        } else {
            return "NOK";
        }


    } else {
        return "NOK";
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
        return "NOK";
    }
}

function getSearchResultListold(searchKeyword) {

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
        return "NOK";
    }

}


function getAllManufacturersList(manufacturer) {

    var lang = getLangCode();

    var searchData = {
        'opr': 'manufacturers',
        'manufacturer': manufacturer,
        'idlang' : lang
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

function getSearchResultList(searchKeyword) {

    var lang = getLangCode();

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
        return "NOK";
    }

}

function categorySearchResultList(searchKeyword, catid1, catid2) {

    var lang = getLangCode();

    var searchData = {
        "opr": "hpproductslist",
        "keyword": searchKeyword,
        "currency": "EUR",
        "langu": lang,
        "iscategorysearch": "1",
        "c1": catid1,
        "c2": catid2
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

function getLangCode() {
    var lang = 1;
    if (selectedLang == "de") {
        lang = 1;
    } else if (selectedLang == "tr") {
        lang = 2;
    } else {
        lang = 1;
    }

    return lang;
}


function getManufacturersMenuList(id_manufacturer) {
    if (id_manufacturer == 0) {
        //return;
    }
    var lang = getLangCode();
 
   var searchData = {
        "opr": "hpproductslist",
        "keyword": "",
        "currency": "EUR",
        "langu": lang,
        "iscategorysearch": "2",
        "c1": id_manufacturer
    }


    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK";
    }

}


function getUserAddressesList(id_customer, email, password) {

    var searchData = {
        "opr": "getmyaddresses",
        "id_customer": id_customer,
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK";
    }

}

function getMessagesList(id_customer, email, password) {

    var searchData = {
        "opr": "getmessages",
        "id_customer": id_customer,
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(searchData);

    if (result != "Error") {

        return result;

    } else {
        return "NOK";
    }

}


function postMessages(id_customer, message, email, password) {

    var data = {
        "opr": "postmessages",
        "id_customer": id_customer,
        "message": message,
        'email': email,
        'pswd':password
    }

    var result = restfulPostCall(data);


    if (result != "Error") {

        if (result != "NOK") {
            return "OK";
        } else {
            return "NOK";
        }
    } else {
        return "NOK";
    }
}

function getProductCategoriesTree() {
    var lang = getLangCode();
    var data = {
        "opr": "categorytree",
        "id_lang": lang,
    }

    var result = restfulPostCall(data);

    var categoriesTree = {};
    categoriesTree.rootCategories = getSubCategoriesFromList(result, "1");

    categoriesTree.rootCategories.forEach(element => {
        element.subcategories = getSubCategoriesFromList(result, element.id_category);
        element.subcategories.forEach(subsub => {
            subsub.subcategories = getSubCategoriesFromList(result, subsub.id_category);
        });
    });

    if (result != "Error") {

        if (result != "NOK") {
            return categoriesTree;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function getSubCategoriesFromList(lst, id_parent) {

    var result = [];
    lst.forEach(element => {
        if (element.id_parent == id_parent) {
            result.push(element);
        }
    });

    return result;
}