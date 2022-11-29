<?php
    header("Access-Control-Allow-Origin: *");
	header("Content-Type: text/html; charset=utf-8");
	include_once('../model/bigModelForMe.php');

    $photos=array();
    $recup = $manager->selectionUnique2('articles',array('*'),"");
    foreach($recup as $key => $val){
        $art = 0;
        foreach($val as $key2 => $val2){
            if(in_array($key2, ['ProductImageHD2','ProductImageHD2','ProductImageHD3'])){
                $photos[] = array($val2,$art);
            }else if($key2 == 'num_art'){
                $art = $val2;
            }
        }
    }
    // echo '<pre>';
    //     print_r($recup);
    // echo '<pre>';


    $tof = array();
    $c = 0;
    echo "bd ".count($photos);
    foreach (glob("../../images_pim/media/*.jpg") as $filename) {
        foreach($photos as $k => $v){
            $gg = "../../images_pim/media/$v[0]";
            if($filename == $gg){
                $c++;
               
            }
        }
        //$tof[] = $filename;
        //echo "$filename size " . filesize($filename) . "\n";
    }
    echo 'non bd'.$c;

    // unlink("images/image.png");
?>