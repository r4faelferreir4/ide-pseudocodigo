//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//VARIÁVEIS COMPILADOR
var nkw = 27;		//Nº de palavras chave
var alng = 10;		//Nº de caracteres significativos nos identificadores
var llng = 120;		//Tamanho da linha de entrada
var emax = 500;		//Exponente máximo para numeros reais
var emin = -500;	//Exponente minimo para numeros reais
var kmax = 40;		//Numero máximo de digitos significativos
var tmax = 100;		//Tamanho da tabela
var bmax = 20;		//Tamanho da tabela de blocos
var amax = 30;		//Tamanho da tabela de arranjos
var c2max = 20;		//Tamanho  da tabela de numeros constantes
var csmax = 30; 	//Numero máximo de rótulos
var cmax = 1500;		//Tamanho do código
var smax = 600;		//Tamanho da tabela de strings
var ermax = 100;		//Nº máximo de erros
var omax = 63;		//Ordem do código de alto nível
var xmax = 1000;	//131071 2**17 - 1
var nmax = 2147643648;	//281474976710655 2**48-1
var lmax = 10;		//Nível máximo de chamadas de rotinas
var stacksize = (1024*1024)*20;   //20 megabytes de espaço
var TAM_REAL = 8;   //Tamanho em bytes do tipo real
var TAM_INT = 4;    //Tamanho em bytes do tipo inteiro
var TAM_BOOL = 1;   //Tamanho em bytes do tipo logico
var TAM_CHAR = 1;   //Tamanho em bytes do tipo caractere
var finalInst;      //Armazena o índice da última instrução do programa.
var SourceCode;     //Armazena o código fonte compilado.

//VARIÁVEIS INTERPRETADOR
var ir; //Instrução a ser executada.
var lncnt, ocnt, blkcnt, chrcnt, pc;//contadores
var ps = "";
var ps1 = ["run", "fin", "caschk", "divchk", "inxchk", "stkchk", "linchk",
"lngchk", "redchk"];
var t; //índice do topo da pilha temporária
var b; //índice base pilha temporária
var StartAddressMemory; //índice base alocação de memória gerenciada
var ttx; //índice do topo de alocação de memória
var h1, h2, h3, h4;     //Índices auxiliaries para as tabelas
var fld = new Array(4);//tamanho padrão dos campos
var display = new Array(lmax);    //Display para acesso aos níveis de escopo
var stack = new ArrayBuffer(stacksize);     //Pilha de memória.
var s = new DataView(stack);//Visualizador da pilha
var call_read = false;  //flag para leitura de informação do teclado
var read_ok = false;    //flag se já leu uma informação do teclado
var debug_op = false;  //flag para modo debug
var stopln;   //Linha de parada para o depurador
var debug = false;//Parar em debugger
var indebug = false; //operação linha-a-linha entrando em rotinas
var outdebug = false; //sair da rotina
var bydebug = false;  //operação linha-a-linha pulando rotinas
var out = [];     //Vetor de posições para saída de funções
var CursorRun = false;  //Flag para o comando runToCursor;
var firstLine;      //Irá armazenar a primeira linha da rotina em execução.
var sNumber;      //StackNumber Armazena o tamanho da pilha de chamadas.
var lineLimit = 200;    //Limite de linhas do console de saída.
var StringLiteral = [];	//Arranjo com os valores literais de string a serem auto liberados após uma operação
var codeChanged = false; //variavel para controlar se o codigo foi alterado
function MemoryBlock(start, size, isAvailable){   //Objeto para gerenciamento de memória
	this.start = start;
	this.size = size;
	this.isAvailable = isAvailable;
}
var Blocks = [];   //Vetor de blocos de gerenciamento de memória.

//TIPOS DEFINIDOS

var symbol;// = ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
//"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
//"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var symbol1 =  ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
//var index = [xmax*2];    //Intervalo entre -xmax e +xmax
//var alfa = [alng+1];
var object2;// = ["konstant", "variable", "type1", "prozedure", "funktion"];
var object1 = ["konstant", "variable", "type1", "prozedure", "funktion"];
var types = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records", "strings", "pointers"];
var types1 = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records","strings", "pointers"];
var symset = ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var typeset = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records", "strings"];
function item(typ, ref){
  this.typ = typ;
  this.ref = ref;
}
function order(f, x, y, z, line){
  this.f = f;
  this.x = x;
  this.y = y;
  this.z = z;
  this.line = line;
}
function conrec(tp, i, r){
  this.tp = tp;
  this.r = r;
  this.i = i;
}
function xtp(tp, rf, sz){
  this.tp = tp;
  this.rf = rf;
  this.sz = sz;
}


//record
//DECLARAÇÃO DE VARIÁVEIS COMPILADOR

var InputFile;    //Variável que irá armazenar o código, cada linha será armazenada em uma posição do vetor de strig
var sy="";  //Ultimo simbolo lido por insymbol
var id;    //Identificador de insymbol
var inum;         //Inteiro de insymbol
var rnum;         //Real de insymbol
var sleng;        //Tamanho da string de insymbol
var ch = "";           //Ultimo caracter lido do código fonte
var line = "";         //Ultima linha lida
var cc;           //Contagem de caracteres
var lc;           //Contador do programa
var ll;           //Tamanho da linha atual
var ilnx;       //Posição da linha no ultimo caracter lido
var ccx;      //Posição da coluna no ultimo caracter lido
var changed = false;    //flag para mudança de linha de símbolo
var linecount;    //Linha do ultimo símbolo lido
var charcount;     //coluna do ultimo símbolo lido
var errs = [];    //Lista de erros
var errpos;       //Posição do erro
var progname;
var iflag, oflag;
var constbegsys = [];
var typebegsys = [];
var blockbegsys = [];
var facbegsys = [];
var statbegsys = [];
var key = [];   //Tipo alfa não especificado, lembrar de tratar isso depois
var ksy = [];   //Tipo symbol não especificado, lembrar de tratar isso depois
var sps = [];      //Simbolos especiais, tipo symbol não especificado
var csps = [];    //Caracteres de simbolos especiais
var xsps = [];  //Símbolos especiais com índice numerico
var nsps = []    //Nome dos símbolos especiais
var xname;
var t, a, b, sx, c1, c2;    //Indices para tabelas
var stantyps;
var display = [];
var tab = [];   //Tabela de símbolos
var atab = [];  //Tabela auxiliar arranjos
var btab = [];  //Tabela auxiliar blocos
var stab = [];  //Tabela string literal
var rconst = new Array(c2max);    //Tabela de constantes reais
var kode = [];
var iln = 0;  //contador de caracteres total
var indexmax;  //Tamanho total do código
var isOk = true;    //Verifica se o código foi compilado corretamente
var isDone = false; //Verifica se o código foi compilado
var MsgErro = ""; //Mensagem de erro para o usuário.
var debug;  //flag para ponto de parada da palavra "depurar"
var time;   //Tempo de compilação/execução
var lastCompiledCode = 0;	//Hash com o último código fonte compilado.
function Ttab(name, link, obj, typ, xtyp, ref, normal, lev, adr){
  this.name = name;
  this.link = link;
  this.obj = obj;
  this.typ = typ;
  this.xtyp = xtyp;
  this.ref = ref;
  this.normal = normal;
  this.lev = lev;
  this.adr = adr;
}
function Tatab(inxtyp, eltyp, elxtyp, elref, low, high, elsize, size){
  this.inxtyp = inxtyp;
  this.eltyp = eltyp;
	this.elxtyp = elxtyp;
  this.elref = elref;
  this.low = low;
  this.high = high;
  this.elsize = elsize;
  this.size = size;
}

function Tbtab(last, lastpar, psize, vsize){
  this.last = last;
  this.lastpar = lastpar;
  this.psize = psize;
  this.vsize = vsize;
}
