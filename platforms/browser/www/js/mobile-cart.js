var currentCart = {};
var listCartItemsToShow;
function initListCartItemsToShow() {

    listCartItemsToShow = myApp.virtualList('.listCartItemsToShow', {
        items: currentCart.orders,
        rowsBefore: 100,
        rowsAfter: 100,
        height: 80,
        template: '<li>' +
            '<a href="#" class="item-link item-content">' +
            '<div class="item-media">' +
            '<img src="http://baklava7.de{{product.imgdirectory}}" class="lazy" width="80">' +
            '</div>' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title">{{product.name}}</div>' +
            '<div class="item-after">{{product.reducedprice}} €</div>' +
            '</div>' +
            '<div class="item-subtitle">{{product.description_short}}</div>' +
            '<div class="item-text">{{product.description}}</div>' +
            '</div>' +
            '</a>' +
            '</li>'
    });
}

function initResetCart() {
    currentCart = {

        idCart: "",
        country: 1,
        cartSum: 0,
        orders: [],
        shipmentCost: 0,
        suppliersList: [],

    };
}


function calculateCartTotal() {

    var shipmentPrice = 4.90;
    shipmentPrice = getDefaultShipmentPrice();
    shipmentCount = 0;
    //orders total
    var carttotal = 0;
    currentCart.orders.forEach(order => {
        carttotal += order.price;
        if (!currentCart.suppliersList.includes(order.product.id_supplier)) {
            shipmentCount++;
            currentCart.suppliersList.push(order.product.id_supplier);
        }
    });

    var shipmentCost = shipmentPrice * shipmentCount;
    shipmentCost = Math.round( shipmentCost * 1e2 ) / 1e2;
    currentCart.shipmentCost = shipmentCost;
    carttotal += shipmentCost;

    currentCart.cartSum = Math.round( carttotal * 1e2 ) / 1e2;
    return true;
}

function addNewOrderToCart(order) {
    var foundIndex = checkProductExist(order);

    if (foundIndex > -1) {
        currentCart.orders[foundIndex].amount += order.amount;
        currentCart.orders[foundIndex].price += order.price;
    } else {
        currentCart.orders.push(order);
    }
    calculateCartTotal();
    return true;
}

function checkProductExist(order) {
    if (currentCart.orders == null) {
        initResetCart();

        return -1;
    }
    for (i = 0; i < currentCart.orders.length; i++) {
        if (currentCart.orders[i].product.idProduct == order.product.idProduct && currentCart.orders[i].selectedAttribute == order.selectedAttribute) {
            return i;

        }
    }

    return -1;
}