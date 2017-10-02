// Initialize app
var myApp = new Framework7({
    swipePanel: 'left',
    swipeBackPage:false
    

});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    preroute: function(view, options) {
        //login control yap
        myApp.alert('halooüüee');
    }
});



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});



var userLoggedIn = false;






// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageBeforeInit('index', function(page) {



});


checkLogin();

function checkLogin() {
    try {
        //var storedData = window.localStorage['baklava7-'+ '001'];
        if (!userLoggedIn) {
            //do your ajax login request here
            // if successful do your login redirect  
            mainView.router.loadPage({ url: 'login.html', ignoreCache: true });

        } else {

            mainView.router.loadPage({ url: 'index.html', ignoreCache: true });
        }
    } catch (e) {}
}


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
                mainView.router.loadPage({ url: 'index.html', ignoreCache: true });
            } else {
                //mainView.router.loadPage({ url: 'index.html', ignoreCache: true });
            }

        });

        $$('.btnForgetPassword').on('click', function() {
            myApp.alert('Unuttum bişeyleri');
        });

    }

    if (page.name === 'create_order') {
        myApp.alert('Sipariş yaratma sayfasına geldiniz.');
    }


});




var calendarBirthday = myApp.calendar({
    input: '#calendarBirthday',
});
