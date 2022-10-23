$(function(){
	// sessionStorage.clear();
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
	//************************************************************************ */

	//**************************************edit elements*************************************************************** */
		$('body').on('click','.editable',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			var th = $(this);
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
			
			
		});
		$('body').on('click','.editable_tr',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			
			var th = $(this);
			var lenom = th.attr('name');
			var fi = '';
			var lst = '';
			th.children().each(function(index) {
				if(index == 0){
					fi = $(this).text();
				}else{
					lst = $(this).text();
				}
			});
			th.next().removeAttr('style');
			th.next().find("textarea[name='"+lenom+"1']").text(fi);
			th.next().find("textarea[name='"+lenom+"2']").text(lst);
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
				$('body').tagant_recup();
			}else if(lenom == 'addArtiProd'){
				sessionStorage.setItem('codeFeraudForAddArticle',th.attr('name'));
				$('body #ajouterArticle').modal('show');
			}else if(lenom == 'caracProd'){
				$('body #ajouterProdCarac').modal('show');
				sessionStorage.setItem('codeFeraudForAddCaract',th.attr('name'));
			}else if(lenom == 'caracArti'){
				$('body #ajouterArtiCarac').modal('show');
				sessionStorage.setItem('codeFeraudForAddCaract',th.attr('name'));
			}else if(lenom == 'changeProdArti'){
				sessionStorage.setItem('codeFeraudToChange',th.attr('name'));
				$('body #changeProdArticle').modal('show');
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
 			var datass = lenom+'='+valeur+'&token='+sessionStorage.getItem('token')+'&codeFeraud='+codeFeraud;
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
		});
	//****************************************************************************** */
})

 