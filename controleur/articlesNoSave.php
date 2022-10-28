<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if (isset($_POST)){
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
            // $jwt = new JWT();
            // $nbre = $jwt->oauth($_POST['token']);
            if(true){
                 $t = $manager->selectionUnique3('article_done',array('art_code'),"");
                 if(count($t)>0){
                    $elmt = '(';
                     foreach($t as $k=>$v){
                        foreach($v as $k1=>$v1){
                            $elmt .= intval($v1).",";
                        }
                     }
                     $elmt = substr($elmt, 0, -1);
                     $elmt .= ")";
                     $t2 = $manager->selectionUnique2('articles',array('code_feraud'),"code_feraud NOT IN $elmt");
                 }
                 echo json_encode($t2);
            }
			// echo '<pre>';
            //     print_r($y);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>