function runScript(e) {
  if (e.keyCode == 13) {
    adcionarSaida(pegaValorInput());
    limpaInput();
  }
}

function pegaValorInput() {
  return document.getElementById("scriptBox").value;
}

function limpaInput() {
  document.getElementById("scriptBox").value = "";
}

function adcionarSaida(string) {
  output_console.push(string);
  output_console.shift();
  atualizarConsole();
  //document.getElementById("output").value = output_console.join("\n");
}

function limpaConsole() {
  document.getElementById("output").value = "";
}

function atualizarConsole(){
  //limpaConsole();
  var i = document.getElementById("output").value;
  var j = output_console.pop();
  i = i + j;
      document.getElementById("output").value = i;
      //Mostra posicao
      //document.getElementById("output").value += (output_console[i]).concat(" ===> pos: ").concat(i).concat("\n");
}

  function mostrarModalOutput(){
    $('#modalOutput').modal('show');
  }

  function esconderModalOutput(){
    $('#modalOutput').modal('hide');
  }

  function scrollOutput(){
    document.getElementById('output').scrollTop=document.getElementById('output').scrollHeight;
  }

function renderInput(bool) {
  if (bool) {
    document.getElementById("scriptBox").style.visibility = "visible";
  } else {
    document.getElementById("scriptBox").style.visibility = "hidden";
  }
}
