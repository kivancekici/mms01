var listVirtualManufacturers;

function initListVirtualManufacturers() {
    listVirtualManufacturers = myApp.virtualList('.lstmanufacturers', {
        items: [
            {
                "status": "OK",
                "id_manufacturer": "2",
                "name": "Beispiel_Hersteller_1",
                "date_add": "2017-05-17 22:14:13",
                "date_upd": "2017-05-17 22:14:13",
                "active": "1"
            }
        ],
        height: 61,
        template: '<li>' +
        '<a href="#" onclick="showManufacturerMenu({{name}},{{id_manufacturer}});" class="item-link item-content">' +
        '<div class="item-media">' +
        //'<img src="http://baklava7.de/img/tmp/manufacturer_mini_{{id_manufacturer}}_1.jpg" class="lazy" width="80">' +
        '<img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" width="80">' +
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
    loadPageWithLang("manufacturers_menu");
}



var listVirtualSearchResult;


function initListVirtualSearchResult() {
    listVirtualSearchResult = myApp.virtualList('.lstsearchresult', {
        items: [

        ],
        height: 61,
        template: '<li>' +
        '<a href="#" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de{{imgdirectory}}" class="lazy" width="80">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}{{imgdirectory}}</div>' +
        '<div class="item-after">{{reducedprice}}</div>' +
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
    listVirtualSearchResult = myApp.virtualList('.lstManufacturersMenu', {
        items: [

        ],
        height: 61,
        template: '<li>' +
        '<a href="#" class="item-link item-content">' +
        '<div class="item-media">' +
        '<img src="http://baklava7.de{{imgdirectory}}" class="lazy" width="80">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}{{imgdirectory}}</div>' +
        '<div class="item-after">{{reducedprice}}</div>' +
        '</div>' +
        '<div class="item-subtitle">{{description_short}}</div>' +
        '<div class="item-text">{{description}}</div>' +
        '</div>' +
        '</a>' +
        '</li>'
    });
}