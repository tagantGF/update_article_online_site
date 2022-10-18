<?php
header("Access-Control-Allow-Origin: *");
			include_once('../model/bigModelForMe.php');
			require_once '../includes/config.php';
			
			
			$envoi = $manager->selectionUnique3('articles',array('TreeName2'),"");
			echo '<pre>';
                print_r($envoi);
            echo '</pre>';
?>