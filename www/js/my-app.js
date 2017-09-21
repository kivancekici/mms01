var myApp = new Framework7({
    //swipePanel: 'left'
    // ... other parameters
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

var userLoggedIn = false;

checkLogin();

function checkLogin() {
    try {
        //var storedData = window.localStorage['baklava7-'+ '001'];
        if (!userLoggedIn) {
            //do your ajax login request here
            // if successful do your login redirect  
            mainView.router.loadPage({ url: 'login.html', ignoreCache: true, reload: true });

        }
    } catch (e) {}
}



// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function(page) {



});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function(e) {
    // Get page data from event data
    var page = e.detail.page;


    if (page.name === 'login') {

        $$('#register').on('click', function() {


            myApp.alert('Register');

        });

        $$('#btnact').on('click', function() {


            // userLoggedIn = true;

            //    myApp.showPreloader('Yükleniyor..');

            var userEmail = document.getElementById("lgnusername").value;
            var userPassword = document.getElementById("lgnpassword").value;

            var loginData = {
                opr: "login",
                email: userEmail,
                pswd: userPassword
            };



            $$.ajax({
                method: 'POST',
                url: 'http://baklava7.de/mapi/Msvc.php',
                data: JSON.stringify(loginData),
                contentType: 'application/json',
                dataType: 'json',
                success: function(data, status, xmlRequest) {

                    //    myApp.hidePreloader();

                    if (data.status != "NOK") {
                        mainView.router.loadPage({ url: 'create_order.html', ignoreCache: true });
                    } else {
                        myApp.alert("Kullanıcı adınızı veya şifrenizi kontrol ediniz.");
                    }




                },
                error: function(request, status, error) {
                    //    myApp.hidePreloader();
                    myApp.alert("Request error");

                }

            });

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