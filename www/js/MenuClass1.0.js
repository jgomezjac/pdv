class MenuClass {

	constructor() {

	}
	irA( jdestino) {
		let jlink = '';
		jlink=`#!${jdestino}`
		/*switch( jdestino ) 
		{
			case "registrarVisita":
				jlink='#!registrarVisita'
				break;
			default:
				jlink=`#!${jdestino}`
				break;
		}*/
		setTimeout(function(){
			document.location.href=jlink;
		},500);
	}
	
}