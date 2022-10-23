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
                $code_feraudForMigrate = htmlspecialchars(addslashes($_POST['code_feraudForMigrate']));
                $code_feraud = htmlspecialchars(addslashes($_POST['code_feraud']));
                
                $element_arti_exemple = $manager->selectionUnique2('articles',array('*'),"code_feraud=$code_feraudForMigrate");
                $element_arti_a_migrer = $manager->selectionUnique2('articles',array('*'),"code_feraud=$code_feraud");
                $prod_libelle = array('TreeName1','TreeName2','TreeName3','ProductId','ProductName','SupplierName','ProductImageHD1','ProductImageCaption1','ProductImageHD2','ProductImageHD3','ProductImageHD4','ProductImageHD5','description','caracteristiques');
                if(count($element_arti_exemple)==0){
                    echo json_encode('');
                }else{
                    foreach($element_arti_exemple[0] as $key=>$val){
                        foreach($prod_libelle as $v){
                            if($v == $key){
                                $element_arti_a_migrer[0]->$key = $val;
                            }
                        }
                    }
                    $tab = array();
                    foreach($element_arti_a_migrer[0] as $k=>$v){
                            if($k != "num_art"){
                                $tab[$k] = $v;
                            }
                    }
                    $y =  $manager->modifier('articles',$tab,"code_feraud=$code_feraud");
                    //echo '<pre>';
                         //print_r($y);
                    //echo '</pre>';
                   echo json_encode('Changement fait!');
                }
            }
			
	}else{
		echo json_encode('aucune information envoyée');
	}
?>