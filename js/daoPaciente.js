


function DAOGetPacientes(filt){
	if (typeDAO=="SS"){
		var storedFun = "";
		if (localStorage.pacientes){
			storedFun = JSON.parse(localStorage.pacientes);
		}	
		else
			storedFun= Array();
		//nlog(storedUsers);				
		if (filt){
			var pacienteArray = Array();
			for (usu in storedFun){
				
				var name= storedFun[usu].NOME;
				var id =parseInt(storedFun[usu].ID);
				var indname= name.indexOf(filt);
				var indid= id.toString().indexOf(filt);
				//nlog("ind " +indname +" -  id " +indid + ' search:'+filt);
				if ((indname>=0)	|| (indid>=0)){
					//nlog("added " + storedUsers[usu].USUARIO +" -  id " +storedUsers[usu].ID_LOGIN);
					pacienteArray.push(storedFun[usu]);	
				}
			}
			return pacienteArray;
		}	
		
		return storedFun;  	
	}	
}	

function DAOReturnPaciente(user_id){
	if (user_id){		
		us = DAOGetPacientes();
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

function DAOSavePacienteArray(userArray){
	UserStr = JSON.stringify(userArray);
	localStorage.pacientes= UserStr;
}


function DAODeletePaciente(id){
	if (typeDAO=="SS"){
		var sel=-1;
		nlog("tentadeletar " + id);
		if (parseInt(id)>0){		
			us = DAOGetPacientes();
			for (usu in us ){	

				if ((parseInt(us[usu].ID)===parseInt(id))){			
					sel = usu;
					nlog("selecionado para exclusao " + us[usu].ID);
				}
			}
			if (sel>=0){
				us = DAOGetPacientes('');
				nlog("indice " + sel);
				nlog(us);
				us.splice(parseInt(sel), 1);
				nlog(us);
				DAOSavePacienteArray(us);
				return true;
			}	
			return false;
		}
		else
			return false;

	}

}


function DAOAddPaciente(user){
	if (typeDAO=="SS"){
		us = DAOGetPacientes();			
		//alteracao
		if (user.ID){			
			DAODeletePaciente(user.ID);
			user.ID = parseInt(user.ID);			
			us.push(user);
			DAOSavePacienteArray(us);
		}
		//insercao
		else{
			user.ID = getNextPacienteId();				
			us.push(user);
			DAOSavePacienteArray(us);
		}


	}
}

function getNextPacienteId(){
	us = DAOGetPacientes();
	ind=0;
	for (usu in us ){	

		if ((us[usu].ID>ind)){			
			ind =parseInt(us[usu].ID);
		}
	}
	return ind+1;
}