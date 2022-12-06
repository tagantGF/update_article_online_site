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
            if($_POST['type'] == "produit"){
                $codeFeraud = $_POST['codeFeraud'];
                $libelle = $_POST['libelle'];
                $valeur = trim($_POST['valeur']);
                unset($_POST['libelle']);
                unset($_POST['valeur']);
                unset($_POST['codeFeraud']);
                unset($_POST['type']);
                $envoi = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                $caracteristique = $envoi[0]->caracteristiques;
                $caracteristique = explode("•", $caracteristique);
                foreach($caracteristique as $key=>$val){
                    if($val == ''){
                        unset($caracteristique[$key]);
                    }else{
                        $caracteristique[$key] = explode(":", trim($val));
                        if(trim($caracteristique[$key][0]) == trim($libelle)){
                            unset($caracteristique[$key]);
                        }
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
                $manager->modifier('articles',$tab,"ProductId='$productId'");
                echo json_encode('suppression fait !');
            }else if($_POST['type'] == "article"){
                $codeFeraud = intval($_POST['codeFeraud']);
                $libelle = $_POST['libelle'];
                $valeur = trim($_POST['valeur']);
                unset($_POST['libelle']);
                unset($_POST['valeur']);
                unset($_POST['codeFeraud']);
                unset($_POST['type']);
                $t = $manager->selectionUnique2('articles',array('*'),"code_feraud=$codeFeraud");
                $tab= array();
                $indice = 0;
                foreach($t[0] as $key=>$val){
                    $i = 0;
                    for($a=1;$a<12;$a++){
                        if('ArtThCode'.$a == $key && trim($val) == trim($libelle)){
                            $tab['ArtThCode'.$a] = '';
                            $tab['ArtVal'.$a] = '';
                            $i++;
                            $indice = $a;
                        }
                    }
                    if($i == 0 && 'ArtVal'.$indice != $key && 'ArtThCode'.$indice != $key){
                        $tab[$key] = $val;
                    }
                }
                $i = $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");
                echo json_encode('suppression fait !');
            }
        }
    }
?>
