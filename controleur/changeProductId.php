<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	include_once('../model/bigModelForMe.php');
			
            $tab_code_feraud = array(
                146349,
                254257,
                254255,
                251664,
                251665,
                251672,
                146391,
                148771,
                252332,
                205314,
                146556,
                146564,
                146563,
                254561,
                252329,
                254256,
                251670,
                250691,
                250692,
                250693,
                254437,
                111763,
                153109
            );
            $tab_productId = array(
                LM001,
                LM002,
                LM003,
                LM004,
                LM005,
                LM006,
                LM007,
                LM008,
                LM009,
                LM010,
                LM011,
                LM012,
                LM013,
                LM014,
                LM015,
                LM016,
                LM017,
                LM018,
                LM019,
                LM020,
                LM021,
                BC1002,
                KC0001
            );
           
        foreach($tab_code_feraud as $key=>$val){
            $tab = array(
                'ProductId'=>$tab_productId[$key]
            );
            $y =  $manager->modifier('articles',$tab,"code_feraud=$val");
        }
?>