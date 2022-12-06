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
                $codeFeraud = intval($_POST['codeFeraudForAddCaract']);
                $libelle = $_POST['libelle'];
                $valeur = $_POST['valeur'];
                $user = $_POST['user'];
                $t = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                for($a=3;$a<12;$a++){
                    foreach($t[0] as $k=>$v){
                        if($k == 'ArtThCode'.$a && in_array($v,array(null,''))){
                            $tab = array(
                                "ArtThCode$a"=>$libelle,
                                "ArtVal$a"=>$valeur
                            );
                            $y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");

                            $manager->supprimer('modificationtrack',"lapartie=caracteristiqueArti AND lecode ='$codeFeraud'");
                            $tab2 = array(
                                'lecode'=>"$codeFeraud",
                                'lapartie'=>'caracteristiqueArti',
                                'user_num'=>$user
                            );
                            $g =  $manager->insertion('modificationtrack',$tab2,'');

                            echo json_encode($y);
                            $a = 12;
                        }
                    }
                    if($a == 11){
                        echo json_encode('Changement non fait !');
                    }
                }
            }
			// echo '<pre>';
            //     print_r($recup);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>