
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

