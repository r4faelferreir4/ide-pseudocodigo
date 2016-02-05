/*Codigo inicial: Jacons Morais e Rafael Ferreira.
	Palavras reservadas a serem trabalhadas.
	se fimse;
	para, de, ate, faca, fimpara;
	enquanto, fimenquanto;
	funcao, variavel, leia, escreva, algoritimo

Tipos de variáveis:
	real, caracter, inteiro, logico.
Operadores:
	e, ou, nao, +, -, /, *, >, <, <>, >=, <=
*/
var listaSimbolos;
var setorCodigo=1;	//Um codigo em português estruturado tem 3 niveis, nomeação, declaração de variáveis e o corpo em sí, está variável irá armazenar em qual setor o compilador está lendo agora.
var iniciaCompilador = function iniciaCompilador(codbox){
	var codigo = codbox.split("\n");			//O comando split vai dividir o codigo pelas suas linhas e atribuir cada uma a uma posição do arranjo.
	var i = 0;			//variável i irá percorrer o vetor de string com os nomes da váriaveis declaradas.
	var contador;
	var retorno;
	var linha=0;
	var codigoFINAL="";
	alert("Compilador Iniciado!");
	alert(codigo[linha]);
	for (contador = 0; contador < codigo[linha].length; contador++){
		if (codigo[linha].(0,2) == "//"]){//Verifica linha de comentário.
			linha++;
			cont_for = 0;		//Caso seja um comentário, existe a quebra de linha e cont_for recebe zero para o primeiro caracter da próxima linha ser tratado.
			continue}
		switch codigo[linha].charAt(contador){
			case "="	:
					retorno = comandoAtrib(codigo[linha]);	//Verifica possivel comando de atribuição pelo simbolo e chama o metódo.
			break;
			case "("	:			//Tratar se, continue, enquanto, leia, caso.
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("se ") != -1 || codigo[linha].substring(0,contador++).toLowerCase().indexOf("se(") != -1{
					retorno = comandoSE(codigo[linha]);}					//Caso seja encontrado uma palavra reservada "se", chama o método comandoSE para analisar a linha do codigo.
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("enquanto ") != -1 || codigo[linha].substring(0, contador++).toLowerCase().indexOf("enquanto(") != -1){	//Caso seja encontrado um possivel comando enquanto, chama o método comandoEnquanto para analisar a linha de codigo.
					retorno = comandoEnquanto(codigo[linha]);}
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("leia ") != -1 || codigo[linha].toLowerCase().substring(0, contador++).indexOf("leia(") != -1)		{
					retorno = comandoLeia(codigo[linha]);}
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("continue " != -1 || codigo[linha].substring(0, contador++).toLowerCase().indexOf("continue(") != -1)){
					retorno = comandoContinue(codigo[linha]);}
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("enquantofor ") != -1 || codigo[linha].substring(0, contador++).toLowerCase().indexOf("enquantofor(") != -1){
					retorno = comandoEnquantoFor(codigo[linha]);}
			break;
			case ":":
				retorno = declaraVariavel(codigo[linha]);
			break;
			case "\"":
				if (codigo[linha].substring(0, contador).toLowerCase().indexOf("algoritmo") != -1 || codigo[linha].substring(0, contador++).toLowerCase().indexOf("algoritmo\"") != -1){
					retorno = nomeAlgoritmo(codigo[linha]);}
			break;

		}
	}
}
var comandoSE = function comandoSE(codigo){
	alert("Comando SE");}
var comandoEnquanto = function comandoEnquanto(codigo){
	alert("Comando ENQUANTO");}
var comandoLeia = function comandoLeia(codigo){
	alert("Comando LEIA");}
var comandoContinue = comandoContinuefunction(codigo){
	alert("Comando CONTINUE");}
var comandoEnquantoFor = function comandoEnquantoFor(codigo){
	alert("Comando ENQUANTOFOR");}
var declaraVariavel = function declaraVariavel(codigo){
	alert("Declaração de variável");}
var nomeAlgoritmo = function nomeAlgoritmo(codigo){
	alert("Nomeação de algoritmo.");}
