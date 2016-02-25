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
function toBinary(i, len){
  var str="", temp, op;
  if (i < 0){
    i = -i;
    op = -1;
  }
  do{
    temp = i%2;
    str = temp+str;
    i = i/2;
    i = Math.floor(i);
  }while(i > 0);
  temp = len - str.length;
  if (temp > 0){
    do{
      str = "0"+str;
      temp = len - str.length;
    }while(temp != 0);
  }
  else if (temp < 0) {
    console.log("Numero de bits informado não comporta o valor convertido.");
    return -1;
  }
  if (op == -1)
    str = "1"+str.slice(1, str.length);
  return str;
}
function saveFile(){
  var j, p, itab, istab, iatab, ibtab, ikode;
  var str="", strtab="", strstab = "", strkode="", strbtab = "", stratab = "";
  for (p=0; p < tab.length; p++){
    //debugger;
    if (tab[p].name == "" && tab[p].adr == 44)
      break;
    strtab += toBinary(tab[p].name.length, 8);
    for(j = 0; j < tab[p].name.length; j++){
      strtab += toBinary(tab[p].name.charCodeAt(j), 8);
    }
    strtab += toBinary(tab[p].link, 32);
    switch (tab[p].obj) {
      case "konstant":
        strtab += toBinary(1, 3);
      break;
      case "variable":
        strtab += toBinary(2, 3);
      break;
      case "type1":
        strtab += toBinary(3, 3);
      break;
      case "prozedure":
        strtab += toBinary(4, 3);
      break;
      case "funktion":
        strtab += toBinary(5,3);
      break;
    }
    switch (tab[p].typ) {
      case "notyp":
        strtab += toBinary(1, 4);
      break;
      case "ints":
        strtab += toBinary(2, 4);
      break;
      case "reals":
        strtab += toBinary(3, 4);
      break;
      case "bools":
        strtab += toBinary(4, 4);
      break;
      case "chars":
        strtab += toBinary(5, 4);
      break;
      case "strings":
        strtab += toBinary(6, 4);
      break;
      case "enums":
        strtab += toBinary(7, 4);
      break;
      case "pointers":
        strtab += toBinary(8, 4);
      break;
      default:
    }
    strtab += toBinary(tab[p].ref, 32);
    var x = tab[p].normal?0:1;
    strtab += toBinary(x, 1);
    strtab += toBinary(tab[p].lev, 8);
    strtab += toBinary(tab[p].adr, 32);
  }
  itab = p;
  for(p=0; p< atab.length; p++){
    if (atab[p].inxtyp == "")
      break;
    switch (atab[p].inxtyp) {
      case "notyp":
        stratab += toBinary(1, 4);
      break;
      case "ints":
        stratab += toBinary(2, 4);
      break;
      case "reals":
        stratab += toBinary(3, 4);
      break;
      case "bools":
        stratab += toBinary(4, 4);
      break;
      case "chars":
        stratab += toBinary(5, 4);
      break;
      case "arrays":
        stratab += toBinary(6, 4);
      break;
      case "records":
        stratab += toBinary(7, 4);
      break;
      case "strings":
        stratab += toBinary(8, 4);
      break;
      case "enums":
        stratab += toBinary(9, 4);
      break;
      case "pointers":
        stratab += toBinary(10, 4);
      break;
      default:

    }
    switch (atab[p].eltyp) {
      case "notyp":
        stratab += toBinary(1, 4);
      break;
      case "ints":
        stratab += toBinary(2, 4);
      break;
      case "reals":
        stratab += toBinary(3, 4);
      break;
      case "bools":
        stratab += toBinary(4, 4);
      break;
      case "chars":
        stratab += toBinary(5, 4);
      break;
      case "arrays":
        stratab += toBinary(6, 4);
      break;
      case "records":
        stratab += toBinary(7, 4);
      break;
      case "strings":
        stratab += toBinary(8, 4);
      break;
      case "enums":
        stratab += toBinary(9, 4);
      break;
      case "pointers":
        stratab += toBinary(10, 4);
      break;
      default:
    }
    stratab += toBinary(atab[p].elref, 32);
    stratab += toBinary(atab[p].low, 32);
    stratab += toBinary(atab[p].high, 32);
    stratab += toBinary(atab[p].elsize, 32);
    stratab += toBinary(atab[p].size, 32);
  }
  for(p = 0; p < stab.length; p++){
    strstab += toBinary(stab[p].charCodeAt(), 8);
  }
  iatab = p;
  istab = stab.length;
  istab--;
  for(p = 0; p < btab.length; p++){
    if (btab[p].psize == 0 && btab[p].vsize == 0)
      break;
    strbtab += toBinary(btab[p].last, 32);
    strbtab += toBinary(btab[p].lastpar, 32);
    strbtab += toBinary(btab[p].psize, 32);
    strbtab += toBinary(btab[p].vsize, 32);
  }
  ibtab = p;
  for(p=0; p<kode.length; p++){
    if (kode[p].f == 31)
      break;
    strkode += toBinary(kode[p].f, 8);
    strkode += toBinary(kode[p].x, 16);
    if (typeof kode[p].y == "string"){
      strkode += toBinary(1, 1);
      strkode += toBinary(kode[p].x.length, 32);
      do{
        strkode += toBinary(kode[p].y.charCodeAt(j), 8);
      }while(j < kode[p].y.length);
    }
    else {
      strkode += toBinary(0, 1);
      strkode += toBinary(kode[p].y, 32);
    }

  }
  ikode = p;
  console.log(ikode, itab,iatab, ibtab, istab);
  str += toBinary(ikode, 64);
  str += toBinary(itab, 64);
  str += toBinary(iatab, 64);
  str += toBinary(ibtab, 64);
  str += toBinary(istab, 64);

  return str+strtab+stratab+strstab+strbtab+strkode;

}

function upload(){
  var x = document.createElement("INPUT");
  x.setAttribute("type", "file");
  /*x.onload = function loadFile(){
    var reader = new FileReader();
    var files = x.value;
    console.log(files.name);
  };*/
  x.onload = function(fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var texto = textFromFileLoaded;
    debugger;
    fileReader.readAsText(fileToLoad);
  };
  x.click();
	var fileToLoad = x.files[0];
	var fileReader = new FileReader();



}
function download(name, type) {
  if(isDone){
    if (isOk){
      var a = document.createElement("a");
      var string = saveFile();
      string = string.split("");
      var file = new Blob(string, {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.click();
    }
    else {
      alert("Ainda existem erros no código a serem solucionados");
    }
  }
  else {
    alert("Você precisa compilar o código antes!");
  }
}
