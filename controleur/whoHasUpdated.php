<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if (isset($_POST)){
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
            $jwt = new JWT();
            $nbre = $jwt->oauth($_POST['token']);
            if($nbre == 0){
                $prodId = $_POST['prodId'];
                $t = $manager->selectionUnique2('articles',array('code_feraud'),"ProductId=$prodId");
                $elmt = '';
                foreach($t[0] as $k=>$v){
                    $elmt+= "($v,";
                }
                $elmt = substr($elmt, 0, -1);
                $elmt += ")";
                $t = $manager->selectionUnique2('modificationtrack',array('*'),"lecode IN $elmt");
                echo '<pre>';
                    print_r($t);
                echo '</pre>';
                //echo json_encode("changement fait !");
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>