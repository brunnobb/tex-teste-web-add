

function getStatusDes(stat){
	dst = "";	
	if (stat =='A'){
		dst = "Aberto";
	}

	if (stat =='C'){
		dst = "Cancelado";
	}

	if (stat =='P'){
		dst = "Presente";
	}

	if (stat =='F'){
		dst = "Falta";
	}
	return dst;
}

function Consulta(vid, idfun, idcli, vdia, vmes, vano, vhora, vst)
{
	this.ID = parseInt(vid);
	this.ID_CLIENTE = parseInt(idcli);
	this.ID_FUN = parseInt(idfun);
	this.HORA = parseInt(vhora);
	this.DIA = parseInt(vdia);
	this.MES = parseInt(vmes);
	this.ANO = parseInt(vano);
	this.ST= vst;
	this.DES_STATUS = getStatusDes(vst);
	this.DES_HORARIO = Horarios[this.HORA];
	this.DES_DIA = this.DIA + "/" + this.MES + "/" + this.ANO;
}

function CONGetConsultas(cmd, cpc, cd, cm, ca, ch){
	return DAOGetConsultas(cmd, cpc, cd, cm, ca, ch);
}

function ReturnConsulta(id){
	return DAOReturnConsulta(id);
}

function CONDeleteConsulta(id){
	return DAODeleteConsulta(id);
}

function CONAddConsulta(user){
	DAOAddConsulta(user);
}
