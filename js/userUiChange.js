
function userLogin(){
	usu = $('#loginuser').val(); 
	pass = $('#pwduser').val(); 
	if (USERUserLogin(usu, pass)){
		checkForUserUI(1);		
	}
	else
		checkForUserUI(2); 	
	return false;


}

function checkForUserUI(UserMsg){
	var usera=getCurrentUser();
	if (USERLoginDone()){
		$('#loginform').hide();



		document.getElementById('username').value = ReturnUser(usera).USUARIO;
		nlog("Usuário " + sessionStorage.user + " entrou.")
		$('#userdataform').show(); 

		if  (ReturnUser(usera).PERMISSAO != "A"){
			$('#bt_usu').hide(); 
			$('#bt_fun').hide(); 
		}
		else{
			$('#bt_usu').show(); 
			$('#bt_fun').show(); 
		}

		backHome();
		if (UserMsg==1){
			$().toastmessage('showNoticeToast', 'Usuario ' + ReturnUser(usera).USUARIO + ' entrou' );
		}      
	}
	else{
		$('#userdataform').hide(); 
		$('#loginform').show();
		nlog("Usuário saiu.");
		if (UserMsg==1){
			$().toastmessage('showNoticeToast', ' Saída executada' );      
		}
		if (UserMsg==2){
			$().toastmessage('showErrorToast', ' Usuário Inválido ' );      
		}
		$('#container').html("<div class='well well-large'>Faça login para interagir.</div>"); 
	}
}



function abrirCadUsuarios(){
	if (!USERLoginDone()){
		$().toastmessage('showErrorToast', ' Usuário não Logado ');  		
		return;    
	}


	abrirPag('pgBuscaAlteracaoUsuario.html', 'container',function(){
		setTimeout(function() {
			showPleaseWait(function(){
				USERLoadForm();
				hidePleaseWait();
			});		
		}, 500);


	} );
	$('#pgTitle').html("Usuários");
}



function filterUserUI(){	
	showPleaseWait(function(){
		deleteTableRows();
		USERLoadForm($('#usuFilt').val());
		hidePleaseWait();
	});
	

}


function USERLoadForm(filt){
	SwapUserForm(0);
	var table=document.getElementById("userGrid");

	us = USERGetUsers(filt);
	for (usu in us ){
		var row=table.insertRow(-1);	
		var cell1=row.insertCell(0);
		var cell2=row.insertCell(1);
		var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		var cell6=row.insertCell(5);
		var cell7=row.insertCell(6);
		var cell8=row.insertCell(7);
		cell1.innerHTML=us[usu].ID_LOGIN;
		cell2.innerHTML=us[usu].ID_FUNCIONARIO;
		cell3.innerHTML=us[usu].USUARIO;
		cell4.innerHTML=us[usu].SENHA;		
		cell5.innerHTML=us[usu].PERMISSAO;
		cell4.className="hidden-xs";
		cell5.className="hidden-xs";
		cell6.innerHTML=us[usu].STATUS;
		cell7.innerHTML="<input type='button' class='btn btn-primary' value='Alterar' onClick='altUserUI(" + us[usu].ID_LOGIN+")' >";
		cell8.innerHTML="<input type='button' class='btn btn-primary' value='Excluir' onClick='excUserUI(" + us[usu].ID_LOGIN+")' >";		
	}	
}


function deleteTableRows(){
	var table=document.getElementById("userGrid");
	while (table.rows.length>2){
		table.deleteRow(-1);
	}

}


function excUserUI(id){
	if (USERGetUsers().length<=1){
		$().toastmessage('showErrorToast', 'Quantidade insuficiente de usuarios ' );      
		return;
	}
	if (!USERDeleteUser(id)){
		$().toastmessage('showErrorToast', 'Usuario nao Encontrado ' );      
		return;
	}
	else
	{
		filterUserUI();
	}
	
}

function altUserUI(id){
	SwapUserForm(1, id);

}

function addUserUI(){
	SwapUserForm(1);
}

function SwapUserForm(alt, id){
	if (alt){
		$('#altUserForm').show();
		$('#opUserForm').show();
		$('#filtUserForm').hide();
		$('#gridUserForm').hide();
		LoadUserData(id);

	}
	else{
		$('#altUserForm').hide();
		$('#opUserForm').hide();
		$('#filtUserForm').show();
		$('#gridUserForm').show();
		
	}

}


function cancelarUserUI(){
	SwapUserForm(0);
}


function salvarUserUI(){
	usu = new User(
		$('#userId').val(),
		$('#userFId').val(),
		$('#userName').val(),
		$('#userPwd').val(), 
		$('#userAdm').val(), 
		$('#userStatus').val()
		);
	//nlog(usu);
	
	showPleaseWait(function(){
		ClearUserForm();
		deleteTableRows();
		USERAddUser(usu);
		USERLoadForm();
		hidePleaseWait();
	});
	
}

function ClearUserForm(){
	$('#userId').val("");
	$('#userFId').val("0");
	$('#userName').val("");
	$('#userPwd').val(""); 
	$('#userAdm').val("A"); 
	$('#userStatus').val("A");
	ClearFunSelect();
}

function LoadUserData(id){
	us =  DAOReturnUser(id);
	
	$('#userId').val(us.ID_LOGIN);	
	$('#userName').val(us.USUARIO);
	$('#userPwd').val(us.SENHA); 
	$('#userAdm').val(us.PERMISSAO); 
	$('#userStatus').val(us.STATUS);	
	LoadFunSelect(us.ID_FUNCIONARIO);
	
	
}

function ClearFunSelect(){
	var sel=document.getElementById("userFId");
	while (sel.length>0){
		sel.remove(0);
	}


}

function LoadFunSelect(selind){
	var sel=document.getElementById("userFId");

	while (sel.options.length>0){
		sel.options.remove(0);	
	}

	us = FUNGetFuncionarios();
	for (usu in us ){

		var option=document.createElement("option");
		option.text=us[usu].NOME;
		option.value=us[usu].ID;
		if (parseInt(selind)===parseInt(us[usu].ID)){
			option.selected=true;
		}
		sel.options.add(option);	
	}

}	

