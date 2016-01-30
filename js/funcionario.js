function Funcionario(vid, vnome, vnasc, vescol, vrg, vcpf, vtelres, vtelcel, vremun, vemail, vadmiss, vcargo, vrua, vnr, vbairro, vcompl, vcep)
{
	this.ID = parseInt(vid);
	this.NOME = vnome;
	this.NASC = vnasc;
	this.ESCOL = vescol;
	this.RG = vrg;
	this.CPF = vcpf;
	this.TEL_RES = vtelres;
	this.TEL_CEL = vtelcel;
	this.REMUN = vremun;
	this.EMAIL = vemail;
	this.ADMISS = vadmiss;
	this.CARGO = vcargo;
	this.END_RUA = vrua;
	this.END_NR = vnr;
	this.END_BAIRRO = vbairro;
	this.END_COMPL = vcompl;
	this.END_CEP = vcep;
}



function FUNGetFuncionarios(filt){
	return DAOGetFuncionarios(filt);
}

function ReturnFuncionario(id){
	return DAOReturnFuncionario(id);
}


function FUNDeleteFuncionario(id){
	return DAODeleteFuncionario(id);
}

function FUNAddFuncionario(user){
  DAOAddFuncionario(user);
}
