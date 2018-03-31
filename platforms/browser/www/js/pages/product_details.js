var currentOrder={};

function initPageProductDetails() {
    currentOrder={
        orderid:"",
        product:{},
        amount:1,
        selectedAttribute:0,
        price:0
    };
    
    $$(".product_name_title").text(currentProduct.productname);

    $$(".product_name_over_image").text(currentProduct.productname);
    $$(".product-manufacturer-name").text(currentProduct.manufacname);
    $$(".product-description").html(currentProduct.description_short);
    $$(".product-nutrival").html(currentProduct.description);

    $$('.card-header-product').css('background-image', 'url("http://baklava7.de' + currentProduct.imgdirectory + '")');

    currentProduct.prices = getProductBasePrices(currentProduct.idProduct);
    currentProduct.unit = getProductBaseUnitName(currentProduct.idProduct, "1");
    currentProduct.attributes = getProductBaseAttributes(currentProduct.idProduct, "1");

    currentOrder.product=currentProduct;
    currentOrder.amount=1;
    $$(".txt-cart-order-amount").text(currentOrder.amount);
    currentOrder.selectedAttribute=currentProduct.attributes[0];
    currentOrder.selectedAttributePrice=currentProduct.attributes[0].reducedprice;
    currentOrder.idOrder=""+currentOrder.product.idProduct+":"+currentOrder.selectedAttribute;
    currentOrder.price = currentOrder.selectedAttributePrice;
    currentOrder.price=parseFloat(currentOrder.price);
    $$(".product-base-price").text(currentOrder.price+" €");

    currentProduct.attributes.forEach(element => {
        addProductAttributeSelectOption(element);

    });

    $$("#btnAddToCart").on('click', function() {

        onClickAddToCart();
        loadPageWithLang('shopping_cart');
    });
}
//var subCatTxt = ;
//$$('.smart-select select optgroup').eq(i).append(subCatTxt);

function addProductAttributeSelectOption(attribute) {
    var opt ='<option value="' + attribute.id_attribute + '">' + attribute.name + '</option>';

    $$("#selectProductAttribute").append(opt);

}

function onSelectedAttributeChanged(){
    var attrIndex=$$("#selectProductAttribute")[0].selectedIndex;
    currentOrder.selectedAttribute=currentProduct.attributes[attrIndex];
    currentOrder.selectedAttributePrice=currentProduct.attributes[attrIndex].reducedprice;
    calculateOrderItemPrice();
}

function incrementOrderItemAmount(){
    currentOrder.amount++;
    $$(".txt-cart-order-amount").val(currentOrder.amount);
    calculateOrderItemPrice();
}

function decrementOrderItemAmount(){
    if(currentOrder.amount>1){
        currentOrder.amount--;
        $$(".txt-cart-order-amount").val(currentOrder.amount);
    }

    calculateOrderItemPrice();
}



function calculateOrderItemPrice(){
    currentOrder.price=currentOrder.amount*currentOrder.selectedAttributePrice;
    currentOrder.price=Math.round( currentOrder.price * 1e2 ) / 1e2;
    currentOrder.price=parseFloat(currentOrder.price);
    $$(".product-base-price").text(currentOrder.price+" €");
}

function onClickAddToCart(){
    addNewOrderToCart(currentOrder);
}