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
            orders:[],
            shipmentCost:0,
            suppliersList:[],
            
        };
}


function calculateCartTotal(product){

    var shipmentPrice=4.90;
    shipmentPrice=getDefaultShipmentPrice();
    shipmentCount=0;
    //products total
    var carttotal=0;
    currentCart.orders.forEach(order => {
        carttotal+=order.price;
        if(!currentCart.suppliersList.includes(order.product.id_supplier)){
            shipmentCount++;
            currentCart.suppliersList.push(order.product.id_supplier);
        }
    });    

    var shipmentCost=shipmentPrice*shipmentCount;
    shipmentCost=shipmentCost.toFixed(2);
    currentCart.shipmentCost=shipmentCost;
    carttotal+=shipmentCost;

    currentCart.cartSum=carttotal.toFixed(2);
    return true;
}

function addProductToCart(order){
    var foundIndex = checkProductExist(order);

    if(foundIndex>-1){
        currentCart.orders[foundIndex].amount+=order.amount;
        currentCart.orders[foundIndex].price+=order.price;
    }else{
        currentCart.orders.push(order);
    }
    calculateCartTotal();
    return true;
}