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
	
	function get_test_items($testinput) {

        $sql = "select firstname ,lastname,passwd from ps_customer";
        $result = $this->conn->query($sql);

        $items = array();
		
		array_push($items, $testinput);

        if ($result->num_rows > 0) {
			
            while ($row = $result->fetch_assoc()) {
				$rwitem=array();
				array_push($rwitem,$row["firstname"]);
				array_push($rwitem,$row["lastname"]);
				array_push($rwitem,$row["passwd"]);
                array_push($items, $rwitem);
            }
        } else {
            //no results
        }
        $this->conn->close();

        return $items;
    }
	
	
	function saveEslerZitlar($_esler , $_deyimler , $_zitlar) {
					
		$_gramm="";
		
		foreach ($_deyimler as $i) {
			$_gramm="redw.";
			DbHelper::getInstance()->saveEsler($_esler[0],$i,$_gramm);
		}
		$_gramm="";
        foreach ($_esler as $i) {
			foreach ($_esler as $k) {
				
				if($i===$k){
					continue;
				}
				
				if(substr_count($k,"[")>0){
					//continue;
				}
				
				$_neuwort=strchr($i,"[",true);
				if(strlen($_neuwort)>0){
					$gramm=strchr($i,"[");
					$gramm=str_replace("[","",$gramm);
					$gramm=str_replace("]","",$gramm);
					
					DbHelper::getInstance()->saveEsler($_neuwort,$k,$gramm);
				}else{
					DbHelper::getInstance()->saveEsler($i,$k,$gramm);
				}
			}
			
			foreach ($_zitlar as $m) {
				if(substr_count($m,"[")>0){
					//continue;
				}
				$_neuwort=strchr($i,"[",true);
				if(strlen($_neuwort)>0){
					$gramm=strchr($i,"[");
					$gramm=str_replace("[","",$gramm);
					$gramm=str_replace("]","",$gramm);
					
					DbHelper::getInstance()->saveZitlar($_neuwort,$m,$gramm);
				}else{
					DbHelper::getInstance()->saveZitlar($i,$m,$gramm);
				}
				
			}			
		}
		
		foreach ($_zitlar as $i) {
			foreach ($_zitlar as $k) {
				
				if($i===$k){
					continue;
				}
					
				if(substr_count($k,"[")>0){
					//continue;
				}
				
				$_neuwort=strchr($i,"[",true);
				if(strlen($_neuwort)>0){
					$gramm=strchr($i,"[");
					$gramm=str_replace("[","",$gramm);
					$gramm=str_replace("]","",$gramm);
					
					DbHelper::getInstance()->saveEsler($_neuwort,$k,$gramm);
				}else{
					DbHelper::getInstance()->saveEsler($i,$k,$gramm);
				}
			}
			
			foreach ($_esler as $m) {
				if(substr_count($m,"[")>0){
					//continue;
				}
				$_neuwort=strchr($i,"[",true);
				if(strlen($_neuwort)>0){
					$gramm=strchr($i,"[");
					$gramm=str_replace("[","",$gramm);
					$gramm=str_replace("]","",$gramm);
					
					DbHelper::getInstance()->saveZitlar($_neuwort,$m,$gramm);
				}else{
					DbHelper::getInstance()->saveZitlar($i,$m,$gramm);
				}
			}
		}
		
		$this->conn->close();
    }
	
	function saveEsler($_es1, $_es2, $_gramm) {
        
		$_es1=trim($_es1);
		$_es2=trim($_es2);
		$_gramm=trim($_gramm);
		
		if( strlen(trim($_es1))==0 || strlen(trim($_es2))==0)
		{
			return true;
		}
		
		$_es1a=strchr($_es1,"[",true);
		
		if(strlen($_es1a)>0){
			
			$_es1=$_es1a;
		}
			
		$_es2a=strchr($_es2,"[",true);
		
		if(strlen($_es2a)>0){
			$_es2=$_es2a;
		}
		
		if(strcmp($_es1, $_es2)===0){
			return true;
		}
		
		if(DbHelper::getInstance()->getExisting($_es1, $_es2 , $_gramm)){
			return true;
		}
		
		$_wgrammatikart= "";
		$_udomain=" ";
		
		if ($_gramm=== "redw."){
			$_wgrammatikart= " ";
			$_udomain="redw.";
		}
		
		if(DbHelper::getInstance()->checkGrammarType($_gramm)){
			$_wgrammatikart= $_gramm;
			$_ugrammatikart=$_wgrammatikart;
		}else if(DbHelper::getInstance()->checkDomain($_gramm)){
			$_wgrammatikart= " ";
			$_ugrammatikart=$_wgrammatikart;
			$_udomain=$_gramm;
		}
		
		
		
		$sql = "INSERT INTO tbllexikon2 (wgrammatikart, wort, wortsprache, usprache, udomain, ugrammatikart, uebersetzung, sichtbarkeit, datumhinzugefuegt, aenderungsdatum) ";
		$sql=$sql."VALUES('$_wgrammatikart', '$_es1', 'TR', 'TRES', '$_udomain' , '$_ugrammatikart' , '$_es2', 1, now(), now())";
				
        

        $item = FALSE;
		echo("<br/>");
		try{
			$result = $this->conn->query($sql);
				if ($result === TRUE) {
				$item = TRUE;
				
				echo($_es1." - ".$_es2." : Eklendi");
				}else{
					echo($_es1." - ".$_es2." : Eklenemedi");
				}
		}catch(Exception $excep){
			echo("Hata:".$excep);
		}
		$this->conn->close();
        return $item;
				
    }
	
	function saveZitlar($_es1, $_zit1,$_gramm) {
		
		$_es1=trim($_es1);
		$_zit1=trim($_zit1);
		$_gramm=trim($_gramm);
		
		if( strlen(trim($_es1))==0 || strlen(trim($_zit1))==0)
		{
			return true;
		}
		
		
		$_es1a=strchr($_es1,"[",true);
		
		if(strlen($_es1a)>0){
			$_es1=$_es1a;
		}
			
		$_zit1a=strchr($_zit1,"[",true);
		
		if(strlen($_zit1a)>0){
			$_zit1=$_zit1a;
		}
		
		if(strcmp($_es1, $_zit1)===0){
			return true;
		}
		
		if(DbHelper::getInstance()->getExisting($_es1, $_zit1, $_gramm)){
			return true;
		}
		
		
		$_wgrammatikart=$_gramm;
		$_udomain=" ";
		
		if ($_gramm=== "redw."){
			$_wgrammatikart= " ";
			$_udomain="redw.";
		}
		
		if(DbHelper::getInstance()->checkGrammarType($_gramm)){
			$_wgrammatikart= $_gramm;
			$_ugrammatikart=$_wgrammatikart;
		}else if(DbHelper::getInstance()->checkDomain($_gramm)){
			$_wgrammatikart= " ";
			$_ugrammatikart=$_wgrammatikart;
			$_udomain=$_gramm;
		}
		
		
		$sql = "INSERT INTO tbllexikon2 (wgrammatikart, wort, wortsprache, usprache, udomain, ugrammatikart, uebersetzung, sichtbarkeit, datumhinzugefuegt, aenderungsdatum) ";
		$sql=$sql."VALUES('$_wgrammatikart', '$_es1', 'TR', 'TRZIT', '$_udomain' , '$_ugrammatikart' , '$_zit1', 1, now(), now())";
        
		$item = FALSE;
		echo("<br/>");
		try{
			$result = $this->conn->query($sql);
				if ($result === TRUE) {
				$item = TRUE;
				echo($_es1." - ".$_zit1." : Eklendi");
				}else{
					echo($_es1." - ".$_zit1.": Eklenemedi");
				}
		}catch(Exception $excep){
			echo("Hata:".$excep);
		}
		
		$this->conn->close();
        return $item;
		
    }
	
	function checkGrammarType($gr){
		$gr=$gr;
		$allgramms=" mec. = argo. = eski. = b. = N. = n. = redw. = V. = V.anrufen. = V.Sich. = Trennb. = Fem. = Mas. = Neutr. = Ohne Art. = Fem.Mask. = Mask.Neutr. = Fem.Neutr. = Sing. = Pl. = Abk. = Adj. = Adv. = Adj./Adv. = Aux. = Konj. = Prae. = Pron. = Nom. = Gen. = Dat. = Akk. = +Nom. = +Gen. = +Dat. =  +Akk. = Artikel. = Ausruf. =";
		$allgramms=$allgramms . strtoupper($allgramms) . strtolower($allgramms);
			
		if(strpos($allgramms, $gr) === FALSE) {
			echo "Gramer Tipi Değil:'".$gr."'";
			return FALSE;
		}elseif(strpos($allgramms, strtolower($gr)) === FALSE) {
			echo "Gramer Tipi Değil:'".$gr."'";
			return FALSE;
		}else{
			echo "Gramer Tipi Bulundu:".$gr;
			return TRUE;
		}
		
		return FALSE;
	}
	
	function checkDomain($gr){
		$gr=$gr;
		$alldomains=" eski. jura. = berg. = anat. = mil. = astr. = bank. = comp. = biol. = bot. = geog. = ling. = rel. = naut. = lit. = educ. = comm. = philo. = cine. = phys. = foto. = luftf. = zoo. = jura. = verw. = intern. = kartsp. = chem. = berg. = math. = met. = arch. = myth. = cook. = mus. = autom. = psych. = art. = ind. = pol. = sociol. = sport. = agr. = hist. = tech. = textil. = tele. = med. = thea. = verk. = geol. =";
		$alldomains=$alldomains.strtoupper($alldomains).strtolower($alldomains);
		if(strpos($alldomains, $gr) === FALSE) {
			echo "Uzmanlık Alanı Değil:".$gr;
			return FALSE;
		}elseif(strpos($alldomains, strtolower($gr)) === FALSE) {
			echo "Uzmanlık Alanı Değil:".$gr;
			return FALSE;
		}{
			echo "Uzmanlık Alanı Bulundu:".$gr;
			return TRUE;
		}
		
		return FALSE;
	}

    function get_autocomplete_items($wortprefix) {

        $sql = "SELECT distinct wort FROM tbllexikon2 where trim(wort) like '$wortprefix%' limit 10";
        $result = $this->conn->query($sql);

        $items = array();

        if ($result->num_rows > 0) {
			
            while ($row = $result->fetch_assoc()) {
                array_push($items, $row["wort"]);
            }
        } else {
            //no results
        }
        $this->conn->close();

        return $items;
    }
	
	function getExisting($_w1, $_w2, $_gr) {
		
		if(strcmp($_w1, $_w2)===0){
			return true;
		}
		
        $sql = "SELECT wort,uebersetzung FROM tbllexikon2 where wort ='$_w1' and uebersetzung ='$_w2'";
        $result = $this->conn->query($sql);

        $item = "";

        if ($result->num_rows > 0) {
            return true;
        }

        $this->conn->close();

        return false;
    }

    function getWerbungHtmlNeu($_worder) {
        $sql = "SELECT werbung FROM tblwerbung where worder=$_worder";
        $result = $this->conn->query($sql);

        $item = "";

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $item = $row["werbung"];
                break;
            }
        }


        return $item;
    }
	
	function getWerbungHtml($_wortsprache, $_worder) {
        $sql = "SELECT werbung FROM tblwerbung where wsprache='$_wortsprache' and worder=$_worder";
        $result = $this->conn->query($sql);

        $item = "";

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $item = $row["werbung"];
                break;
            }
        }

        $this->conn->close();

        return $item;
    }

    function saveSearchInformation($_SearchWord, $_UserIp) {
        $sql = "INSERT INTO tblallesuchen (benutzerip, suchewort, datum)VALUES('$_SearchWord','$_UserIp',now())";
        $result = $this->conn->query($sql);

        $item = FALSE;

        if ($result === TRUE) {
            $item = TRUE;
        }

        $this->conn->close();

        return $item;
    }

    function getTranslationResult($_SearchWord) {
		$_SearchWord=trim($_SearchWord);
        $translationresult = new TranslationResult($_SearchWord);

        try {

            $sql = "SELECT wort, wortsprache, usprache, udomain, ugrammatikart, uebersetzung, sichtbarkeit, idtbllexikon2,wgrammatikart FROM tbllexikon2 where trim(wort) ='$_SearchWord' order by uebersetzung limit 150";
            $result = $this->conn->query($sql);

			$iwerb=0;
			
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
					
					
					
                    $_wort = $row["wort"];
                    $_wortsprache = $row["wortsprache"];
                    $_usprache = $row["usprache"];
                    $_udomain = $row["udomain"];
                    $_ugrammatikart = $row["ugrammatikart"];
                    $_uebersetzung = $row["uebersetzung"];
                    $_sichtbarkeit = $row["sichtbarkeit"];
                    $_idtbllexikon2 = $row["idtbllexikon2"];
                    $_wgrammatikart = $row["wgrammatikart"];
					
					$iwerb=$iwerb+1;
					$_wrb=$this->getWerbungHtmlNeu($iwerb);

                    $_tr1 = new Translation($_idtbllexikon2, $_wgrammatikart, $_wort, $_wortsprache, $_usprache, $_udomain, $_ugrammatikart, $_uebersetzung, $_sichtbarkeit, $_SearchWord,$_wrb);

					
					
                    $translationresult->addTranslation($_tr1);
                }
            }

            $sql2 = "SELECT wort, wortsprache, usprache, udomain, ugrammatikart, uebersetzung, sichtbarkeit, idtbllexikon2,wgrammatikart FROM tbllexikon2 where trim(wort) <>'$_SearchWord' and (trim(wort) like '$_SearchWord %' or trim(wort) like '$_SearchWord %') order by wort,uebersetzung limit 150";
            $result2 = $this->conn->query($sql2);

            if ($result2->num_rows > 0) {
                while ($row2 = $result2->fetch_assoc()) {
					$iwerb=$iwerb+1;
                    $_wort = $row2["wort"];
                    $_wortsprache = $row2["wortsprache"];
                    $_usprache = $row2["usprache"];
                    $_udomain = $row2["udomain"];
                    $_ugrammatikart = $row2["ugrammatikart"];
                    $_uebersetzung = $row2["uebersetzung"];
                    $_sichtbarkeit = $row2["sichtbarkeit"];
                    $_idtbllexikon2 = $row2["idtbllexikon2"];
                    $_wgrammatikart = $row2["wgrammatikart"];

                    $_tr2 = new Translation($_idtbllexikon2, $_wgrammatikart, $_wort, $_wortsprache, $_usprache, $_udomain, $_ugrammatikart, $_uebersetzung, $_sichtbarkeit, $_SearchWord,$this->getWerbungHtmlNeu($iwerb));

                    $translationresult->addTranslation($_tr2);
                }
            }

            $translationresult->addRedewendungen();
            $this->conn->close();
            return $translationresult;
        } catch (Exception $ex) {
            $this->conn->close();
            return $translationresult;
        }
    }

}

?>