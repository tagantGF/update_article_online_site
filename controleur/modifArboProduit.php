<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST)){
			include_once('../model/bigModelForMe.php');
			include_once('../model/JWT.php');
			require_once '../includes/config.php';
			
            // $_POST['code_feraudForMigrate'] = 254409;
            // $_POST['code_feraud'] = 254407;
            $jwt = new JWT();
            $nbre = $jwt->oauth($_POST['token']);
            if($nbre == 0){
                $arbo = $_POST['arborescence_prod'];
                $user = $_POST['user'];
                $codeFeraud = $_POST['codeFeraud'];
                $arbo = explode("/", $arbo);
                $t = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$codeFeraud");
                $productId =  $t[0]->ProductId;
                $tab = array(
                    'TreeName1'=>$arbo[0],
                    'TreeName2'=>$arbo[1],
                    'TreeName3'=>$arbo[2]
                );
                $y =  $manager->modifier('articles',$tab,"ProductId=$productId");

                $manager->supprimer('modificationtrack',"lapartie IN ('ArborescenceProd'') AND lecode ='$productId'");
                $tab2 = array(
                    'lecode'=>$productId,
                    'lapartie'=>'ArborescenceProd',
                    'user_num'=>$user
                );
                $g =  $manager->insertion('modificationtrack',$tab2,'');
                echo json_encode('modification faite !');
            }
	}else{
		echo json_encode('aucune information envoyée');
	}
?>