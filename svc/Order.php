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
 
// If != 0, we don't create the corresponding structure
$id_customer    = 6;
$id_address     = 0;
$id_cart        = 0;
 
try {
$webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);
 
        /*
         *  1. Create new customer
         */
        if(!$id_customer){
            // Getting the empty XML document to send back completed
            $xml = $webService->get( array( 'url' => PS_SHOP_PATH .'api/customers?schema=blank' ) );
            
            // Adding dinamic values
            // Required
            $xml->customer->passwd              = $passwd;
            $xml->customer->lastname            = $lastname;
            $xml->customer->firstname           = $firstname;
            $xml->customer->email               = $email;
            // Others
            $xml->customer->id_lang             = $id_lang;
            $xml->customer->id_shop             = 1;
            $xml->customer->id_shop_group       = 1;
            $xml->customer->id_default_group    = $id_group; // Customers    
            $xml->customer->active              = 1; 
            $xml->customer->newsletter          = 1;
            $xml->customer->newsletter_date_add = $date_now;
            $xml->customer->last_passwd_gen     = $date_now;
            $xml->customer->date_add            = $date_now;
            $xml->customer->date_upd            = $date_now;
            $xml->customer->id_gender           = $id_gender;
            $xml->customer->associations->groups->group[0]->id = $id_group; // customers
 
             // Adding the new customer
            $opt = array( 'resource' => 'customers' );
            $opt['postXml'] = $xml->asXML();
            $xml = $webService->add( $opt );
            $id_customer = $xml->customer->id;
        }
        
        
        /*
        * 2. Create an address
        */
        if(!$id_address){
            // Getting the empty XML document to send back completed
            $xml = $webService->get( array( 'url' => PS_SHOP_PATH .'api/addresses?schema=blank' ) );
 
            // Adding dinamic and mandatory fields
            // Required
            $xml->address->id_customer  = 6;  //$id_customer;
            $xml->address->id_country   =  211;  //$id_country;
            $xml->address->alias        =  'eren ağar\alias';     //$firstname.' '.$lastname.'\'alias';
            $xml->address->lastname     = 'ağar';  //$lastname;
            $xml->address->firstname    = 'eren';  //$firstname;
            $xml->address->city         = 'İzmir'; //$city;
            $xml->address->address1     = '7029.SK NO:107 GÜMÜŞPAL/BAYRAKLI/İZMİR';   //$address1;
            // Others
            $xml->address->phone_mobile = '05456672984';  //$phone_mobile;
            $xml->address->postcode     = '35510';//$ZIP;
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
            $xml->cart->id_currency         = 1;  //$id_currency;
            $xml->cart->id_lang             = 1; //$id_lang;
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
            $xml->cart->id_customer         = 6; // $id_customer;
            $xml->cart->carrier             = 2; //$id_carrier;
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
$xml->order->id_currency            = 1; //$id_currency;
$xml->order->id_lang                = 1; //$id_lang;
        $xml->order->id_customer            = 6;   //$id_customer; 
$xml->order->id_carrier             = 2; //$id_carrier;
        $xml->order->module           = 'ps_wirepayment'; //$order_module;
$xml->order->payment                = 'Havale ile ödeme'; //$order_payment;        
        $xml->order->total_paid             = 42.45; //$total_paid;
        $xml->order->total_paid_real        = 0;  //$total_paid_real;
        $xml->order->total_products         = 28.98; //$total_products;
        $xml->order->total_products_wt      = 34.19;  //$total_products_wt;
        $xml->order->conversion_rate        = 1;
        // Others
$xml->order->valid                      = 1; 
        $xml->order->current_state              = 10; // $id_status;        
        $xml->order->total_discounts            = 0;  //$total_discounts;
        $xml->order->total_discounts_tax_incl   = 0;  //$total_discounts_tax_incl;
        $xml->order->total_discounts_tax_excl   = 0;  //$total_discounts_tax_excl;
        $xml->order->total_paid_tax_incl        = 42.45; //$total_paid_tax_incl;
        $xml->order->total_paid_tax_excl        = 35.98;  //$total_paid_tax_excl;
        $xml->order->total_shipping             = 8.26;  //$total_shipping;
        $xml->order->total_shipping_tax_incl    = 8.26;  //$total_shipping_tax_incl;
        $xml->order->total_shipping_tax_excl    = 7; //$total_shipping_tax_excl;
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
        
        echo "Customer: ".$id_customer." address: ".$id_address." cart: ".$id_cart." Order: .".$id_order;
        
        
}  catch (PrestaShopWebserviceException $e) {
      
  // Here we are dealing with errors
  $trace = $e->getTrace();
  if ($trace[0]['args'][0] == 404) echo 'Bad ID';
  else if ($trace[0]['args'][0] == 401) echo 'Bad auth key';
  else echo 'Other error<br />'.$e->getMessage();
}