<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST)){
		include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
			function trimUltime($chaine){
				$chaine = trim($chaine);
				$chaine = str_replace("###antiSlashe###t", " ", $chaine);
				$chaine = preg_replace('!\s+!', ' ', $chaine);
				return $chaine;
			}
			$num_users = $_POST['user_num'];
			$objet = htmlspecialchars(addslashes($_POST['objet']));
			$message = htmlspecialchars(addslashes(trimUltime($_POST['message'])));
			
			$envoi = $manager->selectionUnique2('demandes',array('*'),"objet like '%$objet%' AND message like '%$message%' AND user_num=$num_users");
			$table = array(
				'user_num'=>$num_users,
				'objet'=>$objet,
				'message'=>$message,
			);
			if(count($envoi) == 0){
				$p = $manager->insertion('demandes',$table,'');
				$id = $manager->dernierIdInserer();
				echo  json_encode('bien insere');
			}else{
				echo  json_encode('existant');
			}	
		}
	}else{
		echo  json_encode('echouee');
	}
?>