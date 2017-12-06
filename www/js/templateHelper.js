var listVirtualManufacturers;

function initListVirtualManufacturers() {
    listVirtualManufacturers = myApp.virtualList('.lstmanufacturers', {
        items: [
        ],
        searchAll: function (query, items) {
            var foundItems = [];
            for (var i = 0; i < items.length; i++) {
                // Check if title contains query string
                var found=false;

                if (items[i].name.toLowerCase().indexOf(query.trim()) >= 0) found=true;
               //Locationda gelebilir.
               // if (items[i].description_short.toLowerCase().indexOf(query.trim()) >= 0) found=true;
               // if (items[i].description.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                
                if(found) foundItems.push(i);;
            }
            // Return array with indexes of matched items
            return foundItems; 
        },
        height: 61,
        template: '<li>' +
        '<a href="#" onclick="showManufacturerMenu('+"'{{name}}'"+',{{id_manufacturer}});" class="item-link item-content">' +
        '<div class="item-media">' +
        //'<img src="http://baklava7.de/img/tmp/manufacturer_mini_{{id_manufacturer}}_1.jpg" class="lazy" width="80">' +
        '<img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" width="70">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}</div>' +
        '<div class="item-after">lorem ipsum dolor sit amet...</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>'
    });
}

function showManufacturerMenu(manufacturer_name,id_manufacturer){
    selectedManufacturerId=id_manufacturer;
    selectedManufacturerName=manufacturer_name;
    setContextParameter("manufacturers_menu","selectedManufacturerName",selectedManufacturerName);
    loadPageWithLang("manufacturers_menu");
}



var listProductResult;


function initlistProduct() {
       listProductResult = myApp.virtualList('.lstproduct', {
        items: [

        ],
        rowsBefore:200,
        rowsAfter:200,
        searchAll: function (query, items) {
            var foundItems = [];
            for (var i = 0; i < items.length; i++) {
                // Check if title contains query string
                var found=false;

                if (items[i].name.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                if (items[i].description_short.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                if (items[i].description.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                
                if(found) foundItems.push(i);;
            }
            // Return array with indexes of matched items
            return foundItems; 
        },
        height: 124,
        template: '<li>' +
        '<a href="#" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de{{imgdirectory}}" class="lazy" width="70">' +
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

var listManufacturersMenu;

function initListManufacturersMenu() {
    listManufacturersMenu = myApp.virtualList('.lstManufacturersMenu', {
        items: [

        ],
        height: 124,
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


var listVirtualUserAddresses;

function initListVirtualUserAddresses() {
    listVirtualUserAddresses = myApp.virtualList('.lstUserAddresses', {
        items: [

        ],
        height: 105,
        template: '<li class="swipeout">' +
                  '<div class="swipeout-content"><a href="#" class="item-link item-content">'+
                  '<div class="item-inner">'+
                  '<div class="item-title-row">' +
                  '<div class="item-title">{{alias}}</div>' +
                  '<div class="item-after"></div>' +
                  '</div>' +
                  '<div class="item-subtitle">{{postcode}}, {{city}}/{{name}}</div>' +
                  '<div class="item-text">{{address1}} {{address2}}</div>'+
                  '</div></a></div>' +
                  '<div class="swipeout-actions-right"><a onclick="deleteAddress('+"'{{alias}}'"+',{{id_address}});" href="#" class="swipeout-delete deleteSwipeAction bg-red"></a></div>' +
                  '</li>'
        
    });
}


function deleteAddress(addressAlias,addressId){
    var userId = window.localStorage.getItem("customerId");
    deleteaddress(userId, addressAlias, addressId);
}

var listVirtualCategories;

function initListVirtualCategories() {
    listVirtualCategories = myApp.virtualList('.lstCategories', {
        items: [

        ],
        cols:2,
        height: 60,
        template: '<div class="row">' +
        '<div class="col-auto">' +
        '<div class="card">' +
        '<div class="card-content">' +
        '<div class="card-content-inner"><img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" width="80" height="80"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-auto">' +
        '<div class="card">' +
        '<div class="card-content">' +
        '<div class="card-content-inner"><img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" width="80" height="80"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    });
}