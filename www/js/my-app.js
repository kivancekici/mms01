// Initialize app
var myApp = new Framework7({

    swipeBackPage: false,
    swipePanelOnlyClose: true,
    template7Pages: true, //enable Template7 rendering for pages
    template7Data: {
        // Plain data object
        'languages': {
            'tr': {
                'main': {
                    btnname: 'turkish'
                },
                'account': {

                }

            },
            'ger': {
                'main': {
                    btnname: 'german'
                },
                'account': {

                }

            }
        }
    }

});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var selectedLang = window.localStorage.getItem("lang");

// Add view
var mainView = myApp.addView('.view-main', {

});


setTimeout(function() {
    checkLanguage();
}, 3000);

function checkLanguage() {
    var langIsSeleted = window.localStorage.getItem("langIsSelected");

    if (langIsSeleted) {
        selectedLang = window.localStorage.getItem("lang");
        myApp.alert(languages.tr.main.btnname);
        //  loadLangJson(langType);
        checkLogin();
    } else {
        mainView.router.loadPage({ url: 'language.html', ignoreCache: true });
    }
}


function loadPageWithLang(pageName) {

    var cntxName = 'languages.' + selectedLang + '.' + pageName;
    var pgUrl = pageName + '.html';

    mainView.router.load({
        url: pgUrl,
        contextName: cntxName
    });

}

function checkLogin() {
    var userLoggedIn = window.localStorage.getItem("isLogin");

    try {
        if (userLoggedIn) {

            loadPageWithLang('main');

        } else {
            mainView.router.loadPage({ url: 'login.html', ignoreCache: true });
        }
    } catch (e) {}

}

function loadLangJson(lang) {

    switch (lang) {
        case 'tr':
            $$.getJSON('./languages/turkish.json', function(data) {
                myApp.alert(data.hello);
            });

            break;
        case 'ger':
            $$.getJSON('./languages/german.json', function(data) {
                myApp.alert(data.hello);
            });

            break;
        default:

    }

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
            myApp.alert(response);
            if (response != 'NOK') {

                mainView.router.loadPage({ url: 'main.html', ignoreCache: true });
                window.localStorage.setItem("isLogin", true);

            } else {
                //mainView.router.loadPage({ url: 'index.html', ignoreCache: true });
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
                    mainView.router.loadPage({ url: 'main.html', ignoreCache: true });
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
            //  loadLangJson("tr");
            selectedLang = "tr";
            checkLogin();
        });

        $$('.btnLangGer').on('click', function() {
            window.localStorage.setItem("langIsSelected", true);
            window.localStorage.setItem("lang", "ger");
            // loadLangJson("ger");
            selectedLang = "ger";
            checkLogin();
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