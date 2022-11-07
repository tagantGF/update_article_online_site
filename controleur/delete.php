<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST['token'])){
		include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
			$codeFeraud = $_POST['codeF'];
			$nomImage = $_POST['nomImage'];
			$tab = array(
				"$nomImage"=>''
			);
			$y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");
			//$manager->supprimer('demandes',"num_demandes=$demande_num");
			echo json_encode('Suppression effectuée');
		}

		
	}
?>
