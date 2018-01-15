function initPageProductDetails() {
    $$(".product_name_title").text(currentProduct.productname);

    $$(".product_name_over_image").text(currentProduct.productname);
    $$(".product-manufacturer-name").text(currentProduct.manufacname);
    $$(".product-description").html(currentProduct.description_short);

    $$('.card-header-product').css('background-image', 'url("http://baklava7.de' + currentProduct.imgdirectory + '")');

    currentProduct.prices = getProductBasePrices(currentProduct.idProduct);
    currentProduct.unit = getProductBaseUnitName(currentProduct.idProduct, "1");
    currentProduct.attributes = getProductBaseAttributes(currentProduct.idProduct, "1");


    currentProduct.attributes.forEach(element => {
        addProductAttributeSelectOption(element);

    });
}
//var subCatTxt = ;
//$$('.smart-select select optgroup').eq(i).append(subCatTxt);

function addProductAttributeSelectOption(attribute) {
    var opt ='<option value="' + attribute.id_attribute + '">' + attribute.name + '</option>';

    $$("#selectProductAttribute").append(opt);

}
