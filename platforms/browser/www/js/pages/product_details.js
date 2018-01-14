function initPageProductDetails(){
    $$(".product_name_title").text(currentProduct.productname);
    
    $$(".product_name_over_image").text(currentProduct.productname);
    $$(".product-manufacturer-name").text(currentProduct.manufacname);
    $$(".product-description").html(currentProduct.description);
    
    $$('.card-header-product').css('background-image', 'url("http://baklava7.de'+currentProduct.imgdirectory+'")');
}