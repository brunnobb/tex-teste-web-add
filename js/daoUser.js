
function DAOUserLogin(user, pwd){
	if (typeDAO=="SS"){
		us = DAOGetUsers();
		for (usu in us ){
		//nlog("tent " + us[usu].login + "-" + us[usu].pwd)
		if ((us[usu].USUARIO==user)&&(us[usu].SENHA==pwd)){
			sessionStorage.user=parseInt(us[usu].ID_LOGIN);
			return true;
		}
	}	
	return false;
}
}

function DAOUserLoginDone(){
	if (typeDAO=="SS"){
		return ((sessionStorage.user) && (sessionStorage.user!=""));
	}
}



function DAOGetUsers(filt){
	if (typeDAO=="SS"){
		var storedUsers = "";
		if (localStorage.users){
			storedUsers = JSON.parse(localStorage.users);
		}
		if ((!storedUsers) || (storedUsers.length==0)){
			CreateDefaultUser();
			storedUsers = JSON.parse(localStorage.users);
		}
		//nlog(storedUsers);				
		if (filt){
			var userArray = Array();
			for (usu in storedUsers){
				
				var name= storedUsers[usu].USUARIO;
				var id = parseInt(storedUsers[usu].ID_LOGIN);
				var indname= name.indexOf(filt);
				var indid= id.toString().indexOf(filt);
				//nlog("ind " +indname +" -  id " +indid + ' search:'+filt);
				if ((indname>=0)	|| (indid>=0)){
					//nlog("added " + storedUsers[usu].USUARIO +" -  id " +storedUsers[usu].ID_LOGIN);
					userArray.push(storedUsers[usu]);	
				}
			}
			return userArray;
		}	
		
		return storedUsers;  	
	}	
}	

function CreateDefaultUser(){
	if (typeDAO=="SS"){
		var nUser = new  User(1,0,"adm","123", "A", "A");
		var nUser1 = new  User(2,0,"adm1","123", "A", "A");
		var nUser2 = new  User(3,0,"adm2","123", "A", "A");

		var userArray = Array();
		userArray.push(nUser);
		userArray.push(nUser1);
		userArray.push(nUser2);
		DAOSaveUserArray(userArray);		
	}
}

function DAOReturnUser(user_id){
	if (user_id){		
		us = DAOGetUsers();
		for (usu in us ){	
		    //nlog("tentando  " +us[usu].ID_LOGIN);	

		    if ((us[usu].ID_LOGIN== parseInt(user_id))){			
		    	return us[usu];
		    }
		}	
		return false;
	}
	else
		return false;
	
}

function DAOSaveUserArray(userArray){
	UserStr = JSON.stringify(userArray);
	localStorage.users= UserStr;
}


function DAODeleteUser(id){
	if (typeDAO=="SS"){
		var sel=-1;
		nlog("tentadeletar " + id);
		if (parseInt(id)>0){		
			us = DAOGetUsers();
			for (usu in us ){	
                //nlog("comparando " + us[usu].ID_LOGIN " com ");
				if ((parseInt(us[usu].ID_LOGIN)===parseInt(id))){			
					sel = usu;
					nlog("selecionado para exclusao " + us[usu].ID_LOGIN);
				}
			}
			if (sel>=0){
				us = DAOGetUsers('');
				nlog("indice " + sel);
				nlog(us);
				us.splice(parseInt(sel), 1);
				nlog(us);
				DAOSaveUserArray(us);
				return true;
			}	
			return false;
		}
		else
			return false;

	}

}


function DAOAddUser(user){
	if (typeDAO=="SS"){
		us = DAOGetUsers();
		//alteracao
		if (user.ID_LOGIN){			
			DAODeleteUser(user.ID_LOGIN);
			user.ID_LOGIN = parseInt(user.ID_LOGIN);			
			us.push(user);
			DAOSaveUserArray(us);
		}
		//insercao
		else{
			user.ID_LOGIN = parseInt(getNextUserId());
			us.push(user);
			DAOSaveUserArray(us);
		}

		

		
	}
}

function getNextUserId(){
	us = DAOGetUsers();
	ind=0;
	for (usu in us ){	

		if ((us[usu].ID_LOGIN>ind)){			
			ind =parseInt(us[usu].ID_LOGIN);
		}
	}
	return ind+1;
}