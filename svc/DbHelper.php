<?php

include_once '../config/settings.inc.php';


class DbHelper {

    
    public static function getInstance() {
        global $config;
        return new DbHelper(_DB_SERVER_, _DB_USER_, _DB_PASSWD_, _DB_NAME_);
    }

    private $servername;
    private $username;
    private $password;
    private $dbname;
    private $conn;

    function __construct($_servername, $_username, $_password, $_dbname) {
        $this->servername = $_servername;
        $this->username = $_username;
        $this->password = $_password;
        $this->dbname = $_dbname;

		
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
  

        if ($this->conn->connect_error) {
            die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
        }
    }
	
	
	function encrypt($passwd)
	{
		return md5(_COOKIE_KEY_.$passwd);
	}
	
	function checkLogin($_email,$_passwd){
		
		$pwd=$this->encrypt($_passwd);
		
		$sql = "select firstname ,lastname from ps_customer where email='$_email' and passwd='$pwd'";
        $result = $this->conn->query($sql);
		
        $items = array();
		
        if ($result->num_rows > 0) {
			
            while ($row = $result->fetch_assoc()) {
				$rwitem=array();
				array_push($rwitem,"OK");
				array_push($rwitem,$row["firstname"]);
				array_push($rwitem,$row["lastname"]);
                array_push($items, $rwitem);
            }
        } else {
            //no results
        }
        $this->conn->close();

        return $items;
	}
	
	function registerUser($_infos) {
		$_res=false;

		$email=$_infos["email"];	
		
		$id_shop_group=1;
		$id_shop=1;
		$id_gender=1;
		$id_default_group=1;
		$id_lang=1;
		$firstname=" ";
		$lastname=" ";
		$passwd= md5(time());
		$newsletter=0;
		$active=1;
		$is_guest=0;
		$deleted=0;
		
		$sql = "INSERT INTO ps_customer (id_shop_group,id_shop,id_gender,id_default_group,id_lang,firstname,lastname,email,passwd,last_passwd_gen,newsletter,active,is_guest,deleted,date_add,date_upd) "+
				+"VALUES($id_shop_group,$id_shop,$id_gender,$id_default_group,$id_lang,$firstname,$lastname,$email,$passwd,now(),$newsletter,$active,$is_guest,$deleted,now(),now());";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        $this->conn->close();

		if($_res){
			$item="OK;".$passwd;
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function saveAddress($_infos) {
		
		$_res=false;

		$id_country=$_infos["id_country"];
		$id_state=$_infos["id_state"];
		$id_customer=$_infos["id_customer"];
		$id_manufacturer=$_infos["id_manufacturer"];
		$id_warehouse=$_infos["id_warehouse"];
		$alias=$_infos["alias"];
		$company=$_infos["company"];
		$lastname=$_infos["lastname"];
		$firstname=$_infos["firstname"];
		$address1=$_infos["address1"];
		$address2=$_infos["address2"];
		$postcode=$_infos["postcode"];
		$city=$_infos["city"];
		$other=$_infos["other"];
		$phone=$_infos["phone"];
		$phone_mobile=$_infos["phone_mobile"];
		$vat_number=$_infos["vat_number"];
		$dni=$_infos["dni"];		
		
		$sql = "INSERT INTO ps_address (id_country, id_state, id_customer, id_manufacturer, id_supplier, id_warehouse, alias, company, lastname, firstname,address1,address2,postcode,city,other,phone,phone_mobile,vat_number,dni,date_add,date_upd,active,deleted) "+
				+"VALUES($id_country, $id_state, $id_customer, $id_manufacturer, $id_supplier, $id_warehouse, '$alias', '$company', '$lastname', '$firstname', '$address1', '$address2','$postcode','$city','$other','$phone','$phone_mobile','$vat_number','$dni',now(),now(),1,0);";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function getMyAddress($_infos) {
		
		$_res=false;

		$id_customer=$_infos["id_customer"];
		$sql = "SELECT * FROM ps_address where deleted=0 and id_customer=$id_customer";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$addr=array();
				array_push($addr,$_infos["id_address"]);
						array_push($addr,$_infos["id_country"]);
						array_push($addr,$_infos["id_state"]);
						array_push($addr,$_infos["id_customer"]);
						array_push($addr,$_infos["id_manufacturer"]);
						array_push($addr,$_infos["id_warehouse"]);
						array_push($addr,$_infos["alias"]);
						array_push($addr,$_infos["company"]);
						array_push($addr,$_infos["lastname"]);
						array_push($addr,$_infos["firstname"]);
						array_push($addr,$_infos["address1"]);
						array_push($addr,$_infos["address2"]);
						array_push($addr,$_infos["postcode"]);
						array_push($addr,$_infos["city"]);
						array_push($addr,$_infos["other"]);
						array_push($addr,$_infos["phone"]);
						array_push($addr,$_infos["phone_mobile"]);
						array_push($addr,$_infos["vat_number"]);
						array_push($addr,$_infos["dni"]);	
				
                array_push($items,$addr);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
        return $items;
    }
	
	function deleteAddress($_email) {
		
		$_res=false;

		$sql = "update ps_address set deleted=1 where id_address=$id_address and id_customer=$id_customer";
        $result = $this->conn->query($sql);
		if ($result === TRUE) {
            $_res = TRUE;
        }
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function updateAddress($_email) {
		
		$_res=false;

		$id_address=$_infos["id_address"];
		$id_state=$_infos["id_state"];
		$id_customer=$_infos["id_customer"];
		$alias=$_infos["alias"];
		$company=$_infos["company"];
		$lastname=$_infos["lastname"];
		$firstname=$_infos["firstname"];
		$address1=$_infos["address1"];
		$address2=$_infos["address2"];
		$postcode=$_infos["postcode"];
		$city=$_infos["city"];
		$other=$_infos["other"];
		$phone=$_infos["phone"];
		$phone_mobile=$_infos["phone_mobile"];
		$vat_number=$_infos["vat_number"];
		$dni=$_infos["dni"];
		$active=$_infos["active"];		
		
		$sql = "update ps_address set id_country=$id_country, id_state=$id_state, alias='$alias', lastname='$lastname', firstname='$firstname',address1='$address1',address2='$address2',postcode='$postcode',city='$city',other='$other',phone='$phone',phone_mobile='$phone_mobile',vat_number='$vat_number',dni='$dni',date_upd=now(),active=$active where id_address=$id_address and id_customer=$id_customer ";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function openOrders($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function openOrderDetails($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function oldOrders($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function getMessages($_infos2) {
		
		$_res=false;

		$id_customer=$_infos2["id_customer"];
		$sql = "SELECT * FROM ps_message where id_customer=$id_customer";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$msg=array();
				array_push($msg,$_infos["id_message"]);
				array_push($msg,$_infos["id_cart"]);
				array_push($msg,$_infos["id_customer"]);
				array_push($msg,$_infos["id_employee"]);
				array_push($msg,$_infos["id_order"]);
				array_push($msg,$_infos["message"]);
				array_push($msg,$_infos["date_add"]);						
				
                array_push($items,$msg);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
        return $items;
    }
	
	function getManufacturers($_infos2) {
		
		$_res=false;

		$manufacturer=$_infos2["manufacturer"];
		$sql = "select * from ps_manufacturer where name like '%$manufacturer%' and active=1";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$msg=array();
				array_push($msg,$_infos["id_manufacturer"]);
				array_push($msg,$_infos["name"]);					
				
                array_push($items,$msg);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
        return $items;
    }
	
	function getManufacturersCategoryProducts($id_manufacturer,$id_category){
		$_res=false;

		$id_manufacturer=$_infos2["id_manufacturer"];
		$sql = "select * from ps_product prd left join  ps_category_lang ctg on prd.id_category_default=ctg.id_category and ctg.id_lang=1 where id_manufacturer=$id_manufacturer and ctg.id_category=$id_category";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$prd=array();
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				array_push($prd,$_infos["id_category"]);
				
				
                array_push($items,$prd);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
        return $items;
	}
	
	function getManufacturersMenu($_infos2) {
		
		$_res=false;

		$id_manufacturer=$_infos2["id_manufacturer"];
		$sql = "select distinct prd.id_category_default as id_category from ps_product prd left join  ps_category_lang ctg on prd.id_category_default=ctg.id_category and ctg.id_lang=1 where id_manufacturer=$id_manufacturer";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$msg=array();
				$id_category=$_infos["id_category"];					
				
                array_push($items,$msg);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
        return $items;
    }
	
	function getProductsList($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function placeOrder($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
}

?>