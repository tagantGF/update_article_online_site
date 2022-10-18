<?php
header("Access-Control-Allow-Origin: *");
	if(isset($_POST['valeur'])){
		include_once('bigModelForMe.php');
		include_once('JWT.php');
		
		$jwt = new JWT();
		$nbre = $jwt->oauth($_POST['token_oauth']);
		if($nbre == 0){
			$nomfichier = $_POST['nomfichier'];
			$id_piece = $_POST['valeur'];
			$valsupp = $_POST['valsupp'];
			$id_users = $_POST['id_users'];
			$di = $_POST['notification'];
			if($valsupp =='pa'){
				$envoijson = '';
				$env = $manager->selectionUnique2('pieces',array('*'),"id_piece=$id_piece AND type='pa'");
							$nom = $env[0]->nom;
							$prenom = $env[0]->prenom;
							$numero_piece = $env[0]->numero_piece;
							$datess = $env[0]->datess;
							$nompiece = $env[0]->nompiece;
							$pays_provenance = $env[0]->pays_provenance;
							$cat_id = $env[0]->cat_id;
							
							$env1 = $manager->selectionUnique2('pieces',array('*'),"nom like '%$nom%' AND datess='$datess' AND prenom like '%$prenom%' AND pays_provenance='$pays_provenance' AND cat_id=$cat_id AND type IN ('r','rp')");
							
				
							foreach($env1 as $key=> $val){
								foreach($val as $k => $v){
									if($k =='type' AND $v == 'rp'){
										$envoijson = 'change pas';
									}else if($k =='type' AND $v == 'r'){
										foreach($env1 as $key1=> $val1){
											foreach($val1 as $k1 => $v1){
												if($k1 =='users_id'){
													$manager->supprimer('pieces',"id_piece=$id_piece");
													$manager->supprimer('envoyer',"users_id=$v1 AND msg_id=1");
												}
											}
										}
										$table = array(
											'type'=>'s'
										);
										$envoi1 = $manager->modifier('pieces',$table,"nom like '%$nom%' AND datess='$datess' AND prenom like '%$prenom%' AND pays_provenance='$pays_provenance' AND cat_id=$cat_id AND type IN ('r','rp')");
									}
								}
							}
							if (file_exists("../imagesserveur/".$nomfichier)){
								unlink ("../imagesserveur/".$nomfichier);
							}
							
				echo json_encode($env1);
			}else if($valsupp =='trouvee'){
				$env = $manager->selectionUnique2('pieces',array('*'),"id_piece=$id_piece AND type IN ('r','rp')");
							$nom = $env[0]->nom;
							$prenom = $env[0]->prenom;
							$numero_piece = $env[0]->numero_piece;
							$datess = $env[0]->datess;
							$nompiece = $env[0]->nompiece;
							$pays_provenance = $env[0]->pays_provenance;
							$cat_id = $env[0]->cat_id;
							$type = $env[0]->type;
							$env1 = $manager->selectionUnique2('pieces',array('*'),"nom like '%$nom%' AND datess='$datess' AND prenom like '%$prenom%' AND pays_provenance='$pays_provenance' AND cat_id=$cat_id AND type='pa'");
							$id_piece2 = $env1[0]->id_piece;
							if($type == 'rp'){
									$manager->supprimer('pieces',"id_piece=$id_piece");
									$manager->supprimer('pieces',"id_piece=$id_piece2");
									$manager->supprimer('envoyer',"users_id=$id_users AND msg_id=1");
									$manager->supprimer('envoyer',"users_id=$id_users AND msg_id=11");
							}else if($type == 'r'){
									$manager->supprimer('pieces',"id_piece=$id_piece");
									$manager->supprimer('envoyer',"users_id=$id_users AND msg_id=1");
									$table = array(
										'type'=>'p'
									);
									$envoi1 = $manager->modifier('pieces',$table,"nom like '%$nom%' AND datess='$datess' AND prenom like '%$prenom%' AND pays_provenance='$pays_provenance' AND cat_id=$cat_id AND type='pa'");
							}
				echo json_encode($type);
			}else if($valsupp =='p'){
				if (file_exists("../imagesserveur/".$nomfichier)){
					unlink ("../imagesserveur/".$nomfichier);
				}
				$manager->supprimer('pieces',"id_piece=$id_piece");
				echo json_encode('simplesupp');
			}else if($valsupp =='simplesupp'){
				$manager->supprimer('pieces',"id_piece=$id_piece");
				echo json_encode('simplesupp');
			}
		}

		
	}
?>
