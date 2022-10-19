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
			}
			$.ajax({
				url:url,
				type:'post',
				dataType:'json',
				data:partss,
				beforeSend:function(){
					$('body #masquepage').removeAttr('style');
					$('body #afficheload').removeAttr('style');
					$('body #afficheload').html('<center><img src="images/loader.gif" height="30%" width="30%"></center>');
				},
				success:function(data){
					if(nom == "enregistrement" && data != "existant"){
						$('body #deconnexion').removeAttr('style');
						$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
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
							}
						})
					}else if(nom == "connexion" && data != "existant"){
						$('body #deconnexion').removeAttr('style');
						$('body #deconnexion').attr('style','position:absolute;top:3%;right:8%;color:red;top:3%;cursor:pointer');
						var url2 = "";
						for(var a in data){
							if(a == 0){
								for(var b in data[a]){
									for(var c in data[a][b]){
										sessionStorage.setItem(c, data[a][b][c]);
										if(c == "role_num" && data[a][b][c] == 2){
											url2 = 'vue/search_accueil.html';
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
					}else{
						alert('Utilisateur déja existant !');
					}
				}
			})
		})
	}
	
	jQuery.fn.tagant_recup = function(donnee){
		$.ajax({
			url:'controleur/selectAll.php',
			type:'post',
			data:'token='+sessionStorage.getItem('token'),
			dataType:'json',
			success:function(data){
				var liste = "";
				for(var a in data){
					 liste += '<div class="accordion-group collapse'+data[a]['num_demandes']+'">\
						<div class="form-control accordion-heading" id="header_collapse">\
						  <a style="color:white" class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+a+'">\
							<center>\
								'+data[a]['objet']+'\
								<span name="'+data[a]['num_demandes']+'" id="deleteDemande" style="color:red" class="pull-right glyphicon glyphicon-trash"></span>\
							</center>\
							\
						  </a>\
						</div>\
						<div id="collapse'+a+'" class="accordion-body collapse">\
						  <div class="accordion-inner">\
							'+data[a]['message']+'\
						  </div>\
						</div>\
					</div>';
				}
				$('body #listeContacts').html(liste);
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
							//*********************************************************************************** */
							for(var a in data[0]){
								if(a == 'ProductName'){
									titre_prod = data[0][a];
								}
								else if(a == 'caracteristiques'){
									text_prod = data[0][a];
								}else if(a == 'description'){
									description_prod = data[0][a];
								}
							}
							produit = '<div class=" col-xs-12 col-lg-12 col-sm-12 col-md-12" style="border:0.2px solid black;padding-top:10px;padding-bottom:10px;margin-bottom:20px">\
								<h3><center>Produit de l\'article <button class="btn btn-info glyphicon glyphicon-plus"></button></center></h3>\
								<div class="row col-xs-12 col-lg-12 col-sm-12 col-md-12" style="margin-bottom: 20px;">\
									<div class="col-xs-6 col-lg-6 col-sm-6 col-md-6" style="border-right:0.5px solid black">\
										<div style="margin-top:7em">\
											<h4><center><strong>Arborescence du produit :</strong></center></h4>\
											<form class="form-inline arbo_prod_change" style="display: none;">\
												<div class="block_arbo">\
													<div class="form-group mx-sm-3 mb-2">\
														<select class="form-control" style="height: 40px;" name="pp" required>\
															<option>Cameroun</option>\
															<option>Gabon</option>\
														</select>\
													</div>\
													<button type="submit" class="btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button>\
												</div>\
											</form>\
											<span class="arbo_prod_dur" style="font-size:18px;cursor: pointer;"><center>'+arbo+'</center></span>\
										</div>\
									</div>\
									<div class="col-xs-6 col-lg-6 col-sm-6 col-md-6">\
										<h4><center><strong>Information du produit :</strong></center></h4>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Titre produit:</span></label><br>\
											<form class="form-inline titre_prod_change" style="display:none">\
												<div class="block_arbo">\
													<div class="form-group mx-sm-3 mb-2">\
														<input type="text" value="je text oui" class="form-control">\
													</div>\
													<button type="submit" class="btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button>\
												</div>\
											</form>\
											<div class="titre_prod_dur" style="cursor:pointer">'+titre_prod+'</div>\
										</div>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Texte court:</span></label><br>\
											<form class="form-inline text_prod_change" style="display:none">\
												<div class="block_arbo">\
													<div class="form-group mx-sm-3 mb-2">\
														<input type="text" value="je text oui" class="form-control">\
													</div>\
													<button type="submit" class="btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button>\
												</div>\
											</form>\
											<div class="text_prod_dur" style="cursor:pointer">'+text_prod+'</div>\
										</div>\
										<div class="form-group">\
											<label style="background-color:white" class="pull-left"><span class="langue">Description:</span></label><br>\
											<form class="form-inline description_prod_change" style="display:none">\
												<div class="block_arbo">\
													<div class="form-group mx-sm-3 mb-2">\
														<textarea cols="30" rows="4" class="form-control">jhg fjgh fgjtghj hgjghjh </textarea>\
													</div>\
													<button type="submit" class="btn btn-success mb-2"><span class="glyphicon glyphicon-ok-sign"></span> ok</button>\
												</div>\
											</form>\
											<div class="description_prod_dur" style="cursor:pointer;">'+description_prod+'</div>\
										</div>\
									</div>\
								</div>\
								<div>\
									<h4><center><strong>Caractéristiques du produit :</strong></center></h4><br>\
									<table class="table table-striped table-bordered table-condensed">\
										<!-- <thead></thead> -->\
										<tbody>\
										  <tr>\
											<td><strong>MARK</strong></td>\
											<td>Otto</td>\
										  </tr>\
										  <tr>\
											<td><strong>JACOB</strong></td>\
											<td>Thornton</td>\
										  </tr>\
										  <tr>\
											<td><strong>MARK</strong></td>\
											<td>Otto</td>\
										  </tr>\
										  <tr>\
											<td><strong>JACOB</strong></td>\
											<td>Thornton</td>\
										  </tr>\
										</tbody>\
									</table>\
								</div>\
							</div>';
							//liste = liste+caracteristiques+description;
							$('body #content_block_prod').html(produit);
							$('body span.id_article').text(id_article);
						}
					})
				}
			}
		})
	}
	
})(jQuery)