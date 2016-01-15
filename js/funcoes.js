function runScript(e) {
  if (e.keyCode == 13) {
    adacionarSaida(pegaValorInput());
    limpaImput();
  }
}

function pegaValorInput() {
  return document.getElementById("scriptBox").value;
}

function limpaImput() {
  document.getElementById("scriptBox").value = "";
}

function adacionarSaida(string) {
  output_console.push(string);
  output_console.shift();
  document.getElementById("output").value = output_console.join("\n");
}

function renderInput(bool) {
  if (bool) {
    document.getElementById("scriptBox").style.visibility = "visible";
  } else {
    document.getElementById("scriptBox").style.visibility = "hidden";
  }
}
