<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST)){
			include_once('../model/bigModelForMe.php');
			include_once('../model/JWT.php');
			require_once '../includes/config.php';
			
			$email = htmlspecialchars(addslashes($_POST['email']));
			$pwd = sha1(htmlspecialchars(addslashes($_POST['pwd'])));
			$envoi = $manager->selectionUnique2('users',array('*'),"email='$email' AND pwd='$pwd'");
			
			if(count($envoi)==0){
				echo json_encode('');
			}else{
				$header = [
					'typ' => 'JWT',
					'alg' => 'HS256'
				];
				$payload = [
					'email' => $email,
					'pwd' => $pwd
				];
				$jwt = new JWT();
				$token = $jwt->generate($header, $payload, SECRET,86400);
				$envoi[0]= $envoi;
				$envoi[1] = $token;
				echo json_encode($envoi);
			}
	}else{
		echo json_encode('aucune information envoyée');
	}
?>