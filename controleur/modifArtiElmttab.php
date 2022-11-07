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
                $valeur = trim($_POST['valeur']);
                $user = trim($_POST['user']);
                $valeurSecreteLibelle = '';
                $valeurInconnu = '';
                unset($_POST['token']);
                unset($_POST['codeFeraud']);
                unset($_POST['valeur']);
                unset($_POST['user']);
                foreach($_POST as $key=>$val){
                    $_POST[$key] = htmlspecialchars($val);
                    $valeurSecreteLibelle = $key;
                    $valeurInconnu = trim($_POST[$key]);
                }
                $valeurSecreteLibelle = trim($valeurSecreteLibelle);
                $t = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                
                foreach($t[0] as $k=>$v){
                    $vv = str_replace(" ","_",$v);
                    if(strtolower(trim($vv)) == $valeurSecreteLibelle){
                        $q = str_replace("ArtThCode","ArtVal",$k);
                        $t[0]->$k = $valeurInconnu;
                        $t[0]->$q = $valeur;
                        $a = 11;
                    }
                }
               
                $tab = array();
                unset($t[0]->num_art);
                foreach($t[0] as $k=>$v){
                    $tab[$k] = $v;
                }
                $y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");

                $t = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$codeFeraud");
                $productId =  $t[0]->ProductId;
                $manager->supprimer('modificationtrack',"lapartie=caracteristiqueArti AND lecode ='$codeFeraud'");
                $tab2 = array(
                    'lecode'=>$codeFeraud,
                    'lapartie'=>'caracteristiqueArti',
                    'user_num'=>$user
                );
                $g =  $manager->insertion('modificationtrack',$tab2,'');
               
                
                echo json_encode('changement fait !');
            }
			// echo '<pre>';
            //     print_r($caracteristique);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>