var currentCart={};
var listCartItemsToShow;
function initListCartItemsToShow() {
    listCartItemsToShow = myApp.virtualList('.listCartItemsToShow', {
        items: [
        ],
        rowsBefore:100,
        rowsAfter:100,
        height: 80,
        template: '<li>' +
        '<a href="#" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de{{imgdirectory}}" class="lazy" width="80">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}</div>' +
        '<div class="item-after">{{reducedprice}} €</div>' +
        '</div>' +
        '<div class="item-subtitle">{{description_short}}</div>' +
        '<div class="item-text">{{description}}</div>' +
        '</div>' +
        '</a>' +
        '</li>'
    });
}

function initResetCart(){
    currentCart={
        
            idCart:"",
            country:1,
            cartSum:0,
            products:[],
            shipmentCount:0,           
            
        };
}

function calculateAttributePrice(product){
    
    alert("not implemented");
    return null;
}

function calculateCartTotal(product){
    
    alert("not implemented");
    return null;
}

function checkManufacturersUpdateShippingCost(){
    
    alert("not implemented");
    return null;
}

function addProductToCart(order){
    //aynı attributeden
    currentCart.products.push(order);
    calculateCartTotal();
    return true;
}