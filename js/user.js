function User(id_login, id_funcionario, usuario, senha, permissao, status)
{
	this.ID_LOGIN = parseInt(id_login);
	this.ID_FUNCIONARIO = id_funcionario;
	this.USUARIO = usuario;
	this.SENHA = senha;
	this.PERMISSAO = permissao;
	this.STATUS = status;
}



function USERGetUsers(filt){
	return DAOGetUsers(filt);
}

function getCurrentUser(){	
	return sessionStorage.user;
}


function userLogout(){
	sessionStorage.user='';
	checkForUserUI(1);
	return false;

}

function USERLoginDone(){	
	return DAOUserLoginDone();	
}

function ReturnUser(id){
	return DAOReturnUser(id);
}


function USERDeleteUser(id){
	return DAODeleteUser(id);
}

function USERUserLogin(usu, pass){
  return DAOUserLogin(usu, pass);
}

function USERAddUser(user){
  DAOAddUser(user);
}
