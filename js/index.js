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

	//********************************************show button click article lign********************* */
	 
		let handleMousemove = (event) => { // detect position souris
			sessionStorage.setItem('xMousePos',`${event.x}`);
			sessionStorage.setItem('yMousePos',`${event.y}`);
		};
		let handleClickmove = (event) => { //detecte le click
			var pp = $('body div#bloc_option_article').attr('style');
			if(pp != 'display: none;'){
				$('body div#bloc_option_article').css({
					"display":"none"
				});
			}
		};
	 	document.addEventListener('mousemove', handleMousemove);
		document.addEventListener('click', handleClickmove);


		$('body').on('click','.row_carac_article',function(e){ // affiche option(delete,update) après click sur ligne article
			e.preventDefault();
			e.stopPropagation();
			$('body div#bloc_option_article').removeAttr('style');
			$('body div#bloc_option_article').css({
				"position":"absolute",
				"left":sessionStorage.getItem('xMousePos')+'px',
				"top":sessionStorage.getItem('yMousePos')+'px',
				"z-index":"99"
			});
		});
	//************************************************************************************************************************ */

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
		$('body').on('click','.showProdArbo,.addArtiProd,.caracProd,.caracArti',function(e){ // bar recherche page d'accueil
			e.preventDefault();
			e.stopPropagation();

			var th = $(this);
			var lenom = th.attr('id');
			if(lenom == 'showProdArbo'){
				$('body #showArbo').modal('show');
				$('body').tagant_recup();
			}else if(lenom == 'addArtiProd'){
				$('body #ajouterArticle').modal('show');
			}else if(lenom == 'caracProd'){
				$('body #ajouterProdCarac').modal('show');
			}else if(lenom == 'caracArti'){
				$('body #ajouterArtiCarac').modal('show');
			}
		});
	//***************************************************************************************************** */
})

 