function getProductDetailsToShow(idProduct) {

    var product = getProductBaseInfo(idProduct, "1");
    product.prices = getProductBasePrices(idProduct);
    product.unit = getProductBaseUnitName(idProduct, "1");
    return product;
}

var currentProduct;

function showProductDetailsModal(idProduct) {

    var product = getProductDetailsToShow(idProduct);

    currentProduct = product;

    myApp.modal({
        title: '<div class="buttons-row">' +
            '<a href="#tab1" class="button active tab-link">Tab 1</a>' +
            '<a href="#tab2" class="button tab-link">Tab 2</a>' +
            '<a href="#tab3" class="button tab-link">Tab 3</a>' +
            '</div>',
        text: '<div class="tabs">' +
            '<div class="tab active" id="tab1">' +
            '<p>' + currentProduct.manufacname + '</p>' +
            '<p>' + currentProduct.productname + '</p>' +
            '<p>' + currentProduct.imgdirectory + '</p>' +
            '</div>' +
            '<div class="tab" id="tab2">' +
            '<p> Gross:' + currentProduct.prices.grossprice + '</p>' +
            '<p> Reduced:' + currentProduct.prices.reducedprice + '</p>' +
            '</div>' +

            '<div class="tab" id="tab3">' +
            '<p> Gross:' + currentProduct.unit.name + '</p>' +
            '<p> Gross:' + currentProduct.unit.name + '</p>' +
            '</div>' +
            '</div>',
        buttons: [
            {
                text: 'Sepete Ekle',
                bold: true,
                onClick: function () {
                    myApp.alert('Sepete eklenecek!')
                },
            },
            {
                text: 'Kapat',
                bold: true
            },
        ]
    });

}