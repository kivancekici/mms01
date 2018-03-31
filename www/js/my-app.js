Template7.registerHelper('placeholder', function(plchldrContent) {
    var ret = 'placeholder="' + plchldrContent + '"';
    return ret;
});


// Initialize app
var myApp = new Framework7({
    swipeBackPage: false,
    swipePanelOnlyClose: true,
    template7Pages: true,
    pushState: true,
    smartSelectFormTheme: 'baklava7',
    smartSelectNavbarTheme: 'baklava7',
    smartSelectBackText: 'OK',

    onAjaxStart: function(xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function(xhr) {
        myApp.hideIndicator();
    }
});

var $$ = Dom7;


var langIsSelected = window.localStorage.getItem("langIsSelected");
var selectedLang;



var manufacturersList = null;
var manufacturersMenuList = null;
var selectedManufacturerId = 0;
var productResultList = null;
var searchKeyWord = "";
var categoriesList = null;


if (langIsSelected == "1") {
    selectedLang = window.localStorage.getItem("lang");
} else {
    //selectedLang = "tr"; // Set turkish to default language
    selectedLang = "de";
}


// Add view
var mainView = myApp.addView('.view-main', {
    // domCache: true
});

getLangJson();

setTimeout(function() {

    checkLangStatus();

}, 3000);


function onOffline() {

    myApp.alert('İnternet bağlantısı yok.', function() {
        navigator.app.exitApp();
    });
}

function checkNewMessage(userId, email, password) {
    var msgCount = window.localStorage.getItem("msgCount");
    var receiveMsgCnt = getReceiveMsgCount(userId, email, password);
    var diff = receiveMsgCnt - msgCount;

    if (diff > 0) {
        $$('#msgCountBadge').show();
        $$('#msgCountBadge').text(diff);
    } else {
        $$('#msgCountBadge').hide();
        $$('#msgCountBadge').text('');
    }
}

function getReceiveMsgCount(userId, email, password) {

    var msgDatas = getMessagesList(userId, email, password);

    var receiveMsgCnt = 0;

    for (var i = 0; i < msgDatas.length; i++) {

        var idEmployee = msgDatas[i].id_employee;

        if (idEmployee != "0") {
            receiveMsgCnt++;
        }
    }

    return receiveMsgCnt;

}

function checkLangStatus() {
    if (langIsSelected == "1") {
        checkLoginStatus();
    } else {
        mainView.router.loadPage({ url: 'language.html', ignoreCache: true });
    }
}

function changePanelLanguage() {

    var panelData = myApp.template7Data.languages[selectedLang].panel;

    $$('#panelTitle').text(panelData.panelTitle);
    $$('#orderItem').text(panelData.orderItem);
    $$('#orderBoxItem').text(panelData.orderBoxItem);
    $$('#accountItem').text(panelData.accountItem);
    $$('#addressItem').text(panelData.addressItem);
    $$('#myOrdersItem').text(panelData.myOrdersItem);
    $$('#helpItem').text(panelData.helpItem);
    $$('#infoItem').text(panelData.infoItem);
    $$('#messageItem').text(panelData.messageItem);
    $$('#logoutItem').text(panelData.logoutItem);
    $$('#loginItem').text(panelData.loginItem);
}


function hidePanelItems() {

    $$('#btnAccount').hide();
    $$('#btnAddress').hide();
    $$('#btnMyOrders').hide();
    $$('#btnMessage').hide();
    $$('#btnLogout').hide();
    $$('#btnLogin').show();
}

function showPanelItems() {

    $$('#btnAccount').show();
    $$('#btnAddress').show();
    $$('#btnMyOrders').show();
    $$('#btnMessage').show();
    $$('#btnLogout').show();
    $$('#btnLogin').hide();
}

function setContextParameter(pageName, key, value) {
    myApp.template7Data.languages[selectedLang][pageName][key] = value;
}

function loadPageWithLangAndData(pageName, contentData) {
    var cntxName = 'languages.' + selectedLang + '.' + pageName;
    var pgUrl = pageName + '.html';

    mainView.router.load({
        url: pgUrl,
        contextName: cntxName,
        query: contentData
    });

}

function loadPageWithLang(pageName) {
    var cntxName = 'languages.' + selectedLang + '.' + pageName;
    var pgUrl = pageName + '.html';


    mainView.router.load({
        url: pgUrl,
        contextName: cntxName
    });

}


function checkLoginStatus() {

    var userLoggedIn = window.localStorage.getItem("isLogin");

    try {
        if (userLoggedIn == "1") {
            loadPageWithLang('main');
            // show all panel items
            showPanelItems();

        } else {
            loadPageWithLang('main');
            // hide some items
            hidePanelItems();
        }
    } catch (e) {
        myApp.alert(e);
    }

}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getLangJson() {
    $$.getJSON('./languages/lang.json', function(data) {
        myApp.template7Data.languages = data.languages;
        changePanelLanguage();
    });
}

function alertMessage(msgKey, msgTypeKey) {
    var msg = myApp.template7Data.languages[selectedLang]['alertMessages'][msgKey];
    var msgType = myApp.template7Data.languages[selectedLang]['alertMessages'][msgTypeKey];

    myApp.alert(msg, msgType);
}



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('offline', function() {
    onOffline();
});

$$('#btnOrder').on('click', function() {
    loadPageWithLang('main');
    myApp.closePanel();
});

$$('#btnOrderBox').on('click', function() {
    loadPageWithLang('shopping_cart');
    myApp.closePanel();
});

$$('#btnAccount').on('click', function() {
    loadPageWithLang('account');
    myApp.closePanel();
});

$$('#btnAddress').on('click', function() {
    loadPageWithLang('my_addresses');
    myApp.closePanel();
});

$$('#btnMessage').on('click', function() {
    loadPageWithLang('messages');
    myApp.closePanel();
});

$$('#btnMyOrders').on('click', function() {
    loadPageWithLang('my_orders');
    myApp.closePanel();
});

$$('#btnHelp').on('click', function() {
    loadPageWithLang('help');
    myApp.closePanel();
});

$$('#btnInfo').on('click', function() {
    loadPageWithLang('info');
    myApp.closePanel();
});

$$('#btnLogout').on('click', function() {

    window.localStorage.setItem("isLogin", "0");
    checkLoginStatus();
    myApp.closePanel();

});


$$('#btnLogin').on('click', function() {
    loadPageWithLang('login');
    myApp.closePanel();
});







// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function(e) {
    // Get page data from event data
    var page = e.detail.page;




    if (page.name === 'login') {
        $$('.btnLogin').on('click', function() {
            var email = $$('#txtEmail').val();
            var pass = $$('#txtPassword').val();
            var response = mobileLogin(email, pass);

            if (response != 'NOK') {
                window.localStorage.setItem("customerId", response);
                window.localStorage.setItem("isLogin", "1");
                window.localStorage.setItem('password', pass);
                window.localStorage.setItem('useremail', email);
                checkLoginStatus();
            } else {
                window.localStorage.setItem("isLogin", "0");

            }

        });


        $$('.btnRegister').on('click', function() {
            loadPageWithLang('register');
        });
    }

    if (page.name === 'main') {
        var userLoggedIn = window.localStorage.getItem("isLogin");

        if (userLoggedIn == "1") {
            var userId = window.localStorage.getItem("customerId");
            var pswd = window.localStorage.getItem("password");
            var email = window.localStorage.getItem("useremail");
            checkNewMessage(userId, email, pswd);
        }

        /*Product listesini doldur*/
        if (productResultList == null) {
            productResultList = getSearchResultList(searchKeyWord);
        }

        initlistProduct();
        listProductResult.items = productResultList;
        listProductResult.update();

        /*Üreticiler Listesini Doldur*/
        if (manufacturersList == null) {
            manufacturersList = getAllManufacturersList("");
        }

        initListVirtualManufacturers();
        listVirtualManufacturers.items = manufacturersList;
        listVirtualManufacturers.update();


        /*Kategori Listesini Doldur*/
        var categories = getProductCategoriesTree();

        var subcategories = categories['rootCategories'][0]['subcategories'];


        for (i = 0; i < subcategories.length; i++) {
            var catName = subcategories[i]['categoryname'];
            var txt = '<optgroup label="' + catName + '"></optgroup>';
            $$('#Categori').append(txt);
            var subcatName = subcategories[i]['subcategories'];
            for (k = 0; k < subcatName.length; k++) {
                var catName = subcatName[k]['categoryname'];
                var idVal = subcatName[k]['id_category'];
                var subCatTxt = '<option value="' + idVal + '">' + catName + '</option>';
                $$('.smart-select select optgroup').eq(i).append(subCatTxt);
            }
        }

        $$('select').on('change', function(e) {
            var catIdArray = $$('select[name=CategoriSelector]').val();
            if (catIdArray.length == 1) {
                var result = categorySearchResultList("", catIdArray[0], "");
                listProductResult.items = result;
                listProductResult.update();
            } else if (catIdArray.length == 2) {
                var result = categorySearchResultList("", catIdArray[0], catIdArray[1]);
                listProductResult.items = result;
                listProductResult.update();
            } else {
                var result = getSearchResultList("");
                listProductResult.items = result;
                listProductResult.update();
            }

        });



    }

    if (page.name === 'account') {

        var userId = window.localStorage.getItem("customerId");
        var pswd = window.localStorage.getItem("password");
        var oldemail = window.localStorage.getItem("useremail");

        var response = getUserInfo(userId, oldemail, pswd);


        var formData = {
            'firstname': response.firstname,
            'surname': response.lastname,
            'email': response.email,
            'password': pswd,
            'repeatpassword': pswd,
            'birthday': response.birthday,
            'newsletter': [response.newsletter],
            'optin': [response.optin],
            'gender': [response.id_gender]
        }

        myApp.formFromData('#accountform', formData);

        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            cssClass: 'theme-baklava7',
            closeOnSelect: true,
            monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
            /*Disable under 18*/
            disabled: function(date) {
                if (date.getFullYear() > (today.getFullYear() - 18)) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        $$('.updateBtn').on('click', function() {


            var accountData = myApp.formToData('#accountform');

            var email = accountData.email;
            var name = accountData.firstname;
            var surname = accountData.surname;
            var pass = accountData.password;
            var repeatpassword = accountData.repeatpassword;
            var birthday = accountData.birthday;
            var genderId = accountData.gender;
            var newsletter = accountData.newsletter[0];
            var optin = accountData.optin[0];

            if (newsletter != "1") {
                newsletter = "0";
            }

            if (optin != "1") {
                optin = "0";
            }




            if (name == '' || surname == '' || pass == '' || repeatpassword == '' || email == '') {
                alertMessage('requiredField', 'info');
            } else {
                if (pass.length < 5) {
                    alertMessage('passwordValidation', 'info');
                } else {

                    if (pass !== repeatpassword) {
                        alertMessage('passwordMatch', 'info');
                    } else {

                        if (validateEmail(email)) {
                            var avaibleuser = checkAvaibleUserForAccountUpdate(email, userId);

                            if (avaibleuser == "OK") {

                                var response = updateAccount(email, name, surname, genderId, birthday, newsletter, optin, userId, oldemail, pass);

                                if (response == "OK") {
                                    alertMessage('updateOk', 'info');
                                    window.localStorage.setItem('password', pass);
                                    window.localStorage.setItem('useremail', email);
                                    loadPageWithLang('main');
                                }

                            } else {
                                alertMessage('mailNotAvailable', 'info');
                            }

                        } else {
                            alertMessage('mailNotOk', 'info');
                        }

                    }

                }

            }
        });


    }

    if (page.name === 'register') {

        var today = new Date();

        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            cssClass: 'theme-baklava7',
            closeOnSelect: true,
            monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
            /*Disable under 18*/
            disabled: function(date) {
                if (date.getFullYear() > (today.getFullYear() - 18)) {
                    return true;
                } else {
                    return false;
                }
            }
        });


        $$('.registerBtn').on('click', function() {


            var formData = myApp.formToData('#register-form');


            var email = formData.email;
            var name = formData.firstname;
            var surname = formData.surname;
            var pass = formData.password;
            var repeatpassword = formData.repeatpassword;
            var birthday = formData.birthday;
            var genderId = formData.gender;

            if (name == '' || surname == '' || pass == '' || repeatpassword == '' || email == '') {
                alertMessage('requiredField', 'info');
            } else {
                if (pass.length < 5) {
                    alertMessage('passwordValidation', 'info');
                } else {

                    if (pass !== repeatpassword) {
                        alertMessage('passwordMatch', 'info');
                    } else {

                        if (validateEmail(email)) {
                            var avaibleuser = checkAvaibleUser(email);

                            if (avaibleuser == "OK") {
                                var response = mobileRegister(email, name, surname, pass, genderId, birthday);


                                if (response != "NOK") {

                                    var response = mobileLogin(email, pass);

                                    if (response != 'NOK') {
                                        window.localStorage.setItem("customerId", response);
                                        window.localStorage.setItem("isLogin", "1");
                                        window.localStorage.setItem('password', pass);
                                        window.localStorage.setItem('useremail', email);
                                        checkLoginStatus();
                                    } else {
                                        window.localStorage.setItem("isLogin", "0");

                                    }
                                }
                            } else {
                                alertMessage('mailNotAvailable', 'info');
                            }

                        } else {
                            alertMessage('mailNotOk', 'info');
                        }

                    }

                }

            }



        });



    }



    if (page.name === 'language') {

        $$('.btnLangTr').on('click', function() {

            window.localStorage.setItem("langIsSelected", "1");
            window.localStorage.setItem("lang", "tr");
            selectedLang = "tr";
            checkLoginStatus();
            changePanelLanguage();
        });

        $$('.btnLangGer').on('click', function() {
            window.localStorage.setItem("langIsSelected", "1");
            window.localStorage.setItem("lang", "de");
            selectedLang = "de";
            checkLoginStatus();
            changePanelLanguage();
        });

    }

    if (page.name === 'manufacturers') {

    }


    if (page.name === 'manufacturers_menu') {

        manufacturersMenuList = getManufacturersMenuList(selectedManufacturerId);
        initListManufacturersMenu();
        listManufacturersMenu.items = manufacturersMenuList;
        listManufacturersMenu.update();
    }

    if (page.name === 'my_addresses') {

        $$('.btnAddAddress').on('click', function() {
            loadPageWithLang('add_address');
        });

        $$('.backToMainBtn').on('click', function() {
            loadPageWithLang('main');
        });

        var userId = window.localStorage.getItem("customerId");
        var pswd = window.localStorage.getItem("password");
        var email = window.localStorage.getItem("useremail");

        var response = getUserAddressesList(userId, email, pswd);

        if (response != "NOK") {
            initListVirtualUserAddresses();
            listVirtualUserAddresses.items = response;
            listVirtualUserAddresses.update();
            $$('.deleteSwipeAction').text(myApp.template7Data.languages[selectedLang]['my_addresses']['deleteBtn']);
        }




    }

    if (page.name === 'add_address') {

        var userId = window.localStorage.getItem("customerId");
        var pswd = window.localStorage.getItem("password");
        var email = window.localStorage.getItem("useremail");

        var response = getUserInfo(userId, email, pswd);

        var formData = {
            'firstname': response.firstname,
            'surname': response.lastname
        }

        myApp.formFromData('#adrform', formData);

        $$('.saveAddressBtn').on('click', function() {

            var addressData = myApp.formToData('#adrform');

            var alias = addressData.alias;
            var name = addressData.firstname;
            var surname = addressData.surname;
            var address = addressData.address;
            var address2 = addressData.address2;
            var zipcode = addressData.zipcode;
            var city = addressData.city;
            var countryId = addressData.country;
            var homephone = addressData.homephone;
            var mobilephone = addressData.mobilephone;
            var company = addressData.company;
            var vatno = addressData.vatno;

            if (name == '' || surname == '' || mobilephone == '' || address == '' || zipcode == '' || city == '' || countryId == '') {
                alertMessage('requiredField', 'info');
            } else {

                if (zipcode.length < 5) {

                    alertMessage('zipcodeError', 'error');

                } else {

                    var response = saveAddress(countryId, userId, alias, company, surname, name, address, address2, zipcode, city, homephone, mobilephone, vatno, email, pswd);

                    if (response == "OK") {
                        loadPageWithLang('my_addresses');
                    } else {
                        alertMessage('addressError', 'info');
                    }
                }


            }
        });


    }

    if (page.name === 'update_address') {

        var pswd = window.localStorage.getItem("password");
        var email = window.localStorage.getItem("useremail");

        var adressId = page.query['id_address'];
        var alias = page.query['alias'];
        var company = page.query['company'];
        var lastname = page.query['lastname']
        var firstname = page.query['firstname'];
        var address1 = page.query['address1'];
        var address2 = page.query['address2'];
        var postcode = page.query['postcode'];
        var city = page.query['city'];
        var phone = page.query['phone'];
        var phone_mobile = page.query['phone_mobile'];
        var vat_number = page.query['vat_number'];
        var id_country = page.query['id_country'];

        var formData = {
            'alias': alias,
            'company': company,
            'lastname': lastname,
            'firstname': firstname,
            'address1': address1,
            'address2': address2,
            'postcode': postcode,
            'city': city,
            'country': id_country,
            'phone': phone,
            'mobilephone': phone_mobile,
            'vatno': vat_number
        }

        myApp.formFromData('#updateadrform', formData);

        $$('.updateAddressBtn').on('click', function() {

            var addressData = myApp.formToData('#updateadrform');

            var alias = addressData.alias;
            var name = addressData.firstname;
            var surname = addressData.lastname;
            var address = addressData.address1;
            var address2 = addressData.address2;
            var zipcode = addressData.postcode;
            var city = addressData.city;
            var countryId = addressData.country;
            var homephone = addressData.phone;
            var mobilephone = addressData.mobilephone;
            var company = addressData.company;
            var vatno = addressData.vatno;

            if (name == '' || surname == '' || mobilephone == '' || address == '' || zipcode == '' || city == '' || countryId == '') {
                alertMessage('requiredField', 'info');
            } else {

                if (zipcode.length < 5) {

                    alertMessage('zipcodeError', 'error');

                } else {


                    var response = updateAddress(countryId, adressId, alias, company, surname, name, address, address2, zipcode, city, homephone, mobilephone, vatno, email, pswd);

                    if (response == "OK") {
                        loadPageWithLang('my_addresses');
                    } else {
                        alertMessage('addressError', 'info');
                    }
                }


            }
        });

    }

    if (page.name === 'product_details') {
        initPageProductDetails();
    }

    if (page.name === 'messages') {

        $$('#msgCountBadge').hide();
        $$('#msgCountBadge').text('');

        var myMessages = myApp.messages('.messages');

        var myMessagebar = myApp.messagebar('.messagebar');

        var userId = window.localStorage.getItem("customerId");
        var password = window.localStorage.getItem("password");
        var email = window.localStorage.getItem("useremail");

        var msgDatas = getMessagesList(userId, email, password);

        var receiveMsgCnt = 0;

        for (var i = 0; i < msgDatas.length; i++) {

            var msgType = "";
            var msg = msgDatas[i].message;
            var idEmployee = msgDatas[i].id_employee;
            var msgdate = msgDatas[i].date_add;

            var fulldate = new Date(msgdate);

            var msgfulldate = fulldate.toLocaleString();


            if (idEmployee == "0") {
                msgType = 'sent';
            } else {
                msgType = 'received';
                receiveMsgCnt++;
            }

            myMessages.addMessage({

                text: msg,

                type: msgType,

                date: msgfulldate
            });

            window.localStorage.setItem("msgCount", receiveMsgCnt);
        }

        $$('.messagebar .link').on('click', function() {
            // Message text
            var messageText = myMessagebar.value().trim();
            // Exit if empy message
            if (messageText.length === 0) return;

            // Empty messagebar
            myMessagebar.clear()

            // Message type
            var messageType = 'sent';

            var response = postMessages(userId, messageText, email, password);

            if (response == "OK") {
                // Add message
                myMessages.addMessage({
                    // Message text
                    text: messageText,
                    // Random message type
                    type: messageType,

                    date: new Date().toLocaleString()

                });

            } else {
                alertMessage('msgSendError', 'info');
            }


        });


    }

    if (page.name === 'shopping_cart') {

        initListCartItemsToShow();
        $$('#btnCheckOut').on('click', function() {
            loadPageWithLang('check_out');
        });
    }

    if (page.name === 'check_out') {

        $$('.show-selectAddress').on('click', function() {
            $$(".toolbar-inner .address").addClass("active");
            $$(".toolbar-inner .login").removeClass("active");
            myApp.showTab('#tabSelectAddress');
        });

        $$('.show-cargo').on('click', function() {
            $$(".toolbar-inner .cargo").addClass("active");
            $$(".toolbar-inner .address").removeClass("active");
            myApp.showTab('#tabCargo');
        });
        $$('.show-payment').on('click', function() {

            $$(".toolbar-inner .payment").addClass("active");
            $$(".toolbar-inner .cargo").removeClass("active");
            myApp.showTab('#tabPayment');

            var x = getAccessToken();

            var urlData = createPayment(x.access_token);

            for (var i = 0; i < urlData.links.length; i++) {
                if (urlData.links[i].rel === 'approval_url') {

                    var approval_url = urlData.links[i].href;

                    var ppp = PAYPAL.apps.PPP({
                        "approvalUrl": approval_url,
                        "placeholder": "ppplus",
                        "mode": "sandbox",
                        "country": "DE",
                        "language": "de_DE",
                        "showLoadingIndicator": "true"
                    });

                }

            }


        });
    }
});