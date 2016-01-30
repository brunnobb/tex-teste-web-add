function DAOGetFuncionariosByType(filt){
		us = DAOGetFuncionarios();
		var funcionarioArray = Array();
		for (usu in us ){	
		    //nlog("tentando  " +us[usu].ID_LOGIN);	
		    if ((us[usu].CARGO==filt)){			
		    	funcionarioArray.push(us[usu]);
		    }
		}	
		return funcionarioArray;
}


function DAOGetFuncionarios(filt){
	if (typeDAO=="SS"){
		var storedFun = "";
		if (localStorage.funcionarios){
			storedFun = JSON.parse(localStorage.funcionarios);
		}	
		else
			storedFun= Array();
		//nlog(storedUsers);				
		if (filt){
			var funcionarioArray = Array();
			for (usu in storedFun){
				
				var name= storedFun[usu].NOME;
				var id =parseInt(storedFun[usu].ID);
				var indname= name.indexOf(filt);
				var indid= id.toString().indexOf(filt);
				//nlog("ind " +indname +" -  id " +indid + ' search:'+filt);
				if ((indname>=0)	|| (indid>=0)){
					//nlog("added " + storedUsers[usu].USUARIO +" -  id " +storedUsers[usu].ID_LOGIN);
					funcionarioArray.push(storedFun[usu]);	
				}
			}
			return funcionarioArray;
		}	
		
		return storedFun;  	
	}	
}	

function DAOReturnFuncionario(user_id){
	if (user_id){		
		us = DAOGetFuncionarios();
		for (usu in us ){	
		    //nlog("tentando  " +us[usu].ID_LOGIN);	
		    if ((us[usu].ID==user_id)){			
		    	return us[usu];
		    }
		}	
		return false;
	}
	else
		return false;
	
}

function DAOSaveFuncionarioArray(userArray){
	UserStr = JSON.stringify(userArray);
	localStorage.funcionarios= UserStr;
}


function DAODeleteFuncionario(id){
	if (typeDAO=="SS"){
		var sel=-1;
		nlog("tentadeletar " + id);
		if (parseInt(id)>0){		
			us = DAOGetFuncionarios();
			for (usu in us ){	

				if ((parseInt(us[usu].ID)===parseInt(id))){			
					sel = usu;
					nlog("selecionado para exclusao " + us[usu].ID);
				}
			}
			if (sel>=0){
				us = DAOGetFuncionarios('');
				nlog("indice " + sel);
				nlog(us);
				us.splice(parseInt(sel), 1);
				nlog(us);
				DAOSaveFuncionarioArray(us);
				return true;
			}	
			return false;
		}
		else
			return false;

	}

}


function DAOAddFuncionario(user){
	if (typeDAO=="SS"){
		us = DAOGetFuncionarios();			
		//alteracao
		if (user.ID){			
			DAODeleteFuncionario(user.ID);
			user.ID = parseInt(user.ID);			
			us.push(user);
			DAOSaveFuncionarioArray(us);
		}
		//insercao
		else{
			user.ID = getNextFuncionarioId();				
			us.push(user);
			DAOSaveFuncionarioArray(us);
		}


	}
}

function getNextFuncionarioId(){
	us = DAOGetFuncionarios();
	ind=0;
	for (usu in us ){	

		if ((us[usu].ID>ind)){			
			ind =parseInt(us[usu].ID);
		}
	}
	return ind+1;
}