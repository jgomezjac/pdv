class GaleriaClass {
	idGaleria
	ColFotos;
	flgFotoDemo;
	idImagen;
	constructor( jidGaleria ) {
		this.idGaleria=jidGaleria;
		this.ColFotos=[];
		this.flgFotoDemo=2;
	}
	tomarFoto() {
		if(!DESDEMOVIL) {
			alert('Función no habilitada para web');
			this.simularFoto();
			return false;
		}
		
		let cameraOptions = {
			quality:10,
			encodingType: Camera.EncodingType.JPEG
			//destinationType: Camera.DestinationType.DATA_URL
		    //mediaType: Camera.MediaType.PICTURE
		}
		navigator.camera.getPicture( this.cameraSuccess, this.cameraError, cameraOptions );
	}

	tomarFotoDadoId( jid ) {
		this.idImagen=jid;
		if(!DESDEMOVIL) {
			alert('Función no habilitada para web');
			this.simularFoto();
			return false;
		}
		
		let cameraOptions = {
			quality:10,
			encodingType: Camera.EncodingType.JPEG
			//destinationType: Camera.DestinationType.DATA_URL
		    //mediaType: Camera.MediaType.PICTURE
		}
		navigator.camera.getPicture( this.cameraSuccess, this.cameraError, cameraOptions );
	}

	cameraSuccess( imageData ){
		getFileContentAsBase64( imageData );
	}
	cameraError( message ){
		alert('Error. Consulte al administrador');
	}
	agregarFotoAGaleria( imageData  ) {
		let jimg = document.createElement('img');
		jimg.classList.add('img-fluid');
		jimg.classList.add('img-thumbnail');
		jimg.src= imageData

		let idImagen= this.idImagen;
		if( idImagen ) {
			let imagen = document.getElementById(`img_${idImagen}`);
			imagen.src= imageData;
			console.log(`imagem ${idImagen}`);
		} else {
			let contenedor = document.getElementById(this.idGaleria);
			let colunn =  document.createElement('div');
			colunn.classList.add('col-lg-3');
			colunn.classList.add('col-md-4');
			colunn.classList.add('col-6');

			colunn.appendChild( jimg );
			contenedor.appendChild( colunn ) ;
		}

	}

	simularFoto() {
		/*
		Solo para testing web
		*/
		let mObj= this;
		let img = new Image();
	    let retornar='';
	    img.setAttribute('crossOrigin', 'anonymous');
		(this.flgFotoDemo==1) ? this.flgFotoDemo=2 : this.flgFotoDemo=1;
		img.src = `img/demo${this.flgFotoDemo}.jpg`;
	    img.onload = function () {
	        let canvas		= document.createElement("canvas");
	        canvas.width	= this.width;
	        canvas.height	= this.height;

	        let ctx = canvas.getContext("2d");
	        ctx.drawImage(this, 0, 0);

	        let dataURL = canvas.toDataURL("image/jpg");
	        retornar	= dataURL;//.replace(/^data:image\/(png|jpg);base64,/, "");
			mObj.agregarFotoAGaleria( retornar );
	    };
	}

	retornarArrayFotosSrc() {
		let galeria		= document.getElementById(`${this.idGaleria}`);
		let arrImagenes	= galeria.getElementsByTagName('img');
		let retornar=[];
		for( let n=0; n< arrImagenes.length; n++) {
			let unaImg= arrImagenes[n];
			//retornar.push( unaImg.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") );
			if( unaImg.src ) {
				retornar.push( unaImg.src );
			}
		}
		return retornar;
	}

	retornarJsonFotos() {
		let galeria		= document.getElementById(`${this.idGaleria}`);
		let arrImagenes	= galeria.getElementsByTagName('img');
		let retornar=[];
		for( let n=0; n< arrImagenes.length; n++) {
			let unaImg= arrImagenes[n];
			//retornar.push( unaImg.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") );
			if( unaImg.src ) {
				let imgJson = { id:unaImg.id, foto:unaImg.src };
				//retornar.push( unaImg.src );
				retornar.push( imgJson );
			}
		}
		return retornar;
	}

}

function getFileContentAsBase64( path ) {
	window.resolveLocalFileSystemURL(path, gotFile, fail);
	function fail(e) {
		alert('Cannot found requested file');
	}
	function gotFile(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {					
				var content = this.result;
				mGaleria.agregarFotoAGaleria( content );
			};
			// The most important point, use the readAsDatURL Method from the file plugin
			reader.readAsDataURL( file );
		});
	}
}