<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
    if (isset($_POST)){
		include_once('../model/bigModelForMe.php');
		require_once '../includes/config.php';
		require_once '../model/JWT.php';
			
        $t = $manager->selectionUnique2('articles',array('*'),"");
        $tab= array();
        $indice = 0;
        foreach($t as $k=>$v){
            $code = 0;
            foreach($v as $key=>$val){
                $i=0; 
                for($a=1;$a<12;$a++){
                    if('ArtThCode'.$a == $key && $val == ''){
                       $indice = $a;
                       $tab[$key] = $val;
                       $i++;
                    }else if($indice !=0 && 'ArtVal'.$indice == $key && $val != ''){
                        $indice = 0;
                        $tab[$key] = '';
                        $i++;
                    }else if('ArtVal'.$a == $key && $val == ''){
                        $tab['ArtThCode'.$a] = '';
                    }
                }
                if($i == 0){
                    $tab[$key] = $val;
                }
                if($key == 'code_feraud'){
                    $code = $val;
                }
            }
            $i = $manager->modifier('articles',$tab,"code_feraud=$code");
        }
        echo 'Changement fait !';
    }
?>
