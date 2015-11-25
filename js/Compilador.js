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

var iniciaCompilador = function iniciaCompilador(codbox){
	var cont_for; 						//contador para o laço for que será usado para andar caracter a caracter.
	var linha = 0;
	var logico = false;
	var lista_var = "";
	var codigo_final="";					//A variável codigo final irá receber a string contendo os comandos que o intertepretador deverá executar.
	var cod_linha, comando = "";		//Variável comando armazena a palavra que está sendo lida.
	var codigo = codbox.split("\n");			//O comando split vai dividir o codigo pelas suas linhas e atribuir cada uma a uma posição do arranjo.
	var i = 0;			//variável i irá percorrer o vetor de string com os nomes da váriaveis declaradas.						
	for (cont_for = 0; cont_for < codigo[linha].length; cont_for++){
		if (codigo[linha].substring(0,2) == "//"]){//Verifica linha de comentário.
			linha++;
			cont_for = 0;		//Caso seja um comentário, existe a quebra de linha e cont_for recebe zero para o primeiro caracter da próxima linha ser tratado.
			continue}		
		
		if (codigo[linha].substring(cont_for, cont_for++) == " "){
				if(comando == "")		continue;		//Após encontrado um espaço o sistema verifica se ja existe algum caracter em análise, caso contrário entende-se que é o primeiro espaço na linha e ignora-o
				else{											//Caso ja exista algum caracter em análise, significa que alguma palavra foi formada, e então começa a análise da palavra.
					if(lista_var != ""){
						i = 0;
						while(lista_var[i] != NULL]){
								if(lista_var[i] == comando]){		//Caso a palavra encontrada seja igual a id de uma variável, entende-se que é um possível comando de atribuição.
									var tokens = comandoAtrib(codigo[linha], lista_var);				//Chama a função comandoAtrib que irá receber a linha inteira, analisar e construir o comando para o compilador caso esteja correto.	
										if(tokens != 0)	codigo_final = codigo_final+tokens;	
										else	alert("Problema ao gerar um codigo de atribuição.");
								}						
							}
						}
		comando = comando+codigo[linha].substring(cont_for, cont_for++);	
	}
}
var comparaToken = function(codigo){
		var id, contador;
		for(contador = 0; contador < codigo.length; contador++){
			if 	()
		}
}
var comandoAtrib = function(linha_comando, lista_var){
	var contador=0		//A variável contador irá percorrer a linha de comando.
	var resultadoCodigo 	//A variavel resultadoCodigo irá armazenar os tokens para retornar a função principal
	var temp;
	while (true)){
		temp = geraToken(contador, linha_comando);
		if (lista_var.indexOf(temp) != -1 && contador == 0){
			resultadoCodigo = "77("+lista_var.indexOf(temp)","	};
		contador = linha_comando.indexOf("=");
		if (contador == -1){
			return 0;}
		else{
			temp = geraToken()}
		
		
		}
			
	}

