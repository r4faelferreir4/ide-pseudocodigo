//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//

function programa(){
//VARIÁVEIS CONSTANTES
    var nkw = 27;		//Nº de palavras chave
    var alng = 10;		//Nº de caracteres significativos nos identificadores
    var llng = 120;		//Tamanho da linha de entrada
    var emax = 322;		//Exponente máximo para numeros reais
    var emin = -292;	//Exponente minimo para numeros reais
    var kmax = 15;		//Numero maximos de digitos significativos
    var tmax = 100;		//Tamanho da tabela
    var bmax = 20;		//Tamanho da tabela de blocos
    var amax = 30;		//Tamanho da tabela de arranjos
    var c2max = 20		//Tamanho  da tabela de numeros constantes
    var csmax = 30; 	//Numero máximo de casos
    var cmax = 850;		//Tamanho do código
    var lmax = 7;		//Nível máximo
    var smax = 600;		//Tamanho da tabela de strings
    var ermax = 58;		//Nº máximo de erros
    var omax = 63;		//Ordem do código de alto nível
    var xmax = 1000;	//131071 2**17 - 1
    var nmax = 32767	//281474976710655 2**48-1
    var lineleng = 136;	//Tamanho da linha de saída
    var linelimit = 200;
    var stacksize = 1500;

//TIPOS DEFINIDOS

    var xstring;  //Não é necessário atribuir uma string com tamanho definido
    var symbol = {intcon, realcon, charcon, stringsy, notsy, plus, minus, times, idiv, rdiv, imod, andsy, orsy, eql, neq, gtr, geq, lss, leq, lparent, rparent, lbrack, rbrack, comma, semicolon, period, colon, becomes, contsy, typesy, varsy, funcionsy, proceduresy, arraysy, recordsy, programsy, ident, beginsy, ifsy, casesy, repeatsy, whilesy, forsy, endsy, elsesy, untilsy, ofsy, dosy, tosy, downtosy, thensy};
    var index = new Array(xmax*2);    //Intervalo entre -xmax e +xmax
    var alfa = new Array(alng);
    var object2 = {konstant, variable, type1, prozedure, funktion};
    var types = {notyp, ints, reals, bools, chars, arrays, records};
    var symset;
    var typeset;
    var item = {typ: types, ref: index};
    var order = {
      f : new Array[omax*2];    //Intervalo -omax .. +omax
      x : new Array[lmax*2];    //Intervalo -lmax .. +lmax
      y : new Array[nmax*2];    //Intervalo -nmax .. +lmax
    }

//DECLARAÇÃO DE VARIÁVEIS

    var InputFile;
    var sy = symbol;
    var id = alfa;
    var inum;
    var rnum;
    var sleng;
    var ch;
    var line;
    var cc;
    var lc;
    var ll;
    var errs;
    var errpos;
    var progname;
    var iflag;
    var oflag;
    var constbegsys;
    var typebegsys;
    var blockbegsys;
    var facbegsys;
    var statbegsys;
    var key = new Array(nkw);
    var ksy = new Array(nkw);
    var sps = new Array()

}
