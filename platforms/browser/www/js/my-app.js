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
   
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

var $$ = Dom7;


var langIsSeleted = window.localStorage.getItem("langIsSelected");
var userLoggedIn = window.localStorage.getItem("isLogin");
var selectedLang;



var manufacturersList = null;
var manufacturersMenuList = null;
var selectedManufacturerId = 0;
var productResultList = null;
var searchKeyWord = "";
var categoriesList = null;


if (langIsSeleted) {
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

function checkNewMessage(userId) {
    var msgCount = window.localStorage.getItem("msgCount");
    var receiveMsgCnt = getReceiveMsgCount(userId);
    var diff = receiveMsgCnt - msgCount;

    if (diff > 0) {
        $$('#msgCountBadge').show();
        $$('#msgCountBadge').text(diff);
    } else {
        $$('#msgCountBadge').hide();
        $$('#msgCountBadge').text('');
    }
}

function getReceiveMsgCount(userId) {

    var msgDatas = getMessagesList(userId);

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
    if (langIsSeleted) {
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
    $$('#workItem').text(panelData.workItem);
    $$('#helpItem').text(panelData.helpItem);
    $$('#infoItem').text(panelData.infoItem);
    $$('#messageItem').text(panelData.messageItem);
    $$('#logoutItem').text(panelData.logoutItem);
}


function setContextParameter(pageName, key, value) {
    myApp.template7Data.languages[selectedLang][pageName][key] = value;
}

function loadPageWithLang(pageName) {
    var cntxName = 'languages.' + selectedLang + '.' + pageName;
    var pgUrl = pageName + '.html';

    if(pageName == 'main'){
      
    mainView.router.load({
        url: pgUrl,
        contextName: cntxName,
        ignoreCache:true
    });

    }else {

     mainView.router.load({
        url: pgUrl,
        contextName: cntxName
    });

    }
    
}

function checkLoginStatus() {

    try {
        if (userLoggedIn) {
            loadPageWithLang('main');

        } else {
            loadPageWithLang('login');
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

$$('#orderItemBtn').on('click', function() {
    loadPageWithLang('main');
});

$$('#accountItemBtn').on('click', function() {
    loadPageWithLang('account');
});


$$('#btnLogout').on('click', function() {
    userLoggedIn = false;
    window.localStorage.setItem("isLogin", false);
    window.localStorage.setItem("customerId", "0");
    window.localStorage.setItem("langIsSelected", false);
    langIsSeleted = false;
    checkLangStatus();

});

$$('#msgBoxBtn').on('click', function() {
    loadPageWithLang('messages');
});

$$('#myAddressesItemBtn').on('click', function() {
    loadPageWithLang('my_addresses');
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
                loadPageWithLang('main');
                window.localStorage.setItem("customerId", response);
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem('password', pass);
            } else {
                window.localStorage.setItem("isLogin", false);

            }

        });


        $$('.btnRegister').on('click', function() {
            loadPageWithLang('register');
        });
    }

    if (page.name === 'main') {
        var userId = window.localStorage.getItem("customerId");
        checkNewMessage(userId);

        
        /*Product listesini doldur*/
        if (productResultList == null) {
            productResultList = getSearchResultList(searchKeyWord, selectedLang);      
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

        

    }

    if (page.name === 'account') {

        var userId = window.localStorage.getItem("customerId");
        var response = getUserInfo(userId);

        var pass = window.localStorage.getItem('password');

        var formData = {
            'firstname': response.firstname,
            'surname': response.lastname,
            'email': response.email,
            'password': pass,
            'repeatpassword': pass,
            'birthday': response.birthday,
            'newsletter': [response.newsletter],
            'optin': [response.optin],
            'gender': [response.id_gender]
        }

        myApp.formFromData('#accountform', formData);

        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            cssClass: 'theme-orange'
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

                                var response = updateAccount(email, name, surname, pass, genderId, birthday, newsletter, optin, userId);

                                if (response == "OK") {
                                    alertMessage('updateOk', 'info');
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

        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            cssClass: 'theme-orange'
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
                                    window.localStorage.setItem('password', pass);
                                    window.localStorage.setItem("isLogin", true);
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



    if (page.name === 'language') {

        $$('.btnLangTr').on('click', function() {

            window.localStorage.setItem("langIsSelected", true);
            window.localStorage.setItem("lang", "tr");
            selectedLang = "tr";
            checkLoginStatus();
            changePanelLanguage();
        });

        $$('.btnLangGer').on('click', function() {
            window.localStorage.setItem("langIsSelected", true);
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

        var userId = window.localStorage.getItem("customerId");
        var response = getUserAddressesList(userId);

        if(response != "NOK"){
           initListVirtualUserAddresses();
           listVirtualUserAddresses.items = response;
           listVirtualUserAddresses.update();
           $$('.deleteSwipeAction').text(myApp.template7Data.languages[selectedLang]['my_addresses']['deleteBtn']);        
        }
        
        $$('.btnAddAddress').on('click', function() {
            loadPageWithLang('add_address');
        });

        $$('.btnUpdateAddress').on('click', function() {
           // loadPageWithLang('add_address');
        });

        
               
    }

    if (page.name === 'add_address'){
        
        var userId = window.localStorage.getItem("customerId");
        var response = getUserInfo(userId);

        var formData = {
            'firstname': response.firstname,
            'surname': response.lastname
        }

        myApp.formFromData('#addressForm', formData);

    }

    if (page.name === 'messages') {

        $$('#msgCountBadge').hide();
        $$('#msgCountBadge').text('');

        var myMessages = myApp.messages('.messages');

        var myMessagebar = myApp.messagebar('.messagebar');

        var userId = window.localStorage.getItem("customerId");

        var msgDatas = getMessagesList(userId);

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

            var response = postMessages(userId, messageText);

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

});