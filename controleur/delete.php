<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST['token'])){
		include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
			$demande_num = $_POST['num_demandes'];
			$manager->supprimer('demandes',"num_demandes=$demande_num");
			echo json_encode('Suppression effectuée');
		}

		
	}
?>
