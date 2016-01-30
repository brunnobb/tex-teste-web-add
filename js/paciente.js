function Paciente(vid, vnome, vrua, vnr, vbairro, vcompl, vcep, vnasc, vestciv, vescol,
 vprofi, vtelres, vtelcel, vtelcom, vemail, vconvenio, vtpplan, vnrcar, vfaltas)
{
	this.ID = parseInt(vid);
	this.NOME = vnome;	
	this.END_RUA = vrua;
	this.END_NR = vnr;
	this.END_BAIRRO = vbairro;
	this.END_COMPL = vcompl;
	this.END_CEP = vcep;
	this.NASC = vnasc;
	this.ESTCIV = vestciv; 
	this.ESCOL = vescol;
	this.PROFI = vprofi;
	this.TEL_RES = vtelres;
	this.TEL_CEL = vtelcel;
	this.TEL_COM = vtelcom;
	this.EMAIL = vemail;
	this.CONVENIO = vconvenio;
	this.TPPLAN = vtpplan;
	this.NRCAR = vnrcar;
	this.FALTAS = vfaltas;

	nlog(this);



}


function PACGetPacientes(filt){
	return DAOGetPacientes(filt);
}

function ReturnPaciente(id){
	return DAOReturnPaciente(id);
}


function PACDeletePaciente(id){
	return DAODeletePaciente(id);
}

function PACAddPaciente(user){
  DAOAddPaciente(user);
}
