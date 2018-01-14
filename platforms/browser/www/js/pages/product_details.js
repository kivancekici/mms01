function initPageProductDetails() {
    $$(".product_name_title").text(currentProduct.productname);

    $$(".product_name_over_image").text(currentProduct.productname);
    $$(".product-manufacturer-name").text(currentProduct.manufacname);
    $$(".product-description").html(currentProduct.description_short);

    $$('.card-header-product').css('background-image', 'url("http://baklava7.de' + currentProduct.imgdirectory + '")');

    currentProduct.prices = getProductBasePrices(currentProduct.idProduct);
    currentProduct.unit = getProductBaseUnitName(currentProduct.idProduct, "1");
    currentProduct.attributes = getProductBaseAttributes(currentProduct.idProduct, "1");

}

function addProductAttributeRadioItem(attribute, checked) {
    var strchk = "";
    if (checked) {
        strchk = 'checked="checked"';
    }
    var li = '<li>' +
        '<label class="label-radio item-content">' +
        '<input type="radio" name="my-radio" value="' + attribute.id_attribute + '" ' + strchk + '>' +
        '<div class="item-inner">' +
        '<div class="item-title">' + attribute.name + '</div>' +
        '</div>' +
        '</label>' +
        '</li>';

    

}