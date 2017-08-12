<?php
include_once './DbHelper.php';

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
    case "blue":
        echo "Your favorite color is blue!";
        break;
    case "green":
        echo "Your favorite color is green!";
        break;
    default:
		send_response(Null);
        echo "Your favorite color is neither red, blue, nor green!";
		break;
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
?>