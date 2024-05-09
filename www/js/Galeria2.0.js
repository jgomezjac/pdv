function Galeria2( jidGaleria) {
	var idGaleria=jidGaleria;
	var fotosBase64=[];
	var mObj=this;
	/*
	 * funcion para imagenes web, Testing
	 */
	this.getBase64Image=function(img) { 
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL("image/png");
		var jbase64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		this.agregarFotoBase64EnArray( jbase64, 1);
		return jbase64;
	}
	
	this.agregarFotoAGaleria=function( imageData, imageNro, jnueva ) {
		var jdiv= $('<div/>');
		jdiv.addClass('col-lg-3 col-md-4 col-6');
		jdiv.attr('style','position:relative;');

		var jlink= $('<a/>');
		jlink.attr('href','javascript:');
		jlink.addClass('d-block mb-2');

		var jimg = $('<img/>');
		jimg.addClass('img-fluid img-thumbnail');
		jimg.attr('src',imageData) //`data:image/jpeg;base64,${imageData}`
		jimg.attr('nueva',jnueva);
		jimg.attr('numero',imageNro);
		
		jlink.append( jimg );
		jdiv.append( jlink );

		var jspan = $('<span/>');
		jspan.attr('style','position:absolute;right:0;bottom:0');
		jspan.addClass('btn btn-danger');
		jspan.html("<i class='fa fa-trash'></i>");
		jspan.click(function(){
			var conf=confirm('Esta seguro/a?');
    		if(!conf) return;
    		if( $(this).parent().hasClass('cremoverFotoContainer')) {
    			$(this).parent().removeClass('cremoverFotoContainer') ;
    			$(this).parent().children('a').each(function( index ) {
    				$(this).children('img').removeClass('cremoverFoto') ;
    			});
    		} else {
    			$(this).parent().addClass('cremoverFotoContainer') ;
    			$(this).parent().children('a').each(function( index ) {
    				$(this).children('img').addClass('cremoverFoto') ;
    			});
    		}
		})
		jdiv.append(jspan);
		//<span style='position:absolute;right:0;bottom:0' class='btn btn-danger celiminarFoto'><i class='fa fa-trash'></i></span>
		$('#'+idGaleria).append( jdiv );
	}
	
	this.agregarFotoBase64EnArray=function( jbase64, jnumero ) {
		fotosBase64.push({
			foto	: jbase64,
			numero	: jnumero
		});
	}
	
	this.fotosToArray=function() {
		fotosBase64=[]; //global
		var retornarArrFotos 	= [];
		var cantidadImagenes	= 0;
		var jidGaleria			= idGaleria;
		$( "#"+jidGaleria+" img" ).each(function( index ) {
			cantidadImagenes+=1;
		});

		var numeroImagen=0;
		$( "#"+jidGaleria+" img" ).each(function( index ) {
			numeroImagen+=1;
			
			var image		= $(this).attr('src');
			var jnueva 		= $(this).attr('nueva');
			var jeliminar	= 0;
			var jnumeroBase = $(this).attr('numero');
			if( $(this).hasClass('cremoverFoto') ) {
				var jeliminar	= 1;
				//alert( jeliminar );
			}
			
			if ( jnueva==1 ) {
				/* son fotos tomadas del dispositivo, debe leerlos de otra manera*/
				try {
					mObj.getFileContentAsBase64(image, numeroImagen, cantidadImagenes);
				} catch (error) {
					alert( error );
				}
			} else {
				mObj.agregarFotoBase64EnArray( image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), jnueva, jnumeroBase );
				//Galeria.agregarAFotoEnSalida( image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), jnueva, jeliminar, jnumeroBase );
    			if( numeroImagen==cantidadImagenes ) {
    				// alert( 'Se procesaron '+cantidadImagenes + " imagenes");
    				/*setTimeout(function(){
    					mRemitoSalida.enviarFormularioPaso2();
        				alert( 'Se procesaron '+cantidadImagenes + " imagenes");
    				},500)*/
    			}
    			
			}

		});
		return fotosBase64;
	}
	
	/*this.fotosToArrayPostEvento=function( jevento ) {
		
	}*/
	
	this.getFileContentAsBase64=function( path, nimagen, totalImagenes ) {
		/* requiere plugin : cordova-plugin-file*/
	    window.resolveLocalFileSystemURL(path, gotFile, fail);
	    function fail(e) {
	    	alert('Cannot found requested file');
	    }
	    function gotFile(fileEntry) {
	    	fileEntry.file(function(file) {
	    		var reader = new FileReader();
	    		reader.onloadend = function(e) {
	    			
	    			var content = this.result;
	    			mObj.agregarFotoBase64EnArray( content.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 1, 0);
	    			if( nimagen==totalImagenes ) {
	    				setTimeout(function(){
	        				//alert( 'Se procesaron '+totalImagenes + " imagenes");
	    				},500)
	    			}
	    		};
	            // The most important point, use the readAsDatURL Method from the file plugin
	    		reader.readAsDataURL( file );
	    	});
	    }
	}
	
	/*
	 * Funciones para sacar foto
	 * plugin necesario : cordova-plugin-camera
	 */
	this.tomarFoto=function() {
		var cameraOptions = {
			quality:10,
			encodingType: Camera.EncodingType.JPEG
			//destinationType: Camera.DestinationType.DATA_URL
		    //mediaType: Camera.MediaType.PICTURE
		}
		navigator.camera.getPicture( this.cameraSuccess, this.cameraError, cameraOptions );
	}
	
	this.cameraSuccess=function( imageData ) {
		//cameraSuccess
		try {
			mObj.agregarFotoAGaleria( imageData, 0, 1 );	
		} catch ( jerror ) {
			alert( jerror.message );
		}
	}
	
	this.cameraError=function( message ) {
		alert('Failed because: ' + message);
	}
}