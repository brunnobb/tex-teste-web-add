
function abrirCadConsultas(med, dia, mes, ano, hora){
	if (!USERLoginDone()){
		$().toastmessage('showErrorToast', ' Usuário não Logado ');  		
		return;    
	}


	abrirPag('pgBuscaAlteracaoConsultas.html', 'container',function(){
		setTimeout(function() {

			showPleaseWait(function(){
				MontaComponentesConsulta();
				ConsultaLoadForm(parseInt(med),null, parseInt(dia), parseInt(mes), parseInt(ano), parseInt(hora));
				hidePleaseWait();
			});
		}, 500);
	} );
	$('#pgTitle').html("Consultas");
}

function MontaComponentesConsulta(){
	$('.datepicker').datepicker();
	LoadFormComponents();
	//CONLoadFunSelect(0);
	//CONLoadCliSelect(0);	
}

function LoadFormComponents(){
	
	var sel2=document.getElementById("conFiltMed");

	while (sel2.options.length>0){
		sel2.options.remove(0);	
	}

	us2 = DAOGetFuncionariosByType("Medico");
	var option2=document.createElement("option");
	option2.text="";
	option2.value=0;
	sel2.options.add(option2);	
	for (usu2 in us2 ){

		var option2=document.createElement("option");
		option2.text=us2[usu2].NOME;
		option2.value=us2[usu2].ID;		
		sel2.options.add(option2);	
	}

	var sel3 = document.getElementById("conFiltHor");
	while (sel3.options.length>0){
		sel3.options.remove(0);	
	}

	var option3=document.createElement("option");
	option3.text="";
	sel3.options.add(option3);

	for (hr in Horarios ){

		var option3=document.createElement("option");
		option3.text=Horarios[hr];
		option3.value=hr;		
		sel3.options.add(option3);	
	}

	var sel2=document.getElementById("conFiltPac");

	while (sel2.options.length>0){
		sel2.options.remove(0);	
	}

	us2 = PACGetPacientes();
	var option2=document.createElement("option");
	option2.text="";
	option2.value=0;
	sel2.options.add(option2);	
	for (usu2 in us2 ){

		var option2=document.createElement("option");
		option2.text=us2[usu2].NOME;
		option2.value=us2[usu2].ID;
		sel2.options.add(option2);	
	}
}


function filterConsultaUI(){
	deleteTableRowsConsultas();
	showPleaseWait(function(){	

		var d=0;
		var m=0;
		var a=0;	
		var dat = $('#conFiltDt').val(); 
		var md = $('#conFiltMed').val();
		var pc = $('#conFiltPac').val();
		var hr = $('#conFiltHor').val();

		
		if (dat){
			var parts = dat.split("/");
			d=parseInt(parts[0]);
			m=parseInt(parts[1]);
			a=parseInt(parts[2]);
		}


		md = parseInt(md);
		pc = parseInt(pc);
		d = parseInt(d);
		m = parseInt(m);
		a = parseInt(a);
		h =parseInt(hr);
		ConsultaLoadForm(md,pc, d, m, a, h);
		hidePleaseWait();
	});


}


function ConsultaLoadForm(med, pac, dia, mes, ano, hora){	
	SwapConsultaForm(0);	

	if (med){
		$('#conFiltMed').val(med);
	}

	if (pac){
		$('#conFiltPac').val(pac);
		
	}

	if (dia && mes && ano){
		$('#conFiltDt').val(dia+"/"+mes+"/"+ano); 
	}
	
	if (hora){
		$('#conFiltHor').val(hora);
	}


	var table=document.getElementById("consultaGrid");

	var us = CONGetConsultas(med, pac, dia, mes, ano, hora);
	for (var usu in us ){
		var row=table.insertRow(-1);	
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		var cell6=row.insertCell(5);
		var cell7=row.insertCell(6);
		var cell8=row.insertCell(7);
		cell1.innerHTML=us[usu].ID;
		cell4.innerHTML=us[usu].DES_DIA;
		cell5.innerHTML=us[usu].DES_HORARIO;				
		cell6.innerHTML=us[usu].DES_STATUS;				
		cell7.innerHTML="<input type='button' class='btn btn-primary' value='Alterar' onClick='altConsultaUI(" + us[usu].ID+")' >";
		cell8.innerHTML="<input type='button' class='btn btn-primary' value='Excluir' onClick='excConsultaUI(" + us[usu].ID+")' >";		
		var idc = us[usu].ID_CLIENTE
		var medico = DAOReturnFuncionario(us[usu].ID_FUN);
		cell2.innerHTML=medico.NOME;
		cell2.className="hidden-xs";
		var cli = DAOReturnPaciente(idc);
		cell3.innerHTML=cli.NOME;		
		cell3.className="hidden-xs";
	}	
}


function deleteTableRowsConsultas(){
	var table=document.getElementById("consultaGrid");
	while (table.rows.length>2){
		table.deleteRow(-1);
	}
}


function excConsultaUI(id){	
	if (!CONDeleteConsulta(id)){
		$().toastmessage('showErrorToast', 'Consulta nao Encontrado ' );      
		return;
	}
	else
	{
		filterConsultaUI();
	}

}

function altConsultaUI(id){
	SwapConsultaForm(1, id);
}

function addConsultaUI(){
	SwapConsultaForm(1);
}

function SwapConsultaForm(alt, id){
	if (alt){
		$('#altConsultaForm').show();
		$('#opConsultaForm').show();
		$('#filtConsultaForm').hide();
		$('#gridConsultaForm').hide();
		LoadConsultaData(id);

	}
	else{
		$('#altConsultaForm').hide();
		$('#opConsultaForm').hide();
		$('#filtConsultaForm').show();
		$('#gridConsultaForm').show();

	}

}


function cancelarConsultaUI(){
	SwapConsultaForm(0);
}


function salvarConsultaUI(){
	dat = $('#consultaDt').val(); 
	var parts = dat.split("/");
	var d=parts[0];
	var m=parts[1];
	var a=parts[2];


	usu = new Consulta(
		$('#consultaId').val(),
		$('#consultaMed').val(),
		$('#consultaCli').val(), 
		d, 
		m, 
		a, 
		$('#consultaHr').val(),
		$('#consultaSt').val()		
		);
	//nlog(usu);
	ClearConsultaForm();
	deleteTableRowsConsultas();
	CONAddConsulta(usu);	
	filterConsultaUI();
	/*showPleaseWait(function(){
		ConsultaLoadForm();
		hidePleaseWait();
	});*/

	
}

function ClearConsultaForm(){
	$('#consultaId').val("");
	$('#consultaMed').val("");
	$('#consultaCli').val(""); 
	$('#consultaDt').val("01/01/2013"); 
	$('#consultaHr').val("");
	$('#consultaSt').val(""); 
}


function LoadConsultaData(id){
	us =  DAOReturnConsulta(id);
	$('#consultaId').val(us.ID);
	$('#consultaMed').val(us.ID_FUN);
	$('#consultaCli').val(us.ID_CLIENTE); 
	$('#consultaDt').val(us.DES_DIA); 	
	$('#consultaHr').val(us.HORA);
	$('#consultaSt').val(us.ST); 	
	CONLoadHrSelect(us.HORA);
	CONLoadFunSelect(us.ID_FUN);
	CONLoadCliSelect(us.ID_CLIENTE);	
	
	

}


function CONLoadFunSelect(selind){
	var sel=document.getElementById("consultaMed");

	while (sel.options.length>0){
		sel.options.remove(0);	
	}


	us1 = DAOGetFuncionariosByType("Medico");
	for (usu in us1 ){

		var option=document.createElement("option");
		option.text=us1[usu].NOME;
		option.value=us1[usu].ID;
		if (parseInt(selind)===parseInt(us1[usu].ID)){
			option.selected=true;
		}
		sel.options.add(option);	
	}


}	



function CONLoadCliSelect(selind){
	var sel=document.getElementById("consultaCli");

	while (sel.options.length>0){
		sel.options.remove(0);	
	}

	us1 = PACGetPacientes();
	for (usu in us1 ){

		var option=document.createElement("option");
		option.text=us1[usu].NOME;
		option.value=us1[usu].ID;
		if (parseInt(selind)===parseInt(us1[usu].ID)){
			option.selected=true;
		}
		sel.options.add(option);	
	}
	
}	


function CONLoadHrSelect(selind){
	var sel=document.getElementById("consultaHr");

	while (sel.options.length>0){
		sel.options.remove(0);	
	}


	
	for (var i = 0; i <Horarios.length - 1; i++) {
		
		var option=document.createElement("option");
		option.text=Horarios[i];
		option.value=i;		
		if (parseInt(selind)===parseInt(i)){
			option.selected=true;
		}
		sel.options.add(option);	

	};
}	
