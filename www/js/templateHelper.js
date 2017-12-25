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
        rowsBefore:100,
        rowsAfter:100,
        height: 80,
        template: '<li>' +
        '<a href="#" onclick="showManufacturerMenu('+"'{{name}}'"+',{{id_manufacturer}});" class="item-link item-content">' +
        '<div class="item-media">' +
        //'<img src="http://baklava7.de/img/tmp/manufacturer_mini_{{id_manufacturer}}_1.jpg" class="lazy" width="80">' +
        '<img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" height="70">' +
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
        height: 80,
        template: '<li>' +
        '<a href="#" onClick="showProductDetailsModal({{id_product}});return false;" class="item-link item-content">' +
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
        template: '<li class="swipeout cls{{id_address}}">' +
                  '<div href="#" class="swipeout-content"><a onclick=updateAdrPage('+"'{{alias}}'"+"',{{company}}'"+"',{{lastname}}'"+"',{{firstname}}'"+"',{{address1}}'"+"',{{address2}}'"+"',{{postcode}}'"+"',{{city}}'"+"',{{phone}}'"+"',{{phone_mobile}}'"+"',{{vat_number}}'"+',{{id_country}}) class="btnUpdateAddress item-link item-content">'+
                  '<div class="item-inner">'+
                  '<div class="item-title-row">' +
                  '<div class="item-title">{{alias}}</div>' +
                  '<div class="item-after"></div>' +
                  '</div>' +
                  '<div class="item-subtitle">{{postcode}}, {{city}}/{{name}}</div>' +
                  '<div class="item-text">{{address1}} {{address2}}</div>'+
                  '</div></a></div>' +
                  '<div class="swipeout-actions-right"><a onclick="deleteUserAddress({{id_address}});" href="#" class="deleteSwipeAction bg-red"></a></div>' +
                  '</li>'
        
    });
}

function updateAdrPage(alias, company, lastname, firstname, address1, address2, postcode, city, phone, phone_mobile, vat_number, id_country){

    setContextParameter("manufacturers_menu","selectedManufacturerName",selectedManufacturerName);
    loadPageWithLang("manufacturers_menu");
}


function deleteUserAddress(idAddress){
    var userId = window.localStorage.getItem("customerId");
    var mdlTitle = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrTitle'];
    var mdlText = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrText'];
    var okBtn = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrOkBtn'];
    var cancelBtn = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrCancelBtn'];

    
    myApp.modal({
    title:  mdlTitle,
    text: mdlText,
    buttons: [
      {
        text: okBtn,
        onClick: function() {
          var delId = '.cls' + idAddress;
          var response = deleteAddress(userId, idAddress);
          if(response == "OK"){
            myApp.swipeoutDelete(delId);
          }else {
           alertMessage('delAdrError', 'error');
          }
        }
      },
      {
        text: cancelBtn,
        onClick: function() {
          
        }
      }
    ]
  })
  //  
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