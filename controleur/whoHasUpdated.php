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
                $t = $manager->selectionUnique2('articles',array('code_feraud'),"ProductId='$prodId'");
                $elmt = '';
                foreach($t[0] as $k=>$v){
                    $elmt .= "('".$v."',";
                }
                //$elmt = substr($elmt, 0, -1);
                $elmt .= "'$prodId')";
                $t2 = $manager->selectionUnique2('modificationtrack',array('*'),"lecode IN $elmt");
                if(count($t2 != 0)){
                    foreach($t2 as $k=>$v){
                        foreach($v as $k2=>$v2){
                            if($k2 == "user_num"){
                                $t3 = $manager->selectionUnique2('users',array('*'),"num_user=$v2");
                                $t2[$k]->$k2 = $t3[0]->nom.' '.$t3[0]->prenom; 
                            }
                        }
                    }
                    echo json_encode($t2);
                }else{
                    echo json_encode("vide");
                }
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>