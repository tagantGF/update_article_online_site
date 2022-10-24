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
                $libelle = htmlspecialchars(addslashes($_POST['libelle']));
                $valeur = htmlspecialchars(addslashes($_POST['valeur']));
                $t = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                for($a=3;$a<12;$a++){
                    foreach($t[0] as $k=>$v){
                        if($k == 'ArtThCode'.$a && in_array($v,array(null,''))){
                            foreach($t[0] as $k2=>$v2){
                                if($k2 == 'ArtVal'.$a && in_array($v2,array(null,''))){
                                    $tab = array(
                                        "ArtThCode$a"=>strtoupper($libelle),
                                        "ArtVal$a"=>$valeur
                                    );
                                    $y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");
                                    echo json_encode($y);
                                    $a = 12;
                                }
                            }
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