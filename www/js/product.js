function showProductDetails(idProduct) {

    

    myApp.modal({
        title: '<div class="buttons-row">' +
            '<a href="#tab1" class="button active tab-link">Tab 1</a>' +
            '<a href="#tab2" class="button tab-link">Tab 2</a>' +
            '</div>',
        text: '<div class="tabs">' +
            '<div class="tab active" id="tab1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis nunc non dolor euismod feugiat. Sed at sapien nisl. Ut et tincidunt metus. Suspendisse nec risus vel sapien placerat tincidunt. Nunc pulvinar urna tortor.</div>' +
            '<div class="tab" id="tab2">Vivamus feugiat diam velit. Maecenas aliquet egestas lacus, eget pretium massa mattis non. Donec volutpat euismod nisl in posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</div>' +
            '</div>',
        buttons: [
            {
                text: 'Ok, got it',
                bold: true
            },
        ]
    });
}