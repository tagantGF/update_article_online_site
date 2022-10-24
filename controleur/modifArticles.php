<?php
header("Access-Control-Allow-Origin: *");
	if (isset($_POST)){
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
            $jwt = new JWT();
            $nbre = $jwt->oauth($_POST['token']);
            if($nbre == 0){
                $codeFeraud = $_POST['codeFeraud'];
                $user = $_POST['user'];
                unset($_POST['token']);
                unset($_POST['codeFeraud']);
                foreach($_POST as $key=>$val){
                    $_POST[$key] = htmlspecialchars($val);
                }
                $tab = array(
                    'libelle_article'=>$_POST['libelle_article']
                );

                $manager->supprimer('modificationtrack',"lapartie=libArti AND lecode ='$codeFeraud'");
                $tab2 = array(
                    'lecode'=>$codeFeraud,
                    'lapartie'=>'libArti',
                    'user_num'=>$user
                );
                $g =  $manager->insertion('modificationtrack',$tab2,'');

                $y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");
                echo json_encode('changement fait !');
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>