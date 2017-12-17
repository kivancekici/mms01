
function getProductBaseInfo(id_product,id_lang) {

    var sdata = {
        'opr': 'hpitemproductslist',
        'id_product': id_product,
        'id_lang':id_lang
    }

    var result = restfulPostCall(sdata);

    if (result != "Error") {
        return result[0];
    } else {
        return "NOK";
    }
}

function getProductBasePrices(id_product) {

    var sdata = {
        'opr': 'hpitemproductsprice',
        'id_product': id_product,
        'id_product_attribute':""
    }

    var result = restfulPostCall(sdata);

    if (result != "Error") {
        return result;
    } else {
        return "NOK";
    }
}

function getProductBaseUnitName(id_product,id_lang) {

    var sdata = {
        'opr': 'hpitemproductunitname',
        'id_product': id_product,
        'id_lang':id_lang
    }

    var result = restfulPostCall(sdata);

    if (result != "Error") {
        return result;
    } else {
        return "NOK";
    }
}