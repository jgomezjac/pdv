class MenuClass {

	constructor() {

	}
	irA( jdestino) {
		switch( jdestino ) 
		{
			case "registrarVisita":
				document.location.href='#!registrarVisita'
				break;
			default:
				document.location.href=`#!${jdestino}`
				break;
		}
	}
	
}