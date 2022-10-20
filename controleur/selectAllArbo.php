<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST['token'])){
		include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
			$envoi = $manager->selectArbo('articles',array('TreeName1,TreeName2,TreeName3'),"");
			echo json_encode($envoi);
		}
	}
?>
