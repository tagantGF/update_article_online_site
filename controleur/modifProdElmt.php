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
                $codeFeraud = $_POST['codeFeraud'];
                $user = $_POST['user'];
                $lapartie= '';
                unset($_POST['token']);
                unset($_POST['codeFeraud']);
                unset($_POST['user']);
                foreach($_POST as $key=>$val){
                    $_POST[$key] = htmlspecialchars($val);
                    $lapartie = $key;
                }
                $t = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$codeFeraud");
                $productId =  $t[0]->ProductId;
                $y =  $manager->modifier('articles',$_POST,"ProductId=$productId");
                
                $manager->supprimer('modificationtrack',"lapartie='infoProd' AND lecode ='$productId'");
                $tab2 = array(
                    'lecode'=>$productId,
                    'lapartie'=>'infoProd',
                    'user_num'=>$user
                );
                $g =  $manager->insertion('modificationtrack',$tab2,'');


                echo json_encode("changement fait !");
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>