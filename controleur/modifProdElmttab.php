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
                $valeur = trim($_POST['valeur']);
                $valeurSecreteLibelle = '';
                $valeurInconnu = '';
                unset($_POST['token']);
                unset($_POST['user']);
                unset($_POST['codeFeraud']);
                unset($_POST['valeur']);
                foreach($_POST as $key=>$val){
                    $_POST[$key] = htmlspecialchars($val);
                    $valeurSecreteLibelle = trim($key);
                    $valeurInconnu = trim($_POST[$key]);
                }
               
                $valeurSecreteLibelle = str_replace("_"," ",$valeurSecreteLibelle);
                $valeurSecreteLibelle = trim($valeurSecreteLibelle);
                $envoi0 = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                $caracteristique = $envoi0[0]->caracteristiques;
                $caracteristique = explode("•", $caracteristique);
                foreach($caracteristique as $key=>$val){
                    if($val == ''){
                        unset($caracteristique[$key]);
                    }else{
                        $caracteristique[$key] = explode(":", trim($val));
                    }
                }
                function fctRetirerAccents($varMaChaine)
                {
                    $search  = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ');
                    //Préférez str_replace à strtr car strtr travaille directement sur les octets, ce qui pose problème en UTF-8
                    $replace = array('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y');

                    $varMaChaine = str_replace($search, $replace, $varMaChaine);
                    return $varMaChaine; //On retourne le résultat
                }
               
                

                foreach($caracteristique as $k=>$v){
                    if(strtolower(fctRetirerAccents(trim($v[0]))) == $valeurSecreteLibelle){
                        $caracteristique[$k][0] = strtoupper($valeurInconnu);
                        $caracteristique[$k][1] = $valeur;
                    }
                }

                $carac = '';
                foreach($caracteristique as $key=>$val){
                    $carac .= '• ';
                    foreach($val as $k=>$v){
                        if($k == 0){
                            $carac .= $v.' : ';
                        }else{
                            $carac .= $v;
                        }
                    }
                }
                $t = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$codeFeraud");
                $productId =  $t[0]->ProductId;
                $tab = array(
                    'caracteristiques'=>$carac
                );

               

                $y =  $manager->modifier('articles',$tab,"ProductId='$productId'");

                $manager->supprimer('modificationtrack',"lapartie='caracteristiqueProd' AND lecode ='$productId'");
                $tab2 = array(
                    'lecode'=>''.$productId.'',
                    'lapartie'=>'caracteristiqueProd',
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