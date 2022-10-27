<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=utf-8");
		include_once('../model/bigModelForMe.php');

    $envoi0 = $manager->selectionUnique2('articles',array('TreeName1','TreeName2','TreeName3'),"");
    $tabeleves = [];
    $tabeleves[] = ['TreeName1', 'TreeName2', 'TreeName3'];
    $tabeleves[] = ['', '', ''];
 
    foreach($envoi0 as $k=>$v){
        $tabeleves[] = [$envoi0[$k]->TreeName1, $envoi0[$k]->TreeName2, $envoi0[$k]->TreeName3];
    }
     
    $fichier_csv = fopen("articles.csv", "w+");
 
    fprintf($fichier_csv, chr(0xEF).chr(0xBB).chr(0xBF));
 
    foreach($tabeleves as $ligne){
        fputcsv($fichier_csv, $ligne, ";");
    }
 
    fclose($fichier_csv);

    // $url = 'https://it-feraud.com/pim/controleur/articles.csv'; 
    // $fichier_nom = basename($url);
    // $fichier_contenu = file_get_contents($url);
    // $dossier_enregistrement = "telechargement/";

    // if(file_put_contents($dossier_enregistrement . $fichier_nom, $fichier_contenu)) 
    // { 
    //     echo "Fichier téléchargé avec succès"; 
    // } 
    // else 
    // { 
    //     echo "Fichier non téléchargé"; 
    // } 
?>