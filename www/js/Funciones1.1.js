class Funciones {
	
	static esperar( mensaje='Por favor espere..' ) {
		// En construccion
		if( $('#dmodalEspera').length) {
			$('#dmodalEspera').remove();
		}
		
		var jdivPpal = $('<div/>');
		jdivPpal.attr('id','dmodalEspera');			
		
		var jdivModal= $('<div/>');
		jdivModal.addClass('modal fade');
		jdivModal.attr('id','modalEspera2');
		jdivModal.attr('tabindex','-1');
		jdivModal.attr('role','modal');
		
		var jdivModalDialog=$('<div/>');
		jdivModalDialog.addClass("modal-dialog");
		
		var jdivModalContent=$('<div/>');
		jdivModalContent.addClass("modal-content");
		jdivModalContent.addClass('bg-dark text-white');
		
		var jdivModalHeader=$('<div/>');
		jdivModalHeader.addClass("modal-header");
		jdivModalHeader.html(`<h4 class='modal-title'><i class='fa fa-clock-o'></i>${mensaje}</h4>`);

		var jdivModalBody=$('<div/>');
		jdivModalBody.addClass("modal-body center-block");
		jdivModalBody.html("<span id='sbuscando'>"+mensaje+"</span>");
		
		jdivModalContent.append( jdivModalHeader );
		jdivModalContent.append( jdivModalBody );
		jdivModalDialog.append( jdivModalContent );
		jdivModal.append( jdivModalDialog );
		jdivPpal.append( jdivModal );
		$('body').append( jdivPpal );
		try {
			var myModal = new bootstrap.Modal(document.getElementById('modalEspera2'), {
				  keyboard: false
			})
			myModal.show();
		} catch(error) {
        
		}
	}
	
	static cerrarEspera() {
		setTimeout( function() {
				$("#modalEspera2").modal('hide');	
			},1000);
	}	
	
}