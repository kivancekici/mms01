<?php

include_once '../config/settings.inc.php';
include_once '../classes/Customer.php';


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
	
	function registerUser($_email) {
		$customer = new Customer();
		$customer->firstname = 'name';
		$customer->lastname = 'lastname';
		$customer->email = 'mail@mail.com';
		$customer->passwd = md5(time());
		$customer->is_guest = 1;

		$_res=$customer->add();

        $this->conn->close();

		if($_res){
		$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function saveAddress($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function getMyAddress($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function deleteAddress($_email) {
		
		$_res=false;

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
	
	function getMessages($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function getManufacturers($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
    }
	
	function getManufacturersMenu($_email) {
		
		$_res=false;

        $this->conn->close();

		if($_res){
			$item="OK";
		}else{
			$item="NOK";
		}
		
        return $item;
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