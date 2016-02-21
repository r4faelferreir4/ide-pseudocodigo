function runScript(e) {
  if (e.keyCode == 13) {
    if (call_read){
      var input = pegaValorInput();
      //input.pop();
      atualizarConsole(input);
      InputFile = input;
      limpaInput();
      read_ok = true;
      interpret();
    }
  }
}
function reexecute(){
  limpaConsole();
  call_read = false;
  interpret();
}
function pegaValorInput() {
  return document.getElementById("scriptBox").value;

}

function limpaInput() {
  document.getElementById("scriptBox").value = "";
}

/*function adcionarSaida(string) {
output_console.push(string);
output_console.shift();
atualizarConsole();
//document.getElementById("output").value = output_console.join("\n");
}*/

function limpaConsole() {
  document.getElementById("output").value = "";
}

function atualizarConsole(string){
  string = document.getElementById("output").value + string;
  document.getElementById("output").value = string;
  scrollOutput();
}

function mostraErro(){
  document.getElementById("panel-error").value = MsgErro;
}

function changeOutput(){
  call_read = true;
  pc++;         //As instruções de leitura precisam retornar na mesma instrução, as de escrita podem seguir para a próxima instrução.
  ocnt++;
  interpret();
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

function adicionarTabelaPilha(funcao) {
  /*$('#tab_logic').append('<tr><td>'+ funcao + '</td></tr>');*/
  var table = document.getElementById("tab_logic");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = funcao;
}

function removerTopoPilha() {
  document.getElementById("tab_logic").deleteRow(1);
}

function download(name, type) {
    var a = document.createElement("a");
    var file = new Blob([editor.getValue()], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
