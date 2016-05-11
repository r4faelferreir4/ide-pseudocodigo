//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//VARIÁVEIS COMPILADORdebuggeremit1(linecount, 21)
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
var stacksize = (1024*1024)*5;   //5 megabytes de espaço
var TAM_REAL = 8;   //Tamanho em bytes do tipo real
var TAM_INT = 4;    //Tamanho em bytes do tipo inteiro
var TAM_BOOL = 1;   //Tamanho em bytes do tipo logico
var TAM_CHAR = 1;   //Tamanho em bytes do tipo caractere
var str_tab = [];   //Vetor de listas para armazenar strings
var finalInst;      //Armazena o índice da última instrução do programa.

//VARIÁVEIS INTERPRETADOR
var ir; //buffer de instrução
var lncnt, ocnt, blkcnt, chrcnt, pc;//contadores
var ps = "";
var ps1 = ["run", "fin", "caschk", "divchk", "inxchk", "stkchk", "linchk",
"lngchk", "redchk"];
var t; //índice do topo da pilha temporária
var b; //índice base pilha temporária
var ax; //índice base alocação de memória
var ttx; //índice do topo de alocação de memória
var h1, h2, h3, h4;
var fld = new Array(4);//tamanho padrão dos campos
var display = new Array(lmax);
var stack = new ArrayBuffer(stacksize);
var s = new DataView(stack);//new Array(stacksize);
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

//TIPOS DEFINIDOS

var xstring;  //Não é necessário atribuir uma string com tamanho definido
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
//DECLARAÇÃO DE VARIÁVEIS

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
var tab = [];
var atab = [];
var btab = [];
var stab = [];
var rconst = new Array(c2max);
var kode = [];
var iln = 0;  //contador de caracteres total
var indexmax;  //Tamanho total do código
var isOk = true;    //Verifica se o código foi compilado corretamente
var isDone = false; //Verifica se o código foi compilado
var MsgErro = ""; //Mensagem de erro para o usuário.
var debug;  //flag para ponto de parada da palavra "depurar"
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
function Tatab(inxtyp, eltyp, elref, low, high, elsize, size){
  this.inxtyp = inxtyp;
  this.eltyp = eltyp;
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

function initArray(){
  var j = 0;
  console.log("iniciando tab");
  do{
    tab[j] =  new Ttab();
    j++;
  }while(j < tmax);
  j = 0;
  console.log("tab iniciada");
  do{
    atab[j] = {inxtyp: [""], eltyp: [""], elref: 1, low: 1, high: 1, elsize: 1, size: 1 };
    j++;
  }while(j < amax);
  j = 0;
  console.log("atab iniciada");
  do{
    btab[j] = {last: 0, lastpar: 0, psize: 0, vsize: 0};
    j++;
  }while(j < bmax);
  j = 0;
  console.log("btab iniciada");
  do{
    kode[j] = new order();
    j++;
  }while( j < cmax);
  j = 0;
  console.log("kode iniciada");
}

function compiladorPascalS(){
  InputFile = InputFile.split("\n");
  indexmax = InputFile.length;

  function ErrorMsg(code){
    var k, Msg = [];
    Msg[0] = "Identificador \'"+id+"\' não reconhecido."; Msg[1] = "Declarações múltiplas não são permitidas.";
    Msg[2] = "Está faltando um identificador."; Msg[3] = "Está faltando a palavra reservada \'programa\' no inicio do código." ;
    Msg[4] = "Está faltando o delimitador \')\'."; Msg[5] = "Está faltando o caractere \':\'.";
    Msg[6] = "Erro de sintaxe."; Msg[7] = "O ponto e vírgula não é necessário ao final da instrução.";
    Msg[8] = "Está faltando a palavra reservada \'de\'."; Msg[9] = "Está faltando o delimitador \'(\'.";
    Msg[10] = ""; Msg[11] = "está faltando o delimitador \'[\'.";
    Msg[12] = "Está faltando o delimitador \']\'."; Msg[13] = "Está faltando os caracteres \'..\' para especificar o intervalo do arranjo.";
    Msg[14] = "Está faltando o ponto e vírgula."; Msg[15] = "Tipo de retorno de função não suportado.";
    Msg[16] = "Está faltando o caractere \'=\'."; Msg[17] = "A expressão precisa retornar como resultado um valor lógico.";
    Msg[18] = "Tipo de dado da variável não suportado pela instrução \'para\'."; Msg[19] = "O tipo dos valores de inicio, fim e passo da instrução \'para\' precisam ser iguais ao tipo da variavel inicial.";
    Msg[20] = ""; Msg[21] = "Número muito grande.";
    Msg[22] = ""; Msg[23] = "Tipo de dado não suportado pela instrução \'caso\'.";
    Msg[24] = "Caracter \' "+line[cc-1]+" \' não reconhecido."; Msg[25] = "o identificador \'"+id+"\' precisa ser uma constante.";
    Msg[26] = "Este tipo de índice não é permitido para este arranjo."; Msg[27] = "Os limites inferior e superior deste arranjo estão irregulares.";
    Msg[28] = "A variável \'"+id+"\' não é do tipo arranjo nem string, você não pode utilizar colchetes."; Msg[29] = "O identificador "+id+" não é um tipo de dado.";
    Msg[30] = "Tipo indefinido."; Msg[31] = "A variável \'"+id+"\' que você está tentando acessar um atributo não é do tipo \'registro\'. ";
    Msg[32] = "Operadores lógicos como \'e\', \'ou\' e \'nao\' só podem ser usados com variáveis ou expressões que resultam em um dado do tipo lógico."; Msg[33] = "tipo de dado não permitido para expressões aritméticas.";
    Msg[34] = "A variável nessa expressão precisa ser do tipo \'inteiro\'."; Msg[35] = "tipo de dado não permitido para expressões relacionais.";
    Msg[36] = "Tipo do parametro incorreto."; Msg[37] = "O identificador "+id+" precisa ser uma variável.";
    Msg[38] = "A literal do tipo string não pode ser vazia."; Msg[39] = "você está passando parametros não declarados nessa chamada.";
    Msg[40] = "Tipo de dado não suportado pela instrução \'leia\'."; Msg[41] = "tipo de dado não suportado pela instrução \'escreva\'.";
    Msg[42] = ""; Msg[43] = "";
    Msg[44] = "Você não pode introduzir um procedimento em uma expressão"; Msg[45] = "o identificador não é uma variável.";
    Msg[46] = "Tipo incompatível para atribuição."; Msg[47] = "o tipo do rótulo na instrução \'caso\' é incompatível com a variável analisada.";
    Msg[48] = "Tipo de parametro incompatível para a função."; Msg[49] = "Pilha de execução muito pequena.";
    Msg[50] = "Constante  "; Msg[51] = "Está faltando o operador de atribuição \':=\'";
    Msg[52] = "Entao      "; Msg[53] = "Está faltando a palavra reservada \'ate\'.";
    Msg[54] = "Está faltando a palavra reservada \'faca\'."; Msg[55] = "";
    Msg[56] = ""; Msg[57] = "Está faltando o delimitador de final de bloco de instruções \'fim\'.";
    Msg[58] = "É esperado a declaração de variáveis na declaração do procediment/função após o caracter \'(\'."; Msg[59] = "O valor de índice de uma variável do tipo arranjo ou string precisa ser inteiro.";
    Msg[60] = "Operador aritmético não permitido para variáveis do tipo string.";
    Msg[61] = "Aribuições múltiplas não são permitidas para arranjos e strings.";
    Msg[62] = "Está faltando o "; Msg[63] = "O operador \'^\' só pode ser usado com variáveis do tipo ponteiro.";
    Msg[64] = "Você precisa informar um identificador na função \'alocamem\'.";
    Msg[65] = "Você precisa informar um tipo ou uma variável para alocar memória.";
    Msg[66] = "Não é permitido introduzir ( e ) após o nome do programa.";
    Msg[67] = "O 1º parâmetro do procedimento \'strinsere\' deve ser do tipo string.";
    Msg[68] = "Você não pode utilizar o operador \'@\' e \'^\' ao mesmo tempo.";
    Msg[69] = "Programa incompleto";
    return Msg[code];
  }

  //FUNÇÃO DE BUSCA DE CARACTERES
  function NextCh(){
    try{
      if (InputFile[iln] == "")  iln++;
      if (iln >= indexmax && cc > ll){
        throw new Error(69);
      }
      if (cc == ll){
        if (errpos !== 0)
        errpos = 0;
        if (iln < indexmax){
          ll = 0;
          cc = 0;
          line = InputFile[iln];
          ilnx = iln;
          iln++;
          ll = line.length;
        }
      }
      if (cc < ll){
        ccx = cc;
        ch = line[cc];
        cc++;
      }
      else
        if(iln == indexmax){
          ch = "?";
          cc++;
        }
    }
    catch(err){
      return err;
    }
  }
  //Função Error
  function Error(code, errorName, ref){
    try{
      debugger;
      if (isOk){
        var strError = ErrorMsg(code);
        var line;
        line = linecount;
        if(changed)
          line++;
        mostraErroNaLinha(line, strError);
        isOk = false;
        str = "";
        line++;
        str += "Um erro foi encontrado na linha "+line+": "+strError;
        switch(code){
          case 1:
          if (typeof errorName == "number")
            str += "\nO rótulo \'"+errorName+"\' da estrutura de decisão caso já foi declarado uma vez";
          else
            str += "\nO identificador \'"+errorName+"\' já foi declarado uma vez";
          break;
          case 2:
            switch (errorName) {
              case "progname":
                str += "\nVocê precisa atribuir um nome ao programa";
                str += "\nVeja um exemplo: "+"programa".bold()+" test()";
              break;
              case "leia":
                str = "Um erro foi encontrado na linha "+line+": "+strError;
                str += "\nVocê precisa informar uma variável como parametro para o procedimento \'leia\'";
              break;
              case "functionsy":
                str += "\nVocê precisa atribuir um nome para o procedimento/função declarado.";
                str += "\nVeja um exemplo: "+InputFile[iln-1].slice(0, cc-2)+"exemplo"+InputFile[iln-1].slice(cc-2, InputFile[iln-1].length);
              break;
              case "ref":
                str += "\nA função/procedimento que você está chamando possui parametros por refência. Você precisa informar uma variável como parametro.";
              break;
              case "colon":
                str += "\nEspera-se a identificação de uma variável após a vírgula. Para resolver o problema você pode:\n(a) Apagar a vírgula.\n(b) Informar uma nova variável.";
              break;
              case "period":
                str += "\nVocê precisa informar um atributo do registro informado após o ponto. Para este registro existem os atributos:\n";
                ref = btab[tab[ref].ref].last;
                var strReg = "";
                do {
                  strReg = "\n"+tab[ref].name + strReg;
                  ref = tab[ref].link;
                } while (tab[ref].link != 0);
                strReg = tab[ref].name + strReg;
                str += strReg;
              break;
            }
          break;
          case 6:
            if (sy == "ident"){
              str += "\nO identificador \'"+id+"\' não é esperado nesta posição.";
            }
            else {
              if (ksy.indexOf(sy) != -1){
                var ky = ksy.indexOf(sy);
                str += "\nA palavra reservada \'"+key[ky]+"\' não é esperada nesta posição.";
              }
              else {
                if (xsps.indexOf(sy) != -1){
                  var ky = xsps.indexOf(sy);
                  str += "\nO operador \'"+csps[ky]+"\' não é esperado nesta posição.";
                }
              }
            }
            if (errorName.length != 0){
              str += "\nAs seguintes palavras são permitidas nesta posição: ";
              var Errorstr = "";
              if (errorName.indexOf("ident") != -1)
                Errorstr += "variáveis, ";
              errorName.forEach(function each(value, index, obj){
                if (ksy.indexOf(value) != -1){
                  Errorstr += key[ksy.indexOf(value)]+", ";
                }
                else{
                  if (xsps.indexOf(value) != -1){
                    Errorstr += nsps[xsps.indexOf(value)]+", ";
                  }
                }
              });
              str += Errorstr.slice(0, Errorstr.length-2);
            }
          break;
          case 15:
            limparCodeBox();
            line -= 1;
            mostraErroNaLinha(line-1, strError);
            str = "Um erro foi encontrado na linha "+line+": "+strError;
            str += "\nOs tipos suportados para retorno de função são: ";
            str += "inteiro, real, logico, caracter, string.";
          break;
          case 17:
          var tp = (errorName == "ints")?"inteiro":(errorName == "reals")?"real":(errorName == "chars")?"caracter":(errorName == "strings")?"string":(errorName == "records")?"registro":(errorName =="notyp")?"sem tipo":"";
            str += "\nA expressão avaliada está retornando o tipo "+tp+".";
          break;
          case 18:
            limparCodeBox();
            str = "Um erro foi encontrado na linha "+line+": "+"O tipo de dado da variável \'"+errorName+"\' não é suportado pela instrução \'para\'.";
            mostraErroNaLinha(line-1, str);
            str += "\nA instrução \'para\' suporta os seguintes tipos de dado: inteiro, real, caracter e logico";
          break;
          case 19:
          var tp = (errorName == "ints")?"inteiro":(errorName == "reals")?"real":(errorName == "bools")?"logico":(errorName == "chars")?"caracter":(errorName == "strings")?"string":(errorName == "records")?"registro":"";
            str += "\nA variável utilizada nessa estrutura é do tipo "+tp+".";
            if (tp == "real"){
              str += "\nCaso você esteja utilizando valores literais inteiros, pode convertê-los para real adicionando o caracter \'e\' ou \'.0\' ao final do valor. Por exemplo: \n";
              str += "para r de 0e ate 5e passo 2e faca\n";
              str += "para r de 0.0 ate 5.0 passo 2.0 faca";
            }
          break;
          case 23:
            str += "\nOs tipos de dados suportados são: inteiro, logico e caracter.";
          break;
          case 26:
          var tp = (errorName == "ints")?"inteiro":(errorName == "reals")?"real":(errorName == "bools")?"logico":(errorName == "chars")?"caracter":(errorName == "strings")?"string":(errorName == "records")?"registro":"";
            str += "\nO tipo permitido para o índice deste arranjo é "+tp+".";
          break;
          case 46:
            line-=2;
            limparCodeBox();
            str = ErrorMsg(code);
            mostraErroNaLinha(line, str);
            var type1 = (errorName == "ints")?"inteiro":(errorName == "reals")?"real":(errorName == "chars")?"caracter":(errorName == "strings")?"string":(errorName == "records")?"registro":(errorName =="notyp")?"sem tipo":(errorName == "pointers")?"ponteiro":"";
            var type2 = (ref == "ints")?"inteiro":(ref == "reals")?"real":(ref == "chars")?"caracter":(ref == "strings")?"string":(ref == "records")?"registro":(ref =="notyp")?"sem tipo":(ref == "pointers")?"ponteiro":"";
            str += " Você está atribuindo um valor "+type2+" a uma variável "+type1+".";
          break;
          case 36:
            var tp = (errorName == "ints")?"inteiro":(errorName == "reals")?"real":(errorName == "bools")?"logico":(errorName == "chars")?"caracter":(errorName == "strings")?"string":(errorName == "records")?"registro":"";
            var tpref  = (ref == "ints")?"inteiro":(ref == "reals")?"real":(ref == "bools")?"logico":(ref == "chars")?"caracter":(ref == "strings")?"string":(ref == "records")?"registro":"";
            str += "\nEspera-se um parâmetro do tipo \'"+tpref+"\' mas você está passando um parâmetro do tipo \'"+tp+"\'";
          break;
          case 62:
            str += errorName+"º parâmetro.";
          break;
          case 63:
            str += " A variável informada é do tipo "+errorName+".";
          break;
          case 66:
            limparCodeBox();
            mostraErroNaLinha(linecount, strError);
            str = "Um erro foi encontrado na linha "+linecount+1+": "+strError;
          break;
        }

        MsgErro = str;
      }
    }
    catch(err){
      return err;
    }
  }

  function fatal(n){
    var Msg = [];
    try{
      Msg[0] = "identificadores";   Msg[1] = "identificadores";
      Msg[2] = "procedimentos";   Msg[3] = "reais";
      Msg[4] = "arranjos";   Msg[5] = "niveis";
      Msg[6] = "o código";   Msg[7] = "strings";
      MsgErro = "Tabela do compilador para "+ Msg[n] +" é muito pequena";
      isOk = false;
    }
    catch(err){
      return err;
    }
  }

  function insymbol(){      //Lê o próximo simbolo
    var i, j, k, e;
    if(linecount < ilnx){
      if(changed){
        linecount = ilnx;
        changed = false;
      }
      else
        changed = true;
    }
    charcount = ccx;
    function readscale(){
      var s, sign;
      try{
        NextCh();
        sign = 1;
        s = 0;
        if (ch == "+")
          NextCh();
        else {
          if (ch == "-"){
            NextCh();
            sign = -1;
          }
        }
        while (ch >= 0 && ch <= 9 && ch != " " && ch != "\t"){
          s = 10 * s + Number(ch);
          NextCh();
        }
        e = s * sign + e;
      }
      catch(err){
        return err;
      }
    }


    function AdjustScale(){
      var s, d, t;
      try{
        if ((k+e) > emax){
          Error("", "Número \'"+(k+e)+"\' é muito grande");          //Erro maximo expoente para numero real
        }
        else{
          if ((k+e) < emin)
            rnum = 0;
          else{
            s = Math.abs(e);
            t = 1.0;
            d = 10.0;
            do{
              while((s%2) === 0){      //Verifica se é par
                s = s / 2;
                d = Math.pow(d,2);
              }
              s--;
              t = d * t;
            }while(s !== 0);
            if(e >= 0)
              rnum = rnum * t;
            else
              rnum = rnum / t;
          }
        }
      }
      catch(err){
        return err;
      }
    }
    try{
      while(ch == " " || ch == "\t" || ch == "\n")  //Pula espaços em branco
        NextCh();
      ch = ch.toLowerCase(); //Torna palavras chave case insensitive
      if(ch >= "a" && ch <= "z"){
        k = 0;
        id = "";      //Seta a variavel id com espaços em branco
        do{
            k++;
            id += ch;
          NextCh();
          ch = ch.toLowerCase();
          if (cc == 1 || !isOk)
            break;
        }while(ch != " " && ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9") || ch == "_"));
      i = key.indexOf(id);
      if (i != -1){
        sy = ksy[i];
        if (sy == "debugsy"){
          if(changed){
            var line = ilnx;
            do {
              line--;
            } while (InputFile[line].length == 0);
            emit(line, 70);
          }
          else
            emit(linecount, 70);
          insymbol();
          return;
        }
      }
      else
        sy = "ident";
    }
    else {
      if (ch >= "0" && ch <= "9" && ch != " " && ch != "\t"){
        k = 0;
        inum = 0;
        sy = "intcon";
        do{
          inum = inum * 10 + Number(ch);
          k++;
          NextCh();
          if(!isOk)
            break;
        }while(ch >= 0 && ch <= 9 && ch != " " && ch != "\t");
        if(k > kmax || inum > nmax){
          Error(21);
          inum = 0;
          k = 0;
        }
        if (ch == "."){
          NextCh();
          if (ch == ".")
          ch = ":";
          else{
            sy = "realcon";
            rnum = inum;
            e = 0;
            while(ch >= 0 && ch <= 9){
              e--;
              rnum = 10 * rnum + Number(ch);
              NextCh();
              if(!isOk)
                break;
            }
            if (ch == "e")
            readscale();
            if (e !== 0)
            AdjustScale();
          }
        }
        else {
          if (ch == "e"){
            sy = "realcon";
            rnum = inum;
            e = 0;
            readscale();
            if (e !== 0)
            AdjustScale();
          }
        }
      }
      else {
        switch (ch) {
          case ":":
          NextCh();
          if (ch == "="){
            sy = "becomes";
            NextCh();
          }
          else
          sy = "colon";
          break;
          case "<":
          NextCh();
          if (ch == "="){
            sy = "leq";
            NextCh();
          }
          else
          if (ch == ">"){
            sy = "neq";
            NextCh();
          }
          else
          sy = "lss";
          break;
          case ">":
          NextCh();
          if (ch == "="){
            sy = "geq";
            NextCh();
          }
          else
          sy = "gtr";
          break;
          case ".":
          NextCh();
          if(ch == "."){
            sy = "colon";
            NextCh();
          }
          else
          sy = "period";
          break;
          case "\'":
          k = 0;
          do{
            NextCh();
            if (ch == "\'"){
              NextCh();
              if (ch != "\'")
              break;
            }
            if(ch == "\\"){
              var bar = ch;
              NextCh();
              if(ch != "\'"){
                if(ch == 'n'){
                  stab[sx+k] = String.fromCharCode(10);
                  k++;
                  continue;
                }
                else{
                  stab[sx+k] = bar;
                  k++;
                  continue;
                }
              }
            }
            if ((sx + k) == smax)
            fatal(7);
            stab[sx+k] = ch;
            k++;
            if (cc == 1)    //mudou de linha
            k = 0;
            if(!isOk)
              break;
          }while(cc != 1);
          if (k == 1){
            sy = "charcon";
            inum = stab[sx].charCodeAt();
          }
          else
          if (k == 0){
            debugger;
            //Error(38);
            sy = "stringsy";
            sleng = 1;
            stab[sx] = "";
            sx++;
          }
          else {
            sy = "stringsy";
            inum = sx;
            sleng = k;
            sx += k;
          }
          break;
          case "(":
          NextCh();
          if (ch != "*")
            sy = "lparent";
          else {    //Comentário
            NextCh();
            do{
              while (ch != "*"){
                NextCh();
                if(!isOk)
                  return;
              }
              NextCh();
            }while(ch != ")");
            NextCh();
            insymbol();
            return;
          }
          break;
          case " ":
          return;
          default:
          if (csps.indexOf(ch) != -1){
            sy = sps[ch];
            NextCh();
          }
          else{
            Error(24);
            NextCh();
            if (ch != "?")
              insymbol();
            return;
          }
        }
      }
    }
  }
  catch(err){
    return err;
  }
}//insymbol

function enter(x0, x1, x2, x3){
  try{
    t++;
    tab[t].name = x0;
    tab[t].link = t - 1;
    tab[t].obj = x1;
    tab[t].typ = x2;
    tab[t].ref = 0;
    tab[t].normal = true;
    tab[t].lev = 0;
    tab[t].adr = x3;
  }
  catch(err){
    return err;
  }
}

function EnterArray(tp, l, h){
  try{
    if (l > h)
      Error(27, l, h);
    if (Math.abs(l) > xmax || Math.abs(h) > xmax){
      Error(27, l, h);
      l = 0;
      h = 0;
    }
    if (a == amax)
      fatal(4);
    else{
      a++;
      atab[a].inxtyp = tp;
      atab[a].low = l;
      atab[a].high = h;
    }
  }
  catch(err){
    return err;
  }
}//enterarray

function EnterBlock(){
  try{
    if (b == bmax)
      fatal(2);
    else {
      b++;
      btab[b].last = 0;
      btab[b].lastpar = 0;
    }
  }
  catch(err){
    return err;
  }
}//EnterBlock

function EnterReal(x){
  try{
    if(c2 == (c2max-1))
      fatal(3);
    else {
      rconst[c2+1] = x;
      c1 = 1;
      while(rconst[c1] != x)
        c1++;
      if(c1 > c2)
        c2 = c1;
    }
  }
  catch(err){
    return err;
  }
}

function emit(line, fct){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].line = line;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit

function emit1(line, fct, b){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].y = b;
    kode[lc].line = line;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit1

function emit2(line, fct, a, b, c){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].x = a;
    kode[lc].y = b;
    kode[lc].z = c;
    kode[lc].line = line;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit2

function printtables(){
  var i;
  var o = new order();
  console.log("");
  console.log("identificadores    link obj typ ref nrm lev adr");
  for (i = btab[1].last+1; i < t; i++){
    console.log(i+"       "+tab[i].name+"  "+tab[i].link+"      "+object1.indexOf(tab[i].obj)+"     "+types1.indexOf(tab[i].typ)+"     "+tab[i].ref+"     "+ tab[i].normal.toString()+"     "+tab[i].lev+"     " +tab[i].adr);
  }
  console.log("");
  console.log("blocos       last  lpar  psze  vsze");
  for(i = 1; i < b; i++)
  console.log(i+"       "+btab[i].last+"     "+btab[i].lastpar+"     "+btab[i].psize+"     "+btab[i].vsize);
  console.log("");
  console.log("arranjos     xtyp  etyp  eref  low  high  elsz  size");
  for(i = 1; i < a; i++)
  console.log(i+"       "+types1.indexOf(atab[i].inxtyp)+"     "+types1.indexOf(atab[i].eltyp)+"     "+atab[i].elref+"     "+atab[i].low+"     "+atab[i].high+"     "+atab[i].elsize+"     "+ atab[i].size);
  console.log("");
  console.log("código: ");
  for(i = 0; i < lc-1; i++){
    if ((i % 5) === 0){
      console.log("");
      console.log("      "+i);
    }
    o = kode[i];
    console.log("     " +o.f);
    if (o.f < 31)
    if(o.f < 4)
    console.log("  "+o.x+"     "+o.y);
    else
    console.log("       "+o.y);
    else
    console.log("        ");
    console.log(",");
  }
  console.log("");
}

function block(fsys, isfun, level){
    //  var conrec = {tp: "", i: 2, r: 2.4};


    var dx;   //quatidade de bytes usado no procedimento ou função
    var prt;  //ìndice em tab para o procedimento ou função
    var prb;  //indice em btab para o procedimento ou função
    var x;

    function skip(fsys, n, sx3){
      try{
        if (n == 6){
          var i = fsys.indexOf("constsy");
          sx3 = sx3.concat(fsys.slice(0, i));
          Error(n, sx3);
        }
        else
          Error(n);
        //while(fsys.indexOf(sy) == -1)
        insymbol();

      }
      catch(err){
        return err;
      }
    }
    function test(sx3 ,s1, s2, n){
      try{
        if (s1.indexOf(sy) == -1){
          skip(s1.concat(s2), n, sx3);
        }
      }
      catch(err){
        return err;
      }
    }
    function TestSemicolon(){
      try{
        if(sy == "semicolon")
          insymbol();
        else {
          Error(14);
          if (sy == "comma" || sy == "colon")
            insymbol();
        }
        test("ident", ["ident"].concat(blockbegsys), fsys, 6);
      }
      catch(err){
        return err;
      }
    }//TestSemicolon
    function enter(id, k){
      try{
        var j, l;
        if (t == tmax)
          fatal(1);
        else {
          tab[0].name = id;
          j = btab[display[level]].last;
          l = j;
          //console.log("id: "+id+" display: "+display[level]+" tab: "+tab[j].name+" level: "+level);
          while(tab[j].name != id)
            j = tab[j].link;
          if (j !== 0)
            Error(1, tab[j].name);
          else {
            t++;
            tab[t].name = id;
            tab[t].link = l;
            tab[t].obj = k;
            tab[t].typ = "notyp";
            tab[t].ref = 0;
            tab[t].lev = level;
            tab[t].adr = 0;
            btab[display[level]].last = t;
          }
        }
      }
      catch(err){
        return err;
      }
    }//enter

    function loc(id){
      var i, j;//Loalizador de ID na tabela
      try{
        i = level;
        tab[0].name = id;
        do{
          j = btab[display[i]].last;
          while(tab[j].name != id)
            j = tab[j].link;
          i--;
        }while(!((i < 0) || (j !== 0)));
        if (j === 0)
          Error(0);
        return j;
      }
      catch(err){
        return err;
      }
    }//loc

    function entervariable(){
      try{
        if (sy == "ident"){
          enter(id, "variable");
          insymbol();
        }
        else{
          Error(2, "colon");
        }
      }
      catch(err){
        return err;
      }
    }//entervariable

    function constant(fsys, c){
      var x, sign;
      try{
        test([], constbegsys, fsys, 50);
        if(constbegsys.indexOf(sy) != -1){
          if (sy == "charcon" || sy == "stringsy"){
            if (sy == "stringsy"){
              c.tp = "strings";
              var slicearray = stab.splice(inum, inum+sleng);
              slicearray = slicearray.join("");
              c.i = slicearray;
              sx -= sleng;
              insymbol();
            }
            else {
              c.tp = "chars";
              c.i = inum;
              insymbol();
            }
          }
          else {
            sign = 1;
            if (sy == "plus" || sy == "minus"){
              if (sy == "minus")
                sign = -1;
              insymbol();
            }
            if (sy == "ident"){
              x = loc(id);
              if (x !== 0)
                if (tab[x].obj != "konstant")
                  Error(25);
                else{
                  c.tp = tab[x].typ;
                  if (c.tp == "reals")
                    c.r = sign * rconst[tab[x].adr];
                  else
                    c.i = sign * tab[x].adr;
              }
              insymbol();
            }
            else
            if (sy == "intcon"){
              c.tp = "ints";
              c.i = sign * inum;
              insymbol();
            }
            else
              if (sy == "realcon"){
                c.tp = "reals";
                c.r = sign * rnum;
                insymbol();
              }
              else
                skip(fsys, 50);
          }
          test("", fsys, [""], 6);
        }
      }
      catch(err){
        return err;
      }
    }//constant

    function typ(fsys, xtype, pointer){
      var x, eltp, elrf, elsz, offset, t0, t1;
      function arraytyp(xtype){
        var eltp, low, high, elrf, elsz;
        try{
          low = new conrec("", 0, 0);
          high = new conrec("", 0, 0);
          constant(["colon", "rbrack", "rparent", "ofsy"].concat(fsys), low);
          if (low.tp == "reals"){
            Error(26, low.i, 0);
            low.tp = "ints";
            low.i = 0;
          }
          if (sy == "colon")
            insymbol();
          else
            Error(13);
          constant(["rbrack", "comma", "rparent", "ofsy"].concat(fsys), high);
          if (high.tp != low.tp){
            Error(27);
            high.i = low.i;
          }
          EnterArray(low.tp, low.i, high.i);
          xtype.rf = a;
          if (sy == "comma"){
            insymbol();
            eltp = "arrays";
            var xtype2 = new xtp("", elrf, elsz);
            arraytyp(xtype2);
            elrf = xtype2.rf;
            elsz = xtype2.sz;
          }
          else {
            if (sy == "rbrack")
              insymbol();
            else {
              Error(12);
              if (sy == "rparent")
                insymbol();
            }
            if (sy == "ofsy")
              insymbol();
            else
              Error(8);
            var xtype3 = new xtp(eltp, elrf, elsz);
            typ(fsys, xtype3);
            eltp = xtype3.tp;
            elrf = xtype3.rf;
            elsz = xtype3.sz;
          }
          xtype.sz = (atab[xtype.rf].high - atab[xtype.rf].low + 1)*elsz;
          atab[xtype.rf].size = xtype.sz;
          atab[xtype.rf].eltyp = eltp;
          atab[xtype.rf].elref = elrf;
          atab[xtype.rf].elsize = elsz;
        }
        catch(err){
          return err;
        }
      }//arraytyp
      try{
        xtype.tp = "notyp";
        xtype.rf = 0;
        xtype.sz = 0;
        test([], typebegsys, fsys, 10);
        if (typebegsys.indexOf(sy) != -1){
          if (sy == "ident"){
            x = loc(id);
            if (x !== 0)
              if (tab[x].obj != "type1")
                Error(29);
              else {
                xtype.tp = tab[x].typ;
                if(xtype.tp == "pointers"){
                  xtype.tp = "*"+tab[x].xtyp;
                }
                xtype.rf = tab[x].ref;
                xtype.sz = tab[x].adr;
                if(xtype.tp == "notyp")
                  Error(30);
              }
            insymbol();
          }
          else
          if (sy == "arraysy"){
            insymbol();
            if (sy == "lbrack")
              insymbol();
            else {
              Error(11);
              if (sy == "lparent")
                insymbol();
            }
            xtype.tp = "arrays";
            arraytyp(xtype);
          }
          else{
            if (sy == "recordsy"){
              insymbol();
              EnterBlock();
              xtype.tp = "records";
              xtype.rf = b;
              if (level == lmax)
                fatal(5);
              level++;
              display[level] = b;
              offset = 0;
              while(sy != "endsy"){
                if (sy == "ident"){
                  t0 = t;
                  entervariable();
                  while(sy == "comma"){
                    insymbol();
                    entervariable();
                  }
                  if (sy == "colon")
                    insymbol();
                  else
                    Error(5);
                  t1 = t;
                  var xtype2 = new xtp(eltp, elrf, elsz);
                  typ(fsys.concat(["semicolon", "endsy", "comma", "ident"]), xtype2, pointer);
                  eltp = xtype2.tp;
                  elrf = xtype2.rf;
                  elsz = xtype2.sz;
                  while (t0 < t1){
                    t0++;
                    if(eltp.charAt() != "*")
                      tab[t0].typ = eltp;
                    else {
                      tab[t0].typ = "pointers";
                      tab[t0].xtyp = eltp.slice(1,eltp.length);
                    }
                    tab[t0].ref = elrf;
                    tab[t0].normal = true;
                    tab[t0].adr = offset;
                    offset += elsz;
                  }
                  //if (sy == "semicolon")
                    //insymbol();
                }
                /*if (sy != "endsy"){
                  if (sy == "semicolon")
                    insymbol();
                  else {
                    Error(14);
                    if (sy == "comma")
                      insymbol();
                  }
                  //test(["ident", "endsy","semicolon"], fsys, 6);*/
                //}
              }

              btab[xtype.rf].vsize = offset;
              xtype.sz = offset;
              btab[xtype.rf].psize = 0;
              insymbol();
              level--;
            }
          }
          test("", fsys, [""], 6);
        }
      }
      catch(err){
        return err;
      }
    }//typ

    function parameterlist(){
      var tp, rf, sz, x, t0, valpar;
      try{
        insymbol();
        tp = "notyp";
        rf = 0;
        sz = 0;
        test(["ident", "refsy"], ["ident", "refsy"], fsys.concat(["rparent"]), 58);
        while (sy == "ident" || sy == "refsy"){
          if (sy != "refsy")
            valpar = true;
          else{
            insymbol();
            valpar =  false;
          }
          t0 = t;
          entervariable();
          while (sy == "comma"){
            insymbol();
            entervariable();
          }
          if (sy == "colon"){
            insymbol();
            if (sy != "ident")
              Error(2, "colon");
            else {
              x = loc(id);
              insymbol();
              if (x !== 0)
                if (tab[x].obj != "type1")
                  Error(29);
                else {
                  tp = tab[x].typ;
                  rf = tab[x].ref;
                  if (valpar)
                    sz = tab[x].adr;
                  else
                    sz = TAM_INT;
                }
            }
            test(["semicolon", "rparent", "ident", "comma"],["semicolon", "rparent", "ident", "comma"].concat(fsys), 14);
          }
          else
            Error(5);
          while(t0 < t){
            t0++;
            tab[t0].typ = tp;
            if(tp == "pointers")
              tab[t0].xtyp = tab[x].xtyp;
            tab[t0].ref = rf;
            tab[t0].normal = valpar;
            tab[t0].adr = dx;
            tab[t0].lev = level;
            dx += sz;
          }
          if (sy != "rparent"){
            if (sy == "semicolon")
              insymbol();
            else {
              Error(14);
              if (sy == "comma")
                insymbol();
            }
            test(["ident", "varsy"], ["ident", "varsy"], ["rparent"].concat(fsys), 6);
          }
        }
        if (sy == "rparent"){
          insymbol();
          test(["varsy", "beginsy", "semicolon", "colon"], ["varsy","beginsy","semicolon", "colon"], fsys, 6);
        }
        else
          Error(4);
      }
      catch(err){
        return err;
      }
    }

    function constantdeclaration(){
      var c = new conrec("", 0, 0);
      try{
        insymbol();
        test(["ident"], ["ident"], blockbegsys, 2);
        while(sy == "ident"){
          enter(id, "konstant");
          insymbol();
          if (sy == "eql" )
            insymbol();
          else {
            Error(16);
            if (sy == "becomes")
              insymbol();
          }
          constant(["semicolon", "comma", "ident"].concat(fsys), c);
          tab[t].typ = c.tp;
          tab[t].ref = 0;
          if (c.tp == "reals"){
            EnterReal(c.r);
            tab[t].adr = c1;
          }
          else
          tab[t].adr = c.i;
          //TestSemicolon();
        }
      }
      catch(err){
        return err;
      }
    }//constantdeclaration

    function typedeclaration(){
      var tp, rf, sz, t1, pointer = false;
      try{
        insymbol();
        test(["ident"], ["ident"], blockbegsys, 2);
        while (sy == "ident"){
          enter(id, "type1");
          t1 = t;
          insymbol();
          if (sy == "eql")
            insymbol();
          else {
            Error(16);
            if (sy == "becomes")
              insymbol();
          }
          var xtype = new xtp(tp, rf, sz);
          if(sy == "pointer"){
            insymbol();
            pointer = true;
            tab[t1].typ = "pointers";
            if(sy == "recordsy")
              tab[t1].xtyp = "records";
            else if (sy == "arraysy")
              tab[t1].xtyp = "arrays";
            tab[t1].adr = TAM_INT;
          }
          typ(["semicolon", "comma", "ident"].concat(fsys), xtype);
          if(pointer){
            tab[t1].typ = "pointers";
            tab[t1].adr = TAM_INT;
          }
          else{
            tab[t1].typ = xtype.tp;
            tab[t1].adr = xtype.sz;
          }
          tab[t1].ref = xtype.rf;
          tab[t1].xtyp = xtype.tp;
          //TestSemicolon();
        }
      }
      catch(err){
        return err;
      }
    }//typedeclaration

    function variabledeclaration(){
      var t0, t1, rf, sz, tp, pointer = false;
      try{
        insymbol();
        while(sy == "ident"){
          t0 = t;
          entervariable();
          while(sy == "comma"){
            insymbol();
            entervariable();
          }
          if (sy == "colon")
            insymbol();
          else
            Error(5);
          t1 = t;
          if(sy == "pointer"){
            insymbol();
            pointer = true;
          }
          var xtype = new xtp(tp, rf, sz);
          typ(["semicolon", "comma", "ident"].concat(fsys), xtype);
          while(t0 < t1){
            t0++;
            if(!pointer)
              tab[t0].typ = xtype.tp;
            else{
              tab[t0].typ = "pointers";
              tab[t0].xtyp = xtype.tp;
            }
            tab[t0].ref = xtype.rf;
            tab[t0].lev = level;
            tab[t0].adr = dx;
            tab[t0].normal = true;
            if(xtype.tp.charAt() == "*"){
              tab[t0].xtyp = xtype.tp.slice(1, xtype.tp.length);
              tab[t0].typ = "pointers";
              xtype.sz = TAM_INT;
            }
            if(!pointer)
              dx += xtype.sz;
            else
              dx += TAM_INT;
            pointer = false;

          }
          //TestSemicolon();
        }
      }
      catch(err){
        return err;
      }
    }//variabledeclaration

    function procdeclaration(){
      try{
        var isfun, tx, len;
        isfun = sy == "functionsy";
        insymbol();
        if (sy != "ident"){
          Error(2, "functionsy");
          id = "";
        }
        if (isfun)
          enter(id, "funktion");
        else
          enter(id, "prozedure");
        tab[t].normal = true;
        tx = t;
        insymbol();
        block(["semicolon"].concat(fsys), isfun, level+1);
        /*if (sy == "semicolon")
          insymbol();
        else
          Error(14);*/
        var bool = 0;
        len = 0;
        if(isfun){
          bool++;
          switch (tab[tx].typ) {
            case "reals": len = TAM_REAL; break;
            case "chars":
            case "bools": len = TAM_CHAR; break;
            default:  len = TAM_INT ;

          }
        }
        emit1(linecount-1, 32 + bool, len);
      }
      catch(err){
        return err;
      }
    }//procdeclaration

    function statement(fsys){
      var i;

      function selector(fsys, v, assign){
        var x, a, j;
        try{
          x = new item("", 1);
          do{
            if (sy == "period"){
              if (v.typ != "records")
                Error(31);
              insymbol();
              if (sy != "ident")
                Error(2, "period", loc(id));
              else {
                if (v.typ != "records")
                  Error(31);
                else {
                  j = btab[v.ref].last;
                  tab[0].name = id;
                  while(tab[j].name != id)
                    j = tab[j].link;
                  if (j == 0)
                    Error(0);
                  v.typ = tab[j].typ;
                  v.ref = tab[j].ref;
                  a = tab[j].adr;
                  if (a !== 0)
                    emit1(linecount, 9, a);
                }
                insymbol();
                if (sy == "lbrack" && v.typ == "strings"){
                    if (v.typ == "strings" || v.typ == "arrays")
                      selector(fsys, v, assign);
                    else
                      Error("Erro");
                  }
              }
            }
            else {    //Seletor do Array
              if (sy != "lbrack")
                Error(11);
              do{
                if (v.typ != "arrays" && v.typ != "strings")
                  Error(28);
                insymbol();
                if (v.typ != "arrays"){
                  if (v.typ == "strings" || v.typ == "chars"){
                    if (v.typ == "strings" && !assign)
                      emit1(linecount, 34, TAM_INT);
                    expression(fsys.concat(["comma", "rbrack"]), x);
                    if(x.typ != "ints")
                      Error(59);
                    else {
                      v.ref = 1;
                    }
                  }
                  else {
                    Error(28);
                  }
                }
                else {
                  expression(fsys.concat(["comma", "rbrack"]), x);
                  a = v.ref;
                  if (atab[a].inxtyp != x.typ)
                    Error(26, atab[a].inxtyp);
                  else
                    if (atab[a].elsize == 1)
                      emit1(linecount, 20, a);
                    else
                      emit1(linecount, 21, a);
                  v.typ = atab[a].eltyp;
                  v.ref = atab[a].elref;
                }
              }while(sy == "comma");
              if (sy == "rbrack")
                insymbol();
              else {
                Error(12);
                if (sy == "rparent")
                  insymbol();
              }
            }
          }while(["lbrack", "lparent", "period"].indexOf(sy) != -1);
          test(["ident", "plus", "minus", "times", "rdiv", "idiv"], fsys.concat("ident", "plus", "minus", "rdiv", "times", "idiv"), "", 6);
        }
        catch(err){
          return err;
        }
      }//Selector

      function call(fsys, i){
        var x, lastp, cp, k, line;
        try{
          x = new item("", 1);
          if(changed)
            line = ilnx;
          else
            line = linecount;
          if(sy != "lparent")
            line--;
          emit1(line, 18, i);
          lastp = btab[tab[i].ref].lastpar;
          cp = i;
          if (sy == "lparent"){
            do{
              insymbol();
              if (cp >= lastp)
                Error(39);
              else {
                cp++;
                if (tab[cp].normal){
                  expression(fsys.concat(["comma", "colon", "rparent"]), x);
                  if (x.typ == tab[cp].typ){
                    if (x.ref != tab[cp].ref)
                      Error(36, "records", "records");
                    else
                      if (x.typ == "arrays")
                        emit1(line, 22, atab[x.ref].size);
                      else
                        if (x.typ == "arrays")
                          emit1(line, 22, atab[x.ref].size);
                        else
                          if (x.typ == "records")
                            emit1(line, 22, btab[x.ref].vsize);
                  }
                  else
                    if (x.typ == "ints" && tab[cp].typ == "reals")
                      emit1(line, 26,TAM_INT);
                    else
                      if (x.typ != "notyp")
                        Error(36, x.typ, tab[cp].typ);
                }
                else {
                  if (sy != "ident")
                    Error(2, "ref");
                  else {
                    k = loc(id);
                    insymbol();
                    if (k !== 0){
                      if (tab[k].obj != "variable")
                        Error(37);
                      x.typ = tab[k].typ;
                      x.ref = tab[k].ref;
                      if (tab[k].normal)
                        emit2(line, 0, tab[k].lev, tab[k].adr);
                      else
                        emit2(line, 1, tab[k].lev, tab[k].adr, tab[k].typ);
                      if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
                        selector(fsys.concat(["comma", "colon", "rparent"]), x, false);
                      if (x.typ != tab[cp].typ || x.ref != tab[cp].ref)
                        Error(36, x.typ, tab[cp].typ);
                    }
                  }
                }
              }
              test(["comma", "rparent"], ["comma", "rparent"], fsys, 6);
            }while(sy == "comma");
            if (sy == "rparent")
              insymbol();
            else
              Error(4);
          }
          if (cp < lastp)
            Error(39);
          emit2(line, 19, tab[i].typ, btab[tab[i].ref].psize);
          if (tab[i].lev < level)
            emit2(line, 3, tab[i].lev, level);
        }
        catch(err){
          return err;
        }
      }//call

      function resulttype(a, b){
        try{
          var result;
          if (types1.indexOf(a) > types1.indexOf("reals") || types1.indexOf(b) > types1.indexOf("reals")){
            if (a == "strings" || b == "strings")
              result = "strings";
            else {
              Error(33);
              result =  "notyp";
            }
          }
          else
          if (a == "notyp" || b == "notyp")
            result =  "notyp";
          else
            if (a == "ints")
              if(b == "ints")
                result =  "ints";
              else {
                result = "reals";
                emit1(linecount, 26, TAM_REAL);
              }
            else {
              result =  "reals";
              if (b == "ints")
                emit1(linecount, 26, TAM_INT);
            }
            return result;
        }
        catch(err){
          return err;
        }
      }//resulttype

      function expression(fsys, x){
        var y, op;
        y = new item("", 1);

        function simpleexpression(fsys, x){
          var y, op;
          y = new item("", 1);

          function term(fsys, x){
            var y, op;
            y = new item("", 1);

            function factor(fsys, x){
              var i, f;

              function standfct(n){
                var ts;
                try{
                  if (sy == "lparent")
                    insymbol();
                  else
                    Error(9);
                  if(n != 22)
                    expression(fsys.concat(["rparent", "comma"]), x);
                  switch (n) {
                    case 0:
                    case 2:
                      ts = ["ints", "reals"];
                      tab[i].typ = x.typ;
                      if (x.typ == "reals")
                        n++;
                    break;
                    case 4:
                    case 5:
                      ts = ["ints"];
                    break;
                    case 6:
                    ts = ["ints", "bools", "chars"];
                    break;
                    case 7:
                    case 8:
                      ts = ["chars"];
                    break;
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                      ts = ["ints", "reals"];
                      if (x.typ == "ints")
                        emit1(linecount, 26,TAM_INT);
                    break;
                    case 17:
                      ts = ["strings"];
                      if (x.typ == "strings"){
                        emit(linecount, 65);
                      }
                      else {
                        Error(36, x.typ, "strings");
                      }
                    break;
                    case 18:
                      ts = ["strings"];
                      if (x.typ == "strings"){
                        emit(linecount, 66);
                      }
                      else {
                        Error(36, x.typ, "strings");
                      }
                    break;
                    case 19:
                    ts = ["ints", "strings"];
                    if (x.typ == "strings"){
                      emit(linecount, 64);
                    }
                    else {
                      Error(36, x.typ, "strings");
                    }
                    break;
                    case 20:
                    if (x.typ == "strings" || x.typ == "chars"){
                      if (x.typ == "chars")
                        emit1(linecount, 25, 1);
                      insymbol();
                      var y = new item("", 1);
                      expression(fsys.concat(["rparent"]), y);
                      if (y.typ == "strings" || y.typ == "chars"){
                        ts = ["ints", "strings", "chars"];
                        if (y.typ == "chars")
                          emit1(linecount, 67, 0);
                        else
                          emit1(linecount, 67, 1);
                      }
                      else {
                        Error(36, y.typ, "strings");
                      }
                    }
                    else {
                      Error(36, x.typ, "strings");
                    }
                    break;
                    case 21:
                      //livre
                    break;
                    case 22:
                    var length;
                      if(sy == "ident"){
                        var line = linecount;
                        var ix = loc(id);
                        insymbol();
                        if(sy == "lbrack" || sy == "period")
                          Error(65);
                        else
                          if(tab[ix].obj == "variable"){     //O programador introduziu uma variável na função alocamem
                            if(stantyps.indexOf(tab[ix].typ) != -1){
                              switch (tab[ix].typ) {
                                case "reals":
                                  length = TAM_REAL;
                                break;
                                case "bools":
                                case "chars":
                                  length = TAM_CHAR;
                                break;
                                default:
                                  length = TAM_INT;
                              }
                            }
                            else {
                              if(tab[ix].typ == "records"){
                                length = btab[tab[ix].ref].vsize;
                              }
                              else if (tab[ix].typ == "arrays") {
                                length = atab[tab[ix].ref].size;
                              }
                            }
                          }
                          else if(tab[ix].obj == "type1"){
                            length = tab[ix].adr;
                          }
                          else
                            Error(65);
                          emit2(line, 71, length);
                          ts = ["pointers"];
                          x.typ = "pointers";
                      }
                      else
                        Error(64);
                    break;
                  }
                  if (ts.indexOf(x.typ) != -1)
                    emit1(linecount, 8, n);
                  else
                    if (x.typ != "notyp")
                      Error(48);
                  x.typ = tab[i].typ;
                  if (sy == "rparent")
                    insymbol();
                  else
                    Error(4);
                }
                catch(err){
                  return err;
                }
              }//standfct
              try{
                x.typ = "notyp";
                x.ref = 0;
                test(["andsy", "times", "address"], facbegsys.concat(["andsy", "times", "address"]), fsys, 58);
                var reference = false;  //Atribuição de endereço em ponteiro
                var ireference = false; //Leitura de valor de ponteiro
                if (sy == "address"){
                  insymbol();
                  reference = true;
                }
                while (facbegsys.indexOf(sy) != -1){
                  if (sy == "ident"){
                    i = loc(id);
                    if(reference){
                      if(tab[i].obj != "variable")
                        Error(37);
                    }
                    insymbol();
                    if(sy == "pointer"){
                      if(tab[i].typ == "pointers"){
                        if(reference)
                          Error(68);
                        ireference = true;
                        insymbol();
                        x.typ = tab[i].xtyp;
                      }
                      else {
                        Error(63, tab[i].typ);
                      }
                    }
                    switch (tab[i].obj) {
                      case "konstant":
                        x.typ = tab[i].typ;
                        x.ref = 0;
                        if (x.typ == "reals")
                          emit2(linecount, 24, tab[i].typ, tab[i].adr);
                        else
                          emit2(linecount, 24, tab[i].typ, tab[i].adr);
                      break;
                      case "variable":
                        x.typ = tab[i].typ;
                        x.ref = tab[i].ref;
                        if (!ireference){ //Não está referenciando endereço
                          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                            if (tab[i].normal)
                              f = 0;
                            else
                              f = 1;
                            emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                            selector(fsys, x, false);
                            if (stantyps.indexOf(x.typ) != -1 && x.typ != "strings"){
                              var ltyp;
                              switch (x.typ) {
                                case "reals": ltyp = TAM_REAL;break;
                                case "ints":ltyp = TAM_INT;break;
                                case "bools":ltyp = TAM_BOOL;break;
                                case "chars":ltyp = TAM_CHAR;break;
                              }
                              if(!reference)
                                emit1(linecount, 34, ltyp);
                              else
                                x.typ = "pointers";
                            }
                            if (x.typ == "strings" && x.ref == 1){
                              x.ref = 0;
                              x.typ = "chars";
                              emit(linecount, 62);
                            }
                            else{
                              if (x.typ == "strings" && x.ref == 0)
                                emit1(linecount, 34, TAM_INT);
                            }
                          }
                          else {
                            if (stantyps.indexOf(x.typ) != -1)
                              if(tab[i].normal)
                                f = 1;
                              else
                                f = 2;
                            else
                              if (tab[i].normal)
                                f = 0;
                              else
                                f = 1;
                            if (reference && f > 0){
                              f--;    //O programador quer acessar o valor do ponteiro e não da variável apontada
                              x.typ = "pointers";
                            }
                            else if(reference)
                              x.typ = "pointers";
                            emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                          }
                        }
                        else {
                          x.typ = tab[i].xtyp;
                          if (tab[i].normal)
                            f = 1;
                          else
                            f = 2;
                          emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                          var len;
                          switch (tab[i].xtyp) {
                            case "reals":
                              len = TAM_REAL;
                            break;
                            case "chars":
                            case "bools":
                              len = TAM_CHAR;
                            break;
                            default:
                              len = TAM_INT;
                          }
                          if(stantyps.indexOf(tab[i].xtyp) != -1)
                            emit1(linecount, 34, len);
                          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                            if (x.typ == "strings"){
                              x.typ = "chars";
                            }
                            selector(["becomes", "eql", "plus", "minus", "rdiv", "times"].concat(fsys), x, false);
                            if (stantyps.indexOf(x.typ) != -1 /*&& x.typ != "strings"*/){
                              var ltyp;
                              switch (x.typ) {
                                case "reals": ltyp = TAM_REAL;break;
                                case "ints":ltyp = TAM_INT;break;
                                case "bools":ltyp = TAM_BOOL;break;
                                case "chars":ltyp = TAM_CHAR;break;
                                default:
                                ltyp = TAM_INT;
                              }
                              emit1(linecount, 34, ltyp);
                            }
                          }
                        }
                      break;
                      case "type1":
                      case "prozedure":
                        Error(44);
                      break;
                      case "funktion":
                        x.typ = tab[i].typ;
                        if (tab[i].lev !== 0)
                          call(fsys,i);
                        else
                          standfct(tab[i].adr);
                      break;
                    }
                    if (sy == "ident")
                      break;
                  }
                  else
                  if (["charcon", "intcon", "realcon", "stringsy"].indexOf(sy) != -1){
                    if (sy == "realcon"){
                      x.typ = "reals";
                      EnterReal(rnum);
                      emit2(linecount, 24, x.typ, c1);
                    }
                    else {
                      if (sy != "stringsy"){
                        if (sy == "charcon")
                        x.typ = "chars";
                        else
                        x.typ = "ints";
                      }
                      else {
                        inum = stab.splice(sx-sleng, sleng);
                        sx -= sleng;
                        inum = inum.join("");
                        x.typ = "strings";
                      }
                      emit2(linecount, 24, x.typ, inum);
                    }
                    x.ref = 0;
                    insymbol();
                    if (sy == "ident")
                      break;
                  }
                  else
                  if (sy == "lparent"){
                    insymbol();
                    expression(fsys.concat(["rparent"]), x);
                    if (sy == "rparent")
                    insymbol();
                    else
                    Error(4);
                    if (sy == "ident")
                      break;
                  }
                  else
                  if (sy == "notsy"){
                    insymbol();
                    factor(fsys, x);
                    if (x.typ == "bools")
                    emit(linecount, 35);
                    else
                    if (x.typ != "notyp")
                    Error(32);
                  }
                  test(["ident", "untilsy", "stringsy"], fsys.concat(["ident","untilsy", "stringsy"]), facbegsys, 6);
                }
              }
              catch(err){
                return err;
              }
            } //factor
            try{
              factor(fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), x);
              while (["times", "rdiv", "idiv", "imod", "andsy"].indexOf(sy) != -1){
                op = sy;
                var lcx;
                if (op == "andsy"){
                  lcx = lc;
                  emit(linecount, 69);
                }
                insymbol();
                factor (fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), y);
                if (op == "times"){
                  x.typ = resulttype(x.typ, y.typ);
                  emit1(linecount, 57, x.typ);

                }
                else
                if(op == "rdiv"){
                  if (x.typ == "ints"){
                    emit1(linecount, 26,TAM_REAL);
                    x.typ = "reals";
                  }
                  if(y.typ == "ints"){
                    emit1(linecount, 26,TAM_INT);
                    y.typ = "reals";
                  }
                  if (x.typ == "reals" && y.typ == "reals")
                    emit1(linecount, 58, "reals");
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                    Error(33);
                    x.typ = "notyp";
                  }
                }
                else
                if (op == "andsy"){
                  if (x.typ == "bools" && y.typ == "bools"){
                    emit(linecount, 56);
                    kode[lcx].y = lc;
                  }
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                      Error(32);
                    x.typ = "notyp";
                  }
                }
                else {
                  if (x.typ == "ints" && y.typ == "ints")
                    if (op == "idiv")
                      emit1(linecount, 58, "ints");
                    else
                      emit(linecount, 59);
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                      Error(34);
                    x.typ = "notyp";
                  }
                }
              }
            }
            catch(err){
              return err;
            }
          }//term
          try{
            if (["plus", "minus"].indexOf(sy) != -1){
              op = sy;
              insymbol();
              term(fsys.concat(["plus", "minus"]), x);
              if (types1.indexOf(x.typ) > types1.indexOf("reals")){
                if (x.typ != "strings")
                  Error(33);
              }
              else
                if (op == "minus")
                  emit1(linecount, 36, TAM_INT);
            }
            else
              term(fsys.concat(["plus", "minus", "orsy"]), x);
            while (["plus", "minus", "orsy"].indexOf(sy) != -1){
              op = sy;
              var lcx;
              if (op == "orsy"){
                lcx = lc;
                emit(linecount, 68);
              }
              insymbol();
              term(fsys.concat(["plus", "minus", "orsy"]), y);
              if (op == "orsy"){
                if (x.typ == "bools" && y.typ == "bools"){
                  emit(linecount, 51);
                  kode[lcx].y = lc;
                }
                else {
                  if (x.typ != "notyp" && y.typ != "notyp")
                    Error(32);
                  x.typ = "notyp";
                }
              }
              else {
                if (x.typ == "strings")
                  if(y.typ == "chars")
                    emit1(linecount, 25, 1);
                if(y.typ == "strings")
                  if (x.typ == "chars")
                    emit1(linecount, 25, 2);
                x.typ = resulttype(x.typ, y.typ);
                switch (x.typ) {
                  case "strings":
                  if(op == "plus")
                    emit1(linecount, 52, "strings");
                  else
                    Error(60);
                  break;
                  case "ints":
                    if (op == "plus")
                        emit1(linecount, 52, "ints");
                    else
                      emit1(linecount, 53, "ints");
                  break;
                  case "reals":
                    if (op == "plus")
                        emit1(linecount, 52, "reals");
                    else
                      emit1(linecount, 53, "reals");
                  break;
                }
              }
            }
          }
          catch(err){
            return err;
          }
        }//simpleexpression
        try{
          simpleexpression(fsys.concat(["eql", "neq", "lss", "leq", "gtr", "geq"]), x);
          if (["eql", "neq", "lss", "leq", "gtr", "geq"].indexOf(sy) != -1){
            op = sy;
            insymbol();
            simpleexpression(fsys, y);
            if (["notyp", "ints", "bools", "chars", "strings", "reals", "pointers"].indexOf(x.typ) != -1 && x.typ == y.typ)
              switch (op) {
                case "eql": emit1(linecount, 39, x.typ);break;
                case "neq": emit1(linecount, 40, x.typ);break;
                case "lss": emit1(linecount, 41, x.typ);break;
                case "leq": emit1(linecount, 42, x.typ);break;
                case "gtr": emit1(linecount, 43, x.typ);break;
                case "geq": emit1(linecount, 44, x.typ);break;
              }
            else {
              if (x.typ == "strings" || y.typ == "strings"){
                if (x.typ == "strings")
                  if (y.typ == "chars")
                    emit1(linecount, 25,1);
                if (y.typ == "strings")
                  if(x.typ == "chars")
                    emit1(linecount, 25,2);
                x.typ = resulttype(x.typ,y.typ);
                switch (op) {
                  case "eql": emit1(linecount, 39, x.typ);break;
                  case "neq": emit1(linecount, 40, x.typ);break;
                  case "lss": emit1(linecount, 41, x.typ);break;
                  case "leq": emit1(linecount, 42, x.typ);break;
                  case "gtr": emit1(linecount, 43, x.typ);break;
                  case "geq": emit1(linecount, 43, x.typ);break;
                }
              }
              else{
                if (x.typ == "reals")
                  if(y.typ == "ints")
                    emit1(linecount, 26,TAM_INT);
                if(y.typ == "reals")
                  if(x.typ == "ints")
                    emit1(linecount, 26,TAM_REAL);
                x.typ = resulttype(x.typ, y.typ);
                switch (op) {
                  case "eql": emit1(linecount, 39, x.typ);break;
                  case "neq": emit1(linecount, 40, x.typ);break;
                  case "lss": emit1(linecount, 41, x.typ);break;
                  case "leq": emit1(linecount, 42, x.typ);break;
                  case "gtr": emit1(linecount, 43, x.typ);break;
                  case "geq": emit1(linecount, 44, x.typ);break;
                }
              }
            }
            x.typ = "bools";
          }
        }
        catch(err){
          return err;
        }
      }//expression
      function assignment(lv, ad){
        try{
          var xx=0, ln, x, y, f,op="", assign=1, fstring=false;    //assign para atribuições multiplas, quantas atribuições a instrução 38 fará
          x = new item("", 1);
          y = new item("", 1);
          x.typ = tab[i].typ;
          x.ref = tab[i].ref;
          if (tab[i].normal)
            f = 0;
          else
            f = 1;
          if(sy == "pointer"){
            insymbol();
            if(x.typ == "pointers"){
              f = 1;
              x.typ = tab[i].xtyp;
            }
            else {
              Error(63, x.typ);
            }
          }
          ln = linecount;
          emit2(ln, f, lv, ad, "ints");
          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
            if (x.typ == "strings"){
              x.typ = "chars";
              fstring = true;
            }
            selector(["becomes", "eql", "plus", "minus", "rdiv", "times"].concat(fsys), x, true);
          }
          if (sy == "becomes")
            insymbol();
          else {
            if (sy == "comma"){
              var p = i;
              i = [];
              i[0] = p;
              while(sy == "comma"){
                insymbol();
                p = loc(id);
                i[xx] = p;
                xx++;
                if (p == 0)
                  Error(0);
                if (tab[p].typ == tab[i].typ){
                  if (tab[p].normal)
                    f = 0;
                  else
                    f = 1;
                  emit2(ln, f, tab[p].lev, tab[p].adr, tab[p].typ);
                  assign++;
                }
                else {
                  Error(46);
                  break;
                }
                insymbol();
                if (sy in ["lbrack", "lparent", "period"])
                  Error(61);
              }
              if(sy == "becomes")
                insymbol();
            }
            else{
              if (sy == 'plus' || sy == "minus" || sy == "times" || sy == "rdiv"){
                if (stantyps.indexOf(x.typ) != -1)
                  if(tab[i].normal)
                    f = 1;
                  else
                    f = 2;
                else
                  if (tab[i].normal)
                    f = 0;
                  else
                    f = 1;
                emit2(ln, f, tab[i].lev, tab[i].adr, tab[i].typ);
              }
              switch (sy) {
                case "plus":
                  op = "plus";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error(16);
                break;
                case "minus":
                  op = "minus";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error(16);
                break;
                case "times":
                  op = "mult";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error(16);
                break;
                case "rdiv":
                  op = "div";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error(16);
                break;
                default:
                  Error(51);
                  if (sy == "eql")
                    insymbol();

              }
            }
          }
          expression(fsys, y);
          if (x.typ == y.typ)
            if (stantyps.indexOf(x.typ) != -1){
              if(x.typ == "strings" && x.ref == 1){
                Error(46);
              }
              else{
                if (tab[i].typ == "strings"){
                  x.ref = 0;
                  if (y.typ == "chars"){
                    if (stantyps.indexOf(x.typ) != -1)
                      if(tab[i].normal)
                        f = 1;
                      else
                        f = 2;
                    else
                      if (tab[i].normal)
                        f = 0;
                      else
                        f = 1;
                    emit2(ln, f, tab[i].lev, tab[i].adr, tab[i].typ);
                    emit(ln, 63);
                  }
                }
                switch (op) {
                  case "plus": emit1(ln, 52, x.typ); break;
                  case "minus":emit1(ln, 53, x.typ); break;
                  case "mult":emit1(ln, 57, x.typ); break;
                  case "div":emit1(ln, 58, x.typ); break;
                }

                emit2(ln, 38, x.typ, assign, i);
              }
            }
            else
              if(x.ref != y.ref)
                Error(46);
              else
                if (x.typ == "arrays")
                  emit1(ln, 23, atab[x.ref].size);
                else
                  emit1(ln, 23, btab[x.ref].vsize);
          else{
            if(x.typ == "pointers" || y.typ == "pointers"){
              Error(46, x.typ, y.typ)
            }
            else
              if(x.typ == 'strings' || fstring){
                if (x.ref == 1){
                  if (y.typ != "chars"){
                    Error(46);
                  }
                  else {
                    if (tab[i].typ != "arrays")
                      emit2(ln, 1, tab[i].lev, tab[i].adr, tab[i].typ);
                    else {
                      var ltyp;
                      switch (y.typ) {
                        case "reals":ltyp = TAM_REAL;break;
                        case "ints":ltyp = TAM_INT;break;
                        case "bools":ltyp = TAM_BOOL;break;
                        case "chars":ltyp = TAM_CHAR;break;
                      }
                      emit1(ln, 34, ltyp);
                    }
                    emit(ln, 63);
                    if(!fstring)
                      emit2(ln, 38, x.typ, assign, i);
                    else
                      emit2(ln, 38, "strings", assign, i);
                  }
                }
                else {
                  emit2(ln, 38, x.typ, assign, i);
                }
              }
              else{
                if (x.typ == "reals" && y.typ == "ints"){
                  emit1(ln, 26,TAM_INT);
                  switch (op) {
                    case "plus": emit1(ln, 52, x.typ); break;
                    case "minus":emit1(ln, 53, x.typ); break;
                    case "mult":emit1(ln, 57, x.typ); break;
                    case "div": emit1(ln, 58, x.typ); break;
                  }
                  emit2(ln, 38, x.typ, assign, i);
                }
                else if(x.typ == "ints"){
                  if(y.typ == "reals")
                    Error(46);
                }
                else
                  if (x.typ != "notyp" && y.typ != "notyp" || x.typ == "pointers")
                    emit2(ln, 38, x.typ, assign, i);
                  else
                    Error(46);
              }
          }
        }
        catch(err){
          return err;
        }
      }//assignment

      function compoundstatement(){
        try{
          insymbol();
          statement(["semicolon", "endsy"].concat(fsys));
          while (sy != "endsy"){
            if (statbegsys.concat("ident").indexOf(sy) != -1)
              statement(["semicolon", "endsy", "elsesy"].concat(fsys));
            else{
              if (sy == "semicolon"){
                Error(7);
                insymbol();
              }
              else
                break;
            }
          }
          if (sy == "endsy")
            insymbol();
          else
            if (sy != "elsesy")
              Error(57);
        }
        catch(err){
          return err;
        }
      }//compoundstatement

      function ifstatement(){
        try{
          var x, lc1, lc2;
          x = new item("", 1);
          insymbol();
          expression(fsys.concat(["thensy", "dosy"]), x);
          if (["bools", "notyp"].indexOf(x.typ) == -1)
            Error(17, x.typ);
          lc1 = lc;
          emit(linecount, 11);
          if (sy == "thensy")
            insymbol();
          else {
            Error(52);
            if (sy == "dosy")
              insymbol();
          }
          statement(fsys.concat(["elsesy"]));
          if (sy == "elsesy"){
            insymbol();
            lc2 = lc;
            emit(linecount, 10);
            kode[lc1].y = lc;
            statement(fsys);
            kode[lc2].y = lc;
          }
          else
            kode[lc1].y = lc;
        }
        catch(err){
          return err;
        }
      }//ifstatement

      function casestatement(){
        function caselabel(){
          try{
            var lab, k;
            lab = new conrec("", 0, 0);
            constant(fsys.concat(["comma", "colon"]), lab);
            if (lab.tp != x.typ) {
              Error(47);
            }
            else
              if (i == csmax)
                fatal(6);
            else{
              i++;
              k = i;
              if (lab.tp == "reals"){
                casetab[i].val = lab.r;
                do
                  k--;
                while (casetab[k].val != lab.r && k > 0);
              }
              else{
                casetab[i].val = lab.i;
                do
                  k--;
                while (casetab[k].val != lab.i && k > 0);
              }
              casetab[i].lc = lc;
              if (k > 0)
                Error(1, casetab[k].val); //{Definições multiplas}
            }
          }
          catch(err){
            return err;
          }
        }//fim caselabel

        function onecase(){
          try{
            if (constbegsys.indexOf(sy) != -1){
              caselabel();
              while (sy == "comma") {
                insymbol();
                caselabel();
              }
              if (sy == "colon")
                insymbol();
              else
                Error(5);
              statement(["semicolon", "endsy"].concat(fsys));
              j++;
              exittab[j] = lc;
              emit(linecount, 10);
            }
          }
          catch(err){
            return err;
          }
        }//fim onecase
        try{
          var x;
          x = new item("", 1);
          var i, j, k, lc1;
          var casetab = new Array(csmax);
          function CaseRecord(val, lc){
            this.val = val;
            this.lc = lc;
          }
          //inicializa array com objetos do tipo caserecord
          for ( i = 0; i < csmax; i++){
            casetab[i] = new CaseRecord();
          }
          var exittab = new Array(csmax);
          insymbol();
          i = 0;
          j = 0;
          expression(fsys.concat(["ofsy", "comma", "colon"]), x);
          if (["ints", "bools", "chars", "notyp"].indexOf(x.typ) == -1){
            Error(23);
            return;
          }
          lc1 = lc;
          emit2(linecount, 12, x.typ, 0);
          if (sy == "ofsy")
            insymbol();
          else
            Error(8);
          onecase();
          while (sy != "endsy") {
            onecase();
          }
          kode[lc1].y = lc;
          for (k = 1; k <= i; k++) {
            emit1(linecount, 13, casetab[k].val);
            emit1(linecount, 13, casetab[k].lc);
          }
          emit1(linecount, 10, 0);
          for (k = 1; k <= j; k++)
            kode[exittab[k]].y = lc;
          if (sy == "endsy")
            insymbol();
          else
            Error(57);
        }
        catch(err){
          return err;
        }
      }//casestatement

      function repeatstatement(){
        try{
          var x = new item("", 1);
          var lc1;
          lc1 = lc;
          insymbol();
          statement(["untilsy"].concat(fsys));
          while(statbegsys.concat("ident").indexOf(sy) != -1){
            statement(["semicolon", "untilsy"].concat(fsys));
            if(sy == "semicolon"){
              Error(7);
              insymbol();
            }
          }
          if (sy == "untilsy"){
            insymbol();
            expression(fsys, x);
            if (["bools", "notyp"].indexOf(x.typ) == -1)
              Error(17, x.typ);
            var line;
            line = linecount;
            while (InputFile[line].length == 0) {
              line--;
            }
            emit1(line, 11, lc1);
          }
          else
            Error(53);
        }
        catch(err){
          return err;
        }
      }//repeatstatement

      function whilestatement(){
        try{
          var x = new item("", 0);
          var lc1, lc2;
          insymbol();
          lc1 = lc;
          expression(fsys.concat(["dosy"]), x);
          if (["bools", "notyp"].indexOf(x.typ) == -1)
            Error(17, x.typ);
          lc2 = lc;
          emit(linecount, 11);
          if (sy == "dosy")
            insymbol();
          else
            Error(54);
          statement(fsys);
          var line;
          line = linecount;
          do {
            line--;
          } while (InputFile[line].length == 0);
          emit1(line, 10, lc1);
          kode[lc2].y = lc;
        }
        catch(err){
          return err;
        }
      }

      function forstatement(){
        try{
          var cvt, x, i, f, lc1, lc2;
          x = new item("", 1);
          insymbol();
          if (sy == "ident"){
            i = loc(id);
            insymbol();
            if (i == 0)
              cvt = "ints";
            else
            if (tab[i].obj == "variable"){
              cvt = tab[i].typ;
              emit2(linecount, 0, tab[i].lev, tab[i].adr);
              if (["notyp", "ints", "bools", "chars", "reals"].indexOf(cvt) == -1)
                Error(18, tab[i].name);
            }
            else {
              Error(37);
              cvt = "ints";
            }
          }
          else
            skip(["ofsy", "tosy", "downtosy", "dosy"].concat(fsys), 2);
          if (sy == "ofsy"){
            insymbol();
            expression(["untilsy", "downtosy", "dosy"].concat(fsys), x);
            if (x.typ != cvt)
            Error(19, cvt);
          }
          else
            skip(["untilsy", "ofsy"].concat(fsys), 8);
          f = 14;
          var steptyp = TAM_INT;
          if (sy == "untilsy"){
            insymbol();
            var p;
            p = new item("", 1);
            expression(fsys.concat(["stepsy", "dosy"]), p);
            if (p.typ != cvt)
              Error(19, cvt);
            else{
              if (sy == "stepsy"){
                insymbol();
                if (sy == "minus"){
                  insymbol();
                  if (sy == "intcon" || sy == "realcon"){
                    if (sy == "intcon"){
                      if (cvt == "ints")
                        emit2(linecount, 24, cvt, inum);
                      else
                        Error(19, cvt);
                    }
                    else{
                      if (cvt == "reals"){
                        EnterReal(rnum);
                        emit2(linecount, 24, cvt, c1);
                        steptyp = TAM_REAL;
                      }
                      else
                        Error(19, cvt);
                    }
                  }
                  emit1(linecount, 36, steptyp);
                }
                else {
                  if (sy == "intcon" || sy == "realcon"){
                    if (sy == "intcon"){
                      if (cvt == "ints")
                        emit2(linecount, 24, cvt, inum);
                      else
                        Error(19, cvt);
                    }
                    else{
                      if (cvt == "reals"){
                        EnterReal(rnum);
                        emit2(linecount, 24, cvt, c1);
                        steptyp = TAM_REAL;
                      }
                      else
                        Error(19,cvt);
                    }
                  }

                }
                if (p.typ != cvt) {
                  Error(19, cvt);
                }
                insymbol();
              }
              else {
                emit2(linecount, 24, cvt, 1);
              }
            }
          }
          else {
            Error(53);
          }
          lc1 = lc;
          if (kode[lc-1].f == 36)
            f = 16;
          emit2(linecount, f, steptyp, 0);
          if (sy == "dosy")
            insymbol();
          else
              Error(54);
          lc2 = lc;
          statement(fsys);
          var line;
          line = linecount;
          do {
            line--;
          } while (InputFile[line].length == 0);
          emit2(line, f+1, steptyp, lc2);
          kode[lc1].y = lc;
        }
        catch(err){
          return err;
        }
      }//forstatement

      function standproc(n){
        try{
          var i, f;
          var x, y;
          x = new item("", 1);
          y = new item("", 1);
          switch (n) {
            case 1:
            case 2:
            if (!(iflag)){
              Error(20);
              iflag = true;
            }
            if (sy == "lparent"){
              do{
                insymbol();
                if (sy != "ident")
                Error(2, "leia");
                else {
                  i = loc(id);
                  insymbol();
                  if (i !== 0)
                  if (tab[i].obj != "variable")
                  Error(37);
                  else{
                    x.typ = tab[i].typ;
                    x.ref = tab[i].ref;
                    if (tab[i].normal)
                    f = 0;
                    else
                    f = 1;
                    if(sy == "pointer" && x.typ == "pointers"){
                      insymbol();
                      x.typ = tab[i].xtyp;
                      f++;
                    }
                    else if (sy == "pointer") {
                      Error(63);
                    }
                    emit2(linecount, f, tab[i].lev, tab[i].adr, tab[i].typ);
                    if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                    selector(fsys.concat(["comma", "rparent"]), x, false);
                    }
                    if (["ints", "reals", "chars", "notyp", "strings"].indexOf(x.typ) != -1)
                    emit1(linecount, 27, types1.indexOf(x.typ));
                    else
                    Error(40);
                  }
                }
                test(["comma", "rparent", "ident"], ["comma", "rparent"], fsys, 6);
              }while(sy == "comma");
              if (sy == "rparent")
              insymbol();
              else
              Error(4);
            }
            if (n == 2)
            emit(linecount, 62);
            break;
            case 3:
            case 4:
            if (sy == "lparent"){
              do{
                insymbol();
                if (sy == "stringsy"){
                  emit1(linecount, 24, sleng);
                  emit1(linecount, 28, inum);
                  insymbol();
                }
                else {
                  expression(fsys.concat(["comma", "colon","rparent"]), x);
                  if (stantyps.indexOf(x.typ) == -1)
                    Error(41);
                  if (sy == "colon"){
                    insymbol();
                    expression(fsys.concat(["comma", "colon", "rparent"]), y);
                    if (y.typ != "ints")
                    Error(43);
                    if (sy == "colon"){
                      if (x.typ != "reals")
                      Error(42);
                      insymbol();
                      expression(fsys.concat(["comma", "rparent"]), y);
                      if (y.typ != "ints")
                      Error(43);
                      emit(linecount, 37);
                    }
                    else
                      emit1(linecount, 30, types1.indexOf(x.typ));
                  }
                  else
                    emit1(linecount, 29, types1.indexOf(x.typ));
                }
              }while(sy == "comma");
              if (sy == "rparent")
              insymbol();
              else
              Error(4);
            }
            break;
            case 21:
              if(sy == "lparent")
                insymbol();
              else
                Error(9);
              if (sy != "ident")
                Error(2, "strinsere");
              else {
                i = loc(id);
                insymbol();
                if (i !== 0)
                  if (tab[i].obj != "variable"){
                    Error(37);
                  }
                  else{
                    if(tab[i].typ != "strings"){
                      Error(67);
                    }
                    else {
                      x = new item();
                      x.typ = "strings";
                      if(tab[i].normal)
                        f = 1;
                      else
                        f = 2;
                      emit2(linecount, f, tab[i].lev, tab[i].adr, "strings");
                    }
                  }
                else
                  Error(0);
              }
              if (sy == "comma"){
                insymbol();
                var y = new item("", 1);
                expression(fsys.concat(["comma", "rparent"]), y);
                if (sy == "comma"){
                  insymbol();
                  var z = new item("", 1);
                  expression(fsys.concat(["comma", "rparent"]), z);
                  if (x.typ == "strings"){
                    if (y.typ == "ints"){
                      if (z.typ == "strings" || z.typ == "chars"){
                        if(z.typ == "chars"){
                          emit1(linecount, 25, 1);
                        }
                        emit(linecount, 61);
                        if(sy == "rparent")
                          insymbol();
                      }
                      else {
                        Error(36, z.typ, "strings");
                      }
                    }
                    else {
                      Error(36, y.typ, "ints");
                    }
                  }
                  else {
                    Error(36, x.typ, "strings");
                  }
                }
                else {
                  Error(62, 3);
                }
              }
              else {
                Error(62,2);
              }
            break;
            if (n == 4)
            emit(linecount, 63);
            break;
          }
        }
        catch(err){
          return err;
        }
      }
      try{
        if (statbegsys.concat(["ident"]).indexOf(sy) != -1)
        switch (sy) {
          case "ident":
          i = loc(id);
          insymbol();
          if (i !== 0)
          switch (tab[i].obj) {
            case "konstant":
            case "type1":
              Error(45);
            break;
            case "variable":
            assignment(tab[i].lev, tab[i].adr);
            break;
            case "prozedure":
            if (tab[i].lev !== 0)
            call(fsys,i);
            else
            standproc(tab[i].adr);
            break;
            case "funktion":
            if (tab[i].ref == display[level])
            assignment(tab[i].lev+1, 0);
            else
            Error(45);
            break;
          }
          break;
          case "beginsy":         //Linha 1982 do código original está Beginsy, verificar correção
          compoundstatement();
          break;
          case "ifsy":
          ifstatement();
          break;
          case "casesy":
          casestatement();
          break;
          case "whilesy":
          whilestatement();
          break;
          case "repeatsy":
          repeatstatement();
          break;
          case "forsy":
          forstatement();
          break;
        }
        if (sy == "semicolon"){
          Error(7);
          insymbol();
        }
        test(["ident", "realcon", "intcon", "charcon", "bools"], fsys.concat(["ident", "realcon", "intcon", "stringsy", "charcon", "bools"]), [""], 6);
      }
      catch(err){
        return err;
      }
    }//statement
  try{
    dx = 4*TAM_INT;
    prt = t;
    if (level > lmax)
    fatal(5);
    //test(["lparent", "colon", "semicolon"], fsys, 7);
    EnterBlock();
    display[level] = b;
    prb = b;
    if (tab[prt].obj == "funktion")
      switch (tab[prt-1].typ) {
        case "reals": dx += TAM_REAL;  break;
        case "bools":
        case "chars": dx += TAM_CHAR;  break;
        default:  dx += TAM_INT;

      }
    tab[prt].typ = "notyp";
    tab[prt].ref = prb;
    if (sy == "lparent")
    parameterlist();
    btab[prb].lastpar = t;
    btab[prb].psize = dx;
    if (isfun)
    if (sy == "colon"){
      insymbol();
      if (sy == "ident"){
        x = loc(id);
        insymbol();
        if (x !== 0)
        if (tab[x].obj != "type1")
        Error(29);
        else
        if (stantyps.indexOf(tab[x].typ) != -1)
        tab[prt].typ = tab[x].typ;
        else
        Error(15);
      }
      else
      skip(["semicolon"].concat(fsys), 2);
    }
    else
    Error(5);
    /*if (sy == "semicolon"){
    insymbol();}
    else
    Error(14);*/
    do{
      if (sy == "constsy")
        constantdeclaration();
      if (sy == "typesy")
        typedeclaration();
      if (sy == "varsy")
        variabledeclaration();
      btab[prb].vsize = dx;
      while(["proceduresy", "functionsy"].indexOf(sy) != -1)
        procdeclaration();
      if(sy == "semicolon"){
        Error(7);
        insymbol();
      }
      test(["beginsy"], ["beginsy"], blockbegsys.concat(statbegsys), 56);
      if (!isOk)
        return;
    }while(statbegsys.indexOf(sy) == -1);
    tab[prt].adr = lc;
    insymbol();
    statement(["semicolon", "endsy", "elsesy"].concat(fsys));
    while (sy != "endsy"){
      if (!isOk)
        return;
      if (statbegsys.concat(["ident"]).indexOf(sy) != -1 && ch != "?")
        statement(["semicolon", "endsy", "elsesy"].concat(fsys));
      else {
        if (sy == "semicolon"){
          Error(7);
          insymbol();
        }
        else{
          insymbol();
          Error();
          if (ch == "?")
            break;
        }
      }

    }
    if (ch != "?")
      insymbol();
  /*  if (sy == "endsy")
    insymbol();
    else
    Error(57);
    test(fsys.concat(["period"]), [""], 6);*/
  }
  catch(err){
    return err;
  }
}//block


try{
  initArray();

  //var Ok = false;
  /*if (paramcount >= 1){
  assign(InputFile, ParamStr(1));
  reset(InputFile);
  Ok = IoResult == 0;
  }

  /*while (!Ok){
  console.log("");
  }*/
  key[1] = 'e'; key[2] = 'arranjo';
  key[3] = 'inicio'; key[4] = 'caso';
  key[5] = 'const'; key[6] = 'div';
  key[7] = 'faca'; //key[8] = 'decrementa';
  key[9] = 'senao'; key[10] = 'fim';
  key[11] = 'para'; key[12] = 'funcao';
  key[13] = 'se'; key[14] = 'mod';
  key[15] = 'nao'; key[16] = 'de';
  key[17] = 'ou'; key[18] = 'procedimento';
  key[19] = 'programa'; key[20] = 'registro';
  key[21] = 'repita'; key[22] = 'entao';
  //key[23] = 'incrementa';
  key[24] = 'tipos';
  key[25] = 'ate'; key[26] = 'var';
  key[27] = 'enquanto'; key[28] = 'ref';
  key[29] = "passo";  key[30] = 'depurar';
  ksy[1] = "andsy"; ksy[2] = "arraysy";
  ksy[3] = 'beginsy'; ksy[4] = "casesy";
  ksy[5] = 'constsy'; ksy[6] = "idiv";
  ksy[7] = 'dosy'; ksy[8] = 'downtosy';
  ksy[9] = 'elsesy'; ksy[10] = 'endsy';
  ksy[11] = 'forsy'; ksy[12] = 'functionsy';
  ksy[13] = 'ifsy'; ksy[14] = 'imod';
  ksy[15] = 'notsy'; ksy[16] = 'ofsy';
  ksy[17] = 'orsy'; ksy[18] = 'proceduresy';
  ksy[19] = 'programsy'; ksy[20] = 'recordsy';
  ksy[21] = 'repeatsy'; ksy[22] = 'thensy';
  ksy[23] = 'tosy'; ksy[24] = 'typesy';
  ksy[25] = 'untilsy'; ksy[26] = 'varsy';
  ksy[27] = 'whilesy'; ksy[28] = 'refsy';
  ksy[29] = "stepsy"; ksy[30] = 'debugsy';
  sps['+'] = 'plus'; sps['-'] = 'minus';
  sps['*'] = 'times'; sps['/'] = 'rdiv';
  sps['('] = 'lparent'; sps[')'] = 'rparent';
  sps['='] = 'eql'; sps[','] = 'comma';
  sps['['] = 'lbrack'; sps[']'] = 'rbrack';
  sps['#'] = 'neq'; sps['&'] = 'andsy';
  sps[';'] = 'semicolon';   sps['^'] = "pointer"; sps['@'] = "address";
  xsps[0] = 'plus'; xsps[1] = 'minus';
  xsps[2] = 'times'; xsps[3] = 'rdiv';
  xsps[4] = 'lparent'; xsps[5] = 'rparent';
  xsps[6] = 'eql'; xsps[7] = 'comma';
  xsps[8] = 'lbrack'; xsps[9] = 'rbrack';
  xsps[10] = 'neq'; xsps[11] = 'andsy';
  xsps[12] = 'semicolon';   xsps[13] = 'pointer';
  nsps[0] = 'adição'; nsps[1] = 'subtração';
  nsps[2] = 'multiplicação'; nsps[3] = 'divisão';
  nsps[4] = 'parentese esquerdo'; nsps[5] = 'parentese direito';
  nsps[6] = 'igual'; nsps[7] = 'vírgula';
  nsps[8] = 'colchete esquerdo'; nsps[9] = 'colchete direito';
  nsps[10] = 'diferente'; nsps[11] = 'e lógico';
  nsps[12] = 'ponto e vírgula';   nsps[13] = 'circunflexo'; nsps[14] = "arroba";
  csps[0] = "+";  csps[1] = "-" ; csps[2] = "*";
  csps[3] = "/";  csps[4] = "(";  csps[5] = ")";
  csps[6] = "=";  csps[7] = ","; csps[8] = "[";
  csps[9] = "]";  csps[10] = "#"; csps[11] = "&";
  csps[12] = ";"; csps[13] = "^"; csps[14] = "@";
  constbegsys = ['plus', 'minus', 'intcon', 'realcon', 'charcon', 'ident', 'stringsy'];
  typebegsys = ['ident', 'arraysy', 'recordsy'];
  blockbegsys = ['constsy', 'typesy', 'varsy', 'proceduresy','functionsy', 'beginsy'];
  facbegsys = ['intcon', 'realcon', 'charcon', 'stringsy', 'ident', 'lparent', 'notsy'];
  statbegsys = ['beginsy', 'ifsy', 'whilesy', 'repeatsy', 'forsy', 'casesy'];
  stantyps = ['notyp', 'ints', 'reals', 'bools', 'chars', 'strings', "pointers"];
  lc = 0;
  ll = 0;
  cc = 0;
  ilnx = 0;
  ccx = 0;
  linecount = 0;
  charcount = 0;
  ch = " ";
  iln = 0;
  errpos = 0;
  errs = [];
  limparCodeBox();
  insymbol();
  t = -1;
  a = 0;
  b = 1;
  sx = 0;
  c2 = 0;
  display[0] = 1;
  display[1] = 1;
  display[2] = 1;
  iflag = true;
  oflag = true;
  if (sy != "programsy"){
    Error(3);
  }
  else {
    insymbol();
    if (sy != "ident")
    Error(2, "progname");
    else {
      progname = id;
      insymbol()
      if(sy == "lparent"){
        Error(66);
        insymbol();
        if(sy == "rparent")
          insymbol();
      }
      /*if (sy != "lparent")
      Error(9);
      else
      insymbol();
      /*do{
        insymbol();
        if (sy != "ident")
        Error(2);
        else {
          if (id == "input")
          iflag = true;
          else
          if (id == "output")
          oflag = true;
          else
          Error(0);
          insymbol();
        }
      }while(sy == "comma");
      if (sy == "rparent")
      insymbol();
      else
      Error(4);*/
      if (!oflag)
      Error(20);
    }
  }
  enter('', "variable", "notyp", 0);
  enter('verdadeiro', 'konstant', 'bools', 1);
  enter('falso', "konstant", "bools", 0);
  enter('nulo', 'konstant', 'pointers', 0);
  enter('real', "type1", "reals", TAM_REAL);
  enter('caractere', "type1", "chars", TAM_CHAR);
  enter('logico', "type1", "bools", TAM_BOOL);
  enter('inteiro', "type1", "ints", TAM_INT);
  enter('string', 'type1', 'strings', TAM_INT);
  enter("ponteiro", "type1", "pointers", 1);
  enter('abs', "funktion", "reals", 0);
  enter('sqr', "funktion", "reals", 2);
  enter('odd', "funktion", "bools", 4);
  enter('chr', "funktion", "chars", 5);
  enter('ord', "funktion", "ints", 6);
  enter('succ', "funktion", "chars", 7);
  enter('pred', "funktion", "chars", 8);
  enter('round', "funktion", "ints", 9);
  enter('trunc', "funktion", "ints", 10);
  enter('sin', "funktion", "reals", 11);
  enter('cos', "funktion", "reals", 12);
  enter('exp', "funktion", "reals", 13);
  enter('ln', "funktion", "reals", 14);
  enter('sqrt', "funktion", "reals", 15);
  enter('arctan', "funktion", "reals", 16);
  enter('strmax', "funktion", "strings", 17);
  enter('strmin', "funktion", "strings", 18);
  enter('leia', "prozedure", "notyp", 1);
  enter('strtmo', 'funktion', 'ints', 19);
  enter('strbusca', "funktion", "ints", 20);
  enter('strinsere', 'prozedure', 'strings', 21);
  enter('alocamem', "funktion", "pointers", 22);
  enter('escreva', "prozedure", "notyp", 3);
  enter('', "prozedure", "notyp", 0);
  btab[1].last = t;
  btab[1].lastpar = 1;
  btab[1].psize = 0;
  btab[1].vsize = 0;
  block(blockbegsys.concat(statbegsys), false, 1);
  isDone = true;
  /*if (sy != "period")
    Error(22);*/
  finalInst = lc;
  emit(ilnx, 31);
  if (btab[2].vsize > stacksize)
    Error(49);
  if (progname == "test0")
    printtables();

  /*if (errs.length == 0)
    console.log("Compilação concluída com sucesso!");
    /*if (iflag){
    /*WriteLn('input data on file ? ');
    Reset(InputFile);
    Read(xname);
    Assign(InputFile,xname);
    Reset(InputFile);
    If eof(InputFile) Then
    WriteLn(' input data missing')}*/
  }
  catch(err){
    return err;
  }
  finally{
      if (isOk)
        MsgErro = "Compilação finalizada com sucesso.";
  }

}//CompiladorPascalS
