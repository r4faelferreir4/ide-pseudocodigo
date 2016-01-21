function runScript(e) {
  if (e.keyCode == 13) {
    adacionarSaida(pegaValorInput());
    limpaInput();
  }
}

function pegaValorInput() {
  return document.getElementById("scriptBox").value;
}

function limpaInput() {
  document.getElementById("scriptBox").value = "";
}

function adacionarSaida(string) {
  output_console.push(string);
  output_console.shift();
  atualizarConsole();
  //document.getElementById("output").value = output_console.join("\n");
}

function limpaConsole() {
  document.getElementById("output").value = "";
}

function atualizarConsole(){
  limpaConsole();
  for (var i = 0; i < output_console.length; i++) {
    if(output_console[i] !== undefined) {
      //document.getElementById("output").value += (output_console[i]).concat("\n");
      //Mostra posicao
      document.getElementById("output").value += (output_console[i]).concat(" ===> pos: ").concat(i).concat("\n");
    }
  }
}

function renderInput(bool) {
  if (bool) {
    document.getElementById("scriptBox").style.visibility = "visible";
  } else {
    document.getElementById("scriptBox").style.visibility = "hidden";
  }
}
