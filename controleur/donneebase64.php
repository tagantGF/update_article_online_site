<?php
header("Access-Control-Allow-Origin: *");
	// $nom = str_replace('jpg','txt',$nom);
	$nom = $_POST['nom'];
	//$nom = 'test.txt';
	$img = file_get_contents("../../images_pim/".$nom);
	$img = str_replace('\/','/',$img);
	echo json_encode($img);
?>