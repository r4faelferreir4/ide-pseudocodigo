//Funções de gerenciamento de memóriaatualizaConsole
//Função para alocar memória no gerenciador de memória
function MemoryAloc(length){
	var i, start, nBlocks = Blocks.length;
	if(length == 0){
		atualizarConsole("\nERRO! Quantidade de bytes para alocação incorreta. Você está tentando alocar 0 bytes.");
		return 0;
	}
	for(i = 0; i < nBlocks; i = i + 2)
	if (Blocks[i].isAvailable && Blocks[i].size >= length)
	break;
	else if(!Blocks[i].isAvailable)
	i--;
	if(i >= nBlocks){
		atualizarConsole("Erro na alocação de memória. Estouro de pilha.");
		return 0;
	}
	if(Blocks[i].size == length){
		if(Blocks[i-1] instanceof MemoryBlock && !Blocks[i-1].isAvailable){
			Blocks[i-1].size += length;
			start = Blocks[i].start;
			if(Blocks[i+1] instanceof MemoryBlock && !Blocks[i+1].isAvailable){
				Blocks[i-1].size += Blocks[i+1].size;
				Blocks.splice(i+1,1);
			}
			Blocks.splice(i,1).start;
			return start;
		}
		else if (Blocks[i-1] instanceof MemoryBlock){
			Blocks[i].isAvailable = false;
			if(Blocks[i+1] instanceof MemoryBlock && !Blocks[i+1].isAvailable){
				Blocks[i].size += Blocks[i+1].size;
				start = Blocks[i].start;
				Blocks.splice(i+1, 1);
				return start;
			}
			return Blocks[i].start;
		}

	}
	if(Blocks[i-1] instanceof MemoryBlock && !Blocks[i-1].isAvailable){
		Blocks[i-1].size += length;
		start = Blocks[i].start;
		Blocks[i].start += length;
		Blocks[i].size -= length;
		return start;
	}
	else if(Blocks[i-1] instanceof MemoryBlock){
		start = Blocks[i].start;
		Blocks[i].start += length;
		Blocks[i].size -= length;
		Blocks.splice(i, 0, new MemoryBlock(start, length, false));
		return start;
	}
	else if(i == 0){
		if(Blocks[i+1] instanceof MemoryBlock && !Blocks[i+1].isAvailable){
			Blocks[i+1].start -= length;
			Blocks[i+1].size += length;
			start = Blocks[i+1].start;
			Blocks.splice(i,1);
		}
		else{
			start = Blocks[0].start;
			Blocks[0].start += length;
			Blocks[0].size -= length;
			Blocks.splice(0, 0, new MemoryBlock(start, length, false));
		}
		return start;
	}
}

//Função para zerar o gerenciador de memória e liberar todo o espaço
function SetAllMemoryFree(){
	Blocks = [];
	Blocks[0] = new MemoryBlock(StartAddressMemory, stacksize-StartAddressMemory, true);
}

//Função para liberar espaços de memória alocados.
function MemoryFree(start, length){
	var i, half, left, right;
	if(start+length > Blocks[Blocks.length-1].start + Blocks[Blocks.length-1].size){
		console.log("Posição de memória não existe.");
		return;
	}
	left = 0;
	right = Blocks.length-1;
	while(left <= right){
		half = left+right >> 1;
		if(start > Blocks[half].start)
		left = half+1;
		else
		right = half-1;
	}
	if(right < 0)	right++;
	if(Blocks[right].start <= start && start < Blocks[right].start + Blocks[right].size)
	i = right;
	else if(Blocks[right+1] instanceof MemoryBlock && Blocks[right+1].start == start)
	i = right+1;
	else{
		console.log("Não foi encontrado");
		debugger;
		return;
	}

	if(start+length <= Blocks[i].start+Blocks[i].size){
		if(Blocks[i].isAvailable)
		return;
		if(Blocks[i].start < start){
			var size = Blocks[i].size;
			Blocks[i].size = start - Blocks[i].start;
			size -= Blocks[i].size;
			size -= length;
			if(size > 0){
				Blocks.splice(i+1, 0, new MemoryBlock(start+length, size, false));
				Blocks.splice(i+1, 0, new MemoryBlock(start, length, true));
			}
			else{
				if(Blocks[i+1] instanceof MemoryBlock && Blocks[i+1].isAvailable){
					Blocks[i+1].start = start;
					Blocks[i+1].size += length;
				}
				else {
					Blocks.splice(i+1, 0, new MemoryBlock(start, length, true));
				}
			}
		}
		else{
			if(Blocks[i].size == length){
				if(Blocks[i-1] instanceof MemoryBlock && Blocks[i-1].isAvailable){
					Blocks[i-1].size += length;
					Blocks.splice(i,1);
				}
				else
				i++;
				if(Blocks[i] instanceof MemoryBlock && Blocks[i].isAvailable){
					Blocks[i-1].size += Blocks[i].size;
					Blocks[i-1].isAvailable = true;
					Blocks.splice(i,1);
				}
				else
				Blocks[i-1].isAvailable = true;
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
	}
	else {
		var firstByte = Blocks[i].size + Blocks[i].start;
		var CorrectSize = firstByte - start;
		MemoryFree(start, CorrectSize);
		MemoryFree(firstByte, length-CorrectSize);
	}
}

//Testar gerenciador de memória
function testBlocks(){
	var nBlocks = Blocks.length;
	var i;
	for (i = 0; i < nBlocks-1; i++){
		if(Blocks[i].isAvailable && Blocks[i+1].isAvailable)
		console.log("Índice "+i+" não juntou");
		if(!Blocks[i].isAvailable && !Blocks[i+1].isAvailable)
		console.log("Índice "+i+" não juntou");
		if(Blocks[i].size <= 0)
		console.log("Índice "+i+" de tamanho inválido.");
	}
}

function testAloc(n){
	var i;
	var date = new Date;
	var time = date.getTime();
	for(i = 0; i < n; i++){
		if(Math.random() < 0.5)
		MemoryAloc(Math.random() * 10|1);
		else
		MemoryFree(stacksize*Math.random()|1, Math.random() * 10|1);
	}
	date = new Date;
	console.log('Tempo: '+(date.getTime()-time));
}

//Função para gerar uma hash do código fonte compilado.
function GetHashCode(str) {
	debugger;
	var hash = 0, i;
	if (str.length == 0)
	return hash;
	for (i in str) {
		hash  = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
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
		outputConsole.value = StringFilter(outputConsole.value+string);
    outputConsole.scrollTop = outputConsole.scrollHeight;
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

function StringAlloc(str, sAddress, SelfDestruct){
	var i, len = str.length, head, head0;
	if(len >= 256)
	 len = 255;
	if(sAddress == undefined)
	head = MemoryAloc(len+1);
	else
	head = sAddress;
	head0 = head;
	if(SelfDestruct)
	StringLiteral.unshift(head0);
	s.setUint8(head, len);
	for(i = 0; i < len; i++){
		head++;
		s.setUint8(head, str.charCodeAt(i));
	}
	return head0;
}

function StringCopy(head){
	if(head == 0)
	return 0;
	var len = s.getUint8(head);
	var sAddress = MemoryAloc(len+1);
	var i = 0;
	while (i <= len) {
		s.setUint8(sAddress+i, s.getUint8(head+i));
		i++;
	}
	return sAddress;
}

function StringSearch(head0, head1){
	var i=1, x=1, len0 = StringLength(head0), len1 = StringLength(head1);
	if(StringLiteral.indexOf(head0) != -1){
		StringFree(head0);
		StringLiteral.splice(StringLiteral.indexOf(head0), 1);
	}
	if(StringLiteral.indexOf(head1) != -1){
		StringFree(head1);
		StringLiteral.splice(StringLiteral.indexOf(head0), 1);
	}
	if(len0 < len1 || len0 == 0 || len1 == 0)
	return 0;
	while (i <= len0) {
		while(getChar(head0, i) == getChar(head1, x))
		if(x >= len1)
		return i-len1+1;
		else{
			i++;
			x++;
		}
		x = 1;
		i++;
	}
	return 0;
}

function StringUpper(head){
	if (head == 0)
	return 0;
	var sLiteral = StringLiteral.indexOf(head);
	var len = s.getUint8(head);
	var sAddress;
	if(sLiteral != -1){
		sAddress = head;
		StringLiteral.splice(sLiteral,1);
	}
	else
	sAddress = MemoryAloc(len+1);
	var i = 0;
	s.setUint8(sAddress, len);
	sAddress++;
	head++;
	while (i < len) {
		s.setUint8(sAddress+i, String.fromCharCode(s.getUint8(head+i)).toLocaleUpperCase().charCodeAt());
		i++;
	}
	return sAddress-1;
}

function StringLower(head){
	if (head == 0)
	return 0;
	var sLiteral = StringLiteral.indexOf(head);
	var len = s.getUint8(head);
	var sAddress;
	if(sLiteral != -1){
		sAddress = head;
		StringLiteral.splice(sLiteral,1);
	}
	else
	sAddress = MemoryAloc(len+1);
	var i = 0;
	s.setUint8(sAddress, len);
	sAddress++;
	head++;
	while (i < len) {
		s.setUint8(sAddress+i, String.fromCharCode(s.getUint8(head+i)).toLocaleLowerCase().charCodeAt());
		i++;
	}
	return sAddress-1;
}

function StringFree(head){//Libera memória
	MemoryFree(head, s.getUint8(head));
}
function StringLength(head){	//Retorna o tamanho da string
	if(head == 0)
	return 0;
	return s.getUint8(head);
}
function getString(head){	//Retorna a string
	if(head == 0)
	return 0;
	var str = "", len = s.getUint8(head);
	if(StringLiteral.indexOf(head) != -1){
		StringLiteral.splice(StringLiteral.indexOf(head), 1);
		StringFree(head);
	}
	head++;
	for(var i = head; i < head+len; i++){
		str += String.fromCharCode(s.getUint8(i));
	}
	return str;
}
function getChar(head,pos){//busca uma caractere em uma posição de uma string
	if(head == 0 || pos == 0)
	return 0;
	return s.getUint8(head+pos);
}

function setChar(head, char, pos){	//Seta um caractere em uma posição de uma string
	if(head == 0 || pos == 0)
	return 0;
	s.setUint8(head+pos, char);
}
function setStr(head, str, pos){		//Seta uma string em outra string
	var len = str.length + s.getUint8(head);
	var len0 = s.getUint8(head);
	var len1 = str.length;
	var i = 1;
	if(len >= 256)
	len = 255;
	if(pos == 0)
	return 0;
	if (pos < 0)
	pos = pos + 1 + len0;
	head0 = MemoryAloc(len+1);
	s.setUint8(head0, len);
	while (i < pos){
		s.setUint8(head0+i, s.getUint8(head+i));
		i++;
	}
	var x = 0;
	while (x < len1){
		s.setUint8(head0+i, str.charCodeAt(x));
		i++;x++;
	}
	while (pos <= len0) {
		s.setUint8(head0+i, s.getUint8(head+pos))
		i++;pos++;
	}
	MemoryFree(head, s.getUint8(head));
	return head0;
}

function isLetter(char){
	var a = "a".charCodeAt();
	var A = "A".charCodeAt();
	var z = "z".charCodeAt();
	var Z = "Z".charCodeAt();
	char = char.charCodeAt();
	return char >= a && char <= z || char >= A && char <= Z
}

function isNumber(n){
	n = n.charCodeAt();
	var _0 = "0".charCodeAt();
	var _9 = "9".charCodeAt();
	return n >= _0 && n <= _9;
}

function mostrarModalOutput(){
	$('#modalOutput').modal('show');
	$('#scriptBox').focus();
}

function esconderModalOutput(){
	$('#modalOutput').modal('hide');
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

function carregaVariaveis(start){//str_tab
	var value;
	console.log("inicio");
	while(tab[start] instanceof Ttab && tab[start].obj != "prozedure" && tab[start].obj != "funktion" && tab[start].name != "") {
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
				if (s.getInt32(display[tab[start].lev]+tab[start].adr) != 0)
				value = getString(s.getInt32(display[tab[start].lev]+tab[start].adr));
				else
				value = "";
				break;
				default:
				value = s.getInt32(display[tab[start].lev]+tab[start].adr);
			}
			if(tab[start].typ == "records"){
				// var lv = tab[start].lev;
				// adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
				// do {
				// 	start++;
				// 	adicionarObjetoFilho(tab[start].name, value, start, tab[start].lev, tab[start].adr);
				// } while (tab[start].lev > lv);
				// continue;
				if (tab[start].obj == "variable") {
					var ref = tab[start].ref;
					adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
					if (ref !== undefined && ref !== 0) {
						var prox = (btab[ref].last);
						if (prox !== undefined && prox !== 0) {
							do {
								start++;
								adicionarObjetoFilho(tab[prox].name, value, prox, tab[prox].lev, tab[prox].adr);
								prox = tab[prox].link;
							} while (prox !== 0);
						}
					}
				}

			}
			if((tab[start].obj == "variable" || tab[start].obj == "konstant")){
				console.log(tab[start]);
				adicionarObjetoVar(tab[start].name, value, start, tab[start].lev, tab[start].adr);
			}
			start++;
		}
	}
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
				else if(typ == chars){
					input.value = String.fromCharCode(input.value);
				}
				else if(typ == strings)
				input.value = getString(value);
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
	var row = table.insertRow(3);
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
//funcao para salvar as variaveis editadasstr_tab
function eachObjetoTabela(objeto){
	var input = document.getElementById(objeto.idtab);
	if(input != null){
		switch (tab[objeto.idtab].typ) {
			case "strings":
			var adr = s.getInt32(objeto.adr);
			StringAlloc(input.value);
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
