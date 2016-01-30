//agenda tem 14 horários por medico
//7 horas por dia
//30 min por aten  




  function agComoEstaDia(med, dia, mes, ano){
  	//ramdom entre 1 e 3
  	//1 = vazio(<=8)  2 = medio 3(>=9 < 12) = cheio(>=12)  	
  	con = CONGetConsultas(med, null, dia, mes, ano);
  	tam = con.length;
  	if (!tam)
  	  r=1;
  	if (tam<=8){
  		r=1;
  	} 

  	if ((tam<12)&&(tam>=9)){
  		r=2;
  	} 

  	if ((tam>=12)){
  		r=3;
  	} 
  	//r= Math.floor((Math.random()*3)+1);
  	return r;



  }

  function agTemConsulta(med, dia, mes, ano, hora){
  	//ramdom entre 1 e 2
  	
  	con = CONGetConsultas(med, null, dia, mes, ano, hora);
  	tam = con.length;
    r="";
  	
  	if (tam>0){
      r=ReturnPaciente(con[0].ID_CLIENTE).NOME;
  	}
  	//r= Math.floor((Math.random()*2)+1);
  	return r;



  }