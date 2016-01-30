
function abrirCadPacientes(){
  if (!USERLoginDone()){
    $().toastmessage('showErrorToast', ' Usuário não Logado ');     
    return;    
  }


  abrirPag('pgBuscaAlteracaoPaciente.html', 'container',function(){
    setTimeout(function() {

      showPleaseWait(function(){
        PacienteLoadForm();
        hidePleaseWait();
      });
      
    }, 500);
  } );
  $('#pgTitle').html("Pacientes");
}





function filterPacienteUI(){  
 showPleaseWait(function(){
  deleteTableRowsPacientes();    
  PacienteLoadForm($('#pacFilt').val());        
  hidePleaseWait();
});
 

}


function PacienteLoadForm(filt){
  SwapPacienteForm(0);
  var table=document.getElementById("pacienteGrid");

  us = PACGetPacientes(filt);
  for (usu in us ){
    var row=table.insertRow(-1);  
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    var cell6=row.insertCell(5);
    var cell7=row.insertCell(6);
    cell1.innerHTML=us[usu].ID;
    cell2.innerHTML=us[usu].NOME;
    cell3.innerHTML=us[usu].TEL_CEL;
    cell4.className="hidden-xs";
    cell4.innerHTML=us[usu].TEL_COM;
    cell5.className="hidden-xs";
    cell5.innerHTML=us[usu].EMAIL;
    cell6.innerHTML="<input type='button' class='btn btn-primary' value='Alterar' onClick='altPacienteUI(" + us[usu].ID+")' >";
    cell7.innerHTML="<input type='button' class='btn btn-primary' value='Excluir' onClick='excPacienteUI(" + us[usu].ID+")' >";    
  } 
}


function deleteTableRowsPacientes(){
  var table=document.getElementById("pacienteGrid");
  while (table.rows.length>2){
    table.deleteRow(-1);
  }

}


function excPacienteUI(id){

  if (!PACDeletePaciente(id)){
    $().toastmessage('showErrorToast', 'Paciente nao Encontrado ' );      
    return;
  }
  else
  {
    filterPacienteUI();
  }
  
}

function altPacienteUI(id){
  SwapPacienteForm(1, id);
}

function addPacienteUI(){
  SwapPacienteForm(1);
}

function SwapPacienteForm(alt, id){
  if (alt){
    $('#altPacienteForm').show();
    $('#opPacienteForm').show();
    $('#filtPacienteForm').hide();
    $('#gridPacienteForm').hide();
    LoadPacienteData(id);

  }
  else{
    $('#altPacienteForm').hide();
    $('#opPacienteForm').hide();
    $('#filtPacienteForm').show();
    $('#gridPacienteForm').show();
    
  }

}


function cancelarPacienteUI(){
  SwapPacienteForm(0);
}


function salvarPacienteUI(){
  usu = new Paciente(
    $('#pacienteId').val(),
    $('#pacienteNome').val(),
    $('#pacienteRua').val(), 
    $('#pacienteNr').val(), 
    $('#pacienteBairro').val(), 
    $('#pacienteCompl').val(), 
    $('#pacienteCep').val(),
    $('#pacienteNasc').val(),
    //"outro",
    $('#pacienteEstciv').val(),
    $('#pacienteEscol').val(),
    $('#pacienteProfi').val(),
    $('#pacienteTelres').val(),
    $('#pacienteTelcel').val(),
    $('#pacienteTelcom').val(),
    $('#pacienteEmail').val(),
    $('#pacienteConvenio').val(),
    $('#pacienteTpplan').val(),
    $('#pacienteNrcar').val(),    
    $('#pacienteFaltas').val()        
    );



  showPleaseWait(function(){
    ClearPacienteForm();
    deleteTableRowsPacientes();
    PACAddPaciente(usu);
    PacienteLoadForm();
    hidePleaseWait();
  });

  
}

function ClearPacienteForm(){
  $('#pacienteId').val("");
  $('#pacienteNome').val("");
  $('#pacienteRua').val(""); 
  $('#pacienteBairro').val(""); 
  $('#pacienteNr').val(""); 
  $('#pacienteCompl').val("");
  $('#pacienteCep').val("");
  $('#pacienteNasc').val("");
  $('#pacienteEstciv').val("");
  $('#pacienteEscol').val("");
  $('#pacienteProfi').val("");
  $('#pacienteTelres').val("");
  $('#pacienteTelcel').val("");
  $('#pacienteTelcom').val("");
  $('#pacienteEmail').val("");
  $('#pacienteConvenio').val("");
  $('#pacienteTpplan').val("");
  $('#pacienteNrcar').val("");
  $('#pacienteFaltas').val(""); 

}


function LoadPacienteData(id){
  us =  DAOReturnPaciente(id);
  $('#pacienteId').val(us.ID);
  $('#pacienteNome').val(us.NOME);
  $('#pacienteRua').val(us.END_RUA); 
  $('#pacienteNr').val(us.END_NR); 
  $('#pacienteBairro').val(us.END_BAIRRO); 
  $('#pacienteCompl').val(us.END_COMPL);
  $('#pacienteCep').val(us.END_CEP);
  $('#pacienteNasc').val(us.NASC);
  $('#pacienteEstciv').val(us.ESTCIV);
  $('#pacienteEscol').val(us.ESCOL);
  $('#pacienteProfi').val(us.PROFI);
  $('#pacienteTelres').val(us.TEL_RES);
  $('#pacienteTelcel').val(us.TEL_CEL);
  $('#pacienteTelcom').val(us.TEL_COM);
  $('#pacienteEmail').val(us.EMAIL);
  $('#pacienteConvenio').val(us.CONVENIO);
  $('#pacienteTpplan').val(us.TPPLAN);
  $('#pacienteNrcar').val(us.NRCAR );
  $('#pacienteFaltas').val(us.FALTAS); 


  
  
}