function runScript(e) {
  if (e.keyCode == 13) {
    imprimir(pegaValorInput());
    document.getElementById("scriptBox").value = "";
    renderInput(false);
  }
}

function pegaValorInput() {
  return document.getElementById("scriptBox").value;
}

function imprimir(string) {
  var para = document.createElement("span");
  var node = document.createTextNode(string);
  para.appendChild(node);
  var element = document.getElementById("lines");
  element.appendChild(para);
  //element.insertBefore(para, element.firstChild);
}

function renderInput(bool) {
  if (bool) {
    document.getElementById("scriptBox").style.visibility = "visible";
  } else {
    document.getElementById("scriptBox").style.visibility = "hidden";
  }
}

function getUltimaLinha() {
  return document.getElementById("lines").lastElementChild.innerHTML;
}
