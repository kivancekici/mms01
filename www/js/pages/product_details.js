function initPageProductDetails(){
    $$(".product_name_title").text(currentProduct.productname);
    
    $$(".product_name_over_image").text(currentProduct.manufacname);
    $$('.card-header-product').css('background-image', 'url("'+currentProduct.imgdirectory+'")');
}