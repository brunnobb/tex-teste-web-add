
function abrirCadFuncionarios(){
	if (!USERLoginDone()){
		$().toastmessage('showErrorToast', ' Usuário não Logado ');  		
		return;    
	}


	abrirPag('pgBuscaAlteracaoFuncionarios.html', 'container',function(){
		setTimeout(function() {

			showPleaseWait(function(){

				FuncionarioLoadForm();
				hidePleaseWait();
			});
		}, 500);
	} );
	$('#pgTitle').html("Funcionários");
}





function filterFuncionarioUI(){
	deleteTableRowsFuncionarios();

	showPleaseWait(function(){
				
				FuncionarioLoadForm($('#funFilt').val());
				hidePleaseWait();
			});
	

}


function FuncionarioLoadForm(filt){
	SwapFuncionarioForm(0);
	var table=document.getElementById("funcionarioGrid");

	us = FUNGetFuncionarios(filt);
	for (usu in us ){
		var row=table.insertRow(-1);	
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		var cell6=row.insertCell(5);
		var cell7=row.insertCell(6);
		cell1.innerHTML=us[usu].ID;
		cell2.innerHTML=us[usu].NOME;
		cell3.innerHTML=us[usu].TEL_RES;
		cell3.className="hidden-xs";
		cell4.innerHTML=us[usu].TEL_CEL;
		cell5.innerHTML=us[usu].EMAIL;		
		cell5.className="hidden-xs";
		cell6.innerHTML="<input type='button' class='btn btn-primary' value='Alterar' onClick='altFuncionarioUI(" + us[usu].ID+")' >";
		cell7.innerHTML="<input type='button' class='btn btn-primary' value='Excluir' onClick='excFuncionarioUI(" + us[usu].ID+")' >";		
	}	
}


function deleteTableRowsFuncionarios(){
	var table=document.getElementById("funcionarioGrid");
	while (table.rows.length>2){
		table.deleteRow(-1);
	}

}


function excFuncionarioUI(id){
	
	if (!FUNDeleteFuncionario(id)){
		$().toastmessage('showErrorToast', 'Funcionario nao Encontrado ' );      
		return;
	}
	else
	{
		filterFuncionarioUI();
	}
	
}

function altFuncionarioUI(id){
	SwapFuncionarioForm(1, id);
}

function addFuncionarioUI(){
	SwapFuncionarioForm(1);
}

function SwapFuncionarioForm(alt, id){
	if (alt){
		$('#altFuncionarioForm').show();
		$('#opFuncionarioForm').show();
		$('#filtFuncionarioForm').hide();
		$('#gridFuncionarioForm').hide();
		LoadFuncionarioData(id);

	}
	else{
		$('#altFuncionarioForm').hide();
		$('#opFuncionarioForm').hide();
		$('#filtFuncionarioForm').show();
		$('#gridFuncionarioForm').show();
		
	}

}


function cancelarFuncionarioUI(){
	SwapFuncionarioForm(0);
}


function salvarFuncionarioUI(){
	usu = new Funcionario(
		$('#funcionarioId').val(),
		$('#funcionarioNome').val(),
		$('#funcionarioNasc').val(), 
		$('#funcionarioEscol').val(), 
		$('#funcionarioRg').val(),
		$('#funcionarioCpf').val(), 
		$('#funcionarioTelres').val(), 
		$('#funcionarioTelcel').val(), 
		$('#funcionarioRemun').val(), 
		$('#funcionarioEmail').val(), 
		$('#funcionarioAdmiss').val(), 
		$('#funcionarioCargo').val(), 
		$('#funcionarioRua').val(), 
		$('#funcionarioNr').val(), 
		$('#funcionarioBairro').val(), 
		$('#funcionarioCompl').val(), 
		$('#funcionarioCep').val()
		);
	//nlog(usu);
	ClearFuncionarioForm();
	deleteTableRowsFuncionarios();
	FUNAddFuncionario(usu);
	showPleaseWait(function(){
				
				FuncionarioLoadForm();
				hidePleaseWait();
			});

	
}

function ClearFuncionarioForm(){
	$('#funcionarioId').val("");
	$('#funcionarioNome').val("");
	$('#funcionarioNasc').val(""); 
	$('#funcionarioEscol').val(""); 
	$('#funcionarioRg').val("");
	$('#funcionarioCpf').val(""); 
	$('#funcionarioTelres').val(""); 
	$('#funcionarioTelcel').val(""); 
	$('#funcionarioRemun').val(""); 
	$('#funcionarioEmail').val(""); 
	$('#funcionarioAdmiss').val("");
	$('#funcionarioCargo').val("");
	$('#funcionarioRua').val(""); 
	$('#funcionarioBairro').val(""); 
	$('#funcionarioNr').val(""); 
	$('#funcionarioCompl').val("");
	$('#funcionarioCep').val("");
}


function LoadFuncionarioData(id){
	us =  DAOReturnFuncionario(id);
	$('#funcionarioId').val(us.ID);
	$('#funcionarioNome').val(us.NOME);
	$('#funcionarioNasc').val(us.NASC); 
	$('#funcionarioEscol').val(us.ESCOL); 
	$('#funcionarioRg').val(us.RG);
	$('#funcionarioCpf').val(us.CPF); 
	$('#funcionarioTelres').val(us.TEL_RES); 
	$('#funcionarioTelcel').val(us.TEL_CEL); 
	$('#funcionarioRemun').val(us.REMUN); 
	$('#funcionarioEmail').val(us.EMAIL); 
	$('#funcionarioAdmiss').val(us.ADMISS);
	$('#funcionarioCargo').val(us.CARGO);
	$('#funcionarioRua').val(us.END_RUA); 
	$('#funcionarioNr').val(us.END_NR); 
	$('#funcionarioBairro').val(us.END_BAIRRO); 
	$('#funcionarioCompl').val(us.END_COMPL);
	$('#funcionarioCep').val(us.END_CEP);
	
	
}