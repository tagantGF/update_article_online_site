<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if(isset($_POST)){
		include_once('../model/bigModelForMe.php');
		
		// Define the Base64 value you need to save as an image
		$code_feraud = $_POST['code_feraud'];
        $nomphoto = $_POST['nomphoto'];
		$b64 = $_POST['pp'];
		$extension_fichier = $_POST['extension_fichier'];
        
        $bin = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $b64));
        $im = imageCreateFromString($bin);
        if (!$im) {
            die('Base64 value is not a valid image');
        }
        $img_file = "../../images_pim/media/$nomphoto";
        imagepng($im, $img_file, 0);
        $productId =  $t = $manager->selectionUnique2('articles',array('ProductId'),"code_feraud=$code_feraud");
        $productId =  $t[0]->ProductId;
        $recup =  $t = $manager->selectionUnique2('articles',array('*'),"productId=$productId");
        foreach($recup as $k=>$v){
          
            $c= 0;
            foreach($v as $k2=>$v2){
                if($k2 == 'num_art'){
                    $numArt = $v2;
                }
                if(in_array($k2,['ProductImageHD1','ProductImageHD2','ProductImageHD3']) && in_array($v2,[null,'undefined','']) && $c == 0){
                    $tab = array(
                       $k2 =>$nomphoto,
                    );
                    $y =  $manager->modifier('articles',$tab,"num_art = $numArt");
                    $c++;
                }
            }
        }
        echo json_encode("envoyé");
    }
?>