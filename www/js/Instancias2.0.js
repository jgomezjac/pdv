class Instancias {
	static arrInstancias=[];	
	static getInstancia( jidInstancia ) {
		let jretornar= null;
		for( let ni=0; ni< this.arrInstancias.length; ni++ ) {
			let jInstancia= this.arrInstancias[ni];
			if( jInstancia.id==jidInstancia ) {
				jretornar= jInstancia.instancia; break;
			}
		}
		
		if( jretornar==null ) {
			let rand =Math.random();
			switch( jidInstancia ) {
				case 'visita':
					loadScript('js/VisitaClass1.0.js?'+rand).then( carga => {
						let jretornar= new VisitaClass();
						jretornar.inicializar();
						Instancias.agregarInstancia(jidInstancia, jretornar)
					})
					break;
				case 'misVisitas':
					loadScript('js/MisVisitasClass1.0.js?'+rand).then( carga => {
						let jretornar= new MisVisitasClass();
						Instancias.agregarInstancia(jidInstancia, jretornar)
					})
					break;
			}
		} 
		return jretornar;
	}
	
	static agregarInstancia(jidInstancia, jInstancia) {
		this.arrInstancias.push({id:jidInstancia, instancia:jInstancia})
	}
}