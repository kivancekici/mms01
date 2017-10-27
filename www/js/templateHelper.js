function initListVirtualManufacturers(){
    listVirtualManufacturers = myApp.virtualList('.list-block.virtual-list', {
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
        height:77,
        template: '<li>' +
        '<a href="#" class="item-link item-content">' +
        '<div class="item-media">' +
        //'<img src="http://baklava7.de/img/tmp/manufacturer_mini_{{id_manufacturer}}_1.jpg" class="lazy" width="80">' +
        '<img src="http://baklava7.de/img/m/{{id_manufacturer}}-field_manufacture.jpg" class="lazy" width="80">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">{{name}}</div>' +
        '<div class="item-after">lorem ipsum</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>'
    });
}

var listVirtualManufacturers;
