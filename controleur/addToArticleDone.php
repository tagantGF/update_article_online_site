<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
	if (isset($_POST)){
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			require_once '../model/JWT.php';
			
            $jwt = new JWT();
            $nbre = $jwt->oauth($_POST['token']);
            if($nbre == 0){
                if($_POST['action'] == 'valider'){
                    $id_article = $_POST['id_article'];
                    $user = $_POST['user'];
                    $tab = array(
                        "art_code"=>$id_article,
                        "user_num"=>$user,
                        "action"=>"valider",
                    );
                    $r = $manager->supprimer('article_done',"art_code ='$id_article'");
                    $y =  $manager->insertion('article_done',$tab,'');
                    saveAllProductArticle($id_article,$user,'valider',$manager);
                    echo json_encode('Sauvegarde faite !');
                }else if($_POST['action'] == 'invalider'){
                    $id_article = $_POST['id_article'];
                    $user = $_POST['user'];
                    $tab = array(
                        "art_code"=>$id_article,
                        "user_num"=>$user,
                        "action"=>"invalider",
                    );
                    $r = $manager->supprimer('article_done',"art_code ='$id_article'");
                    $y =  $manager->insertion('article_done',$tab,'');
                    saveAllProductArticle($id_article,$user,'invalider',$manager);
                    echo json_encode('Sauvegarde faite !');
                }
            }
	}else{
		echo json_encode('aucune information envoyée');
	}
	function saveAllProductArticle($code_feraud,$user_num,$action,$manager){
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
                        "action"=>"$action"
                    );
                    $y =  $manager->insertion('article_done',$tab,'');
                }else{
                    $tab = array(
                        "action"=>"$action"
                    );
                    $y =  $manager->modifier('article_done',$tab,"art_code='$code_feraud2'");
                }
            }
        }
    }
?>