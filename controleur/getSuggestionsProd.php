<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: text/html; charset=utf-8");
    include_once('../model/bigModelForMe.php');

        if(isset($_POST)){
            $elmt = $_POST['element'];
           if($elmt == 'entete'){
                $valeur = $_POST['valeur'];
                $caracteristique = array();
                $envoi0 = $manager->selectionUnique2('articles',array('*'),"");
                foreach($envoi0 as $key=>$val){
                    $t = $envoi0[$key]->caracteristiques;
                    $caracteristique[] = explode("•", $t);
                }
                $entete= array();
                foreach($caracteristique as $key=>$val){
                    foreach($val as $k=>$v){
                        if($v == ''){
                            unset($caracteristique[$key]);
                        }else{
                            $caracteristique[$key] = explode(":", trim($v));
                        }
                    }
                }
                // echo '<pre>';
                //     print_r($caracteristique);
                // echo '</pre>';
                foreach($caracteristique as $key=>$val){
                    $pos = stripos(trim($caracteristique[$key][0]), trim($valeur));
                    if($pos !== false && count($entete)<6){
                        $entete[] = $caracteristique[$key][0];
                    } 
                }
                $entete = array_unique($entete);
                echo json_encode($entete);
           }
           else{
                $valeur = $_POST['valeur'];
                $caracteristique = array();
                $envoi0 = $manager->selectionUnique2('articles',array('*'),"");
                foreach($envoi0 as $key=>$val){
                    $t = $envoi0[$key]->caracteristiques;
                    $caracteristique[] = explode("•", $t);
                }
                $valeurs= array();
                foreach($caracteristique as $key=>$val){
                    foreach($val as $k=>$v){
                        if($v == ''){
                            unset($caracteristique[$key]);
                        }else{
                            $caracteristique[$key] = explode(":", trim($v));
                        }
                    }
                }
                foreach($caracteristique as $key=>$val){
                    $pos = stripos(trim($caracteristique[$key][1]), trim($valeur));
                    if($pos !== false && count($valeurs)<6){
                        $valeurs[] = $caracteristique[$key][1];
                    } 
                }
                $valeurs = array_unique($valeurs);
                echo json_encode($valeurs);
            }
        }
?>