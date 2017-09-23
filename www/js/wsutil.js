var servicePath = "http://baklava7.de/mapi/Msvc.php";

function restfulGetCall(restSuccess) {
    $.get(servicePath, function(data) {
        restSuccess(data);
    }).fail(function() {
        //msgWarning("Uyarı!", "Bilgiler Alınamıyor...");
    });


}


function restfulPostCall(sendData) {
    myApp.alert("hi rest");
    var response;



    $$.post(servicePath, JSON.stringify(sendData),
        function(data) {
            myApp.alert("success");
            console.log(data[0].status);
            response = data;
        },
        function(xhr, status) {
            response = "Error";
            myApp.alert("error");
        });


    return response;


}

function mobileLogin(email, passwd) {

    var lgndata = {
        'opr': 'login',
        'email': email,
        'pswd': passwd
    }

    myApp.alert(JSON.stringify(lgndata));

    var result = restfulPostCall(lgndata);

    myApp.alert(JSON.stringify(result));
}