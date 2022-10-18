$(function(){
	alert('yo');
	document.addEventListener('deviceready',myDeviceReady,false);
	
	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
	function myDeviceReady(){
		 contientout();
			
			// document.addEventListener("backbutton",onBackKeyDown,false);
			 
			// $('body').tagant_affichenotification();
			 
			 // if(navigator.globalization){
				 // navigator.globalization.getPreferredLanguage(
					// function(language){
						// if(localStorage.getItem('langue')!= null){
							// $('body select#languess').val(localStorage.getItem('langue'));
						// }else{
							// if(language.value == 'fr-FR'){
							// localStorage.setItem('langue','fr');
							 // $('body select#languess').val('fr');
						// }else{
							// localStorage.setItem('langue','en');
							// $('body select#languess').val('en');
						// }
					// }
					// },
					// function(){alert('Error getting language\n');}
				// ); 
			 // }
			 
			// var connection = checkConnection();
			// if(connection != 'No network connection'){
				// locationpos();
			// }else{
				// $.ajax({
					// url:'vue/error_internet.html',
					// type:'post',
					// data:'',
					// success:function(data){
						// $('#contenu').html(data);
						// $('body div#entetedrapeau #imagedudrapeau').attr('src','drapeaus_pays/drapeau_blanc.jpg');
						// var page = $('#contenu div').attr('name');
						// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
					// }
				// })
			// }
			
			// function locationpos(){
				// cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
			// }
			
			// function onRequestSuccess(success){
				// contientout();
			// }

			// function onRequestFailure(error){
				// console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
				// if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
					// if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
						// cordova.plugins.diagnostic.switchToLocationSettings();
					// }
				// }
			// }
			
			function contientout(){
				if(localStorage.getItem('nom') !=null){
					$.ajax({
						url:'vue/accueil.html',
						type:'post',
						data:'',
						success:function(data){
							$('#contenu').html(data);
							var page = $('#contenu div').attr('name');
							$('body').tagant_changelangue(localStorage.getItem('langue'),page);
						}
					})
				}else{
					$.ajax({
						url:'vue/optionaccueil.html',
						type:'post',
						data:'',
						success:function(data){
							$('body #contenu').html(data);
							var page = $('#contenu div').attr('name');
							$('body').tagant_changelangue(localStorage.getItem('langue'),page);
						}
					})
				}
			}
			
			// function checkConnection(){
				// var networkState = navigator.connection.type;
				// var states = {};
				// states[Connection.UNKNOWN]  = 'Unknown connection';
				// states[Connection.ETHERNET] = 'Ethernet connection';
				// states[Connection.WIFI]     = 'WiFi connection';
				// states[Connection.CELL_2G]  = 'Cell 2G connection';
				// states[Connection.CELL_3G]  = 'Cell 3G connection';
				// states[Connection.CELL_4G]  = 'Cell 4G connection';
				// states[Connection.CELL]     = 'Cell generic connection';
				// states[Connection.NONE]     = 'No network connection';

				// return states[networkState];
			// }
			 
			// $('body').tagant_affichedrapeau();
			// $('body').tagant_affichenotification();
			 
			// pictureSource=navigator.camera.PictureSourceType;
			// destinationType=navigator.camera.DestinationType; 
			 
			// function onBackKeyDown(){
				// var page = $('#contenu div').attr('name');
						// if(page == 'accueil' || page == 'optionaccueil' || page == 'error_internet' || page == '' || page == undefined){
							// if(localStorage.getItem('langue')== 'fr'){
								// if(confirm('Voulez-vous sortir de l\'application')){
									// navigator.app.exitApp();
								// }
							// }else{
								// if(confirm('Do you want to exit the application')){
									// navigator.app.exitApp();
								// }
							// }
						// }else if(page == 'connexion' || page == 'enregistrement'){
							// $.ajax({
								// url:'vue/optionaccueil.html',
								// type:'post',
								// data:'',
								// success:function(data){
									// $('body #contenu').html(data); 
									 // page = $('#contenu div').attr('name');
									// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
								// }
							// })
						// }else{
							// $.ajax({
								// url:'vue/accueil.html',
								// type:'post',
								// data:'',
								// success:function(data){
									// $('#contenu').html(data);
									 // page = $('#contenu div').attr('name');
									// $('body').tagant_changelangue(localStorage.getItem('langue'),page);
								// }
							// })
						// }
			// }
			 
			
			 
	}
		
	 
	
	// $('body').on('click','#appareil_photo2',function(e){
        // capturePhoto();
		// $('#appareil_photo').attr('src','images/galerie.jpg');
		// $('#appareil_photo').attr('height','15%');
		// $('#appareil_photo').attr('width','15%');
    // });
	// function capturePhoto(){
      //// Take picture using device camera and retrieve image as base64-encoded string
     // alert('Fonctionnalitée pas complètement operationnelle'); 
	 //// navigator.camera.getPicture(onPhotoDataSuccess,onFail,{quality:50,destinationType:destinationType.FILE_URI,pictureSource:pictureSource,correctOrientation:true});
	// }
	 // function onPhotoDataSuccess(imageURI){
		 // var output_format = 'jpeg';
		// var qualityy =80;
		 //// var im = 'data:image/jpeg;base64,'+imageData;
		 // var fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
		 // sessionStorage.setItem('nomimageajoutpieceperdu',fileName);
		 		 
		// $('#appareil_photo2').attr('src',imageURI);
		// $('#appareil_photo2').attr('height','25%');
		// $('#appareil_photo2').attr('width','50%');
		
		// sessionStorage.setItem('valeurimageajoutpieceperdu',imageURI);
		
		// sessionStorage.setItem('videoaulieurimage','false');
		// sessionStorage.setItem('quality',qualityy);
		// sessionStorage.setItem('output_format',output_format);
		// sessionStorage.setItem('typephotopris','camera');
    // }
	 // function onFail(message) {
      // alert('Failed because:'+message);
    // }
	
	
 })

