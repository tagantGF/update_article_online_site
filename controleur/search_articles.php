<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST['token']) && isset($_POST['id_article'])){
	 	include_once('../model/bigModelForMe.php');
		include_once('../model/JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token']);
		if($nbre == 0){
		//if(true){
			//$_POST['id_article'] = 169202;
            $id_article = htmlspecialchars(addslashes(trim($_POST['id_article'])));
			$envoi0 = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$id_article");
			$en = $envoi0[0]->ProductId;
			$envoi = $manager->selectionUnique2('articles',array('*'),"ProductId='$en'");
			$t2[0] = $manager->selectionUnique2('article_done',array('*'),"art_code='$id_article'");
			
			foreach($envoi as $k=>$v){
				$cod_fer = $v->code_feraud;
				$f = $manager->selectionUnique2('article_done',array('*'),"art_code='$cod_fer'");
				if(count($f) > 0){
					$t2[] = $f;
				}
			}
			
			foreach($t2 as $k=>$v){
				foreach($v as $k1=>$v1){
					foreach($v1 as $k2=>$v2){
						if($k2 == "user_num"){
								$t3 = $manager->selectionUnique2('users',array('*'),"num_user=$v2");
								$t2[$k][$k1]->$k2 = $t3[0]->nom.' '.$t3[0]->prenom; 
							}
					}
				}
			}
			$tab = array($envoi,$t2);
			echo json_encode($tab);
		}
	}
?>
