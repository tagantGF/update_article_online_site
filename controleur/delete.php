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
			$t = $manager->selectionUnique2('articles',array($nomImage),"code_feraud=$codeFeraud");
			foreach($t[0] as $k2=>$v2){
				unlink("../../images_pim/media/$v2");
			}
			$tab = array(
				"$nomImage"=>''
			);
			$y =  $manager->modifier('articles',$tab,"code_feraud=$codeFeraud");
			echo json_encode('Suppression effectuée');
		}

		
	}
?>
