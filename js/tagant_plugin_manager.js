 (function($){
	//affiche form_inscription,form_connexion******************
	jQuery.fn.tagant_affiche_page = function(bouton,evenementss){
		this.on(evenementss,bouton,function(e){
			e.preventDefault();
			var th= $(this)
			var nom = th.attr('name');
			url = 'vue/'+nom+'.html';
			$.ajax({
				url:url,
				type:'post',
				data:'',
				success:function(data){
					$('#contenu').html(data);
				}
			})
		})
	}
	function strNoAccent(a) {
		var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
			c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
			d="";
		for(var i = 0, j = a.length; i < j; i++) {
		  var e = a.substr(i, 1);
		  d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
		}
		return d;
	  }
	jQuery.fn.tagant_submit_form = function(form_soumis){
		this.on('submit',form_soumis,function(e){
			e.preventDefault();
			var th= $(this);
			var url = th.data('url');
			var nom = th.attr('name');
			var partss = th.serialize();
			if(form_soumis == '#form_enregistrement'){
				var partss = th.serialize();
			}else if(form_soumis == '#form_connexion'){
				var partss = th.serialize();  //+'&num_user='+sessionStorage.getItem('user_num')
			}else if(form_soumis == '#form_contact'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&user_num='+sessionStorage.getItem('num_user');
			}else if(form_soumis == '#form_changeProdArti'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&code_feraud='+sessionStorage.getItem('codeFeraudToChange');
			}else if(form_soumis == '#form_insertArticle'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&codeFeraudForProd='+sessionStorage.getItem('codeFeraudForAddArticle');
			}else if(form_soumis == '#form_addCaracteristiquesProduct'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&codeFeraudForAddCaract='+sessionStorage.getItem('codeFeraudForAddCaract');
			}else if(form_soumis == '#form_addCaracteristiquesArticle'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&codeFeraudForAddCaract='+sessionStorage.getItem('codeFeraudForAddCaract');
			}else if(form_soumis == '#form_ChangeArbo'){
				var partss = th.serialize()+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+sessionStorage.getItem('codeFeraudArbo');
			}
			$.ajax({
				url:url,
				type:'post',
				dataType:'json',
				data:partss,
				// beforeSend:function(){
				// 	$('body #masquepage').removeAttr('style');
				// 	$('body #afficheload').removeAttr('style');
				// 	$('body #afficheload').html('<center><img src="images/loader.gif" height="30%" width="30%"></center>');
				// },
				success:function(data){
					if(nom == "enregistrement" && data != "existant"){
						$('body #deconnexion').removeAttr('style');
						$('body #logoFeraudPage').removeAttr('style');
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									for(var c in data[a][b]){
										sessionStorage.setItem(c, data[a][b][c]);
									}
								}
							}else{
								sessionStorage.setItem('token', data[a]);
							}
							
						}
						$.ajax({
							url:'vue/search_accueil.html',
							type:'post',
							data:'',
							success:function(data2){
								$('#contenu').html(data2);
								$('body #logoFeraudPage').removeAttr('style');
							}
						})
					}else if(nom == "connexion" && data != "existant"){
						$('body #deconnexion').removeAttr('style');
						$('body #logoFeraudPage').removeAttr('style');
						var url2 = "";
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									for(var c in data[a][b]){
										sessionStorage.setItem(c, data[a][b][c]);
										if(c == "role_num" && data[a][b][c] == 2){
											url2 = 'vue/search_accueil.html';
											$('body #logoFeraudPage').removeAttr('style');
										}else if(c == "role_num" && data[a][b][c] == 1){
											url2= 'vue/listecontact.html';
										}
									}
									
								}
							}else{
								sessionStorage.setItem('token', data[a]);
							}
							
						}
						$.ajax({
							url:url2,
							type:'post',
							data:'',
							success:function(data2){
								$('#contenu').html(data2);
							}
						})
					}else if(nom == "contact"){
						$('body #reseteur').trigger('click');
						$("#successContactSave").fadeIn(1000).delay(1500).fadeOut(1000);
					}else if(nom == "changeProdArti" && data == "Changement fait!"){
						$('body #changeProdArticle .reseteur').trigger('click');
						$('body #changeProdArticle .close').trigger('click');
						$('body').tagant_search_article(sessionStorage.getItem('codeFeraudToChange'));
					}else if(nom == "insertArticle" && data == "Ajout fait !"){
						$('body #ajouterArticle .reseteur').trigger('click');
						$('body #ajouterArticle .close').trigger('click');
						$('body').tagant_search_article(sessionStorage.getItem('codeFeraudForAddArticle'));
					}else if(nom == "addCaracteristiquesProduct" && data == "Changement fait !"){
						$('body #ajouterProdCarac .reseteur').trigger('click');
						$('body #ajouterProdCarac .close').trigger('click');
						$('body').tagant_search_article(sessionStorage.getItem('codeFeraudForAddCaract'));
					}else if(nom == "addCaracteristiquesArticle"){
						if(data == "Changement non fait !"){
							alert('Limite de caractéristiques atteinte');
						}else{
							$('body #ajouterArtiCarac .reseteur').trigger('click');
							$('body #ajouterArtiCarac .close').trigger('click');
							$('body').tagant_search_article(sessionStorage.getItem('codeFeraudForAddCaract'));
						}
					}else if(nom == "changeArbo" && data == "modification faite !"){
						$('body #showArbo .reseteur').trigger('click');
						$('body #showArbo .close').trigger('click');
						$('body').tagant_search_article(sessionStorage.getItem('codeFeraudArbo'));
					}else{
						alert('Utilisateur déja existant !');
					}
				}
			})
		})
	}
	
	jQuery.fn.tagant_recup = function(){
		$.ajax({
			url:'controleur/selectAllArbo.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token'),
			dataType:'json',
			success:function(data){
				var liste = "";
				for(var a in data){
					var arbo = data[a]['TreeName1']+'/'+data[a]['TreeName2']+'/'+data[a]['TreeName3'];
					liste += '<option>'+arbo+'</option>';
				}
				$('body .arborescence_prod').html(liste);
			}
		})
	}
	jQuery.fn.tagant_delete = function(num_demandes){
		$.ajax({
			url:'controleur/delete.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token')+'&num_demandes='+num_demandes,
			dataType:'json',
			success:function(data){
				if(data == 'Suppression effectuée'){
					$('body div.collapse'+num_demandes).remove();
				}
			}
		})
	}
	jQuery.fn.tagant_search_article = function(id_article){
		$.ajax({
			url:'controleur/search_articles.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token')+'&id_article='+id_article,
			dataType:'json',
			success:function(data){
				if(data){
					$.ajax({
						url:'vue/articles.html',
						type:'post',
						data:'',
						success:function(data2){
							$('#contenu').html(data2);
							$('body #search_bar').removeAttr('style');
							sessionStorage.setItem('firstSearchDone','1');
							sessionStorage.setItem('search_article_id',id_article);
							$('body .id_article2').val('');
							var liste_articles = "";
						//*****************************elements relatifs au produit**************** */
								var arbo = data[0]['TreeName1']+' / '+data[0]['TreeName2']+' / '+data[0]['TreeName3'];
								var produit = '';
								var titre_prod = '';
								var text_prod = '';
								var description_prod = '';
								var caracteristiques_prod= "";
								var caracteristiques = '';
								var codeFeraudForAddArticle ='';
							
							for(var a in data[0]){
								if(a == 'ProductName'){
									titre_prod = data[0][a];
								}
								else if(a == 'caracteristiques'){
									text_prod = data[0][a];
									caracteristiques = data[0][a];
								}else if(a == 'description'){
									description_prod = data[0][a];
								}else if(a == 'code_feraud'){
									codeFeraudForAddArticle = data[0][a];
								}
							}
							caracteristiques =  caracteristiques.split('•');
							caracteristiques = caracteristiques.filter(function(n){return n != ''});
							for(var aa in caracteristiques){
								caracteristiques[aa] =  caracteristiques[aa].split(':');
								caracteristiques_prod += ' <tr style="cursor:pointer" class="editable_tr" name="'+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'">\
																<td><strong>'+caracteristiques[aa][0]+'</strong></td>\
																<td>'+caracteristiques[aa][1]+'</td>\
															</tr>\
															<tr style="display:none" class="'+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'">\
																<td>\
																	<div class="col">\
																		<textarea name="'+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'1" cols="40" rows="4" class="form-control '+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'lib">hgjfghjgfjhd</textarea>\
																	</div>\
																</td>\
																<td>\
																	<div class="col">\
																		<textarea name="'+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'2" cols="40" rows="4" class="form-control '+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'val">jjjjj</textarea>\
																	</div><span id="'+codeFeraudForAddArticle+'" name="'+strNoAccent(caracteristiques[aa][0]).toLowerCase()+'" style="left:-26px" class="saveCaractProd glyphicon glyphicon-ok-sign btn btn-success"><span>\
																</td>\
															</tr>';
							}
							produit = '<div class=" col-xs-12 col-lg-12 col-sm-12 col-md-12" style="border:0.2px solid black;padding-top:10px;padding-bottom:10px;margin-bottom:20px">\
								<h3><center>Produit de l\'article <button name="'+codeFeraudForAddArticle+'" id="addArtiProd" class="addArtiProd btn btn-info glyphicon glyphicon-plus"></button></center></h3><br>\
								<div class="row col-xs-12 col-lg-12 col-sm-12 col-md-12" style="margin-bottom: 20px;">\
									<div class="col-xs-6 col-lg-6 col-sm-6 col-md-6" style="border-right:0.5px solid black">\
										<div style="margin-top:12em">\
											<h4><center><strong>Arborescence du produit :</strong></center></h4>\
											<span class="showProdArbo" id="showProdArbo" name="'+codeFeraudForAddArticle+'" style="font-size:18px;cursor: pointer;"><center>'+arbo+'</center></span>\
										</div>\
									</div>\
									<div class="col-xs-6 col-lg-6 col-sm-6 col-md-6">\
										<h4><center><strong>Information du produit :</strong></center></h4>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Titre produit:</span></label><br>\
											<form id="ModifieProdElmtTitreProd" class="titre_produit" style="display:none">\
												<br><textarea cols="40" rows="4" name="ProductName" class="form-control"></textarea>\
												<center><button type="button" name="'+codeFeraudForAddArticle+'" id="ProductName" class="modifieElmtProd btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button></center>\
											</form>\
											<div class="editable" style="cursor:pointer" name="titre_produit"><center>'+titre_prod+'</center></div>\
										</div>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Texte court:</span></label><br>\
											<form action ="#" method="post" id="ModifieProdElmtTextProd" class="text_produit" style="display:none">\
												<br><textarea cols="40" rows="4" name="caracteristiques" class="form-control"></textarea>\
												<center><button type="button" name="'+codeFeraudForAddArticle+'" id="caracteristiques" class="modifieElmtProd btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button></center>\
											</form>\
											<div class="editable" style="cursor:pointer" name="text_produit"><center>'+text_prod+'</center></div>\
										</div>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Description:</span></label><br>\
											<form action ="#" method="post" id="ModifieProdElmtDescriptionProd" class="description_produit" style="display:none">\
												<br><textarea cols="40" rows="4" name="description" class="form-control"></textarea>\
												<center><button type="button" name="'+codeFeraudForAddArticle+'" id="description" class="modifieElmtProd btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button></center>\
											</form>\
											<div class="editable" style="cursor:pointer;" name="description_produit"><center>'+description_prod+'</center></div>\
										</div>\
									</div>\
								</div>\
								<div>\
									<h4><center><strong>Caractéristiques du produit <button id="caracProd" name="'+codeFeraudForAddArticle+'" class="caracProd btn btn-default glyphicon glyphicon-plus"></button></strong></center></h4><br>\
									<table class="table table-striped table-bordered table-condensed">\
										<!-- <thead></thead> -->\
										<tbody>'+caracteristiques_prod+'</tbody>\
									</table>\
								</div>\
							</div>';
						//********************************************************************************************************************* */
						//***************************************************elements relatif aux articles********************** */	
							for(var c in data){
								var lib_article = '';
								var photo1 = '';
								var photo2 = '';
								var photo3 = '';
								var arthcode_entete = [];
								var arthcode_val = [];
								var artval_entete = [];
								var artval_val = [];
								var caracteristiques_art = '';
								for(var d in data[c]){
									if(d == 'libelle_article'){
										lib_article = data[c][d];
									}else if(d == 'ProductImageHD1'){
										if([null,''].includes(data[c][d])){
											photo1 = 'images/image_default.png';
										}else{
											photo1 = 'https://feraud-quinc.onebase.fr/images/images_prod/BD/'+data[c][d];
										}
									}else if(d == 'ProductImageHD2'){
										if([null,''].includes(data[c][d])){
											photo2 = 'images/image_default.png';
										}else{
											photo2 = 'https://feraud-quinc.onebase.fr/images/images_prod/BD/'+data[c][d];
										}
									}else if(d == 'ProductImageHD3'){
										if([null,''].includes(data[c][d])){
											photo3 = 'images/image_default.png';
										}else{
											photo3 = 'https://feraud-quinc.onebase.fr/images/images_prod/BD/'+data[c][d];
										}
									}else if(d.replace(new RegExp("[^(a-zA-Z)]", "g"), '') == 'ArtThCode' && data[c][d]){
										arthcode_val.push(data[c][d]);
										arthcode_entete.push(d);
									}else if(d.replace(new RegExp("[^(a-zA-Z)]", "g"), '') == 'ArtVal' && data[c][d]){
										artval_val.push(data[c][d]);
										artval_entete.push(d);
									}
									else if(d == 'code_feraud' && data[c][d]){
										code_feraud = data[c][d];
									}
								}
								for(var dd in arthcode_entete){
									for(var ee in artval_entete){
										var nArthcode = arthcode_entete[dd].replace(/\D/g,'');
										var nArthval = arthcode_entete[ee].replace(/\D/g,'');
										
										if(nArthcode == nArthval){
											caracteristiques_art += ' <tr style="cursor:pointer" class="editable_tr" name="'+strNoAccent(artval_val[dd]).toLowerCase()+'">\
												<td><strong>'+arthcode_val[dd]+'</strong></td>\
												<td>'+artval_val[dd]+'</td>\
											</tr>\
											<tr style="display:none" class="'+strNoAccent(artval_val[dd]).toLowerCase()+'">\
												<td>\
													<div class="col">\
														<textarea name="'+strNoAccent(artval_val[dd]).toLowerCase()+'1" cols="40" rows="4" class="form-control '+strNoAccent(arthcode_val[dd]).toLowerCase()+'lib"></textarea>\
													</div>\
												</td>\
												<td>\
													<div class="col">\
														<textarea id="'+strNoAccent(arthcode_val[dd]).toLowerCase()+'" name="'+strNoAccent(artval_val[dd]).toLowerCase()+'2" cols="40" rows="4" class="form-control '+strNoAccent(arthcode_val[dd]).toLowerCase()+'val"></textarea>\
													</div><span id="'+code_feraud+'" name="'+strNoAccent(artval_val[dd]).toLowerCase()+'" style="left:-26px" class="saveCaractArti glyphicon glyphicon-ok-sign btn btn-success"><span>\
												</td>\
											</tr>';
										}
									}
								}
								liste_articles += '<div id="'+code_feraud+'" class=" col-xs-12 col-lg-12 col-sm-12 col-md-12" style="border:0.2px dashed black;padding-top:10px;padding-bottom:10px;margin-bottom: 20px;">\
								<div class=" col-xs-12 col-lg-12 col-sm-12 col-md-12" style="margin-bottom: 20px;"">\
									<h4>\
										<center>\
											Article \
											<span style="background-color:#2dadc1">'+code_feraud+'</span> : \
											<form class="libArt'+code_feraud+'" style="display:none">\
												<br><textarea cols="40" rows="4" name="libelle_article" id="'+code_feraud+'" class="form-control"></textarea>\
												<center><button type="submit" name="'+code_feraud+'" class="modifieElmtArti btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button></center>\
											</form>\
											<span class="editable" style="cursor:pointer" name="libArt'+code_feraud+'">'+lib_article+'</span>\
										</center>\
										<button name="'+code_feraud+'" class="changeProdArti btn btn-warning glyphicon glyphicon-retweet"></button>\
									</h4>\
									<div class="card-group">\
										<div class="card">\
										  <img width="250" height="250" src="'+photo1+'" class="card-img-top" alt="...">\
										</div>\
										<div class="card">\
										  <img width="250" height="250"src="'+photo2+'" class="card-img-top" alt="...">\
										</div>\
										<div class="card">\
										  <img width="250" height="250" src="'+photo3+'" class="card-img-top" alt="...">\
										</div>\
									</div>\
								</div>\
								<div class=" col-xs-12 col-lg-12 col-sm-12 col-md-12">\
									<h4><center><strong>Caractéristiques de l\'article <button name="'+code_feraud+'" id="caracArti" class="caracArti btn btn-default glyphicon glyphicon-plus"></button></strong></center></h4>\
									<table class="table table-striped table-bordered table-condensed">\
										<thead>\
										  <!-- <tr>\
											<th scope="col">Tétieres</th>\
											<th scope="col">Valeurs</th>\
										  </tr> -->\
										</thead>\
										<tbody>'+caracteristiques_art+'</tbody>\
									</table>\
								</div>\
							</div>';
							}
						//***************************************************************************************************************** */
						//liste = liste+caracteristiques+description;
							$('body #content_block_prod').html(produit);
							$('body #content_block_art').html(liste_articles);
							$('body span.id_article').text(id_article);
						}
					})
				}
			}
		})
	}
})(jQuery)