function getProductDetailsToShow(idProduct) {

    var product=getProductBaseInfo(idProduct,"1");
    product.prices=getProductBasePrices(idProduct);
    product.unit=getProductBaseUnitName(idProduct,"1");
    return product;    
}

function showProductDetailsModal(idProduct){

    var product=getProductDetailsToShow(idProduct);

    myApp.modal({
        title: '<div class="buttons-row">' +
            '<a href="#tab1" class="button active tab-link">Tab 1</a>' +
            '<a href="#tab2" class="button tab-link">Tab 2</a>' +
            '<a href="#tab3" class="button tab-link">Tab 3</a>' +
            '</div>',
        text: '<div class="tabs">' +
            '<div class="tab active" id="tab1">'+
            '<p>'+product.manufacname+'</p>'+
            '<p>'+product.productname+'</p>'+
            '<p>'+product.imgdirectory+'</p>'+
            '</div>' +
            '<div class="tab" id="tab2">'+
            '<p> Gross:'+product.price.grossprice+'</p>'+
            '<p> Reduced:'+product.price.reducedprice+'</p>'+
            '</div>' +
            '</div>'+
            '<div class="tab" id="tab3">'+
            '<p> Gross:'+product.unit.name+'</p>'+
            '</div>' +
            '</div>',
        buttons: [
            {
                text: 'OK',
                bold: true
            },
        ]
    });

}