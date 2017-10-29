Template7.registerHelper('placeholder', function(plchldrContent) {
    var ret = 'placeholder="' + plchldrContent + '"';
    return ret;
});


// Initialize app
var myApp = new Framework7({
    swipeBackPage: false,
    swipePanelOnlyClose: true,
    template7Pages: true,
    pushState: true
});

var $$ = Dom7;


var langIsSeleted = window.localStorage.getItem("langIsSelected");
var userLoggedIn = window.localStorage.getItem("isLogin");
var selectedLang;


var manufacturersList=null;
var manufacturersMenuList=null;
var selectedManufacturerId=0;
var searchResultList=null;
var searchKeyWord="";

if (langIsSeleted) {
    selectedLang = window.localStorage.getItem("lang");
} else {
    selectedLang = "tr"; // Set turkish to default language
}


// Add view
var mainView = myApp.addView('.view-main', {

});



getLangJson();



setTimeout(function() {

    checkLangStatus();

}, 3000);



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


function loadPageWithLang(pageName) {
    var cntxName = 'languages.' + selectedLang + '.' + pageName;
    var pgUrl = pageName + '.html';

    mainView.router.load({
        url: pgUrl,
        contextName: cntxName
    });
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
    userLoggedIn=false;
    window.localStorage.setItem("isLogin", false);
    window.localStorage.setItem("customerId", "0");
    window.localStorage.setItem("langIsSelected",false);
    langIsSeleted=false;
    checkLangStatus();

});


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function(e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'login') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes login page');
        $$('.btnLogin').on('click', function() {
            var email = $$('#txtEmail').val();
            var pass = $$('#txtPassword').val();
            var response = mobileLogin(email, pass);

            if (response != 'NOK') {
                loadPageWithLang('main');
                window.localStorage.setItem("customerId", response);
                window.localStorage.setItem("isLogin", true);
            } else {
                window.localStorage.setItem("isLogin", false);

            }

        });

        $$('.btnForgetPassword').on('click', function() {
            //myApp.alert('Unuttum bişeyleri');
        });


        $$('.btnRegister').on('click', function() {

            loadPageWithLang('register');
            /*
            myApp.prompt('Lütfen E-mail Adresini Giriniz', 'Kayıt Ekranı', function(value) {

                var email = value;

                if (validateEmail(email)) {
                    var avaibleuser = checkAvaibleUser(email);

                    if (avaibleuser == "OK") {
                        var response = mobileRegister(email);

                        if (response != "NOK") {
                            loadPageWithLang('main');
                        }
                    } else {
                        myApp.alert('Mail adresi daha önceden kayıtlıdır.', 'Bilgi');
                    }

                } else {
                    myApp.alert('Geçerli Email Adresi Giriniz.', 'Uyarı');
                }




            });
            */
        });
    }

    if (page.name === 'main') {

    }

    if (page.name === 'account') {
        var userId = window.localStorage.getItem("customerId");
        var response = getUserInfo(userId);
        myApp.formFromJSON('#account-form', JSON.stringify(response));
        myApp.alert(response);
    }

    if (page.name === 'register') {

        var registerPageData = myApp.template7Data.languages[selectedLang].register;

        var calendarDefault = myApp.calendar({
            input: '#calendar-default'
        });


        var pickerGender = myApp.picker({
            input: '#picker-gender',
            toolbarCloseText: registerPageData.toolbarText,
            cols: [{
                textAlign: 'center',
                values: [registerPageData.female, registerPageData.male]
            }]
        });


        $$('.registerBtn').on('click', function() {


            var formData = myApp.formToJSON('#register-form');
            var col = pickerGender.cols[0];
            var genderId;

            if (col.activeIndex != 1) {
                genderId = 0;
            } else {
                genderId = 1;
            }


            var email = formData.email;
            var name = formData.firstname;
            var surname = formData.surname;
            var pass = formData.password;
            var repeatpassword = formData.repeatpassword;
            var birthday = formData.birthday;

            if (pass !== repeatpassword) {
                myApp.alert('Parolalar Eşleşmedi, Lütfen Kontrol Ediniz', 'Uyarı');
            } else {

                if (validateEmail(email)) {
                    var avaibleuser = checkAvaibleUser(email);

                    if (avaibleuser == "OK") {
                        var response = mobileRegister(email, name, surname, pass, genderId, birthday);


                        if (response != "NOK") {
                            loadPageWithLang('login');
                        }
                    } else {
                        myApp.alert('Mail adresi daha önceden kayıtlıdır.', 'Bilgi');
                    }

                } else {
                    myApp.alert('Geçerli Email Adresi Giriniz.', 'Uyarı');
                }

            }




        });

        $$('.backBtn').on('click', function() {
            loadPageWithLang('login');
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
        if(manufacturersList==null){
            manufacturersList=getAllManufacturersList("");            
        }

        initListVirtualManufacturers();
        listVirtualManufacturers.items=manufacturersList;
        listVirtualManufacturers.update();
    }

    if (page.name === 'search_results') {
            searchResultList=getSearchResultList(searchKeyWord,selectedLang);            
        initListVirtualSearchResult();
        listVirtualSearchResult.items=searchResultList;
        listVirtualSearchResult.update();
    }


    if (page.name === 'manufacturers_menu') {

        manufacturersMenuList=getManufacturersMenuList(selectedManufacturerId);            
        initListManufacturersMenu();
        listManufacturersMenu.items=manufacturersMenuList;
        listManufacturersMenu.update();
    }


});


var postCodeSearch = myApp.autocomplete({
    input: '#autocomplete-dropdown-ajax',
    openIn: 'dropdown',
    preloader: true, //enable preloader
    valueProperty: 'id', //object's "value" property name
    textProperty: 'name', //object's "text" property name
    limit: 8, //limit to 8 results
    dropdownPlaceholderText: '35394 Giessen"',
    expandInput: true, // expand input
    source: function(autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
        // Show Preloader
        autocomplete.showPreloader();
        // Do Ajax request to Autocomplete data
        $$.ajax({
            url: 'autocomplete-languages.json',
            method: 'GET',
            dataType: 'json',
            //send "query" to server. Useful in case you generate response dynamically
            data: {
                query: query
            },
            success: function(data) {
                // Find matched items
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                }
                // Hide Preoloader
                autocomplete.hidePreloader();
                // Render items by passing array with result items
                render(results);
            }
        });
    }
});