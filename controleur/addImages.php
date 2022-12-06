<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST)){
		include_once('../model/bigModelForMe.php');
		
		// Define the Base64 value you need to save as an image
		$code_feraud = intval($_POST['code_feraud']);
        $nomphoto = $_POST['nomphoto'];
		$b64 = $_POST['pp'];
        $whatImage = trim($_POST['whatImage']);
		$extension_fichier = $_POST['extension_fichier'];
        
        $bin = base64_decode(preg_replace('#^data:image/\w+;base64,#i','',$b64));
        $im = imageCreateFromString($bin);
        if (!$im) {
            die('Base64 value is not a valid image');
        }
        $img_file = "../../images_pim/media/$nomphoto";
        imagepng($im, $img_file, 0);
        $tab = array(
            "$whatImage" =>"$nomphoto",
        );
        $y =  $manager->modifier('articles',$tab,"code_feraud=$code_feraud");
        echo json_encode("envoyé");
    }
?>