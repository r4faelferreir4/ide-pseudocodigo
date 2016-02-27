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
  var str="", temp, op = 1;
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
function toInt(str){
  if (str.charAt() == "1"){
    str = - parseInt(str.slice(1, str.length), 2);
    return str;
  }
  else {
    return parseInt(str, 2);
  }
}

function toTab(){
  debugger;
  var iKode, iTab, iStab, iBtab, iAtab, x = 0, p, aux, i;
  var name, link, obj, typ, ref, normal, lev, adr;
  iKode = toInt(strTOTAL.slice(x, x+=64));
  iTab = toInt(strTOTAL.slice(x, x+=64));
  iAtab = toInt(strTOTAL.slice(x, x += 64));
  iBtab = toInt(strTOTAL.slice(x, x += 64));
  iStab = toInt(strTOTAL.slice(x, x += 64));
  //CRIANDO A ESTRUTURA tab
  tab = [];
  for(p = 0; p < iTab; p++){
    aux = toInt(strTOTAL.slice(x, x += 8));
    name = "";
    for(i = 0; i < aux; i++){
      console.log(strTOTAL.slice(x, x + 8));
      name += String.fromCharCode(toInt(strTOTAL.slice(x, x += 8)));
    }
    console.log(strTOTAL.slice(x, x + 32));
    link = toInt(strTOTAL.slice(x, x += 32));
    console.log(strTOTAL.slice(x, x + 32));
    obj = toInt("0"+strTOTAL.slice(x, x += 3));
    switch (obj) {
      case 1:
        obj = "konstant";
      break;
      case 2:
        obj = "variable";
      break;
      case 3:
        obj = "type1";
      break;
      case 4:
        obj = "prozedure";
      break;
      case 5:
        obj = "funktion";
      break;
    }
    typ = toInt("0"+strTOTAL.slice(x, x += 4));
    switch (typ) {
      case 1:
        typ = "notyp";
      break;
      case 2:
        typ = "ints";
      break;
      case 3:
        typ = "reals";
      break;
      case 4:
        typ = "bools";
      break;
      case 5:
        typ = "chars";
      break;
      case 6:
        typ = "strings";
      break;
      case 7:
        typ = "enums";
      break;
      case 8:
        typ = "pointers";
      break;
    }
    ref = toInt(strTOTAL.slice(x, x += 32));
    normal = toInt(strTOTAL.slice(x, x += 1));
    if (normal == 0)
      normal = true;
    else
      normal = false;
    lev = toInt(strTOTAL.slice(x, x += 8));
    adr = toInt(strTOTAL.slice(x, x += 32));
    tab[p] = new Ttab(name, link, obj, typ, ref, normal, lev, adr);
  }
  //CRIANDO A ESTRUTURA atab
  atab = [];
  for (p = 0; p < iAtab; p++){
    var inxtyp, eltyp, elref, low, high, elsize, size;
    inxtyp = toInt("0"+strTOTAL.slice(x, x += 4));
    switch (inxtyp) {
      case 1:
        inxtyp = "notyp";
      break;
      case 2:
        inxtyp = "ints";
      break;
      case 3:
        inxtyp = "reals";
      break;
      case 4:
        inxtyp = "bools";
      break;
      case 5:
        inxtyp = "chars";
      break;
      case 6:
        inxtyp = "arrays";
      break;
      case 7:
        inxtyp = "records";
      break;
      case 8:
        inxtyp = "strings";
      break;
      case 9:
        inxtyp = "enums";
      break;
      case 10:
        inxtyp = "pointers";
      break;
    }
    eltyp = toInt("0"+strTOTAL.slice(x, x += 4));
    switch (eltyp) {
      case 1:
        eltyp = "notyp";
      break;
      case 2:
        eltyp = "ints";
      break;
      case 3:
        eltyp = "reals";
      break;
      case 4:
        eltyp = "bools";
      break;
      case 5:
        eltyp = "chars";
      break;
      case 6:
        eltyp = "arrays";
      break;
      case 7:
        eltyp = "records";
      break;
      case 8:
        eltyp = "strings";
      break;
      case 9:
        eltyp = "enums";
      break;
      case 10:
        eltyp = "pointers";
      break;
    }
    elref = toInt(strTOTAL.slice(x, x += 32));
    low = toInt(strTOTAL.slice(x, x += 32));
    high = toInt(strTOTAL.slice(x, x += 32));
    elsize = toInt(strTOTAL.slice(x, x += 32));
    size = toInt(strTOTAL.slice(x, x += 32));
    atab[p] = new Tatab(inxtyp, eltyp, elref, low, high, elsize, size);
  }
  //CRIANDO A stab
  stab = [];
  for (p = 0; p < iStab; p++){
    stab[p] = String.fromCharCode(toInt(strTOTAL.slice(x, x += 8)));
  }

  //CRIANDO A btab
  btab = [];
  for(p = 0; p < iBtab; p++){
    var last, lastpar, psize, vsize;
    last = toInt(strTOTAL.slice(x, x += 32));
    lastpar = toInt(strTOTAL.slice(x, x += 32));
    psize = toInt(strTOTAL.slice(x, x += 32));
    vsize = toInt(strTOTAL.slice(x, x += 32));
    btab[p] = new Tbtab(last, lastpar, psize, vsize);
  }

  //CRIANDO A kode
  kode = [];
  for (p = 0; p < iKode; p++){
    var f, y, z;
    f = toInt(strTOTAL.slice(x, x += 8));
    z = toInt(strTOTAL.slice(x, x += 16));
    y = toInt(strTOTAL.slice(x, x += 1));
    if (y == 1){
      var tam = toInt(strTOTAL.slice(x += 32));
      y = "";
      for (aux = 0; aux < tam; aux++){
        y += String.fromCharCode(toInt(strTOTAL.slice(x, x += 8)));
      }
    }
    else {
      y = toInt(strTOTAL.slice(x, x += 32));
    }
    kode[p] = new order(f, z, y);
  }
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
    }
    stratab += toBinary(atab[p].elref, 32);
    stratab += toBinary(atab[p].low, 32);
    stratab += toBinary(atab[p].high, 32);
    stratab += toBinary(atab[p].elsize, 32);
    stratab += toBinary(atab[p].size, 32);
  }
  iatab = p;
  for (p = 0; p < stab.length; p++){
    strstab = toBinary(stab[p].charCodeAt(), 8);
  }
  istab = stab.length;
  istab--;
  for(p = 1; p < btab.length; p++){
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
  strTOTAL = str+strtab+stratab+strstab+strbtab+strkode;
  return strTOTAL;

}
var strTOTAL = "";
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
