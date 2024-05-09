class VisitaClass {
	usr;
	acc;
	ColGrupos;
	ColLocales;
	ColCategFotos;
	idGrupoSeleccionado;
	calificacion;
	
	constructor() {
		this.ColGrupos=[];
		this.ColCategFotos=[];
		this.ColLocales=[];
		this.calificacion=0;
	}
	
	setIdGrupoSeleccionado(jset){
		this.idGrupoSeleccionado=jset;
	}
	setCalificacion(jset){
		this.calificacion=jset;
	}
	
	inicializar() {
		Funciones.esperar();
		let term= "&usr="+this.usr;
		term 	+= "&acc="+ this.acc;
		
		let jurlServicio	= retornarUrlServicios()+"/sinicializar.php?"+term;
        let fetchRes		= fetch(jurlServicio)
		fetchRes.then(
			res => res.json()
			).then(datos => {
				if( datos.error> 0 ) {
					alert( datos.mensaje ); 
				} else {
					this.ColGrupos=datos.grupos;
					this.ColCategFotos=datos.categorias;
					this.imprimirComboGrupos();
					this.imprimirCategoriasFotos();
				}
	       	}
	    ).catch(	
		).finally(
			Funciones.cerrarEspera()
		)
	}
	imprimirCategoriasFotos() {
		let dcategfotos = document.querySelector('#dgaleria');
		this.ColCategFotos.map( CategFoto => {
			let desc = CategFoto.descripcion;
			let id	 = CategFoto.id;

			

			let categhtml = document.createElement('div');
			categhtml.classList.add('col-md-4');
			categhtml.classList.add('col-sm-12');
			categhtml.classList.add('mb-2');
			
			let card	  	= document.createElement('div');
			card.classList.add( 'card');
			card.classList.add( 'bg-secondary');
			
			let img		  = document.createElement('img');
			img.setAttribute('id',`img_${id}`);
			img.classList.add( 'card-img-top' );
			img.classList.add( 'card-img-top' );
			//img.src='img/demo1.jpg';
			

			let cardHeader	= document.createElement('div');
			cardHeader.classList.add( 'card-header');

			let cardBody	= document.createElement('div');
			cardBody.classList.add( 'card-body');
			cardBody.appendChild( img );

			let titulo = document.createElement('h4');
			titulo.classList.add('card-title');
			titulo.innerHTML=desc;
			cardHeader.appendChild( titulo );
			card.append( cardHeader );

			let button = document.createElement('span');
			button.classList.add('btn');
			button.classList.add('btn-success');
			button.classList.add('float-end');
			button.addEventListener('click', function() {
				//console.log(`dynamic elements ${id}`)
				mGaleria.tomarFotoDadoId(id);
			});
			button.innerHTML=`<i class='fa fa-camera'></i>&nbsp;Foto`;

			let cardFooter	= document.createElement('div');
			cardFooter.classList.add( 'card-footer');
			cardFooter.appendChild( button );

			card.append( cardBody );
			card.append( cardFooter );
			categhtml.appendChild( card );
			//button.innerHTML=`<span class='btn btn-success float-end' onClick="mGaleria.tomarFoto()"><i class='fa fa-camera'></i>&nbsp;Foto</span>`;;
			//categhtml.innerHTML= 
			dcategfotos.appendChild( categhtml );
		})
	}
	imprimirComboGrupos() {
		let comboGrupos = document.getElementById('igrupo');
		comboGrupos.innerHTML='';
		
		let joption= document.createElement('option');
			joption.value= '0';
			joption.text = '---------';
			comboGrupos.appendChild( joption );
			
		this.ColGrupos.map ( UnGrupo => {
			let joption= document.createElement('option');
			joption.value= UnGrupo.id;
			joption.text= UnGrupo.nombre;
			comboGrupos.appendChild( joption );
		})
		
		let mObj= this;
		comboGrupos.addEventListener("change", function(){
			mObj.setIdGrupoSeleccionado( this.value );
			mObj.retornarLocales();
		}); 
	}
	
	retornarLocales() {

		Funciones.esperar();
		let term= "&usr="+this.usr;
		term 	+= "&acc="+ this.acc;
		term 	+= "&pidGrupo="+ this.idGrupoSeleccionado;
		
		let jurlServicio	= retornarUrlServicios()+"/sretornarLocales.php?"+term;
        let fetchRes		= fetch(jurlServicio)
		fetchRes.then(
			res => res.json()
			).then(datos => {
				if( datos.error> 0 ) {
					alert( datos.mensaje ); 
				} else {
					this.ColLocales=datos.locales;
					this.imprimirComboLocales();
				}
	       	}
	    ).catch(
		).finally(
			Funciones.cerrarEspera()
		)
		
	}
	
	imprimirComboLocales() {
		let combo = document.getElementById('ilocal');
		combo.innerHTML='';
		
		let joption= document.createElement('option');
			joption.value= '0';
			joption.text = '---------';
			combo.appendChild( joption );
			
		this.ColLocales.map ( UnLocal => {
			let joption= document.createElement('option');
			joption.value= UnLocal.id;
			joption.text= UnLocal.nombre;
			combo.appendChild( joption );
		})
	}
	
	enviar() {
		let local = document.getElementById('ilocal').value;
		let grupo = document.getElementById('igrupo').value;
		let obs	  = document.getElementById('iobservacion').value;
		let rating			= document.querySelector('.rating');
		let mchildren		= rating.children;
		let calificacion	= 0;
		for( let n=0; n< mchildren.length; n++) {
			let span = mchildren[n];
			if( span.classList.contains('checked')) {
				calificacion=n+1;
			}
		}

		
		let cantFotosRequeridas= this.ColCategFotos.length;
		let arrFotos= mGaleria.retornarJsonFotos();
		if( arrFotos.length<cantFotosRequeridas ) {
			alert(`Debe ingresar las ${cantFotosRequeridas} foto/s`); return false;
		}
		if(grupo==0) { 
			alert('Debe seleccionar el grupo'); document.getElementById('igrupo').focus(); return false;
		}
		if(local==0) { 
			alert('Debe seleccionar el local'); document.getElementById('ilocal').focus(); return false;
		}
		if(calificacion==0) {
			alert('Debe calificar el local');  return false;
		}
		
		let slat	= document.getElementById('slatitud').innerHTML;
		let slong	= document.getElementById('slongitud').innerHTML;
		let lat		= 0;
		let long	= 0;
		if( slat!='error') {
			lat		= slat;
			long	= slong;
		}
		Funciones.esperar();

		let term= "&usr="+this.usr;
		term 	+= "&acc="+ this.acc;
		term 	+= "&pidGrupo="+ grupo;
		term 	+= "&pidLocal="+ local;
		term 	+= "&pcalif="+ calificacion;
		
		let jurlServicio	= retornarUrlServicios()+"/sguardarCalificacion.php?"+term;
        let fetchRes		= fetch(jurlServicio,{ 
			method: 'POST',
			headers : { 
				"Content-Type":"application/json"
			},
			body: JSON.stringify([{fotos:arrFotos, observacion:obs, latitud:lat, longitud:long }])
		}).then(
			res => res.json()
			).then(datos => {
				if( datos.error> 0 ) {
					alert( datos.mensaje ); 
				} else {
					Swal.fire("Se ha guardardo la calificación");
					mMenu.irA('menu')
				}
	       	}
	    ).catch(
		).finally(
			Funciones.cerrarEspera()
		)
		
	}

	static tomarFoto() {
		if( mVisita==null ) {
			mVisita = Instancias.getInstancia('visita');
		}
		if(!DESDEMOVIL) {
			alert('Función no habilitada para web');
			return false;
		}
		
		let cameraOptions = {
			quality:20,
			encodingType: Camera.EncodingType.JPEG
			//destinationType: Camera.DestinationType.DATA_URL
		    //mediaType: Camera.MediaType.PICTURE
		}
		navigator.camera.getPicture( VisitaClass.cameraSuccess, VisitaClass.cameraError, cameraOptions );
	}
	static cameraSuccess( imageData ){
		mVisita.agregarFotoAGaleria( imageData );
	}
	static cameraError( message ){

	}

}
