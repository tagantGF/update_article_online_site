<?php
header("Access-Control-Allow-Origin: *");
	if (isset($_POST['nom'])){
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
			 $jwt = new JWT();
			 $nom = htmlspecialchars(addslashes($_POST['nom']));
			 $prenom = htmlspecialchars(addslashes($_POST['prenom']));
			 $email = htmlspecialchars(addslashes($_POST['email']));
			 $pwd = sha1(htmlspecialchars(addslashes($_POST['pwd'])));
			 
			 $header = [
				'typ' => 'JWT',
				'alg' => 'HS256'
			];
			$payload = [
				'email' => $email,
				'pwd' => $pwd
			];
			 $token = $jwt->generate($header, $payload, SECRET,86400);
			 
			 $table = array(
				'nom'=>$nom,
				'prenom'=>$prenom,
				'email'=>$email,
				'pwd'=>$pwd,
				'role_num'=>2,
			);
			 
			 
			$envoi = $manager->selectionUnique2('users',array('*'),"email like '%$email%' AND pwd like '%$pwd%'");
			if(count($envoi)==0){
				$y =  $manager->insertion('users',$table,'');
				$id = $manager->dernierIdInserer();
				$tab[0] = $manager->selectionUnique('users',array('*'),$id,'num_user');
				$tab[1] = $token;
				echo json_encode($tab);
			}else{
				echo json_encode($envoi);
			}
	}else{
		echo json_encode('aucune information envoyée');
	}
		
?>