Template7.registerHelper('placeholder', function(plchldrContent) {
    var ret = 'placeholder="' + plchldrContent + '"';
    return ret;
});


// Initialize app
var myApp = new Framework7({
    swipeBackPage: false,
    swipePanelOnlyClose: true,
    template7Pages: true
});

var $$ = Dom7;


var langIsSeleted = window.localStorage.getItem("langIsSelected");
var userLoggedIn = window.localStorage.getItem("isLogin");
var selectedLang;
var langData;


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

    myApp.alert(langData);
    var panelData = langData + '.' + selectedLang + '.panel';

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

function getLangJson() {
    $$.getJSON('./languages/lang.json', function(data) {
        myApp.template7Data.languages = data.languages;
        langData = JSON.stringify(data.languages);
        changePanelLanguage();
    });
}


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
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
                window.localStorage.setItem("isLogin", true);
            } else {
                window.localStorage.setItem("isLogin", false);

            }

        });

        $$('.btnForgetPassword').on('click', function() {
            myApp.alert('Unuttum bişeyleri');
        });


        $$('.btnRegister').on('click', function() {
            myApp.prompt('Lütfen E-mail Adresini Giriniz', 'Kayıt Ekranı', function(value) {

                var email = value;
                var response = mobileRegister(email);

                if (response != "NOK") {
                    loadPageWithLang('main');
                }

            });
        });
    }

    if (page.name === 'main') {

    }

    if (page.name === 'language') {

        $$('.btnLangTr').on('click', function() {

            window.localStorage.setItem("langIsSelected", true);
            window.localStorage.setItem("lang", "tr");
            selectedLang = "tr";
            checkLoginStatus();
        });

        $$('.btnLangGer').on('click', function() {
            window.localStorage.setItem("langIsSelected", true);
            window.localStorage.setItem("lang", "de");
            selectedLang = "de";
            checkLoginStatus();
        });

    }


});




var calendarBirthday = myApp.calendar({
    input: '#calendarBirthday',
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