<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
            $getArticleDone = $manager->selectionUnique2('article_done',array('*'),"action='valider'");
            foreach($getArticleDone as $key=>$val){
                $code_feraud = intval($val->art_code);
                $user_num = $val->user_num;
                $productId = $manager->selectionUnique2('articles',array('*'),"code_feraud=$code_feraud");
                if(count($productId) >0){
                    $productId = $productId[0]->ProductId;
                    $articlesdone = $manager->selectionUnique2('articles',array('*'),"ProductId='$productId'");
                    foreach($articlesdone as $key2=>$val2){
                        $code_feraud2 = $val2->code_feraud;
                        $getArticleDone = $manager->selectionUnique2('article_done',array('*'),"art_code='$code_feraud2'");
                        if(count($getArticleDone) <= 0){
                            $tab = array(
                                "art_code"=>"$code_feraud2",
                                "user_num"=>$user_num,
                                "action"=>"valider"
                            );
                            $y =  $manager->insertion('article_done',$tab,'');
                        }else{
                            $tab = array(
                                "action"=>"valider"
                            );
                            $y =  $manager->modifier('article_done',$tab,"art_code='$code_feraud2'");
                        }
                    }
                }
            }
		
?>