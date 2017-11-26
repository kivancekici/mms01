<?php

define('DEBUG', true);
define('PS_SHOP_PATH', 'http://baklava7.de/');
define('PS_WS_AUTH_KEY', 'ETWBKUSGADG55BTDCFGMHMHE852AV2YX');
require_once('./PSWebServiceLibrary.php');


try {
    $webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);


 // Getting the empty XML document to send back completed
 $xml = $webService->get( array( 'url' => PS_SHOP_PATH .'api/customers?schema=blank' ) );
 
 // Adding dinamic values
 // Required
 $xml->customer->passwd              = 'er1988en'; //$passwd;
 $xml->customer->lastname            = 'sarı'; //$lastname;
 $xml->customer->firstname           = 'mahmut'; //$firstname;
 $xml->customer->email               = 'mahmutsari65754323@gmail.com'; //$email;
 // Others
 $xml->customer->id_lang             = 1; // $id_lang;
 $xml->customer->id_shop             = 1;
 $xml->customer->id_shop_group       = 1;
 $xml->customer->id_default_group    = 3; //$id_group; // Customers    
 $xml->customer->active              = 1; 
 $xml->customer->newsletter          = 1;
 $xml->customer->newsletter_date_add = '2017-11-20 23:59:49'; //$date_now;
 $xml->customer->last_passwd_gen     = '2017-11-20 23:59:49'; //$date_now;
 $xml->customer->date_add            ='2017-11-20 23:59:49'; //$date_now;
 $xml->customer->date_upd            = '2017-11-20 23:59:49'; //$date_now;
 $xml->customer->id_gender           = 1; //$id_gender;
 $xml->customer->associations->groups->group[0]->id = 3; //$id_group; // customers

  // Adding the new customer
 $opt = array( 'resource' => 'customers' );
 $opt['postXml'] = $xml->asXML();
 $xml = $webService->add( $opt );
 $id_customer = $xml->customer->id;




}catch (PrestaShopWebserviceException $e) {
    
// Here we are dealing with errors
$trace = $e->getTrace();
if ($trace[0]['args'][0] == 404) echo 'Bad ID';
else if ($trace[0]['args'][0] == 401) echo 'Bad auth key';
else echo 'Other error<br />'.$e->getMessage();
}














?>