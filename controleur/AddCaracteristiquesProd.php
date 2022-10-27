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
                $codeFeraud = $_POST['codeFeraudForAddCaract'];
                $user = $_POST['user'];
                $libelle = htmlspecialchars(addslashes($_POST['libelle']));
                $valeur = htmlspecialchars(addslashes($_POST['valeur']));
                $elmt = " • ".strtoupper($libelle)." : $valeur";

                $t = $manager->selectionUnique2('articles',array('ProductId,caracteristiques'),"code_feraud=$codeFeraud");
                $productId = $t[0]->ProductId;
                $caracteristiques = $t[0]->caracteristiques;
                $caracteristiques = $caracteristiques.$elmt;

                $tab = array(
                    'caracteristiques'=>$caracteristiques
                );
                $y =  $manager->modifier('articles',$tab,"ProductId='$productId'");

               
                $manager->supprimer('modificationtrack',"lapartie='caracteristiqueProd' AND lecode ='$productId'");
                $tab2 = array(
                    'lecode'=>''.$productId.'',
                    'lapartie'=>'caracteristiqueProd',
                    'user_num'=>$user
                );
                $g =  $manager->insertion('modificationtrack',$tab2,'');
                echo json_encode('Changement fait !');
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>