
function getProductBaseInfo(id_product,id_lang) {

    var sdata = {
        'opr': 'hpitemproductslist',
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