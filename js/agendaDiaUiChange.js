
function abrirAgendaDia(med, dia, mes, ano){
	if (!USERLoginDone()){
		$().toastmessage('showErrorToast', ' Usuário não Logado ');  		
		return;    
	}


	abrirPag('pgAgendaDia.html', 'container',function(){
		setTimeout(function() {

			showPleaseWait(function(){

				agendaDiaLoadForm(med, dia, mes, ano);
				hidePleaseWait();
			});
		}, 500);
	} );
	$('#pgTitle').html("Agenda do Dia");
}


function agendaDiaLoadForm(med, dia, mes, ano){


	
	var txt ="";
	md = ReturnFuncionario(med);
	//nlog(md);
	txt =  txt + "<div class='row'> ";
	txt =  txt + "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
	txt =  txt + "<div class='well well-large'>";
	txt =  txt + "<center><b>" + md.NOME + "</b><br/> " + dia+"/"+mes+"/"+ano+ "</center>";
	txt =  txt + "</div></div></div>";


	var cont = 0;

	for (var i =0; i < Horarios.length; i++) {
		
		if (cont==0){
			txt =  txt + "<div class='row'>";
		}

		com = agTemConsulta(med, dia, mes, ano, i);
		if (com)
			tp="btn-danger";		
		else
			tp="btn-success";


		txt =  txt + "<div class='col-lg-4 col-md-4 col-sm-4 col-xs-12'>";
		txt =  txt + "<div class='well well-large'>";
		txt =  txt + "<center>";		
		vlBotao = Horarios[i]+ '<br/>' +  com.substring(0,12)+"...";
		txt =  txt + "<div class='btn " + tp + " btn-block' onClick='marcarHora(" +med+","+dia+","+mes+","+ano+","+i+")'>"+vlBotao+"</div>";
		txt =  txt + "</center>";
		txt =  txt + "</div>";
		txt =  txt + "</div>";

		

		if (cont==2){
			txt =  txt + "</div>";
			cont=0;
		}
		else
			cont++;

	};


	$("#agendaDia").html(txt);

}

function marcarHora(med, dia, mes, ano, hora){
	abrirCadConsultas(med, dia, mes, ano, hora);
}