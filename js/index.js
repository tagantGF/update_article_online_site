$(function(){
	// sessionStorage.clear();
	sessionStorage.removeItem('updateBtn');
	sessionStorage.removeItem('deleteBtn');
	sessionStorage.removeItem('updateCaracProd');
//*******************init home page*******************************
	function firstpage(url){
		$.ajax({
			url:url,
			type:'post',
			data:'',
			success:function(data){
				$('#contenu').html(data);
			}
		})
	}

	if(sessionStorage.getItem('role_num') == 1){
		firstpage('vue/listecontact.html');
		$('body #deconnexion').removeAttr('style');
		$('body #logoFeraudPage').removeAttr('style');
		
	}else if(sessionStorage.getItem('role_num') == 2 && sessionStorage.getItem('firstSearchDone') != '1'){
		firstpage('vue/search_accueil.html');
		if(sessionStorage.getItem('num_user') != null){
			$('body #deconnexion').removeAttr('style');
			$('body #logoFeraudPage').removeAttr('style');
		}
		var valeurTypeArti= $('body select.searchArtiMenu').val();
		if(valeurTypeArti == 'controleur/articleArbo1.php'){
			$('body').tagant_recup(valeurTypeArti);
		}else{
			$('body').tagant_recup(valeurTypeArti);
		}
		
	}else{
		if(sessionStorage.getItem('firstSearchDone') != '1'){
			firstpage('vue/connexion.html');
		}else if(sessionStorage.getItem('firstSearchDone') == '1'){
			$('body').tagant_search_article(sessionStorage.getItem('search_article_id'));
			$('body #deconnexion').removeAttr('style');
			$('body #logoFeraudPage').removeAttr('style');
		}
	}
//****************************************************************

//*****************************show pages***********************
	$('body').tagant_affiche_page('.senregistrer','click'); 
	$('body').tagant_affiche_page('.seconnecter','click');
//*************************************************************

//******************submit forms******************************
	$('body').tagant_submit_form('#form_enregistrement');
	$('body').tagant_submit_form('#form_connexion');
	$('body').tagant_submit_form('#form_contact');
	$('body').tagant_submit_form('#form_changeProdArti');
	$('body').tagant_submit_form('#form_insertArticle');
	$('body').tagant_submit_form('#form_addCaracteristiquesProduct');
	$('body').tagant_submit_form('#form_addCaracteristiquesArticle');
	$('body').tagant_submit_form('#form_ChangeArbo');
	$('body').tagant_submit_form('#form_Arbo1');
	
	//****************************************************************

	$('body').on('click','#deconnexion',function(e){
		e.preventDefault();
		sessionStorage.clear();
		firstpage('vue/connexion.html');
		$('body #deconnexion').attr('style','display:none');
		$('body #search_bar').attr('style','display:none');
		$('body #logoFeraudPage').attr('style','display:none');
    });
	$('body').on('click','#deleteDemande',function(e){
		e.preventDefault();
		e.stopPropagation();
		var th = $(this);
		var num_demandes = th.attr('name');
		$('body').tagant_delete(num_demandes);
    });
	
	$('body').on('click','.afficherpwd',function(e){
		e.preventDefault();
		if($('body .pwd').hasClass('invisibless')){
			var valeur = $('body pwd').val();
			$('body .pwd').attr('type','text');
			$('body .pwd').attr('value',valeur);
			$('body .pwd').removeClass('invisibless');
			$('body .pwd').addClass('visibless');
			$('body .afficherpwd span').removeClass('glyphicon-eye-close');
			$('body .afficherpwd span').addClass('glyphicon-eye-open');
		}else{
			$('body .pwd').attr('type','password');
			$('body .pwd').addClass('visibless');
			$('body .pwd').addClass('invisibless');
			$('body .afficherpwd span').removeClass('glyphicon-eye-open');
			$('body .afficherpwd span').addClass('glyphicon-eye-close');
			}
		})

	//*******************************get article by search bar**************** */
		$('body').on('click','#home_search',function(e){ // bar recherche page d'accueil
			e.preventDefault();
			e.stopPropagation();
			var valeur = $('body .id_article').val();
			$('body').tagant_search_article(valeur);
		});
		$('body').on('click','#home_search2',function(e){ // bar de recherche != page accueil
			e.preventDefault();
			e.stopPropagation();
			var valeur = $('body .id_article2').val();
			$('body').tagant_search_article(valeur);
		}); 

		$('body').on("keypress", ".id_article", function(e){
			if(e.which == 13){
				var valeur = $('body .id_article').val();
				$('body').tagant_search_article(valeur);
			}
		});
		$('body').on("keypress", ".id_article2", function(e){
			if(e.which == 13){
				var valeur = $('body .id_article2').val();
				$('body').tagant_search_article(valeur);
			}
		  });
	//************************************************************************ */

	//**************************************edit elements*************************************************************** */
		$('body').on('click','.editable',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			if(['','invalider',undefined].includes(th.attr('action'))){
				contenu = th.text();
				//console.log('yess',contenu);
				var lenom = th.attr('name');
				if(lenom == 'arbo_produit'){
					th.attr('style','display:none');
					$('body form.'+lenom).removeAttr('style');
				}else{
					th.attr('style','display:none');
					$('body form.'+lenom).removeAttr('style');
					$('body form.'+lenom+' textarea').text(contenu);
				}
			}else{
				alert('Cet article a été Validé et vérrouillé');
			}
		});
		$('body').mousemove(function(e){
			e.preventDefault();
			e.stopPropagation();
			sessionStorage.setItem('cursorX',e.pageX);
			sessionStorage.setItem('cursorY',e.pageY);
		});
		$('body').on('click','.container',function(e){
			// e.preventDefault();
			// e.stopPropagation();
			$('body div#bloc_option_article').attr('style','display:none');
			sessionStorage.removeItem('updateCaracProd');
			sessionStorage.removeItem('updateBtn');
			sessionStorage.removeItem('deleteBtn');
		});
		$('body').on('click','span.updateElement',function(e){
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			var lenom = th.attr('name');
			if(lenom == 'update'){
				sessionStorage.setItem('updateBtn','clicked');
				$('body tr.editable_tr[name="'+sessionStorage.getItem('updateCaracProd')+'"]').trigger('click');
				$('body div#bloc_option_article').attr('style','display:none');
			}else{
				sessionStorage.setItem('updateBtn','deleted');
				$('body tr.editable_tr[name="'+sessionStorage.getItem('updateCaracProd')+'"]').trigger('click');
				$('body div#bloc_option_article').attr('style','display:none');
			}
		});
		$('body').on('click','.editable_tr',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			var lenom = th.attr('name');
			if(sessionStorage.getItem('updateBtn')== null){
				$('body div#bloc_option_article').removeAttr('style');
				$('body div#bloc_option_article').css({
					'position':'absolute',
					'z-index':'99',
					'left': sessionStorage.getItem('cursorX')+"px",
					'top': sessionStorage.getItem('cursorY')+'px'
				});
				sessionStorage.setItem('updateCaracProd',lenom);
			}
			else if(sessionStorage.getItem('updateBtn') == 'clicked'){
				sessionStorage.removeItem('updateCaracProd');
				sessionStorage.removeItem('updateBtn');
				if(['','invalider',undefined].includes(th.attr('action'))){
					var lenom = th.attr('name');
					var fi = '';
					var lst = '';
					var tab = ['REF_CAT','REF_FOUR','EAN'];
					var gg = th.next().find("textarea[name='"+lenom+"1']").val();
					th.children().each(function(index) {
						if(index == 0){
							fi = $(this).text();
						}else{
							lst = $(this).text();
						}
					});
					if(!tab.includes(fi)){
						th.next().removeAttr('style');
						th.next().find("textarea[name='"+lenom+"1']").text(fi);
						th.next().find("textarea[name='"+lenom+"2']").text(lst);
					}else{
						alert('Aucune modification autorisée !');
					}
				}else{
					alert('Cet article a été Validé et vérrouillé');
				}
			}
			else if(sessionStorage.getItem('updateBtn') == 'deleted'){
				if(confirm('Voulez-vous supprimer cet élément ?')){
					sessionStorage.removeItem('updateCaracProd');
					sessionStorage.removeItem('updateBtn');
					var fi = '';
					var lst = '';
					var codeFeraud = th.attr('id');
					var gg = th.next().find("textarea[name='"+lenom+"1']").val();
					th.children().each(function(index){
						if(index == 0){
							fi = $(this).text();
						}else{
							lst = $(this).text();
						}
					});
					var datass = '';
					var url = '';
					if(th.hasClass('produitsTable')){
						datass = 'type=produit'+'&libelle='+fi+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&valeur='+lst;
					}else if(th.hasClass('ArtiTable')){
						datass = 'type=article'+'&libelle='+fi+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&valeur='+lst;
					}
					$.ajax({
						url:"controleur/delete_prod.php",
						type:'post',
						dataType:'json',
						data:datass,
						success:function(data){
							if(data == 'suppression fait !'){
								th.remove();
							}
						}
					})
				}
				
			}
		});
	//************************************************************************************************************* */

	//**************************************show modal**************************************************** */
		
		$('body').on('click','.showProdArbo,.addArtiProd,.caracProd,.caracArti,.changeProdArti',function(e){ // bar recherche page d'accueil
			e.preventDefault();
			e.stopPropagation();

			var th = $(this);
			var lenom = th.attr('id');
			if(lenom == 'showProdArbo'){
				$('body #showArbo').modal('show'); 
				$('body').tagant_recup('controleur/selectAllArbo.php');
				sessionStorage.setItem('codeFeraudArbo',th.attr('name'));
			}else if(lenom == 'addArtiProd'){
				sessionStorage.setItem('codeFeraudForAddArticle',th.attr('name'));
				$('body #ajouterArticle').modal('show');
			}else if(lenom == 'caracProd'){
				$('body #ajouterProdCarac').modal('show');
				sessionStorage.setItem('codeFeraudForAddCaract',th.attr('name'));
			}else if(lenom == 'caracArti'){
				if(['','invalider',undefined].includes(th.attr('action'))){
					$('body #ajouterArtiCarac').modal('show');
					sessionStorage.setItem('codeFeraudForAddCaract',th.attr('name'));
				}else{
					alert('Cet article a été Validé et vérrouillé');
				}
			}else if(th.is(".changeProdArti")){
				if(['','invalider',undefined].includes(th.attr('action'))){
					sessionStorage.setItem('codeFeraudToChange',th.attr('name'));
					$('body #changeProdArticle').modal('show');
				}else{
					alert('Cet article a été Validé et vérrouillé');
				}
			}
		});
	//***************************************************************************************************** */
	//*****************************ajouter tetieres***************************** */
		$('body').on('click','#addtetiere',function(e){ // bar de recherche != page accueil
			e.preventDefault();
			e.stopPropagation();
			var nbre = parseInt($('body #showligntetiere').attr('name'));
			if(nbre < 11){
				nbre = (nbre == 0)?4:nbre+1;
				var elmt ='<div class="row form-group">\
						<div class="col">\
						<label>ArtThCode'+nbre+' : </label>\
						<input type="text" name="ArtThCode'+nbre+'" class="form-control" placeholder="ArtThCode'+nbre+'">\
						</div>\
						<div class="col">\
						<label>ArtVal'+nbre+' : </label>\
						<input type="text" name="ArtVal'+nbre+'" class="form-control" placeholder="ArtVal'+nbre+'">\
						</div>\
					</div>';
				$('body #showligntetiere').append(elmt);
				$('body #showligntetiere').attr('name',nbre);
			}else{
				alert('Limite de tétières atteinte');
			}
		}); 
	//**************************************************************************** */

	//***************************modifie element produit*************************** */
		$('body').on('click','.modifieElmtProd',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			var lenom = th.attr('id');
			var codeFeraud = th.attr('name');
			var valeur = $('body textarea[name='+lenom+']').val();
 			var datass = lenom+'='+valeur+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&user='+sessionStorage.getItem('num_user');
			if(valeur != ""){
				$.ajax({
					url:"controleur/modifProdElmt.php",
					type:'post',
					dataType:'json',
					data:datass,
					success:function(data){
						if(data == 'changement fait !'){
							$('body').tagant_search_article(codeFeraud);
						}
					}
				})
			}else{
				alert('La modification ne peut être envoyé car un champs est vide !');
			}
		});

		$('body').on('click','.saveCaractProd',function(e){ 
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			var codeFeraud = th.attr('id');
			var nn = th.attr('name');
			var valeurLibelle = th.parent().parent().find("textarea[name='"+nn+"1']").val();
			var valeur = th.parent().parent().find("textarea[name='"+nn+"2']").val();
 			var datass = nn+'='+valeurLibelle+'&valeur='+valeur+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&user='+sessionStorage.getItem('num_user');
			if(valeurLibelle.trim() != ""){
				$.ajax({
					url:"controleur/modifProdElmttab.php",
					type:'post',
					dataType:'json',
					data:datass,
					success:function(data){
						if(data == 'changement fait !'){
							$('body').tagant_search_article(codeFeraud);
						}
					}
				})
			}else{
				alert('La modification ne peut être envoyé car un champs est vide !');
			}
		});
	//****************************************************************************** */
	//***************************modifie element articles*************************** */
		$('body').on('click','.modifieElmtArti',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			var codeFeraud = th.attr('name');
			var valeur = th.parent().parent().find('textarea').val();
			var datass = 'libelle_article='+valeur+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&user='+sessionStorage.getItem('num_user');
			if(valeur != ""){
				$.ajax({
					url:"controleur/modifArticles.php",
					type:'post',
					dataType:'json',
					data:datass,
					success:function(data){
						if(data == 'changement fait !'){
							$('body').tagant_search_article(codeFeraud);
						}
					}
				})
			}else{
				alert('La modification ne peut être envoyé car un champs est vide !');
			}
			
		});

		$('body').on('click','.saveCaractArti',function(e){ 
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			var codeFeraud = th.attr('id');
			var nn = th.attr('name');
			var valeurLibelle = th.parent().parent().find("textarea[name='"+nn+"1']").val();
			var valeur = th.parent().parent().find("textarea[name='"+nn+"2']").val();
			var pp = th.parent().parent().find("textarea[name='"+nn+"2']").attr('id');
			var datass = pp+'='+valeurLibelle+'&valeur='+valeur+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud+'&user='+sessionStorage.getItem('num_user');
			var tab = ['ref_cat','ref_four','ean'];
			if(valeurLibelle.trim() != ""){
				$.ajax({
					url:"controleur/modifArtiElmttab.php",
					type:'post',
					dataType:'json',
					data:datass,
					success:function(data){
						if(data == 'changement fait !'){
							$('body').tagant_search_article(codeFeraud);
						}
					}
				})
			}else{
				alert('La modification ne peut être envoyé car un champs est vide !');
			}
		});
//****************************************************************************** */

//*******************************show tooltip************************** */
		$('body').on('mouseenter','.showtoltip',function(e){
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			var lib = th.attr('title');
			if(['infoProd','ArborescenceProd','caracteristiqueProd','libArti','caracteristiqueArti'].includes(lib) && ![null,undefined,''].includes(sessionStorage.getItem(lib))){
				th.attr('title','Changement fait par : '+sessionStorage.getItem(lib).toUpperCase());
			}
		});

//***************************************************************************** */
//*******************************save article********************************* */
		$('body').on('click','.sayIfValidated',function(e){
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			if(confirm('Voulez-vous valider et ainsi verrouiller cet article ?')){
				$.ajax({
					url:"controleur/addToArticleDone.php",
					type:'post',
					dataType:'json',
					data:'action=valider'+'&token='+sessionStorage.getItem('token')+'&id_article='+sessionStorage.getItem("search_article_id")+'&user='+sessionStorage.getItem("num_user"),
					success:function(data){
						if(data == 'Sauvegarde faite !'){
							// var elmt = '<span tabindex="0" data-bs-toggle="tooltip" title="WhoHasValidedArti" style="margin-left:2px;line-height:32px;color:#5bc0de;cursor:pointer" class="WhoHasValidedArti pull-right d-inline-block showtoltip glyphicon glyphicon-info-sign"></span>\
							// 			<button class="sayValidated pull-right btn btn-success">\
							// 				<span class="glyphicon glyphicon-thumbs-up"></span> Validé\
							// 			</button>';
							// th.replaceWith(elmt);
							$('body').tagant_search_article(sessionStorage.getItem("search_article_id"));
						}
					}
				})
			}
		});

		$('body').on('click','.sayValidated',function(e){
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			if(confirm('Voulez-vous invalider et déverrouiller cet article ?')){
				$.ajax({
					url:"controleur/addToArticleDone.php",
					type:'post',
					dataType:'json',
					data:'action=invalider'+'&token='+sessionStorage.getItem('token')+'&id_article='+sessionStorage.getItem("search_article_id")+'&user='+sessionStorage.getItem("num_user"),
					success:function(data){
						if(data == 'Sauvegarde faite !'){
							// var elmt = '<span tabindex="0" data-bs-toggle="tooltip" title="WhoHasValidedArti" style="margin-left:2px;line-height:32px;color:#5bc0de;cursor:pointer" class="WhoHasValidedArti pull-right d-inline-block showtoltip glyphicon glyphicon-info-sign"></span>\
							// 			<button class="sayValidated pull-right btn btn-success">\
							// 				<span class="glyphicon glyphicon-thumbs-up"></span> Validé\
							// 			</button>';
							// th.replaceWith(elmt);
							$('body').tagant_search_article(sessionStorage.getItem("search_article_id"));
						}
					}
				})
			}
		});
//***************************************************************************** */
		$('body').on('change','.InvalidatedArticle',function(e){
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			var valeur = parseInt(th.val());
			$('body input.id_article2').val(valeur);
			$('body input.id_article').val(valeur);

			$('body input.id_article').focus();
			$('body input.id_article2').focus();
		});

		$('body').on('change','.searchArtiMenu',function(e){
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
			var valeur = th.val();
			if(valeur == "controleur/articleArbo1.php"){
				$('body #showArbo1').modal('show'); 
			}
			setTimeout(function(){
				$('body').tagant_recup(valeur);
			},300);
		});
	//*********************************************************************** */

	//******************************gestion clic sur images****************** */
		$('body').on('click','.photoArti',function(e){
			var th = $(this);
			$('#photopiece').trigger('click');
			var p = th.find('img').attr('name');
			sessionStorage.setItem('whatImageClicked',p);
			sessionStorage.setItem('whatDivImageClicked',th.attr('title'));
		});

		$('body').on('click','.photoProd',function(e){
			var th = $(this);
			$('#photopiece2').trigger('click');
			sessionStorage.setItem('whatDivImageClicked',th.attr('title'));
		});

		$('body').on('mouseenter','.photoArti',function(e){
			var th = $(this);
			th.find('div').removeAttr('style');
		});

		$('body').on('mouseleave','.photoArti',function(e){
			var th = $(this);
			th.find('div').attr('style','display:none');
		});


		$('body').on('change','#photopiece2',function(e){
			e.preventDefault();
			var th = $(this);
			var output_format = '';
			var quality =0;
			var f = e.target.files[0];
			var source_fichier;
			
			var file = this.files[0];
			var fileType = file["type"];
			var fileSize = Math.round(file.size/1024);
			//alert(fileSize+'kb');
			var validImageTypes = ["image/jpeg","image/jpg","image/png"];
			if ($.inArray(fileType,validImageTypes) < 0) {
			
			}else{
				if(fileType == "image/jpeg" || fileType == "image/jpg"){
					 output_format = 'jpeg'
				}else if(fileType == "image/png"){
					 output_format = 'png'
				}
			}
            var fileName = f.name;
            var reader = new FileReader();
			  // Closure to capture the file information.
			reader.addEventListener("load",function(){
				var tt2 = sessionStorage.getItem('whatDivImageClicked');
				var formass = new FormData();
				source_fichier = reader.result;
				formass.append('nomphoto',fileName);
				formass.append('pp',source_fichier);
				formass.append('extension_fichier',output_format);
				formass.append('code_feraud',tt2);
				$.ajax({
					url:'controleur/addImagesProd.php',
					data:formass,
					processData:false,
					contentType:false,
					type:'post',
					dataType:'json',
					success:function(data){
						$('body').tagant_search_article(sessionStorage.getItem("search_article_id"));
					}
				})
			},false);
			reader.readAsDataURL(f);
        });

		$('body').on('change','#photopiece',function(e){
			e.preventDefault();
			var th = $(this);
			var output_format = '';
			var quality =0;
			var f = e.target.files[0];
			var source_fichier;
			
			var file = this.files[0];
			var fileType = file["type"];
			var fileSize = Math.round(file.size/1024);
			//alert(fileSize+'kb');
			var validImageTypes = ["image/jpeg","image/jpg","image/png"];
			if ($.inArray(fileType,validImageTypes) < 0) {
			
			}else{
				 //quality =  80;
				// output file format (jpg || png || webp)
				if(fileType == "image/jpeg" || fileType == "image/jpg"){
					 output_format = 'jpeg'
				}else if(fileType == "image/png"){
					 output_format = 'png'
				}
				
			}
            var fileName = f.name;
            var reader = new FileReader();
			  // Closure to capture the file information.
			reader.addEventListener("load",function(){
				var tt = sessionStorage.getItem('whatImageClicked');
				var tt2 = sessionStorage.getItem('whatDivImageClicked');
				$("body div.photoArti").each(function(index){
					var th2 = $(this);
					if(th2.attr('title') == tt2){
						var gg = th2.find('img').attr('name');
						if(gg == tt){
							th2.find('img').attr('src',reader.result);
							source_fichier = reader.result;

							//var ff = 'nomphoto='+fileName+'&pp='+source_fichier+'&extension_fichier='+output_format;
							var formass = new FormData();
							formass.append('nomphoto',fileName);
							formass.append('pp',source_fichier);
							formass.append('extension_fichier',output_format);
							formass.append('code_feraud',tt2);
							formass.append('whatImage',tt);
							$.ajax({
								url:'controleur/addImages.php',
								data:formass,
								processData:false,
								contentType:false,
								type:'post',
								dataType:'json',
								success:function(data){
								}
							})
						}
					}
				})
			},false);
			reader.readAsDataURL(f);
        });
	//************************************************************************* */

	//*********************delete photo article**************************** */
			$('body').on('click','.delPhotoArti',function(e){
				e.preventDefault();
				e.stopPropagation();
				var th = $(this);
				var codeF = th.attr('name');
				var nomImage = th.attr('title');
				if(confirm('Voulez-vous supprimer cette image ?')){
					$('body').tagant_delete(codeF,nomImage);
				}
			});
	//************************************************************************** */

})

 