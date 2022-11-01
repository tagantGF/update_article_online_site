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
		if($extension_fichier == 'jpg' OR $extension_fichier == 'jpeg'){
			$nomphoto = str_replace('jpg','txt',$nomphoto);
			$nomphoto = str_replace('jpeg','txt',$nomphoto);
		}else{
			$nomphoto = str_replace($extension_fichier,'txt',$nomphoto);
		}
		$monfichier = fopen("../test/".$nomphoto,'w+');
		fputs($monfichier,$b64);
		fclose($monfichier);

        $arbo = '';
        $t = $manager->selectionUnique2('articles',array('*'),"code_feraud=$code_feraud");
        $tableau = array('ProductImageHD1','ProductImageHD2','ProductImageHD3');
        foreach($t[0] as $k=>$v){
            if(in_array($k,$tableau) && in_array($v,array(null,""))){
                $arbo = $k;
                break;
            }
        }
        $tab = array(
            "$arbo" =>$nomphoto,
        );
        $y =  $manager->modifier('articles',$tab,"code_feraud = $code_feraud");
        echo json_encode($y);
    }
?>