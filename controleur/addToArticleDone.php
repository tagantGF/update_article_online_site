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
                $id_article = $_POST['id_article'];
                $user = $_POST['user'];
                $tab = array(
                    "art_code"=>$id_article,
                    "user_num"=>$user
                );
               
                $y =  $manager->insertion('article_done',$tab,'');
                echo json_encode('Sauvegarde faite !');
            }
			// echo '<pre>';
            //     print_r($y);
            // echo '</pre>';
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>