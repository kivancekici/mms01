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
		
		$sql = "select id_customer,firstname ,lastname from ps_customer where email='$_email' and passwd='$pwd'";
        $result = $this->conn->query($sql);
		
        $items = array();
		
        if ($result->num_rows > 0) {
			
            while ($row = $result->fetch_assoc()) {
				$rwitem=array();
				$rwitem["status"]="OK";
				$rwitem=array_merge($rwitem,$row);
                array_push($items, $rwitem);
            }
        } else {
            $rwitem=array();
				$rwitem["status"]="NOK";
                array_push($items, $rwitem);
        }
        $this->conn->close();

        return $items;
	}





	function checkAvaibleUser($_infos){


		$email=$_infos["email"];

		$sql = "SELECT id_customer FROM ps_customer WHERE email='$email';";
		
				$result = $this->conn->query($sql);
		
				if ($result->num_rows > 0) {
		
					$rwitem="OK";
					return $rwitem;
				}else {
				$rwitem="NOK";
				return $rwitem;
	
				}

	}












	
	function registerUser($_infos) {
		$_res=false;
		$id_shop_group=1;
		$id_shop=1;
		$id_gender=1;
		$id_default_group=3;
		$id_lang=1;
		$id_risk=0; 
		$company=" ";
		$siret=" ";
		$ape=" ";
		$firstname=" ";
		$lastname=" ";
		$email=$_infos["email"];	
		$passwdOpen=time();
		$passwd= md5($passwdOpen);
		$last_passwd_gen="";
		$birthday="";
		$newsletter=0;
		$ip_registration_newsletter="";
		$newsletter_date_add="";		
		$optin=0;
		$website=" ";		
		$active=1;
		$is_guest=0;
		$deleted=0;
		

		






		$sql = "INSERT INTO ps_customer (id_shop_group,id_shop,id_gender,id_default_group,id_lang,id_risk,company,siret,ape,firstname,lastname,email,passwd,last_passwd_gen,birthday,newsletter,ip_registration_newsletter,newsletter_date_add,optin,website,active,is_guest,deleted,date_add,date_upd) "
		."VALUES($id_shop_group,$id_shop,$id_gender,$id_default_group,$id_lang,$id_risk,'$company','$siret','$ape','$firstname','$lastname','$email','$passwd',now(),now(),$newsletter,'$ip_registration_newsletter',now(),$optin,'$website',$active,$is_guest,$deleted,now(),now());";
		$result = $this->conn->query($sql);

		if ($result === TRUE) {
		$_res = TRUE;
		}

		$this->conn->close();

		if($_res){
		$rwitem=array();
		$rwitem["status"]="OK";
		$rwitem["pswd"]="$passwdOpen";
		return $rwitem;
		}else{
		$rwitem=array();
		$rwitem["status"]="NOK";
		$rwitem["SQL"]="$sql";
		return $rwitem;
		}






		
	
		
    }
	



	function updateuserdata($_infos) {
		$_res=false;
		
		$id_gender=$_infos["id_gender"];
		$company=$_infos["company"];
		$firstname=$_infos["firstname"];
		$lastname=$_infos["lastname"];
		$email=$_infos["email"];	
		$passwd= md5($_infos["passwd"]);
		$birthday=$_infos["birthday"];
		$newsletter=$_infos["newsletter"];		
		$optin=$_infos["optin"];
		$website=$_infos["website"];
		$date_upd=$_infos["date_upd"];
		$id_customer=$_infos["id_customer"];
		
		
		$sql = "UPDATE ps_customer SET id_gender=$id_gender,company='$company',firstname='$firstname',lastname='$lastname',email='$email',passwd='$passwd',birthday=$birthday,newsletter=$newsletter,optin=$optin,website='$website',date_upd=$date_upd WHERE id_customer=$id_customer";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        $this->conn->close();

		if($_res){
			$rwitem=array();
			$rwitem["status"]="OK";
			$rwitem["pswd"]="$passwdOpen";
			return $rwitem;
		}else{
			$rwitem=array();
			$rwitem["status"]="NOK";
			$rwitem["SQL"]="$sql";
			return $rwitem;
		}
		
        return $item;
    }



	function saveAddress($_infos) {
		
		$_res=false;

		$id_country=$_infos["id_country"];
		$id_state=$_infos["id_state"];
		$id_customer=$_infos["id_customer"];
		//$id_manufacturer=$_infos["id_manufacturer"];
		//$id_warehouse=$_infos["id_warehouse"];
		$alias=$_infos["alias"];
		$company=$_infos["company"];
		$lastname=$_infos["lastname"];
		$firstname=$_infos["firstname"];
		$address1=$_infos["address1"];
		$address2=$_infos["address2"];
		$postcode=$_infos["postcode"];
		$city=$_infos["city"];
		//$other=$_infos["other"];
		$phone=$_infos["phone"];
		//$phone_mobile=$_infos["phone_mobile"];
		$vat_number=$_infos["vat_number"];
		//$dni=$_infos["dni"];		
		
		$sql = "INSERT INTO ps_address (id_country, id_state, id_customer,  alias, company, lastname, firstname,address1,address2,postcode,city,phone,vat_number,date_add,date_upd,active,deleted) "
				."VALUES($id_country, $id_state, $id_customer,  '$alias', '$company', '$lastname', '$firstname', '$address1', '$address2','$postcode','$city','$phone','$vat_number',now(),now(),1,0);";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        

		if($_res){
			
			$item="OK";

		}else{
			$item="NOK";
		}
		
		return $item;
		$this->conn->close();
    }
	
	function getMyAddress($_infos) {
		
		$_res=false;

		$id_customer=$_infos["id_customer"];
		$sql = "SELECT pa.alias,CONCAT(pa.firstname,' ', pa.lastname) AS 'name',pa.vat_number,pa.address1,pa.address2,CONCAT(pa.postcode,' ', pa.city) AS 'postcodecity', pl.name, pa.phone
		 FROM ps_address pa, ps_customer pc, ps_country_lang pl WHERE pa.deleted=0 AND pa.id_customer=$id_customer AND pc.id_customer = pa.id_customer
		 AND pl.id_country = pa.id_country AND pl.id_lang = pc.id_lang 
		 ";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$addr=array();

				$addr["status"]="OK";
				$addr=array_merge($addr,$_infos);           
				
                array_push($items,$addr);
				
				$_res=true;
            }
			
			
        } else {
            //no results
        }
		
       

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
			return $item;
		}
		
		return $items;
		
		$this->conn->close();
    }
	
	function deleteAddress($_infos) {
		
		$_res=false;

		$id_address =$_infos["id_address"];
		$id_customer=$_infos["id_customer"];

		$sql = "DELETE FROM ps_address WHERE id_address=$id_address AND id_customer=$id_customer";
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
	
	function updateAddress($_infos) {
		
		$_res=false;

		$id_country=$_infos["id_country"];
		$id_state=$_infos["id_state"];
		$id_customer=$_infos["id_customer"];
		$id_address=$_infos["id_address"];
		$alias=$_infos["alias"];
		$company=$_infos["company"];
		$lastname=$_infos["lastname"];
		$firstname=$_infos["firstname"];
		$address1=$_infos["address1"];
		$address2=$_infos["address2"];
		$postcode=$_infos["postcode"];
		$city=$_infos["city"];
		$phone=$_infos["phone"];
		$phone_mobile=$_infos["phone_mobile"];
		$vat_number=$_infos["vat_number"];
		$other=$_infos["other"];
		
		$sql = "UPDATE ps_address SET id_country=$id_country, id_state=$id_state, alias='$alias', company='$company',lastname='$lastname', firstname='$firstname',address1='$address1',address2='$address2',postcode='$postcode',city='$city',phone='$phone',phone_mobile='$phone_mobile',vat_number='$vat_number', other='$other',date_upd=now(),active=1 WHERE id_address=$id_address AND id_customer=$id_customer;";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
		return $item;
		
		$this->conn->close();
    }
	
	function openOrders($_infos2) {
		
		$_res=false;

		$id_customer=$_infos2["id_customer"];
		$sql = "select * from ps_orders where id_customer=$id_customer and current_state<=45";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$oldorders=array();
				$oldorders["status"]="OK";
				$oldorders=array_merge($oldorders,$_infos);
                array_push($items,$oldorders);
				
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
	
	function openOrderDetails($_infos2) {
		
		$_res=false;
		
		$id_order=$_infos2["id_order"];
		$sql = "select * from ps_order_detail where id_order=$id_order";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$dets=array();
				$dets["status"]="OK";
				$dets=array_merge($dets,$_infos);
                array_push($items,$dets);
				
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
		}
		
        return $item;
    }
	
	function oldOrders($_email) {
		
		$_res=false;

		$id_customer=$_infos2["id_customer"];
		$sql = "select * from ps_orders where id_customer=$id_customer and current_state>=5";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$oldorders=array();
				$oldorders["status"]="OK";
				$oldorders=array_merge($oldorders,$_infos);
                array_push($items,$oldorders);
				
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
	
	function getMessages($_infos2) {
		
		$_res=false;

		$id_customer=$_infos2["id_customer"];
		$sql = "SELECT cm.id_employee, cm.message,cm.date_add FROM ps_customer_message cm, ps_customer_thread ct 
		where ct.id_customer=$id_customer AND cm.id_customer_thread= ct.id_customer_thread ORDER BY cm.date_add";

		$result = $this->conn->query($sql);
		
        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$msg=array();
				$msg["status"]="OK";
				$msg=array_merge($msg,$_infos);
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
	

	function postMessages($_infos2) {
		
		$id_customer=$_infos2["id_customer"];

		$message=$_infos2["message"];


		$sql = "SELECT id_customer,id_customer_thread FROM ps_customer_thread WHERE id_customer = $id_customer;";

		$result = $this->conn->query($sql);

		if ($result->num_rows > 0) {

			$tmpsqltable = mysqli_fetch_array($result, MYSQLI_ASSOC);


			$sql = "INSERT INTO ps_customer_message (id_customer_thread,id_employee, message, date_add, date_upd ) "."VALUES($tmpsqltable[id_customer_thread],'0', '$message', now(),now());";

			$result= $this->conn->query($sql);

			if ($result === TRUE) {
				
				$sql = "UPDATE ps_customer_thread SET status = 'open' WHERE id_customer=$id_customer AND id_customer_thread = $tmpsqltable[id_customer_thread]; ";

				$result= $this->conn->query($sql);

				if ( $result === TRUE){
					$result = 'Thread var, yeni mesaj eklendi ve thread tablosunda status guncellendi';	
				}else{
					//$result = 'Thread var, yeni mesaj eklendi ama thread tablosunda status guncellenemedi';	
					$result = $this->conn->affected_rows();
					
				}
				
			}else{
				$result= 'Thread var ve mesaj eklenmedi ve thread tablosunda status guncellenmedii.';
				
			}

		}else{

			$sql = "SELECT email FROM ps_customer WHERE id_customer = $id_customer;";

			$result = $this->conn->query($sql);
			$tmpsqltable = mysqli_fetch_array($result, MYSQLI_ASSOC);



			$sql = "INSERT INTO ps_customer_thread (id_lang,id_contact,id_customer,email,status, date_add, date_upd ) "
			."VALUES('1','2',$id_customer, '$tmpsqltable[email]'  ,'open', now(),now());";

			$result= $this->conn->query($sql);
			$tmpsqltable = mysqli_fetch_array($result, MYSQLI_ASSOC);
			
			if ($result === TRUE){
					

				$sql = "SELECT id_customer_thread FROM ps_customer_thread WHERE id_customer = $id_customer;";
				
				$result = $this->conn->query($sql);
				
				$tmpsqltable = mysqli_fetch_array($result, MYSQLI_ASSOC);


				$sql = "INSERT INTO ps_customer_message (id_customer_thread,id_employee, message, date_add, date_upd ) "
				."VALUES($tmpsqltable[id_customer_thread],'0', '$message', now(),now());";
	
				$result= $this->conn->query($sql);
				
				
				if ($result === TRUE){

					$sql = "UPDATE ps_customer_thread SET status = 'open' WHERE id_customer=$id_customer AND id_customer_thread = $tmpsqltable[id_customer_thread]; ";
					
									$result= $this->conn->query($sql);
									
									if ($result === TRUE){

										$result='Thread yoktu açıldı ve mesaj eklendi ve thread status alanı guncellendi.';
									}else{


										$result='Thread yoktu açıldı ve mesaj eklendi ve thread status alanı guncellendi.';


									}


				}else{
					//$result = 'Thread yoktu ama açıldı, mesaj eklenemedi.';
					$result = $sql;	
				}

				}else{
					//$result = 'Thread yok ve açılamadı.';

					$result = $sql;	
				}


		}

		
		return $result;
		$this->conn->close();
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
				$msg["status"]="OK";
				$msg=array_merge($msg,$_infos);				
				
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
				$prd["status"]="OK";
				$prd=array_merge($prd,$_infos);
			
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
		$sql = "select * from ps_product prd left join  ps_category_lang ctg on prd.id_category_default=ctg.id_category and ctg.id_lang=1 where id_manufacturer=$id_manufacturer order by prd.id_category_default";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$menu=array();
				$menu=array_merge($menu,$_infos);					
				
                array_push($items,$menu);
				
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
	
	function getProductsList($_infos2) {
		
		$_res=false;

		$product_name=$_infos2["product_name"];
		$sql = "select * from ps_product prd left join ps_product_lang prdlang on prd.id_product=prdlang.id_product and prdlang.id_lang=1 left join  ps_category_lang ctg on prd.id_category_default=ctg.id_category and ctg.id_lang=1 where id_manufacturer=$id_manufacturer order by prd.id_category_default";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$menu=array();
				$menu=array_merge($menu,$_infos);					
				
                array_push($items,$menu);
				
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