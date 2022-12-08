<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST)){
		include_once('../model/bigModelForMe.php');
        $elmt = $_POST['element'];
        if($elmt == 'entete'){
            $valeur = $_POST['valeur'];
            $t = $manager->selectionUnique2('articles',array('*'),"");
            $tab= array();
            $entete= array();
            foreach($t as $k=>$v){
                $code = 0;
                foreach($v as $key=>$val){
                    $i=0; 
                    for($a=1;$a<12;$a++){
                        if('ArtThCode'.$a == $key && $val != ''){
                            $pos = stripos(trim($val), trim($valeur));
                            if($pos !== false && count($entete)<11){
                                $entete[] = $val;
                            } 
                        }
                    }
                }
            }
            $entete = array_unique($entete);
            echo json_encode($entete);
        }else{
            $valeur = $_POST['valeur'];
            $t = $manager->selectionUnique2('articles',array('*'),"");
            $tab= array();
            $entete= array();
            foreach($t as $k=>$v){
                $code = 0;
                foreach($v as $key=>$val){
                    $i=0; 
                    for($a=1;$a<12;$a++){
                        if('ArtVal'.$a == $key && $val != ''){
                            $pos = stripos(trim($val),trim($valeur));
                            if($pos !== false && count($entete)<11){
                                $entete[] = $val;
                            } 
                        }
                    }
                }
            }
            $entete = array_unique($entete);
            echo json_encode($entete);
        }
    }
?>