<?php
/*
 *
 * 1) create Customer (opt.)
 * 2) create Address (opt.)
 * 3) create Cart with order_rows and with product id's and quantities
 * 4) create the Order
 * 
*/
// Vars & includes required to use the lib
define('DEBUG', true);
define('PS_SHOP_PATH', 'http://localhost/prestashop/');
define('PS_WS_AUTH_KEY', 'UBVD43GE7E14WIT35UFH2XJTVL5SJ7TU');
require_once('./PSWebServiceLibrary.php');
 




function CreateOrder($_infos){







// If != 0, we don't create the corresponding structure
$id_customer    = $_infos["id_customer"];
$id_address     = $_infos["id_address"];
$id_cart        = $_infos["id_cart"];
$id_currency = $_infos["id_currency"];
$id_lang = $_infos["id_lang"];
$id_carrier = $_infos["id_carrier"];
$order_module = $_infos["order_module"];
$order_payment  = $_infos["order_payment"];
$total_paid  = $_infos["total_paid"];
$total_paid_real  = $_infos["total_paid_real"];
$total_products  = $_infos["total_products"];
$total_products_wt  = $_infos["total_products_wt"];
$total_discounts  = $_infos["total_discounts"];
$total_discounts_tax_incl  = $_infos["total_discounts_tax_incl"];
$total_discounts_tax_excl  = $_infos["total_discounts_tax_excl"];
$total_paid_tax_incl = $_infos["total_paid_tax_incl"];
$total_paid_tax_excl = $_infos["total_paid_tax_excl"];
$total_shipping = $_infos["total_shipping"];
$total_shipping_tax_incl = $_infos["total_shipping_tax_incl"];
$total_shipping_tax_excl = $_infos["total_shipping_tax_excl"];

 
//Adres yok ise bu değişkenler gelmeli. */

$id_country = $_infos["id_country"];

$firstname = $_infos["firstname"];

$lastname = $_infos["lastname"];

$city = $_infos["city"];

$address1 = $_infos["address1"];

$phone_mobile = $_infos["phone_mobile"];

$ZIP = $_infos["ZIP"];
//Adres yok ise bu değişkenler gelmeli.*/




 
try {
$webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);
 
        
           
        /*
        * 2. Create an address
        */
        if(!$id_address){
            // Getting the empty XML document to send back completed
            $xml = $webService->get( array( 'url' => PS_SHOP_PATH .'api/addresses?schema=blank' ) );
 
            // Adding dinamic and mandatory fields
            // Required
            $xml->address->id_customer  = $id_customer;
            $xml->address->id_country   = $id_country;
            $xml->address->alias        =  $firstname.' '.$lastname.'\'alias';
            $xml->address->lastname     = $lastname;
            $xml->address->firstname    = $firstname;
            $xml->address->city         = $city;
            $xml->address->address1     = $address1;
            // Others
            $xml->address->phone_mobile = $phone_mobile;
            $xml->address->postcode     = $ZIP;
            $xml->address->date_add     = '2017-11-10 23:59:49'; //$date_now;
            $xml->address->date_upd     = '2017-11-10 23:59:49'; //$date_now;
 
            // Adding the new Customer's Addresss
            $opt = array( 'resource' => 'addresses' );
            $opt['postXml'] = $xml->asXML();
            $xml = $webService->add( $opt );
            $id_address = $xml->address->id;   
        }
 
 
 
        /*
         * 3. Create new cart
         * 
         */

        if(!$id_cart){
            // Getting the empty XML document to send back completed
            $xml = $webService->get( array( 'url' => PS_SHOP_PATH .'api/carts?schema=blank' ) );
 
            // Adding dinamic and mandatory fields
            // Required
            $xml->cart->id_currency         = $id_currency;
            $xml->cart->id_lang             = $id_lang;





            

            $xml->cart->associations->cart_rows->cart_row[0]->id_product            = 5; //$products[0]['id_product'];
            $xml->cart->associations->cart_rows->cart_row[0]->id_product_attribute  = 19; //$products[0]['id_product_attribute'];
            $xml->cart->associations->cart_rows->cart_row[0]->id_address_delivery   = $id_address;
            $xml->cart->associations->cart_rows->cart_row[0]->quantity              = 1; //$products[0]['quantity'];



            $xml->cart->associations->cart_rows->cart_row[1]->id_product            = 7; //$products[0]['id_product'];
            $xml->cart->associations->cart_rows->cart_row[1]->id_product_attribute  = 34; //$products[0]['id_product_attribute'];
            $xml->cart->associations->cart_rows->cart_row[1]->id_address_delivery   = $id_address;
            $xml->cart->associations->cart_rows->cart_row[1]->quantity              = 2; //$products[0]['quantity'];







            // Others
            $xml->cart->id_address_delivery = $id_address;
            $xml->cart->id_address_invoice  = $id_address;
            $xml->cart->id_customer         =  $id_customer;
            $xml->cart->carrier             = $id_carrier;
            $xml->cart->date_add            = '2017-11-10 23:59:49'; //$date_now;
            $xml->cart->date_upd            = '2017-11-10 23:59:49'; //$date_now;
 
            // Adding the new customer's cart        
            $opt = array( 'resource' => 'carts' );
            $opt['postXml'] = $xml->asXML();
            $xml = $webService->add( $opt );
            $id_cart = $xml->cart->id;   
        }
       
        
        /*
        * 4. Create the order 
        * 
        */
        // Getting the structure of an order
$xml = $webService->get(array('url' => PS_SHOP_PATH .'api/orders/?schema=blank'));
 
        // Adding dinamic and required fields
        // Required
$xml->order->id_address_delivery    = $id_address; // Customer address
$xml->order->id_address_invoice     = $id_address;        
$xml->order->id_cart                = $id_cart; 
$xml->order->id_currency            = $id_currency;
$xml->order->id_lang                = $id_lang;
        $xml->order->id_customer            = $id_customer; 
$xml->order->id_carrier             = $id_carrier;
        $xml->order->module           = $order_module;
$xml->order->payment                = $order_payment;        
        $xml->order->total_paid             = $total_paid;
        $xml->order->total_paid_real        = $total_paid_real;
        $xml->order->total_products         = $total_products;
        $xml->order->total_products_wt      = $total_products_wt;
        $xml->order->conversion_rate        = 1;
        // Others
$xml->order->valid                      = 1; 
        $xml->order->current_state              = $id_status;        
        $xml->order->total_discounts            = $total_discounts;
        $xml->order->total_discounts_tax_incl   = $total_discounts_tax_incl;
        $xml->order->total_discounts_tax_excl   = $total_discounts_tax_excl;
        $xml->order->total_paid_tax_incl        = $total_paid_tax_incl;
        $xml->order->total_paid_tax_excl        = $total_paid_tax_excl;
        $xml->order->total_shipping             = $total_shipping;
        $xml->order->total_shipping_tax_incl    = $total_shipping_tax_incl;
        $xml->order->total_shipping_tax_excl    = $total_shipping_tax_excl;
        // Order Row. Required
        $xml->order->associations->order_rows->order_row[0]->product_id             = 5; //$products[0]['id_product'];
        $xml->order->associations->order_rows->order_row[0]->product_attribute_id   = 19; //$products[0]['id_product_attribute'];
        $xml->order->associations->order_rows->order_row[0]->product_quantity       = 1;  // $products[0]['quantity'];
        // Order Row. Others
        $xml->order->associations->order_rows->order_row[0]->product_name           = 'Printed Summer Dress'; // $products[0]['name'];
        $xml->order->associations->order_rows->order_row[0]->product_reference      = 'demo_5';  //$products[0]['reference'];
        $xml->order->associations->order_rows->order_row[0]->product_price          = 30.5; //$products[0]['product_price'];
        $xml->order->associations->order_rows->order_row[0]->unit_price_tax_incl    = 35.99; //$products[0]['product_price'];
        $xml->order->associations->order_rows->order_row[0]->unit_price_tax_excl    = 30.5;  //$products[0]['product_price'];


        // Order Row. Required
        $xml->order->associations->order_rows->order_row[1]->product_id             = 7; //$products[0]['id_product'];
         $xml->order->associations->order_rows->order_row[1]->product_attribute_id   = 34; //$products[0]['id_product_attribute'];
        $xml->order->associations->order_rows->order_row[1]->product_quantity       = 2;  // $products[0]['quantity'];
        // Order Row. Others
        $xml->order->associations->order_rows->order_row[1]->product_name           = 'Printed Chiffon Dress'; // $products[0]['name'];
        $xml->order->associations->order_rows->order_row[1]->product_reference      = 'demo_7';  //$products[0]['reference'];
        $xml->order->associations->order_rows->order_row[1]->product_price          = 30.5; //$products[0]['product_price'];
        $xml->order->associations->order_rows->order_row[1]->unit_price_tax_incl    = 35.99; //$products[0]['product_price'];
        $xml->order->associations->order_rows->order_row[1]->unit_price_tax_excl    = 30.5;  //$products[0]['product_price'];



        
        // Creating the order
        $opt = array( 'resource' => 'orders' );
        $opt['postXml'] = $xml->asXML();
        $xml = $webService->add( $opt );
        $id_order = $xml->order->id;   
        
       // echo "Customer: ".$id_customer." address: ".$id_address." cart: ".$id_cart." Order: .".$id_order;
        
        
}  catch (PrestaShopWebserviceException $e) {
      
  // Here we are dealing with errors
  $trace = $e->getTrace();
  if ($trace[0]['args'][0] == 404) echo 'Bad ID';
  else if ($trace[0]['args'][0] == 401) echo 'Bad auth key';
  else echo 'Other error<br />'.$e->getMessage();
}

}