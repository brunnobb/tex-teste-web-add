var Horarios=[
"9:00",
"9:30",
"10:00",
"10:30",
"11:00",
"11:30",
"13:00",
"13:30",
"14:00",
"14:30",
"15:00",
"15:30",
"16:00",
"16:30"];


function DAOGetConsultas(md, pci, d, m, a, h){
	if (typeDAO=="SS"){
		var storedFun = "";
		if (localStorage.consultas){
			storedFun = JSON.parse(localStorage.consultas);
		}	
		else
			storedFun= Array();
	
		if (md || pci || d || m || a || (parseInt(h)>=0)){		
			var consultaArray = Array();
			for (usu in storedFun){

				var leva = true;
				
				if (md && md>0){
					if (storedFun[usu].ID_FUN!=md)
						leva = false;
				}

				if (pci && pci>0){
					if (storedFun[usu].ID_CLIENTE!=pci)
						leva = false;
				}

				if (( d && m && a)&&((d>0) && (m>0) && (a>0))){
					if (!((storedFun[usu].DIA==d)&&(storedFun[usu].MES==m)&&(storedFun[usu].ANO==a)))
						leva = false;						
				}

				if (parseInt(h)>=0){
					if (storedFun[usu].HORA!=h)
						leva = false;
				}


				if (leva){
					consultaArray.push(storedFun[usu]);	
				}				
			}
			return consultaArray;
		}			
		return storedFun;  	

	}	
}	

function DAOReturnConsulta(user_id){
	if (user_id){		
		us = DAOGetConsultas();
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

function DAOSaveConsultaArray(userArray){
	UserStr = JSON.stringify(userArray);
	localStorage.consultas= UserStr;
}


function DAODeleteConsulta(id){
	if (typeDAO=="SS"){
		var sel=-1;
		nlog("tentadeletar " + id);
		if (parseInt(id)>0){		
			us = DAOGetConsultas();
			for (usu in us ){	
				if ((parseInt(us[usu].ID)===parseInt(id))){			
					sel = usu;
					nlog("selecionado para exclusao " + us[usu].ID);
				}
			}
			if (sel>=0){
				us = DAOGetConsultas('');
				nlog("indice " + sel);
				nlog(us);
				us.splice(parseInt(sel), 1);
				nlog(us);
				DAOSaveConsultaArray(us);
				return true;
			}	
			return false;
		}
		else
			return false;

	}

}


function DAOAddConsulta(user){
	if (typeDAO=="SS"){
		us = DAOGetConsultas();			
		//alteracao
		if (user.ID){			
			DAODeleteConsulta(user.ID);
			user.ID = parseInt(user.ID);			
			us.push(user);
			DAOSaveConsultaArray(us);
		}
		//insercao
		else{
			user.ID = getNextConsultaId();				
			us.push(user);
			DAOSaveConsultaArray(us);
		}


	}
}

function getNextConsultaId(){
	us = DAOGetConsultas();
	ind=0;
	for (usu in us ){	

		if ((us[usu].ID>ind)){			
			ind =parseInt(us[usu].ID);
		}
	}
	return ind+1;
}