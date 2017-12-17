function getProductDetailsToShow(idProduct) {

    var product=getProductBaseInfo(idProduct,"1");

    return product;    
}

function showProductDetailsModal(idProduct){

    var product=getProductDetailsToShow(idProduct);

    myApp.modal({
        title: '<div class="buttons-row">' +
            '<a href="#tab1" class="button active tab-link">Tab 1</a>' +
            '<a href="#tab2" class="button tab-link">Tab 2</a>' +
            '</div>',
        text: '<div class="tabs">' +
            '<div class="tab active" id="tab1">'+
            '<p>'+product.manufacname+'</p>'+
            '<p>'+product.productname+'</p>'+
            '<p>'+product.imgdirectory+'</p>'+
            '</div>' +
            '<div class="tab" id="tab2">Posuere cubilia Curae</div>' +
            '</div>',
        buttons: [
            {
                text: 'OK',
                bold: true
            },
        ]
    });

}