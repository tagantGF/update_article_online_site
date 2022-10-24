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
                $codeFeraud = $_POST['codeFeraudForProd'];
                $prod_libelle = array('TreeName1','TreeName2','TreeName3','ProductId','ProductName','SupplierName','ProductImageHD1','ProductImageCaption1','ProductImageHD2','ProductImageHD3','ProductImageHD4','ProductImageHD5','description','caracteristiques');

                unset($_POST['token']);
                unset($_POST['codeFeraudForProd']);
                foreach($_POST as $key=>$val){
                    $_POST[$key] = htmlspecialchars(addslashes($val));
                }
                $recup = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
               
                foreach($recup[0] as $key=>$val){
                    if(!in_array($key,$prod_libelle)){
                        $recup[0]->$key = '';
                    }
                    foreach($_POST as $k=>$v){
                        if($k == $key){
                            $recup[0]->$key = $v;
                        }
                    }
                }
                $tab = array();
                unset($recup[0]->num_art);
                foreach($recup[0] as $k=>$v){
                    $tab[$k] = $v;
                }
                $y =  $manager->insertion('articles',$tab,'');
                echo json_encode('Ajout fait !');
            }
			// echo '<pre>';
            //     print_r($y);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>