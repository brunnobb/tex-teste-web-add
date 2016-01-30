




function backHome(){
  if (!USERLoginDone()){
    $().toastmessage('showErrorToast', ' Usuário não Logado ' ); 
    return;     
  }
  abrirPag('agenda.html', 'container',function(){
		setTimeout(function() {
			mes=-1;
			ano=-1;
			LoadAgenda();
		}, 500);
	} );
	$('#pgTitle').html("Agenda");
}

