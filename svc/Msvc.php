<?php
include_once './DbHelper.php';

include_once './CreateOrder.php';

//Make sure that it is a POST request.
if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}

//Make sure that the content type of the POST request has been set to application/json
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
    throw new Exception('Content type must be: application/json');
}

//Receive the RAW post data.
$content = trim(file_get_contents("php://input"));

//Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);

//If json_decode failed, the JSON is invalid.
if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}

//Process the JSON.


$opr=$decoded["opr"];

switch ($opr) {
    case "login":
        fLogin($decoded);
		break;
	case "checkAvaibleUser":
	fcheckAvaibleUser ($decoded);
		break;
    case "register":
	fRegisterUser($decoded);
		break;
	case "getuserinfo":
	fGetUserInfo($decoded);
		break;
	case "updateuserdata":
        fUpdateUserData($decoded);
		break;
		case "getcountries":
        fgetcountries($decoded);
        break;
    case "saveaddress":
        fSaveAddress($decoded);
        break;
	case "getmyaddresses":
        fGetMyAddress($decoded);
        break;
	case "deleteaddress":
		fDeleteAddress($decoded);
		break;		
	case "updateaddress":
		fUpdateAddress($decoded);
		break;
	case "openorders":
		fOpenOrders($decoded);
		break;
	case "openorderdetails":
		fOpenOrderDetails($decoded);
		break;
	case "oldorders":
		fOldOrders($decoded);
		break;
	case "getmessages":
		fGetMessages($decoded);
		break;
	case "postmessages":
		fPostMessages($decoded);
		break;
	case "manufacturers":
		fGetManufacturers($decoded);
		break;
	case "manufacturersmenu":
		fGetManufacturersMenu($decoded);
		break;
	case "hpproductslist":
		fGetHpProductsList($decoded);
		break;
	case "hpitemproductslist":
		fGetIpProductsList($decoded);
		break;

	case "hpproductscomments":
		fGetProductsComments($decoded);
		break;
		
	case "hpitemproductsprice":
		fGetIpProductsPrice($decoded);
		break; 

	case "hpitemproductunitname":
		fGetIpProductUnitName($decoded);
		break; 

	case "hpitemproductunitvalue":
		fGetIpProductUnitValue($decoded);
		break; 

	case "hpproductattribute":
		fGetIpProductAttribute($decoded);
		break; 	
	case "categorytree":
		fGetcategorytree($decoded);
		break; 	

	case "manufacturerlist":
		fGetManufacturerList($decoded);
		break; 

	case "placeorder":
		fPlaceOrder($decoded);
		break;

	case "orderhistoryhead":
		fOrderHistoryHead($decoded);
		break;

	case "createorders":
		fCreateorder($decoded);
		break;

	case "checkbeforeupdateuserdata":
			fCheckBeforeUpdateUserData($decoded);
			break;

    default:
		send_response(Null);
		break;
}




function fCheckBeforeUpdateUserData($_jsondata) {
	$_items = DbHelper::getInstance()->checkBeforeUpdateUserdata($_jsondata);
	if (!empty($_items)) {
	send_response($_items);
	} else {
	send_response(Null);
	}
	}





function fOrderHistoryHead($_jsondata) {
	$_items = DbHelper::getInstance()->getOrderHistoryHead($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function send_response($response_data) {
	header("Content-Type:application/json");
    $response['response_data'] = $response_data;

    $json_response = json_encode($response_data, JSON_UNESCAPED_UNICODE);
    echo $json_response;
}

function fLogin($_jsondata) {
	$email=$_jsondata["email"];
	$pswd=$_jsondata["pswd"];
	$_items = DbHelper::getInstance()->checkLogin($email,$pswd);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fcheckAvaibleUser($_jsondata) {
	$_items = DbHelper::getInstance()->checkAvaibleUser($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fRegisterUser($_jsondata) {
	$_items = DbHelper::getInstance()->registerUser($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetUserInfo($_jsondata) {
	$_items = DbHelper::getInstance()->getuserinfo($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fUpdateUserData($_jsondata) {
	$_items = DbHelper::getInstance()->updateuserdata($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fgetcountries($_jsondata) {
	$_items = DbHelper::getInstance()->getcountries($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}





function fSaveAddress($_jsondata) {
	$_items = DbHelper::getInstance()->saveAddress($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fGetMyAddress($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getMyAddress($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fDeleteAddress($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	//$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->deleteAddress($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fUpdateAddress($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	//$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->updateAddress($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fOpenOrders($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->openOrders($email);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fOpenOrderDetails($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->openOrderDetails($email);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fOldOrders($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->oldOrders($email);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fGetMessages($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	//$id_customer=$_jsondata["id_customer"];
	$_items = DbHelper::getInstance()->getMessages($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fPostMessages($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	//$id_customer=$_jsondata["id_customer"];
	$_items = DbHelper::getInstance()->postMessages($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetManufacturers($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	//$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->getManufacturers($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

function fGetManufacturersMenu($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$email=$_jsondata["email"];
	$_items = DbHelper::getInstance()->getManufacturersMenu($email);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fGetHpProductsList($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getHpProductsList($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fGetIpProductsList($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getIpProductsList($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}




function fGetProductsComments($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getProductsComments($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}




function fGetIpProductsPrice($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getIpProductsPrice($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetIpProductAttribute($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getProductIdatrribute($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetIpProductUnitName($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getProducUnitName($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetIpProductUnitValue($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getProducUnitValue($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}




function fGetcategorytree($_jsondata) {
	//alanları ekle ve dbhelper methodunu yaz
	$_items = DbHelper::getInstance()->getcategorytree($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fGetManufacturerList($_jsondata) {
	$_items = DbHelper::getInstance()->getmanufacturerlist($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}


function fCreateorder($_jsondata) {
	$_items = CreateOrder::getInstance()->OrderCreator($_jsondata);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}



function fPlaceOrder($_jsondata) {

	$_items = DbHelper::getInstance()->placeOrder($email);
	if (!empty($_items)) {
		send_response($_items);
	} else {
		send_response(Null);
	}
}

?>