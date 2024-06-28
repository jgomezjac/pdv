class MisVisitasClass {
	constructor() {
		this.inicializar();
		this.ColMisCalificaciones=[];
	}
	
	inicializar() {
		this.retornarMisVisitas();
	}

	retornarMisVisitas() {
		Funciones.esperar();
		let term= "&sid="+ mLogin.getSid();
		term 	+= "&acc="+ mLogin.getAcc();
		
		let jurlServicio	= retornarUrlServicios()+"/sretornarMisCalificaciones.php?"+term;
        let fetchRes		= fetch(jurlServicio)
		fetchRes.then(
			res => res.json()
			).then(datos => {
				if( datos.error> 0 ) {
					alert( datos.mensaje ); 
				} else {
					this.ColMisCalificaciones=datos.calificaciones;
					this.imprimirCalificaciones();
				}
	       	}
	    ).catch(
		).finally(
			Funciones.cerrarEspera()
		)
	}

	imprimirCalificaciones() {
		let ulMisVisitas = document.getElementById('umisVisitas');
		ulMisVisitas.innerHTML='';
		this.ColMisCalificaciones.forEach( Calif => {
			//<li class="list-group-item">An item</li>
			let linea= document.createElement('li');
			linea.classList.add('list-group-item');
			linea.classList.add('list-group-item-dark');

			linea.innerHTML= `${Calif.toString} <p>${Calif.fecha} ${Calif.hora}</p>`;

			ulMisVisitas.appendChild( linea );
		})
	}
}
