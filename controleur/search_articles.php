<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST['token']) && isset($_POST['id_article'])){
	 	include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
            $id_article = htmlspecialchars(addslashes(trim($_POST['id_article'])));
			$envoi0 = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$id_article");
			$en = $envoi0[0]->ProductId;
			$envoi = $manager->selectionUnique2('articles',array('*'),"ProductId=$en");
			echo json_encode($envoi);
		}
	}
?>
