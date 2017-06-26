// Initialize app
var myApp = new Framework7({
        swipePanel: 'left'
        // ... other parameters
}
);


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: false
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

var userLoggedIn=false;

checkLogin();

function checkLogin(){
	 try{
           //var storedData = window.localStorage['baklava7-'+ '001'];
          if(!userLoggedIn) {
              //do your ajax login request here
              // if successful do your login redirect  
                 mainView.router.loadPage({url:'login.html', ignoreCache:true, reload:true });
				 
           }
       }catch(e){
	   }
}



// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
      
	

});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	
	if(!userLoggedIn) {
		return;
	}
	
    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes about page');
    }
});

function loginClick(){
	userLoggedIn=true;
	mainView.router.loadPage({url:'index.html', ignoreCache:true, reload:true });
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
    source: function (autocomplete, query, render) {
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
            success: function (data) {
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
