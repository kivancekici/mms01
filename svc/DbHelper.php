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
				$rwitem["pswd"]="$pwd";
				$rwitem=array_merge($rwitem,$row);
                array_push($items, $rwitem);
            }
        } else {
            $rwitem=array();
				$rwitem["status"]="NOK";
				$rwitem["pswd"]="$pwd";
                array_push($items, $rwitem);
        }
        

		return $items;
		
		$this->conn->close();
	}



	function checkAvaibleUser($_infos){


		$email=$_infos["email"];

		$sql = "SELECT id_customer FROM ps_customer WHERE email='$email';";
		
				$result = $this->conn->query($sql);
		
				if ($result->num_rows > 0) {
		
					$rwitem["status"]="OK";
					return $rwitem;
					
				}else {
				$rwitem["status"]="NOK";
				return $rwitem;
	
				}

	}



	function registerUser($_infos) {
		$_res=false;
		$id_shop_group=1;
		$id_shop=1;
		$id_gender=$_infos["id_gender"];
		$id_default_group=3;
		$id_lang=1;
		$id_risk=0; 
		$company=" ";
		$siret=" ";
		$ape=" ";
		$firstname=$_infos["firstname"];
		$lastname=$_infos["lastname"];
		$email=$_infos["email"];	
		$passwdOpen=$_infos["passwdOpen"];
		$pwd=$this->encrypt($passwdOpen);
		$last_passwd_gen="";
		$birthday=$_infos["birthday"];
		$birthday=date("Y-m-d",strtotime($birthday));
		$newsletter=0;
		$ip_registration_newsletter="";
		$newsletter_date_add="";		
		$optin=0;
		$website=" ";
		//$secure_key = md5(uniqid(rand(), true));
		$secure_key = md5($passwdOpen);		
		$active=1;
		$is_guest=0;
		$deleted=0;


		$sql = "INSERT INTO ps_customer (id_shop_group,id_shop,id_gender,id_default_group,id_lang,id_risk,company,siret,ape,firstname,lastname,email,passwd,last_passwd_gen,birthday,newsletter,ip_registration_newsletter,newsletter_date_add,optin,website,secure_key,active,is_guest,deleted,date_add,date_upd) "
		."VALUES($id_shop_group,$id_shop,$id_gender,$id_default_group,$id_lang,$id_risk,'$company','$siret','$ape','$firstname','$lastname','$email','$pwd',now(),'$birthday',$newsletter,'$ip_registration_newsletter',now(),$optin,'$website','$secure_key',$active,$is_guest,$deleted,now(),now());";
		$result = $this->conn->query($sql);

		if ($result === TRUE) {
		$_res = TRUE;
		}

		$this->conn->close();

		if($_res){
		$rwitem=array();
		$rwitem["status"]="OK";
		$rwitem["pswd"]="$pwd";
		$rwitem["secure_key"]="$secure_key";
		return $rwitem;
		}else{
		$rwitem=array();
		$rwitem["status"]="NOK";
		//$rwitem["SQL"]="$sql";
		return $rwitem;
		}

		
    }
	


	function getuserinfo($_infos) {
	

	$_email=$_infos["email"];
	$_passwd=$_infos["pswd"];

	$loginresult=$this->checkLogin($_email,$_passwd);


	$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
	$this->conn->set_charset("utf8");


	if ($this->conn->connect_error) {
		die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);

	}

	if ($loginresult[0]['status'] == 'OK'){

//$id_gender=$_infos["id_gender"];
		//$company=$_infos["company"];
		//$firstname=$_infos["firstname"];
		//$lastname=$_infos["lastname"];
		//$email=$_infos["email"];	
		//$passwd= md5($_infos["passwd"]);
		//$birthday=$_infos["birthday"];
		//$newsletter=$_infos["newsletter"];		
		//$optin=$_infos["optin"];
		//$website=$_infos["website"];
		//$date_upd=$_infos["date_upd"];
		$id_customer=$loginresult[0]['id_customer'];
		
		

				$sql ="SELECT id_gender,company,firstname,lastname,email,passwd,birthday,newsletter,optin,website FROM ps_customer WHERE id_customer='$id_customer'";
				
				$result = $this->conn->query($sql);
		
				$tmpuserinfo = mysqli_fetch_array($result , MYSQLI_ASSOC);
		
		
		
				return $tmpuserinfo;
				$this->conn->close();
				

	}	
	

		
    }





	function updateuserdata($_infos) {
		
		


		$_email=$_infos["email"];
		$_passwd=$_infos["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			
		
		$_res=false;
		
		$id_gender=$_infos["id_gender"];
		$company=$_infos["company"];
		$firstname=$_infos["firstname"];
		$lastname=$_infos["lastname"];
		$emailnew=$_infos["emailnew"];
		
		//$passwdnew= md5(_COOKIE_KEY_.$_infos["passwdnew"]);
		//$secure_key = md5(uniqid(rand(), true));
		//passwd='$passwd',secure_key = '$secure_key',
		$birthday=$_infos["birthday"];
		$newsletter=$_infos["newsletter"];		
		$optin=$_infos["optin"];
		$website=$_infos["website"]; 
		//$date_upd=$_infos["date_upd"];
		$id_customer=$loginresult[0]['id_customer'];
		
		
		$sql = "UPDATE ps_customer SET id_gender=$id_gender,company='$company',firstname='$firstname',lastname='$lastname',email='$emailnew',birthday=$birthday,newsletter=$newsletter,optin=$optin,website='$website',date_upd=now() WHERE id_customer=$id_customer";
        $result = $this->conn->query($sql);

        if ($result === TRUE) {
            $_res = TRUE;
        }
		
        $this->conn->close();

		if($_res){
			$rwitem=array();
			$rwitem["status"]="OK";
			//$rwitem["pswd"]="$passwdOpen";
			return $rwitem;
		}else{
			$rwitem=array();
			$rwitem["status"]="NOK";
			//$rwitem["SQL"]="$sql";
			return $rwitem;
		}
		
		return $item;
	}
    }







	function getcountries($_infos) {
		
		$id_lang=$_infos["id_lang"];

		$sql = "SELECT pl.id_country, pl.name FROM ps_country_lang pl WHERE pl.id_lang=$id_lang ";
	   $result = $this->conn->query($sql);

	   $items = array();
	   
			if ($result->num_rows > 0) {
				$addr=array();
				   while ($_infos = $result->fetch_assoc()) {
					   

					   $addr=array_merge($addr,$_infos);           
					   
					   array_push($items,$addr);
					   
					   $_res=true;
				   }
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







	function saveAddress($_infos) {
		


		$_email=$_infos["email"];
		$_passwd=$_infos["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){


		$_res=false;

		$id_country=$_infos["id_country"];
		$id_state= 0 ; //$_infos["id_state"];
		$id_customer=$loginresult[0]['id_customer'];
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
		$phone_mobile=$_infos["phone_mobile"];
		$vat_number=$_infos["vat_number"];
		//$dni=$_infos["dni"];		
		
		$sql = "INSERT INTO ps_address (id_country, id_state, id_customer,  alias, company, lastname, firstname,address1,address2,postcode,city,phone,phone_mobile,vat_number,date_add,date_upd,active,deleted) "
				."VALUES($id_country, $id_state, $id_customer,  '$alias', '$company', '$lastname', '$firstname', '$address1', '$address2','$postcode','$city','$phone','$phone_mobile','$vat_number',now(),now(),1,0);";
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
    }
	
	function getMyAddress($_infos) {
		

		$_email=$_infos["email"];
		$_passwd=$_infos["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			$id_customer=$loginresult[0]['id_customer'];

		$_res=false;

		//$id_customer=$_infos["id_customer"];
		$sql = "SELECT pl.id_country, pa.id_address, pa.alias,pa.company,pa.firstname,pa.lastname,pa.vat_number,pa.address1,pa.address2,pa.postcode, pa.city, pl.name, pa.phone, pa.phone_mobile
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
    }
	



	function deleteAddress($_infos) {
		

		$_email=$_infos["email"];
		$_passwd=$_infos["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			$id_customer=$loginresult[0]['id_customer'];

		$_res=false;

		$id_address =$_infos["id_address"];
		//$id_customer=$_infos["id_customer"];

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
    }
	








	function updateAddress($_infos) {


		$_email=$_infos["email"];
		$_passwd=$_infos["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			$id_customer=$loginresult[0]['id_customer'];


		$_res=false;

		$id_country=$_infos["id_country"];
		$id_state=0;  
		 //$_infos["id_state"];
		//$id_customer=$_infos["id_customer"];
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
		

		$_email=$_infos2["email"];
		$_passwd=$_infos2["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			$id_customer=$loginresult[0]['id_customer'];



		$_res=false;

		//$id_customer=$_infos2["id_customer"];
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
	}
	



	function checkBeforeUpdateUserdata($_infos){
		
		
					$email=$_infos["email"];
					$id_customer=$_infos["id_customer"];
		
					$sql = "SELECT id_customer FROM ps_customer WHERE email='$email' AND id_customer !='$id_customer' ;";
		
							$result = $this->conn->query($sql);
		
							if ($result->num_rows > 0) {
		
								$rwitem["status"]="OK";
								return $rwitem;
							}else {
							$rwitem["status"]="NOK";
							return $rwitem;
		
							}
		
				}














	function postMessages($_infos2) {


		$_email=$_infos2["email"];
		$_passwd=$_infos2["pswd"];
	
		$loginresult=$this->checkLogin($_email,$_passwd);
	
	
		$this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
		$this->conn->set_charset("utf8");
	
	
		if ($this->conn->connect_error) {
			die("Datenbank Verbindung Fehlt! : ".$this->dbname."-" . $this->conn->connect_error);
	
		}
	
		if ($loginresult[0]['status'] == 'OK'){

			$id_customer=$loginresult[0]['id_customer'];


		
		//$id_customer=$_infos2["id_customer"];

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
    }


	
	function getManufacturers($_infos2) {
		
		$_res=false;

		$manufacturer=$_infos2["manufacturer"];
		$idlang=$_infos2["idlang"];

		$sql = "select m.name, m.id_manufacturer, ml.short_description from ps_manufacturer m, ps_manufacturer_lang ml where ml.id_manufacturer = m.id_manufacturer and  ml.id_lang = '$idlang' and  m.name like '%$manufacturer%' and m.active=1";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$msg=array();
				$msg["status"]="OK";
				$msg=array_merge($msg,$_infos);	
				
				$msg['short_description'] = str_replace("</p>","",str_replace("<span>","",str_replace("<p>","",str_replace("</span>","",$msg['short_description']))));
				
			 
								
				
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
			return $idlang;
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
	




  
	function getHpProductsList($_infos2) {
	
		$keyword=$_infos2["keyword"];
		$currency=$_infos2["currency"];
		$langu=$_infos2["langu"];
		$iscategorysearch = $_infos2["iscategorysearch"];
		$categorylist = '';


	switch ($iscategorysearch) {

		case "":
			$sql = "SELECT id_product, name,description_short, description FROM  ps_product_lang WHERE id_lang = $langu AND (description LIKE '%$keyword%' OR description_short LIKE '%$keyword%'  OR name LIKE '%$keyword%') ";
			break;

		case "1":
			foreach ($_infos2 as $key => $jsons) { // This will search in the 2 jsons
				//foreach($jsons as $key => $value) {
		
					if($key != 'keyword' &&  $key != 'currency' &&  $key != 'langu' &&  $key != 'opr' &&  $key != 'iscategorysearch'){
					$categorylist .= '\''. $jsons. '\''.',';

				//}

	  			 }

   			}

   			$categorylist = '('. substr("$categorylist",0,-1). ')';

   			$sql = "SELECT pl.id_product, pl.name, pl.description_short, description FROM  ps_product_lang pl, ps_product p WHERE pl.id_lang = $langu AND p.id_product = pl.id_product AND p.id_category_default IN "."$categorylist";
			break;
		case "2":
			foreach ($_infos2 as $key => $jsons) { // This will search in the 2 jsons
				//foreach($jsons as $key => $value) {
					if($key != 'keyword' &&  $key != 'currency' &&  $key != 'langu' &&  $key != 'opr' &&  $key != 'iscategorysearch'){
					$categorylist .= '\''. $jsons. '\''.',';
					//}
	  		 	}

   			}

   			$categorylist = '('. substr("$categorylist",0,-1). ')';

   			$sql = "SELECT pl.id_product, pl.name, pl.description_short, description FROM  ps_product_lang pl, ps_product p WHERE pl.id_lang = $langu AND p.id_product = pl.id_product AND p.id_manufacturer IN "."$categorylist";
   
			break;	   

	}



	$result = $this->conn->query($sql);
	
			
			if ($result->num_rows > 0) {
				$resulttable = array();
				//$tmpsqltable =array();
				$rowcounter = 0;
				while ($row = $result->fetch_assoc()) {
					
	
					$sql ="SELECT CAST(((pr.price + pa.price) * (1 + tx.rate/100)) AS  decimal(10,2)) AS 'grossprice'   FROM ps_product pr, ps_tax_rule tr, ps_tax tx, ps_product_attribute pa  WHERE pr.id_product = $row[id_product] AND pr.id_tax_rules_group = tr.id_tax_rules_group AND tr.id_country = '1' AND tr.id_tax = tx.id_tax AND pa.id_product_attribute = pr.cache_default_attribute AND pa.id_product = pr.id_product";
					
					$resultgross = $this->conn->query($sql);
				   $tmpsqltable = mysqli_fetch_array($resultgross , MYSQLI_ASSOC);
	
					array_push($resulttable, $row);
	
					$resulttable[$rowcounter]['description_short'] = str_replace("</p>","",str_replace("<p>","",$resulttable[$rowcounter]['description_short']));
	
					$resulttable[$rowcounter]['description'] = str_replace("</p>","",str_replace("<p>","",$resulttable[$rowcounter]['description']));
					
					$resulttable[$rowcounter]['grossprice'] = $tmpsqltable['grossprice'];
	
					$sql ="SELECT reduction,reduction_type FROM ps_specific_price WHERE id_product = $row[id_product]";
					$resultreduction = $this->conn->query($sql);
					if ($resultreduction->num_rows > 0) {
						$reducedprice = array();
						$tmpsqltable = mysqli_fetch_array($resultreduction , MYSQLI_ASSOC);
				
						if ($tmpsqltable['reduction_type'] == "percentage"){
							
							$reducedprice['reducedprice'] = number_format($resulttable[$rowcounter]['grossprice'] * (1-$tmpsqltable[reduction]),2);
							$resulttable[$rowcounter] = $resulttable[$rowcounter] + $reducedprice;
						}elseif($tmpsqltable['reduction_type'] == "amount"){
							
							$reducedprice['reducedprice'] =  number_format($resulttable[$rowcounter]['grossprice'] - $tmpsqltable[reduction],2);
							$resulttable[$rowcounter] = $resulttable[$rowcounter] + $reducedprice;
	
						}
	
	
					}else{
						
						$reducedprice['reducedprice'] =  $resulttable[$rowcounter]['grossprice'];
						$resulttable[$rowcounter] = $resulttable[$rowcounter] + $reducedprice;
						
					}
	
	
					$imgdirectory="/"."img"."/"."p";
	
					$sql ="SELECT id_image FROM ps_image WHERE id_product = $row[id_product] AND cover = 1";
	
					$resultimg = $this->conn->query($sql);
					if ($resultimg->num_rows > 0) {
	
						$tmpsqltable = mysqli_fetch_array($resultimg , MYSQLI_ASSOC);
						$imgcounter = 0;
	
						$tmpstring = $tmpsqltable['id_image'];
	
	
						while($imgcounter < STRLEN($tmpstring))
						{
	
							
	
							$imgdirectory .=  "/".SUBSTR($tmpstring ,$imgcounter,1);
							
						
							$imgcounter = $imgcounter +1;
						}
	
						$imgdirectory .= "/".$tmpstring."-home_default.jpg";
	
	
	
					}
	
					$resulttable[$rowcounter]['imgdirectory'] = $imgdirectory;
	
					$rowcounter = $rowcounter  + 1;
				}
			}
	
			return $resulttable;
			$this->conn->close();

	
 }
	

	function getIpProductsList($_infosItemMain){
		
		$id_product=$_infosItemMain["id_product"];
		$id_lang=$_infosItemMain["id_lang"];


		 $sql ="SELECT ma.name as 'manufacname', prla.name as 'productname', prla.description_short, prla.description  FROM ps_product pr, ps_manufacturer ma, ps_product_lang prla where pr.id_product = $id_product and pr.id_manufacturer = ma.id_manufacturer and prla.id_product = pr.id_product and prla.id_lang = $id_lang";

		$result = $this->conn->query($sql);
		$items = array();
		if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				$imgdirectory="/"."img"."/"."p";
				
								$sql ="SELECT id_image FROM ps_image WHERE id_product = $id_product AND cover = 1";
				
								$resultimg = $this->conn->query($sql);
								if ($resultimg->num_rows > 0) {
				
									$tmpsqltable = mysqli_fetch_array($resultimg , MYSQLI_ASSOC);
									$imgcounter = 0;
				
									$tmpstring = $tmpsqltable['id_image'];
				
				
									while($imgcounter < STRLEN($tmpstring))
									{
				
										
				
										$imgdirectory .=  "/".SUBSTR($tmpstring ,$imgcounter,1);
										
									
										$imgcounter = $imgcounter +1;
									}
				
									$imgdirectory .= "/".$tmpstring."-home_default.jpg";
				
				
				
								}
								$_infos['imgdirectory']=$imgdirectory;
								array_push($items,$_infos);
            }


		}

		return $items;
        $this->conn->close();

	}

 
	function getProductsComments($_infosItemMain){
		
		$id_product=$_infosItemMain["id_product"];

		$sql ="SELECT COUNT(grade) as 'numberofcomments',SUM(grade)/COUNT(grade)  as 'averagegrade',grade,customer_name,content,SUBSTRING(date_add,1,10) as 'date_add' FROM ps_product_comment WHERE id_product = $id_product AND validate = 1 AND deleted = 0";
		
		$result = $this->conn->query($sql);

		$comment=array();
		
		if ($result->num_rows > 0) {
            while ($_infos = $result->fetch_assoc()) {
				
				

				//$addr=array_merge($addr,$_infos);           
				
                array_push($comment,$_infos);
				
            }
			 
        }


		return $comment;
        $this->conn->close();

	}


	function getIpProductsPrice($_infosItemMain){

		$id_product=$_infosItemMain["id_product"];
		//$id_lang=$_infosItemMain["id_lang"];
		$defaultproductattribute=$_infosItemMain["id_product_attribute"];


		if ($defaultproductattribute == '') {
			$sql ="SELECT CAST(((pr.price + pa.price) * (1 + tx.rate/100)) AS  decimal(10,2)) AS 'grossprice'   FROM ps_product pr, ps_tax_rule tr, ps_tax tx, ps_product_attribute pa  WHERE pr.id_product = $id_product AND pr.id_tax_rules_group = tr.id_tax_rules_group AND tr.id_country = '1' AND tr.id_tax = tx.id_tax AND pa.id_product_attribute = pr.cache_default_attribute AND pa.id_product = pr.id_product";

		}else{
			$sql ="SELECT CAST(((pr.price + pa.price) * (1 + tx.rate/100)) AS  decimal(10,2)) AS 'grossprice'   FROM ps_product pr, ps_tax_rule tr, ps_tax tx, ps_product_attribute pa  WHERE pr.id_product = $id_product AND pr.id_tax_rules_group = tr.id_tax_rules_group AND tr.id_country = '1' AND tr.id_tax = tx.id_tax AND pa.id_product_attribute = $defaultproductattribute AND pa.id_product = pr.id_product";
		}
		
		


		$resultgrossitem = $this->conn->query($sql);
		$tmpsqltableitem = mysqli_fetch_array($resultgrossitem , MYSQLI_ASSOC);

		$sql ="SELECT reduction,reduction_type FROM ps_specific_price WHERE id_product = $id_product";
		$resultreduction = $this->conn->query($sql);
		if ($resultreduction->num_rows > 0) {
			$reducedprice = array();
			$tmpsqltable = mysqli_fetch_array($resultreduction , MYSQLI_ASSOC);
	
			if ($tmpsqltable['reduction_type'] == "percentage"){
				
				$tmpsqltableitem['reducedprice'] = number_format($tmpsqltableitem['grossprice'] * (1-$tmpsqltable[reduction]),2);
				
			}elseif($tmpsqltable['reduction_type'] == "amount"){
				
				$tmpsqltableitem['reducedprice'] =  number_format($tmpsqltableitem['grossprice'] - $tmpsqltable[reduction],2);
			
			}


		}else{
			
			$tmpsqltableitem['reducedprice'] =  number_format($tmpsqltableitem['grossprice'],2);
		}



	return $tmpsqltableitem;

	$this->conn->close();
	}




	function getProductIdatrribute($_ProductIdatrribute){

		$id_product=$_ProductIdatrribute["id_product"];
		
		$id_attribute=$_ProductIdatrribute["id_attribute"];

		$sql = "SELECT pa.id_product_attribute  as 'id_product_attribute ' FROM ps_product_attribute pa , ps_product_attribute_combination pac  WHERE pa.id_product = $id_product  and pa.id_product_attribute = pac.id_product_attribute and pac.id_attribute =$id_attribute";

		$resultidproductattribute = $this->conn->query($sql);

		if ($resultidproductattribute->num_rows > 0) {
			
			$tmpsqltable = mysqli_fetch_array($resultidproductattribute , MYSQLI_ASSOC);

		}

		return $tmpsqltable;
		$this->conn->close();

	}



	function getProducUnitName($_ProductUnitName){
		
				$id_product=$_ProductUnitName["id_product"];
				
				$id_lang=$_ProductUnitName["id_lang"];
		
			
				$sql = "SELECT al.name FROM  ps_product pr,	ps_product_attribute_combination pac, ps_attribute pa,	ps_attribute_group_lang al WHERE  pr.id_product = $id_product AND pr.cache_default_attribute = pac.id_product_attribute AND pa.id_attribute = pac.id_attribute AND pa.id_attribute_group = al.id_attribute_group AND al.id_lang = $id_lang";
				
				$resultidproducUnitName = $this->conn->query($sql);
				
				if ($resultidproducUnitName->num_rows > 0) {
					
					$tmpsqltable = mysqli_fetch_array($resultidproducUnitName , MYSQLI_ASSOC);
		
				}
				
				return $tmpsqltable;
				$this->conn->close();
		
	}



	function getProducUnitValue($_ProductUnitValue){
		
				$id_product=$_ProductUnitValue["id_product"];
				
				$id_lang=$_ProductUnitValue["id_lang"];
		
			
				$sql = "SELECT al.id_attribute, al.name FROM ps_product_attribute pa, ps_product_attribute_combination pac, ps_attribute_lang  al WHERE pa.id_product = $id_product AND pac.id_product_attribute = pa.id_product_attribute AND pac.id_attribute = al.id_attribute AND al.id_lang = $id_lang ORDER BY al.id_attribute ";
				
				$resultidproducUnitValue = $this->conn->query($sql);
				
				if ($resultidproducUnitValue->num_rows > 0) {
					$tmpsqltable = array();
					while ($row = $resultidproducUnitValue->fetch_assoc()) {



						array_push($tmpsqltable , $row);

					}



					//$tmpsqltable = mysqli_fetch_array($resultidproducUnitValue , MYSQLI_ASSOC);
		
				}
				
				return $tmpsqltable;
				$this->conn->close();
		
	}







	function getcategorytree($_ProductUnitValue){
		
				$id_lang=$_ProductUnitValue["id_lang"];
		
			
				$sql = " SELECT c.id_category, c.id_parent,  c.level_depth ,  c.level_depth, c.position, c.is_root_category, cl1.name  AS 'categoryname', cl2.name AS 'parentname' FROM ps_category c, ps_category_lang cl1, ps_category_lang cl2    WHERE   c.id_category =cl1.id_category  AND  c.id_parent = cl2.id_category  AND cl1.id_lang = $id_lang AND   cl2.id_lang = $id_lang    order by id_parent, id_category";
				
				$resultidproducUnitValue = $this->conn->query($sql);
				
				if ($resultidproducUnitValue->num_rows > 0) {
					$tmpsqltable = array();
					while ($row = $resultidproducUnitValue->fetch_assoc()) {



						array_push($tmpsqltable , $row);

					}



					//$tmpsqltable = mysqli_fetch_array($resultidproducUnitValue , MYSQLI_ASSOC);
		
				}
				
				return $tmpsqltable;
				$this->conn->close();
		
	}




	function getOrderHistoryHead($_ProductUnitValue){
		
				$id_lang=$_ProductUnitValue["id_lang"];
		
			
				$sql = " SELECT c.id_category, c.id_parent,  c.level_depth ,  c.level_depth, c.position, c.is_root_category, cl1.name  AS 'categoryname', cl2.name AS 'parentname' FROM ps_category c, ps_category_lang cl1, ps_category_lang cl2    WHERE   c.id_category =cl1.id_category  AND  c.id_parent = cl2.id_category  AND cl1.id_lang = $id_lang AND   cl2.id_lang = $id_lang    order by id_parent, id_category";
				
				$resultidproducUnitValue = $this->conn->query($sql);
				
				if ($resultidproducUnitValue->num_rows > 0) {
					$tmpsqltable = array();
					while ($row = $resultidproducUnitValue->fetch_assoc()) {



						array_push($tmpsqltable , $row);

					}



					//$tmpsqltable = mysqli_fetch_array($resultidproducUnitValue , MYSQLI_ASSOC);
		
				}
				
				return $tmpsqltable;
				$this->conn->close();
		
	}






























	function getmanufacturerlist($_ProductUnitValue){
		
			
				$sql = "SELECT id_manufacturer, name FROM  ps_manufacturer WHERE active=1";
				
				$resultidproducUnitValue = $this->conn->query($sql);
				
				if ($resultidproducUnitValue->num_rows > 0) {
					$tmpsqltable = array();
					while ($row = $resultidproducUnitValue->fetch_assoc()) {

						array_push($tmpsqltable , $row);

					}



					//$tmpsqltable = mysqli_fetch_array($resultidproducUnitValue , MYSQLI_ASSOC);
		
				}
				
				return $tmpsqltable;
				$this->conn->close();
		
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