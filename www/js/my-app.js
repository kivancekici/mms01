// Initialize app
var myApp = new Framework7({
    swipePanel: 'left',
    preroute: function (view, options) {
        //login control yap
    }
        
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {

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

            mainView.router.loadPage({ url: 'create_order.html', ignoreCache: true });
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
        $$('.btnLogin').on('click', function(){
            var email=$$('#txtEmail').value;
            var pass=$$('txtPassword').value;
            var customer=mobileLogin(email , pass);
            
            if(customer==null){
                myApp.alert('Başarısız : '+email+' ' + pass);
            }else{
                userLoggedIn=true;
                myApp.alert('Wuuhuuu Başarılı :'+ customer['id_customer'] + " "+customer.firstname+" "+customer.lastname);
                
                mainView.router.loadPage({ url: 'index.html', ignoreCache: true });
                
            }
        }); 
        
        $$('.btnForgetPassword').on('click', function(){
            myApp.alert('Unuttum bişeyleri');
        }); 
        
    }
});



function loginClick() {
    userLoggedIn = true;

    myApp.showPreloader('Yükleniyor..');

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
        timeout: 2000,
        success: function(data, status, xmlRequest) {

            myApp.hidePreloader();

            if (data.status != "NOK") {
                mainView.router.loadPage({ url: 'create_order.html', ignoreCache: true });
            } else {
                myApp.alert("Kullanıcı adınızı veya şifrenizi kontrol ediniz.");
            }




        },
        error: function(request, status, error) {
            myApp.hidePreloader();
            myApp.alert("Request error");

        }

    });




}

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
