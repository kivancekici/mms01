function getProductDetailsToShow(idProduct) {

    var product = getProductBaseInfo(idProduct, "1");
    product.idProduct=idProduct;
    //product.prices = getProductBasePrices(idProduct);
    //product.unit = getProductBaseUnitName(idProduct, "1");
    //product.attributes = getProductBaseAttributes(idProduct, "1");
    return product;
}

var currentProduct;

function showProductDetailsModal(idProduct) {

    var product = getProductDetailsToShow(idProduct);

    currentProduct = product;

    loadPageWithLang('product_details');

    return false;

}
