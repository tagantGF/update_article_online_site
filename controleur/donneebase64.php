<?php
header("Access-Control-Allow-Origin: *");
	// $nom = str_replace('jpg','txt',$nom);
	$nom = $_POST['nom'];
	//$nom = 'test.txt';
	$img = file_get_contents("../test/".$nom);
	$img = str_replace('\/','/',$img);
	// $image = imagecreatefromstring($img);
	// ob_start();
	// imagejpeg($image,null,80);
	// $data = ob_get_contents();
	// ob_end_clean();
	// $donnee = "data:image/jpeg;base64,".base64_encode($img);
	
	// $fp = fopen ("../imagesserveur/".$nom, "r");
	// $contenu_du_fichier = fgets($fp, 255);
	// fclose ($fp);
	// echo 'Notre fichier contient : '.$contenu_du_fichier;
	echo json_encode($img);
?>