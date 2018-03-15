var listVirtualManufacturers;

function initListVirtualManufacturers() {
    listVirtualManufacturers = myApp.virtualList('.lstmanufacturers', {
        items: [
        ],
        searchAll: function (query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                
                var foundFlag = false;
				
                if (items[i].name.toUpperCase().indexOf(query.toUpperCase()) >= 0 || query.trim() === '') foundFlag = true;
                
                if(foundFlag) found.push(i);
            }
            return found; //return array with mathced indexes
        },
        rowsBefore:100,
        rowsAfter:100,
        height: 105,
        template: '<li>' +
        '<a href="#" onclick="showManufacturerMenu('+"'{{name}}'"+',{{id_manufacturer}});" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" height="30">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}</div>' +
        '<div class="item-after"></div>' +
        '</div>' +
        '<div class="item-text">{{short_description}}</div>'+
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
            var found = [];
            for (var i = 0; i < items.length; i++) {
                
                var foundFlag = false;
				
                if (items[i].name.toUpperCase().indexOf(query.toUpperCase()) >= 0 || query.trim() === '') foundFlag = true;
                if (items[i].description_short.toUpperCase().indexOf(query.toUpperCase()) >= 0 || query.trim() === '') foundFlag = true;
                if (items[i].description.toUpperCase().indexOf(query.toUpperCase()) >= 0 || query.trim() === '') foundFlag = true;
                
                if(foundFlag) found.push(i);
            }
            return found; //return array with mathced indexes
        },
        /*
        searchAll: function (query, items) {
            var foundItems = [];
            for (var i = 0; i < items.length; i++) {
                // Check if title contains query string
                var found=false;

                if (items[i].name.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                if (items[i].description_short.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                if (items[i].description.toLowerCase().indexOf(query.trim()) >= 0) found=true;
                
                if(found) foundItems.push(i);
            }
            // Return array with indexes of matched items
            return foundItems; 
        },
        */
        height: 105,
        template: '<li>' +
        '<a href="#" onClick="showProductDetailsModal({{id_product}});return false;" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de{{imgdirectory}}" class="lazy" height="80">' +
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
                  '<div class="swipeout-content"><a href="#" onclick="updateAdrPage({{id_address}},'+"'{{alias}}',"+"'{{company}}',"+"'{{lastname}}',"+"'{{firstname}}',"+"'{{address1}}',"+"'{{address2}}',"+"'{{postcode}}',"+"'{{city}}',"+"'{{phone}}',"+"'{{phone_mobile}}',"+"'{{vat_number}}',"+'{{id_country}});" class="item-link item-content">'+
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

function updateAdrPage(addressId, alias, company, lastname, firstname, address1, address2, postcode, city, phone, phone_mobile, vat_number, id_country){
   
   var dat = {
            'id_address': addressId,
            'alias': alias,
            'company': company,
            'lastname': lastname,
            'firstname': firstname,
            'address1': address1,
            'address2': address2,
            'postcode': postcode,
            'city': city,
            'id_country': id_country,
            'phone': phone,
            'phone_mobile': phone_mobile,
            'vat_number': vat_number
   }

   loadPageWithLangAndData('update_address', dat);
}

function deleteUserAddress(idAddress){
    var userId = window.localStorage.getItem("customerId");
    var mdlTitle = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrTitle'];
    var mdlText = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrText'];
    var okBtn = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrOkBtn'];
    var cancelBtn = myApp.template7Data.languages[selectedLang]['alertMessages']['delAdrCancelBtn'];
    var pswd = window.localStorage.getItem("password");
    var email = window.localStorage.getItem("useremail");

    
    myApp.modal({
    title:  mdlTitle,
    text: mdlText,
    buttons: [
      {
        text: okBtn,
        onClick: function() {
          var delId = '.cls' + idAddress;
          var response = deleteAddress(userId, idAddress, email, pswd);
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
