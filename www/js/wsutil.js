
function restfulGetCall(met, restSuccess) {
    $.get(servicePath + met, function (data) {
        restSuccess(data);
    }).fail(function () {
        msgWarning("Uyarı!", "Bilgiler Alınamıyor...");
    });


}


function restfulPostCall(met, ansdata, restSuccess) {
    $.ajax({
        url: servicePath + met,
        method: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(ansdata),
        success: function (data) {
            restSuccess(data);
        }
    });
}
