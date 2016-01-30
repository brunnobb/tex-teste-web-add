


var typeDAO="SS";
var pleaseWaitDiv = $('<div class="modal fade" id="loading" tabindex="-1" role="dialog" aria-labelledby="Loading" aria-hidden="true"  data-backdrop="static" data-keyboard="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">Carregando... <div class="progress progress-striped active"><div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div></div></div></div>');

function abrirPag(valor, iddiv, funca, funca2){
	$.ajax({
		  //type: "GET",
		  url: valor,
		  cache: false,
		  success: function(html){
		  	document.getElementById(iddiv).innerHTML = html;
		  	if (funca!=null){
		  		funca();
		  	}
		  	if (funca2!=null){
		  		funca2();
		  	}

		  }
		});	
}



function nlog(texto){
	if (console){
		console.log(texto);	
	}	 
}

function showPleaseWait(funca) {
	pleaseWaitDiv.modal();
	setTimeout(function() {funca();}, 500);

}


function hidePleaseWait() {
	pleaseWaitDiv.modal('hide');
}