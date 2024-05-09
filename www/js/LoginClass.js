class LoginClass {
	usr;
	acc;
	urlServicios;
	nombreApp;
	enProceso;
	
	constructor() {
		this.usr='';
		this.acc='';
	}
	
	setUrlServicios(jset) {
		this.urlServicios=jset;
	}
	setNombreApp( jset ) {
		this.nombreApp=jset;
	}
	login() {
		if(this.enProceso) return false;
		let jid		= document.getElementById('identificador').value;
		let jpass	= document.getElementById('icontra').value;
		
		if(jid=='' || jpass=='') {
			alert('Debe ingresar email/login y contraseña');
			return false;
		}

		Funciones.esperar();
		this.enProceso=true;
		let term	= "&email="+jid;
		term	+= "&pass="+ jpass;
		term	+= "&pversion=4.0";
		term	+= "&pnoenc=1";
		term	+= "&pnombreApp="+this.nombreApp;
		
		let jurlServicio	= this.urlServicios+`/slogin.php?${term}`;
        let fetchRes		= fetch(jurlServicio)
		fetchRes
			.then(
				res => res.json()
			).then(
				datos => {
					this.enProceso=false
					if( datos.error> 0 ) {
						alert( datos.mensaje ); 
					} else {
						document.location.href='#!menu' 
					}
					Funciones.cerrarEspera();
	       		}
	    	).catch( err => {
					this.enProceso=false
					alert( err );
					Funciones.cerrarEspera();
				}
			)
		this.enProceso=false;
	}
}