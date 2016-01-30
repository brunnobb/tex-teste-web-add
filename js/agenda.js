var mes=-1;
var ano=-1;


function nextMonth(){
	mes = mes + 1;
	if (mes==12) {
		ano++;
		mes=0;
	}
	//nlog(mes + " " + ano);
	LoadAgenda()
}


function backMonth(){
	mes = mes - 1;
	if (mes==-1) {
		ano--;
		mes=11;
	}
	//nlog(mes + " " + ano);
	LoadAgenda()

}



function LoadAgenda(){

	var d = new Date();

	if ((mes>-1) &&(ano>-1))
		d = new Date(ano, mes);	
	var day = d.getDate();
	var year = d.getFullYear();
	var month = d.getMonth();
	$('#mesAt').val((month+1) + " / " + year);
	$('#mesAtf').val((month+1) + " / " + year);
	mes=month;
	ano=year;

	LoadDays();
}

function isValidDate(s) {
	var day = s.getDate();	
	var year = s.getFullYear();
	var month = s.getMonth();

	if ((year==ano)&&(month==mes))
		return true;	
	else
		return false;
}



function LoadDays(){
	showPleaseWait(function(){

		var medicos = DAOGetFuncionariosByType("Medico");
		for (var i = 1; i <= 31; i++) {
			name = "#dia"+i;

			var di = new Date(ano, mes, i);
			if (isValidDate(di)){

				$(name).show();
				atu = new Date();
				$(name).removeClass( "diaPassado" );		
				if (di.getTime() < atu.getTime())
				{

					if (di.getDate() < atu.getDate())
					{
						$(name).addClass( "diaPassado" );	

					}
					if (di.getFullYear() < atu.getFullYear())
					{
						$(name).addClass( "diaPassado" );	

					}
					if (di.getMonth() < atu.getMonth())
					{
						$(name).addClass( "diaPassado" );	

					}
				}

				

				txt = "<center><span class='label label-primary btn-block'>Dia " + i  + "/" + (mes+1) + "</span></center>";
				txt = txt +  "<table width='100%'>";
				for (usuc in medicos ){		
					com = agComoEstaDia(medicos[usuc].ID, i,  (mes+1), ano);	
					var tp ="";		
					switch(com)
					{
						case 1:{
							tp="btn-success";
							break;
						}

						case 2:{
							tp="btn-info";
							break;
						}

						case 3:{
							tp="btn-danger";
							break;	
						}						
					}
					txt = txt + "<tr><td><center><input type='button' class='btn " + tp + " btn-block' onClick='abrirAgendaDia(" + medicos[usuc].ID +"," + i+"," +(mes+1) +"," + ano+ ")' value='";
					txt = txt + medicos[usuc].NOME.substring(0,12)+"...";
					txt = txt + "'></center></td></tr>";
				}
				txt = txt +  "</table>";
				$(name).html(txt);
			}
			else{

				$(name).hide();
				$(name).html("");
			}
		}
		hidePleaseWait();
	});	
}
