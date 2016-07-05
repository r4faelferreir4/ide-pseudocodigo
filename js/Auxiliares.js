//Funções de gerenciamento de memória
//Função para apontar memória ocupada no gerenciador de memória
function MemoryAloc(length){
	for(var i in Blocks){
		if (Blocks[i].isAvailable()){
			if(Blocks[i].size < length){
				continue;
			}
			else if(Blocks[i].size == length){
				Blocks[i].isAvailable = false;
				return Blocks[i].start;
			}
			else {
				if(Blocks[i-1].isAvailable){
					Blocks[i].start += length;
					Blocks[i].size -= length;
					Blocks.splice(i, 0, new MemoryBlock(Blocks[i].start-length, length, false));
					return Blocks[i].start;
				}
				else {
					Blocks[i].start += length;
					Blocks[i].size -= length;
					Blocks[i-1].size += length;
					return Blocks[i].start;
				}
			}
		}
	}
}

//Função para apontar memória livre no gerenciador de memória
function MemoryFree(start, length){
	var i;
	if(start+length >= stacksize){
		console.log("Posição de memória não existe.");
		return;
	}

	for(i in Blocks)
		if(start >= Blocks[i].start && start <= Blocks[i].start+Blocks[i].size)
			break;

	if(Blocks[i].isAvailable){
		console.log("Bloco de memória já liberado");
		return null;
	}

	if(start+length <= Blocks[i].start+Blocks[i].size){
		if(Blocks[i].start < start){
			var size = Blocks[i].size;
			Blocks[i].size = start - Blocks[i].start;
			Blocks.splice(i+1, 0, new MemoryBlock(start+length, size, false));
		  Blocks.splice(i+1, 0, new MemoryBlock(start, length, true));
		}
		else{
			Blocks[i].start += length;
			Blocks[i].size -= length;
			if(Blocks[i-1] instanceof MemoryBlock && Blocks[i-1].isAvailable)
				Blocks[i-1].size += length;
			else
				Blocks.splice(i, 0, new MemoryBlock(Blocks[i].start-length, length, true));
		}

	}
	else {
		var LastByte = Blocks[i].size + Blocks[i].start;
		var CorrectSize = LastByte - start;
		MemoryFree(start, CorrectSize);
		MemoryFree(LastByte+1, length);
	}

}





//ao clicar no botao abre janela para selecionar arquivo
document.getElementById('novo').onclick = function() {
	document.getElementById('my_file').click();
};

//seta template no editor de texto
function SetTemplate(){
	editor.setValue("programa test\nvar\n\ninicio\n\nfim");
}

//Script para entrada de dados pelo teclado
function runScript(e) {
	if (e.keyCode == 13) {
		if (call_read && kode[pc].f == 27){
			var input = pegaValorInput();
			atualizarConsole(input);
			InputFile = input;
			limpaInput();
			read_ok = true;
			interpret();
		}
	}
}

//Função para pegar o valor informado pelo usuário
function pegaValorInput() {
	return document.getElementById("scriptBox").value;
}

//Limpar input
function limpaInput() {
	document.getElementById("scriptBox").value = "";
}

/*function adcionarSaida(string) {
output_console.push(string);
output_console.shift();
atualizarConsole();
//document.getElementById("output").value = output_console.join("\n");
}*/

//Limpa o console de saída quando um novo programa é iniciado
function limpaConsole() {
	document.getElementById("output").value = "";
}

function StringFilter(str){			//Retorna o final da string no tamanho máximo de linhas delimitado por lineLimit
	var count = 0, index = str.length;
	do {
		index = str.lastIndexOf('\n', index-1);
		count++;
		if(count >= lineLimit || index == -1){
			return str.substring(index+1);
		}
		else
			index1 = index;
	} while (true);
}

//Imprime informações no console de saída
function atualizarConsole(string){
	document.getElementById("output").value = StringFilter(document.getElementById("output").value.concat(string));
	scrollOutput();
}

//Imprime erros no console debug abaixo do editor
function mostraErro(){
	limpaDebug();
	adicionarErro(MsgErro+"\nTempo de compilação: "+((time != undefined)?time:0)+" ms.");
}


//Armazenamento e operações com string
function lista(next, c, destruct){
	this.next = next;
	this.c = c;
	this.destruct = destruct;
}

function alocaString(str, head, destruct, end){//Aloca string reutilizando espaço já alocado
	if (str !== undefined && head !== undefined){
		head.c = str.charAt();   //Definindo o inicio da lista
		head.destruct = destruct;
		var i = 1;
		var length = str.length;
		while(i < length){
			if (head.next === undefined)
			head.next = new lista();
			head = head.next;
			head.c = str.charAt(i);
			head.destruct = destruct;
			i++;
		}
		head.next = end;
	}
}

function liberaString(head){//Retira as referências para que o coletor de lixo limpe esses dados
	var Ohead;
	while(head.next !== undefined){
		Ohead = head.next;
		head.next = undefined;
		head = Ohead;
	}
}

function lenString(head){		//retorna o tamanho de uma string
	var len = 1;
	if (head.c === "" && head.next === undefined)
	return 0;
	else {
		while(head.next !== undefined){
			head = head.next;
			len++;
		}
		return len;
	}
}

function getString(head){		//retorna uma string
	var str= "", destruct, destroi;
	if (head.destruct){
		destroi = head;
		destruct = true;
	}
	if (typeof head == "object"){
		str += head.c;
		while (head.next !== undefined){
			head = head.next;
			str += head.c;
		}
		if (destruct)
		liberaString(destroi);
		return str;
	}
}

function getChar(head, pos){		//busca uma caractere em uma posição de uma string
	var str = "", i = 1, len;
	if (typeof head == "object"){
		if (pos < 0){
			len = lenString(head);
			pos = len + pos + 1;
		}
		while(head !== undefined){
			if (i == pos)
			return head.c.charCodeAt();
			else
			head = head.next;
			i++;
		}
	}
}

function isLetter(char){
	var a = "a".charCodeAt();
	var A = "A".charCodeAt();
	var z = "z".charCodeAt();
	var Z = "Z".charCodeAt();
	char = char.charCodeAt();
	if(char >= a && char <= z || char >= A && char <= Z)
		return true;
	else
		return false;
}

function isNumber(n){
	return n in [1,2,3,4,5,6,7,8,9,0];
}

function alocaVetor(){		//aloca uma posição no vetor de strings
	var i = 2;
	while(str_tab[i] !== undefined){
		i++;
	}
	str_tab[i] = new lista();
	return i;
}

function setChar(head, char, pos){		//seta um caractere em uma string
	var i = 1, len;
	char = String.fromCharCode(char);
	if (typeof head == "object"){
		if (pos < 0){
			len = lenString(head);
			pos = len + pos + 1;
		}
		while(head !== undefined){
			if (i == pos){
				head.c = char;
				return true;
			}
			else
			head = head.next;
			i++;
		}
		return false;
	}
}

function setStr(head, str, pos){
	var i = 1, len, nhead, nxt;
	if (head instanceof lista){
		if (pos < 0){
			len = lenString(head);
			pos = len + pos + 1;
		}
		while(head !== undefined){
			if (i == pos){
				nhead = new lista();
				nxt = head.next;
				head.next = nhead;
				alocaString(str, nhead, false, nxt);
				return true;
			}
			else
			head = head.next;
			i++;
		}
		return false;
	}
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


//debug
function adicionarErro(erro) {
	var table = document.getElementById("panel-error");
	document.getElementById("painelDebug").style.visibility = "visible";
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = erro;
}

function limpaDebug(){
	$("#panel-error tr:gt(0)").remove();
	document.getElementById("painelDebug").style.visibility = "hidden";
}

//fim funcoes debug

//funcoes para pilha
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

function getNumberStacks(){
	return document.getElementById("tab_logic").rows.length - 1;
}

function removerTodaPilhaFuncoes(){
	$("#tab_logic tr:gt(0)").remove();
}

//fim funcoes para pilha

//funcoes para pilha de variaveis
//array de objetos
var arrayObjetoTabela = [];
//Carregar variáveis no depurador
function carregaVariaveis(start){
	var value;
	do {
		if (tab[start].obj != "prozedure" && tab[start].obj != "funktion"){
			switch (tab[start].typ) {
				case "reals":
				value = s.getFloat64(display[tab[start].lev]+tab[start].adr);
				break;
				case "chars":
				value = String.fromCharCode(s.getUint8(display[tab[start].lev]+tab[start].adr));
				break;
				case "bools":
				value = (s.getUint8(display[tab[start].lev]+tab[start].adr) == 0)?"falso":"verdadeiro";
				break;
				case "strings":
				if (str_tab[s.getInt32(display[tab[start].lev]+tab[start].adr)] != undefined)
				value = getString(str_tab[s.getInt32(display[tab[start].lev]+tab[start].adr)]);
				else
				value = "";
				break;
				default:
				value = s.getInt32(display[tab[start].lev]+tab[start].adr);
			}
			if(tab[start].typ == "records"){
				var lv = tab[start].lev;
				adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
				do {
					start++;
					adicionarObjetoFilho(tab[start].name, value, start, tab[start].lev, tab[start].adr);
				} while (tab[start].lev > lv);
				continue;
			}
			if(tab[start].obj == "variable" || tab[start].obj == "konstant")
			adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
			start++;
		}
	} while(tab[start].obj != undefined && tab[start].obj != "prozedure" && tab[start].obj != "funktion" && tab[start].name != "");
}

//objeto auxiliar
function objetoTabela(Nome,Valor, index, lv, adr){
	this.Nome = Nome;
	this.Valor = Valor;
	this.novoValor = "";
	this.idtab = index;
	this.lv = lv;
	this.adr = adr;
}

//cria objeto tabela e verifica se existe os valores para adicionar na tabela
function adicionarObjetoVar(posNome,posValor, start, lv, adr){
	adr += display[display.length-1];
	objeto = new objetoTabela(posNome,posValor, start, lv, adr);
	adicionarTabelaVar(objeto);
	arrayObjetoTabela.push(objeto);
}
//adicionar objeto filho na tabela
function adicionarObjetoFilho(posNome,posValor, start, lv, adr){
	adr += display[display.length-1];
	objeto = new objetoTabela(posNome,posValor, start, lv, adr);
	adicionaFilhos(objeto);
	arrayObjetoTabela.push(objeto);
}

function atualizaVariavel(adr, value, typ){
	for (var i = 0; i < arrayObjetoTabela.length; i++) {
		var objeto = arrayObjetoTabela[i];
		if (objeto.adr == adr) {
			var input = document.getElementById(objeto.idtab);
			if (input !== null) {
				if(typ == "bools"){
					if(value != 0)
						input.value = "verdadeiro";
					else
						input.value = "falso";
				}
				else if(typ == "chars"){
					input.value = String.fromCharCode(input.value);
				}
				else
					input.value = value;
			}
		}
	}
}

//var para pegar o id do pai
var id_linha_pai = 0;

function adicionarTabelaVar(objeto) {
	var table = document.getElementById("tab_var");
	var row = table.insertRow(2);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	switch (tab[objeto.idtab].typ) {

		case "records":
		row.setAttribute("class", "clickable");
		row.setAttribute("data-toggle", "collapse");
		row.setAttribute("data-target", ".row"+objeto.idtab);
		row.setAttribute("id", "linha_"+objeto.idtab);
		cell1.innerHTML = "<i class='glyphicon glyphicon-plus'></i>";
		cell2.innerHTML = objeto.Nome;
		id_linha_pai = objeto.idtab;

		break;

		default:
		cell1.innerHTML = objeto.Nome;
		cell2.innerHTML = "<input type='text' value='"+ objeto.Valor +"'name='"+objeto.idtab+"' id='"+ objeto.idtab +"'>";
		break;
	}

	desativarTabelaVar();
}

function adicionaFilhos(objeto){
	var table = document.getElementById("tab_var");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

	row.setAttribute("class", "collapse active row"+id_linha_pai);

	cell1.innerHTML = objeto.Nome;
	cell2.innerHTML = "<input type='text' value='"+ objeto.Valor +"'name='"+objeto.idtab+"' id='"+ objeto.idtab +"'>";
}

function desativarTabelaVar(){
	$("#tab_var").find("input").attr("disabled", "disabled");
}

function ativarTabelaVar(){
	$("#tab_var").find("input").removeAttr('disabled');
}

function removerTopoPilhaVar() {
	if (document.getElementById("tab_var").getElementsByTagName("tr").length > 2) {
		document.getElementById("tab_var").deleteRow(2);
	}
}

function removerTodaPilhaVar(){
	$("#tab_var tr:gt(1)").remove();
	arrayObjetoTabela = [];
}
//funcao para salvar as variaveis editadas
function eachObjetoTabela(objeto){
	var input = document.getElementById(objeto.idtab);
	if(input != null){
		switch (tab[objeto.idtab].typ) {
			case "strings":
			var adr = s.getInt32(objeto.adr);
			alocaString(input.value, str_tab[adr], false);
			break;
			case "reals":
			number = Number(input.value);
			if(!Number.isNaN(number))
			s.setFloat64(objeto.adr, number);
			else
			input.value = "NaN";
			break;
			case "ints":
			number = Number(input.value);
			if(!Number.isNaN(number))
			s.setInt32(objeto.adr, number);
			else
			input.value = "NaN";
			break;
			case "bools":
			var str = input.value;
			str = str.toLowerCase();
			if(str == "verdadeiro")
			s.setUint8(objeto.adr, 1);
			else{
				s.setUint8(objeto.adr, 0);
				input.value = "falso";
			}
			break;
			case "chars":
			var char = input.value.charCodeAt();
			s.setUint8(objeto.adr, char);
			input.value = char;
			break;
		}
	}

}

function salvar(){
		arrayObjetoTabela.forEach(eachObjetoTabela);
		/*
		for (var i = 0; i < arrayObjetoTabela.length; i++) {
		var objeto = arrayObjetoTabela[i];
		var input = document.getElementById(objeto.idinput);
		if (input !== null && input !== undefined) {
		objeto.novoValor = input.value;
		if (s[objeto.posValor] !== objeto.novoValor) {
		s[objeto.posValor] = objeto.novoValor;
		}
		}
		}
		*/
		desativarTabelaVar();
}
//funcao para atualizar todas as variaveis
function atualizarTodasVar(){
	for (var i = 0; i < arrayObjetoTabela.length; i++) {
		var objeto = arrayObjetoTabela[i];
		var input = document.getElementById(objeto.idinput);
		if (input !== null) {
			input.value = s[objeto.posValor];
		}
	}
}

//fim funcoes para pilha de variaveis

var lenBinary = 0;
function toBinary(i, len){
	lenBinary += len;
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
		}while(temp !== 0);
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

function toTab(strTOTAL){
	debugger;
	var iKode, iTab, iStab, iBtab, iAtab, x = 0, p, aux, i;
	var name, link, obj, typ, ref, normal, lev, adr;
	iKode = toInt(strTOTAL.slice(x, x+=64));
	iTab = toInt(strTOTAL.slice(x, x+=64));
	iAtab = toInt(strTOTAL.slice(x, x += 64));
	iBtab = toInt(strTOTAL.slice(x, x += 64));
	iStab = toInt(strTOTAL.slice(x, x += 64));
	//CRIANDO A ESTRUTURA tab
	var tab1 = [];
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
		tab1[p] = new Ttab(name, link, obj, typ, ref, normal, lev, adr);
	}
	debugger;
	var ix = 0;
	while(ix < iTab){
		if (tab[ix].f != tab1[ix].f)
		console.log("Diferença em "+ ix + " na função f.");
		if (tab[ix].x != tab1[ix].x)
		console.log("Diferença em " + ix + " em x.");
		if (tab[ix].y != tab1[ix].y)
		console.log("Diferença em " + ix + " em y.");
		ix++;
	}
	debugger;
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
	debugger;
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
	return true;
}
function saveFile(){
	var j, p, itab, istab, iatab, ibtab, ikode, strTOTAL="";
	var str="", strtab="", strstab = "", strkode="", strbtab = "", stratab = "";
	for (p=0; p < tab.length; p++){
		//debugger;
		if (tab[p].name === "" && tab[p].adr === 44)
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
		if (atab[p].inxtyp === "")
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
		if (btab[p].psize === 0 && btab[p].vsize === 0)
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
	console.log(lenBinary);
	console.log(strTOTAL.length);
	return strTOTAL;

}

var openFile = function(event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		var text = reader.result;
		var sucess = toTab(text);
		if (sucess){
			isDone = true;
			isOk = true;
		}
	};
	reader.readAsText(input.files[0]);
};

//funcao encontrada http://stackoverflow.com/a/29975326/5165064
function binaryToWords(str) {
	if(str.match(/[10]{8}/g)){
		var wordFromBinary = str.match(/([10]{8}|\s+)/g).map(function(fromBinary){
			return String.fromCharCode(parseInt(fromBinary, 2) );
		}).join('');
		return wordFromBinary;
	}
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
function mostraItensDepuracao(bool){
	if (bool) {
		document.getElementById("continuar").style.visibility = "visible";
		document.getElementById("exe_cursor").style.visibility = "visible";
		document.getElementById("prox_funcao").style.visibility = "visible";
		document.getElementById("exe_entrando").style.visibility = "visible";
		document.getElementById("exe_saindo").style.visibility = "visible";
		document.getElementById("nao_parar").style.visibility = "visible";
		document.getElementById("lb_nao_parar").style.visibility = "visible";
		document.getElementById("coluna_direita").style.visibility = "visible";
		document.getElementById("codeDiv").style.width = "76.5%";

		document.getElementById("coluna_direita").style.width = "295pxpx;";
		document.getElementById("coluna_direita").style.height = "400px";

	} else {
		document.getElementById("continuar").style.visibility = "hidden";
		document.getElementById("exe_cursor").style.visibility = "hidden";
		document.getElementById("prox_funcao").style.visibility = "hidden";
		document.getElementById("exe_entrando").style.visibility = "hidden";
		document.getElementById("exe_saindo").style.visibility = "hidden";
		document.getElementById("nao_parar").style.visibility = "hidden";
		document.getElementById("lb_nao_parar").style.visibility = "hidden";
		document.getElementById("coluna_direita").style.visibility = "hidden";
		document.getElementById("codeDiv").style.width = "98%";

		document.getElementById("coluna_direita").style.width = "1px;";
		document.getElementById("coluna_direita").style.height = "1px";

	}
}


function mostraBtExecucarNovamente(bool){
		if (bool) {
			document.getElementById("btNovamente").style.visibility = "visible";
		}else{
			document.getElementById("btNovamente").style.visibility = "hidden";
		}
}

mostraItensDepuracao(false);
