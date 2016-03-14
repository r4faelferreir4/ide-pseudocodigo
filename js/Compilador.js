//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
  //VARIÁVEIS emit(43)
var debug = false;//Parar em debugger
var nkw = 27;		//Nº de palavras chave
var alng = 10;		//Nº de caracteres significativos nos identificadores
var llng = 120;		//Tamanho da linha de entrada
var emax = 500;		//Exponente máximo para numeros reais
var emin = -500;	//Exponente minimo para numeros reais
var kmax = 15;		//Numero maximos de digitos significativos
var tmax = 100;		//Tamanho da tabela
var bmax = 20;		//Tamanho da tabela de blocos
var amax = 30;		//Tamanho da tabela de arranjos
var c2max = 20;		//Tamanho  da tabela de numeros constantes
var csmax = 30; 	//Numero máximo de casos
var cmax = 850;		//Tamanho do código
var lmax = 10;		//Nível máximo
var smax = 600;		//Tamanho da tabela de strings
var ermax = 59;		//Nº máximo de erros
var omax = 63;		//Ordem do código de alto nível
var xmax = 1000;	//131071 2**17 - 1
var nmax = 32767;	//281474976710655 2**48-1
var lineleng = 300;	//Tamanho da linha de saída
var linelimit = 500;
var stacksize = (1024*1024)*5;   //5 megabytes de espaço
var TAM_REAL = 8;   //Tamanho em bytes do tipo real
var TAM_INT = 4;    //Tamanho em bytes do tipo inteiro
var TAM_BOOL = 1;   //Tamanho em bytes do tipo logico
var TAM_CHAR = 1;   //Tamanho em bytes do tipo caractere
var str_tab = [];

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
var types = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records", "strings"];
var types1 = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records","strings"];
var symset = ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var typeset = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records", "strings"];
function item(typ, ref){
  this.typ = typ;
  this.ref = ref;
}
function order(f, x, y, z){
  this.f = f;
  this.x = x;
  this.y = y;
  this.z = z;
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
var errs = [];    //Lista de erros
var errpos;       //Posição do erro
var progname = [];
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
    tab[j] =  {name: "", link: 1, obj: [""], typ: [""], xtyp: [""], ref: 1, normal: true, lev: 1, adr: 44};
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
    kode[j] = new order(0, 0, 0, 0);
    j++;
  }while( j < cmax);
  j = 0;
  console.log("kode iniciada");
}

function compiladorPascalS(){
  InputFile = InputFile.split("\n");
  indexmax = InputFile.length;
  console.log(InputFile[iln]);
  //DEFINIÇÕES DE FUNÇÕES FALTANDO
  function ErrorMsg(){
    var k, Msg = [];
    Msg[0] = "undef id  "; Msg[1] = "multi def ";
    Msg[2] = "identificador"; Msg[3] = "programa  " ;
    Msg[4] = ")         "; Msg[5] = ":         ";
    Msg[6] = "sintaxe    "; Msg[7] = "ident, var";
    Msg[8] = "de        "; Msg[9] = "(         ";
    Msg[10] = "id, arranjo "; Msg[11] = "[         ";
    Msg[12] = "]         "; Msg[13] = "..        ";
    Msg[14] = ";         "; Msg[15] = "func. type";
    Msg[16] = "=         "; Msg[17] = "booleano   ";
    Msg[18] = "convar typ"; Msg[19] = "tipo      ";
    Msg[20] = "prog.param"; Msg[21] = "muito grande   ";
    Msg[22] = ".         "; Msg[23] = "typ (case)";
    Msg[24] = "caracter "; Msg[25] = "const id  ";
    Msg[26] = "index type"; Msg[27] = "indexbound";
    Msg[28] = "no array  "; Msg[29] = "type id   ";
    Msg[30] = "undef type"; Msg[31] = "no record ";
    Msg[32] = "boole type"; Msg[33] = "arith type";
    Msg[34] = "inteiro   "; Msg[35] = "tipos     ";
    Msg[36] = "param type"; Msg[37] = "variab id ";
    Msg[38] = "string    "; Msg[39] = "N. de partes";
    Msg[40] = "tipo      "; Msg[41] = "tipo      ";
    Msg[42] = "real type "; Msg[43] = "inteiro   ";
    Msg[44] = "var, const"; Msg[45] = "var, proc ";
    Msg[46] = "types (:=)"; Msg[47] = "typ (case)";
    Msg[48] = "tipo      "; Msg[49] = "store ovfl";
    Msg[50] = "constante  "; Msg[51] = ":=        ";
    Msg[52] = "entao      "; Msg[53] = "ate     ";
    Msg[54] = "faça        "; Msg[55] = "para baixo ";
    Msg[56] = "inicia     "; Msg[57] = "fim       ";
    Msg[58] = "fator    ";
    k = 0;
    console.log("\n");
    console.log(" palavras chave");
    while (errs.length !== 0){        //Verificação se o vetor está vázio.
      while (!(k < ermax && k > 0))  //Verificação de k está entre os valores de erro cadastrados
      k++;
      console.log(k + "   " + Msg[k]);  //Exibindo erro no console
      errs.splice(0, 1);  //Localiza o erro que foi exibido e elimina-o da lista de erros
    }

  }

  //FUNÇÃO DE BUSCA DE CARACTERES
  function NextCh(){
    try{
      if (InputFile[iln] === "")  iln++;
      if (iln > indexmax && cc >= ll){
        throw new Error("Programa incompleto");
      }
      if (cc == ll){
        if (errpos !== 0)
        errpos = 0;
        if (iln < indexmax){
          ll = 0;
          cc = 0;
          line = InputFile[iln];
          iln++;
          ll = line.length;
        }
      }
      if (cc < ll){
        ch = line[cc];
        cc++;
      }
      else
        if(iln == indexmax)
          ch = "?";
    }
    catch(err){
      return err;
    }
  }
  //Função Error
  function Error(struct, str){
    try{
      debugger;
      if (isOk){
        isOk = false;
        str = "";
        str += "Um erro foi encontrado";
        switch(struct){
          case "assignment":
            str += "\nEspera-se uma instrução desta forma:";
            str += "\n"+"<variável>"+":=".bold()+"<expressão>";
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
      throw new Error("Tabela do compilador para "+ Msg[n] +" é muito pequena");
      // continue AppEnd;    //Termina compilação.
    }
    catch(err){
      return err;
    }
  }

  function insymbol(){      //Lê o próximo simbolo
    var i, j, k, e;
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
        while (ch >= 0 && ch <= 9 && ch != " "){
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
      while(ch == " " || ch == "\t")  //Pula espaços em branco
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
          if (cc == 1)
            break;
        }while(ch != " " && ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9")));
      i = key.indexOf(id);
      if (i != -1)
        sy = ksy[i];
      else
        sy = "ident";
    }
    else {
      if (ch >= "0" && ch <= "9" && ch != " "){
        k = 0;
        inum = 0;
        sy = "intcon";
        do{
          inum = inum * 10 + Number(ch);
          k++;
          NextCh();
        }while(ch >= 0 && ch <= 9 && ch != " ");
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
            if ((sx + k) == smax)
            fatal(7);
            stab[sx+k] = ch;
            k++;
            if (cc == 1)    //mudou de linha
            k = 0;
          }while(cc != 1);
          if (k == 1){
            sy = "charcon";
            inum = stab[sx].charCodeAt();
          }
          else
          if (k === 0){
            Error(38);
            sy = "charcon";
            inum = 0;
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
              while (ch != "*")
              NextCh();
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
      Error(27);
    if (Math.abs(l) > xmax || Math.abs(h) > xmax){
      Error(27);
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

function emit(fct){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit

function emit1(fct, b){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].y = b;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit1

function emit2(fct, a, b, c){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].x = a;
    kode[lc].y = b;
    kode[lc].z = c;
    lc++;
  }
  catch(err){
    return err;
  }
}//emit2

function printtables(){
  var i;
  var o = new order(0, 0, 0);
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

    function skip(fsys, n){
      try{
        Error(n);
        while(fsys.indexOf(sy) == -1)
          insymbol();
      }
      catch(err){
        return err;
      }
    }
    function test(s1, s2, n){
      try{
        if (s1.indexOf(sy) == -1){
          skip(s1.concat(s2), n);
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
        test(["ident"].concat(blockbegsys), fsys, 6);
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
            Error(1);
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
        else
          Error(2);
      }
      catch(err){
        return err;
      }
    }//entervariable

    function constant(fsys, c){
      var x, sign;
      try{
        test(constbegsys, fsys, 50);
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
          test(fsys, [""], 6);
        }
      }
      catch(err){
        return err;
      }
    }//constant

    function typ(fsys, xtype){
      var x, eltp, elrf, elsz, offset, t0, t1;
      function arraytyp(xtype){
        var eltp, low, high, elrf, elsz;
        try{
          low = new conrec("", 0, 0);
          high = new conrec("", 0, 0);
          constant(["colon", "rbrack", "rparent", "ofsy"].concat(fsys), low);
          if (low.tp == "reals"){
            Error(27);
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
        test(typebegsys, fsys, 10);
        if (typebegsys.indexOf(sy) != -1){
          if (sy == "ident"){
            x = loc(id);
            if (x !== 0)
              if (tab[x].obj != "type1")
                Error(29);
              else {
                xtype.tp = tab[x].typ;
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
                  typ(fsys.concat(["semicolon", "endsy", "comma", "ident"]), xtype2);
                  eltp = xtype2.tp;
                  elrf = xtype2.rf;
                  elsz = xtype2.sz;
                  while (t0 < t1){
                    t0++;
                    tab[t0].typ = eltp;
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
          test(fsys, [""], 6);
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
        test(["ident", "refsy"], fsys.concat(["rparent"]), 7);
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
              Error(2);
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
            test(["semicolon", "rparent"], ["ident", "comma"].concat(fsys), 14);
          }
          else
            Error(5);
          while(t0 < t){
            t0++;
            tab[t0].typ = tp;
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
            test(["ident", "varsy"], ["rparent"].concat(fsys), 6);
          }
        }
        if (sy == "rparent"){
          insymbol();
          test(["varsy","beginsy","semicolon", "colon"], fsys, 6);
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
        test(["ident"], blockbegsys, 2);
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
      var tp, rf, sz, t1;
      try{
        insymbol();
        test(["ident"], blockbegsys, 2);
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
          typ(["semicolon", "comma", "ident"].concat(fsys), xtype);
          tab[t1].typ = xtype.tp;
          tab[t1].ref = xtype.rf;
          tab[t1].adr = xtype.sz;
          //TestSemicolon();
        }
      }
      catch(err){
        return err;
      }
    }//typedeclaration

    function variabledeclaration(){
      var t0, t1, rf, sz, tp;
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
          var xtype = new xtp(tp, rf, sz);
          typ(["semicolon", "comma", "ident"].concat(fsys), xtype);
          while(t0 < t1){
            t0++;
            tab[t0].typ = xtype.tp;
            tab[t0].ref = xtype.rf;
            tab[t0].lev = level;
            tab[t0].adr = dx;
            if (xtype.tp != "pointers")
              tab[t0].normal = true;
            else
              tab[t0].normal = false;
            dx += xtype.sz;
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
        if(debug)
        debugger;
        isfun = sy == "functionsy";
        insymbol();
        if (sy != "ident"){
          Error(2);
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
        len = TAM_INT;
        if(isfun){
          bool++;
          switch (tab[tx].typ) {
            case "reals": len = TAM_REAL; break;
            case "chars":
            case "bools": len = TAM_CHAR; break;
            default:  len = TAM_INT ;

          }
        }
        emit1(32 + bool, len);
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
              insymbol();
              if (sy != "ident")
                Error(2);
              else {
                if (v.typ != "records")
                  Error(31);
                else {
                  j = btab[v.ref].last;
                  tab[0].name = id;
                  while(tab[j].name != id)
                    j = tab[j].link;
                  if (j === 0)
                    Error(0);
                  v.typ = tab[j].typ;
                  v.ref = tab[j].ref;
                  a = tab[j].adr;
                  if (a !== 0)
                    emit1(9, a);
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
                insymbol();
                if (v.typ != "arrays"){
                  if (v.typ == "strings" || v.typ == "chars"){
                    if (v.typ == "strings" && !assign)
                      emit1(34, TAM_INT);
                    expression(fsys.concat(["comma", "rbrack"]), x);
                    if(x.typ != "ints")
                      Error("assignment", "Valor incorreto na posição");
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
                    Error(26);
                  else
                    if (atab[a].elsize == 1)
                      emit1(20, a);
                    else
                      emit1(21, a);
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
          test(fsys.concat("ident", "plus", "minus", "rdiv", "times"), "", 6);
        }
        catch(err){
          return err;
        }
      }//Selector

      function call(fsys, i){
        var x, lastp, cp, k;
        try{
          x = new item("", 1);
          emit1(18, i);
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
                      Error(36);
                    else
                      if (x.typ == "arrays")
                        emit1(22, atab[x.ref].size);
                      else
                        if (x.typ == "arrays")
                          emit1(22, atab[x.ref].size);
                        else
                          if (x.typ == "records")
                            emit1(22, btab[x.ref].vsize);
                  }
                  else
                    if (x.typ == "ints" && tab[cp].typ == "reals")
                      emit1(26,TAM_INT);
                    else
                      if (x.typ != "notyp")
                        Error(36);
                }
                else {
                  if (sy != "ident")
                    Error(2);
                  else {
                    k = loc(id);
                    insymbol();
                    if (k !== 0){
                      if (tab[k].obj != "variable")
                        Error(37);
                      x.typ = tab[k].typ;
                      x.ref = tab[k].ref;
                      if (tab[k].normal)
                        emit2(0, tab[k].lev, tab[k].adr);
                      else
                        emit2(1, tab[k].lev, tab[k].adr, tab[k].typ);
                      if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
                        selector(fsys.concat(["comma", "colon", "rparent"]), x, false);
                      if (x.typ != tab[cp].typ || x.ref != tab[cp].ref)
                        Error(36);
                    }
                  }
                }
              }
              test(["comma", "rparent"], fsys, 6);
            }while(sy == "comma");
            if (sy == "rparent")
              insymbol();
            else
              Error(4);
          }
          if (cp < lastp)
            Error(39);
          emit2(19, tab[i].typ, btab[tab[i].ref].psize);
          if (tab[i].lev < level)
            emit2(3, tab[i].lev, level);
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
                emit1(26, TAM_REAL);
              }
            else {
              result =  "reals";
              if (b == "ints")
                emit1(26, TAM_INT);
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
                          emit1(26,TAM_INT);
                      break;
                      case 17:
                        ts = ["strings"];
                        if (x.typ == "strings"){
                          emit(65);
                        }
                        else {
                          Error("strmax", "\nErro, parâmetro incorreto");
                        }
                      break;
                      case 18:
                        ts = ["strings"];
                        if (x.typ == "strings"){
                          emit(66);
                        }
                        else {
                          Error("strmin", "\nErro, parâmetro incorreto");
                        }
                      break;
                      case 19:
                      ts = ["ints", "strings"];
                      if (x.typ == "strings"){
                        emit(64);
                      }
                      else {
                        Error("strtmo", "\nVariável informada de tipo incorreto.");
                      }
                      break;
                      case 20:
                        if (x.typ == "strings"){
                          insymbol();
                          var y = new item("", 1);
                          expression(fsys.concat(["rparent"]), y);
                          if (y.typ == "strings" || y.typ == "chars"){
                            ts = ["ints", "strings", "chars"];
                            emit(67);
                          }
                          else {
                            Error("strbusca", "\nParâmetro incorreto");
                          }
                        }
                        else {
                          Error("strbusca", "\nParâmetro incorreto");
                        }
                      break;
                      case 21:
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
                              if (z.typ == "strings"){
                                ts = ["strings", "chars", "ints"];
                                emit(63);
                              }
                              else {
                                Error("strinsere", "\nTerceiro argumento precisa ser do tipo literal.");
                              }
                            }
                            else {
                              Error("strinsere", "Segundo argumento precisa ser do tipo inteiro. ");
                            }
                          }
                          else {
                            Error("strinsere", "\nPrimeiro argumento precisa ser do tipo literal. ");
                          }
                        }
                        else {
                          Error("strinsere", "\nEstá faltando o terceiro argumento ou uma vírgula. ");
                        }
                      }
                      else {
                        Error("strinsere", "\nEstá faltando o segundo argumento ou uma vírgula.");
                      }
                      break;
                    }
                    if (ts.indexOf(x.typ) != -1)
                    emit1(8, n);
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
                test(facbegsys.concat(["andsy", "times"]), fsys, 58);
                var reference = false;  //Atribuição de endereço em ponteiro
                var ireference = false; //Leitura de valor de ponteiro
                if (sy == "andsy"){
                  insymbol();
                  reference = true;
                }
                if (sy == "times"){
                  insymbol();
                  ireference = true;
                }
                while (facbegsys.indexOf(sy) != -1){
                  if (sy == "ident"){
                    i = loc(id);
                    insymbol();
                    switch (tab[i].obj) {
                      case "konstant":
                        x.typ = tab[i].typ;
                        x.ref = 0;
                        if (x.typ == "reals")
                          emit2(24, tab[i].typ, tab[i].adr);
                        else
                          emit2(24, tab[i].typ, tab[i].adr);
                      break;
                      case "variable":
                        x.typ = tab[i].typ;
                        x.ref = tab[i].ref;
                        if (!reference){ //Não está atribuindo endereço
                          if (x.typ == "pointers")
                            x.typ = tab[i].xtyp;
                          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                            if (tab[i].normal)
                              f = 0;
                            else
                              f = 1;
                            emit2(f, tab[i].lev, tab[i].adr, tab[i].typ);
                            selector(fsys, x, false);
                            if (stantyps.indexOf(x.typ) != -1 && x.typ != "strings"){
                              var ltyp;
                              switch (x.typ) {
                                case "reals": ltyp = TAM_REAL;break;
                                case "ints":ltyp = TAM_INT;break;
                                case "bools":ltyp = TAM_BOOL;break;
                                case "chars":ltyp = TAM_CHAR;break;
                              }
                              emit1(34, ltyp);
                            }
                            if (x.typ == "strings" && x.ref == 1){
                              x.ref = 0;
                              x.typ = "chars";
                              emit(62);
                            }
                            else{
                              if (x.typ == "strings" && x.ref == 0)
                                emit1(34, TAM_INT);
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
                            if (ireference && f > 0)
                              f--;    //O programador quer acessar o valor do ponteiro e não da variável apontada
                            emit2(f, tab[i].lev, tab[i].adr, tab[i].typ);
                          }
                        }
                        else {
                          x.typ = "pointers";
                          if (tab[i].normal)
                            f = 0;
                          else
                            f = 1;
                          emit2(f, tab[i].lev, tab[i].adr. tab[i].typ);
                          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                            if (x.typ == "strings"){
                              x.typ = "chars";
                            }
                            selector(["becomes", "eql", "plus", "minus", "rdiv", "times"].concat(fsys), x, true);
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
                      emit2(24, x.typ, c1);
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
                      emit2(24, x.typ, inum);
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
                    emit(35);
                    else
                    if (x.typ != "notyp")
                    Error(32);
                  }
                  test(fsys.concat(["ident","untilsy", "stringsy"]), facbegsys, 6);
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
                  emit(69);
                }
                insymbol();
                factor (fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), y);
                if (op == "times"){
                  x.typ = resulttype(x.typ, y.typ);
                  emit1(57, x.typ);

                }
                else
                if(op == "rdiv"){
                  if (x.typ == "ints"){
                    emit1(26,TAM_REAL);
                    x.typ = "reals";
                  }
                  if(y.typ == "ints"){
                    emit1(26,TAM_INT);
                    y.typ = "reals";
                  }
                  if (x.typ == "reals" && y.typ == "reals")
                    emit1(58, "reals");
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                    Error(33);
                    x.typ = "notyp";
                  }
                }
                else
                if (op == "andsy"){
                  if (x.typ == "bools" && y.typ == "bools"){
                    emit(56);
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
                      emit1(58, "ints");
                    else
                      emit(59);
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
                  emit1(36, TAM_INT);
            }
            else
              term(fsys.concat(["plus", "minus", "orsy"]), x);
            while (["plus", "minus", "orsy"].indexOf(sy) != -1){
              op = sy;
              var lcx;
              if (op == "orsy"){
                lcx = lc;
                emit(68);
              }
              insymbol();
              term(fsys.concat(["plus", "minus", "orsy"]), y);
              if (op == "orsy"){
                if (x.typ == "bools" && y.typ == "bools"){
                  emit(51);
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
                    emit1(25, 1);
                if(y.typ == "strings")
                  if (x.typ == "chars")
                    emit1(25, 2);
                x.typ = resulttype(x.typ, y.typ);
                switch (x.typ) {
                  case "strings":
                  if(op == "plus")
                    emit1(52, "strings");
                  else
                    Error();
                  break;
                  case "ints":
                    if (op == "plus")
                        emit1(52, "ints");
                    else
                      emit1(53, "ints");
                  break;
                  case "reals":
                    if (op == "plus")
                        emit1(52, "reals");
                    else
                      emit1(53, "reals");
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
            if (["notyp", "ints", "bools", "chars", "strings", "reals"].indexOf(x.typ) != -1 && x.typ == y.typ)
              switch (op) {
                case "eql": emit1(39, x.typ);break;
                case "neq": emit1(40, x.typ);break;
                case "lss": emit1(41, x.typ);break;
                case "leq": emit1(42, x.typ);break;
                case "gtr": emit1(43, x.typ);break;
                case "geq": emit1(44, x.typ);break;
              }
            else {
              if (x.typ == "strings" || y.typ == "strings"){
                if (x.typ == "chars"){
                  emit1(25, 2);
                }
                else if(y.typ == "chars"){
                  emit1(25, 1);
                }
                switch (op) {
                  case "eql": emit1(39, x.typ);break;
                  case "neq": emit1(40, x.typ);break;
                  case "lss": emit1(41, x.typ);break;
                  case "leq": emit1(42, x.typ);break;
                  case "gtr": emit1(43, x.typ);break;
                  case "geq": emit1(43, x.typ);break;
                }
              }
              else{
                if (x.typ == "reals")
                  if(y.typ == "ints")
                    emit1(26,TAM_INT);
                if(y.typ == "reals")
                  if(x.typ == "ints")
                    emit1(26,TAM_REAL);
                switch (op) {
                  case "eql": emit1(39, x.typ);break;
                  case "neq": emit1(40, x.typ);break;
                  case "lss": emit1(41, x.typ);break;
                  case "leq": emit1(42, x.typ);break;
                  case "gtr": emit1(43, x.typ);break;
                  case "geq": emit1(44, x.typ);break;
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
          var x, y, f,op="", assign=1;    //assign para atribuições multiplas, quantas atribuições a instrução 38 fará
          x = new item("", 1);
          y = new item("", 1);
          x.typ = tab[i].typ;
          x.ref = tab[i].ref;
          debugger;
          if (tab[i].normal)
            f = 0;
          else
            f = 1;
          emit2(f, lv, ad, "ints");
          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
            if (x.typ == "strings"){
              x.typ = "chars";
            }
            selector(["becomes", "eql", "plus", "minus", "rdiv", "times"].concat(fsys), x, true);
          }
          if (sy == "becomes")
            insymbol();
          else {
            if (sy == "comma"){
              while(sy == "comma"){
                insymbol();
                var p = loc(id);
                if (p == 0)
                  Error("assignment", "Variável não declarada");
                if (tab[p].typ == tab[i].typ){
                  if (tab[p].normal)
                    f = 0;
                  else
                    f = 1;
                  emit2(f, tab[p].lev, tab[p].adr, tab[p].typ);
                  assign++;
                }
                else {
                  Error("assignment", "Atribuições multiplas só podem ser feitas com variáveis do mesmo tipo");
                  break;
                }
                insymbol();
                if (sy in ["lbrack", "lparent", "period"])
                  Error("assignment", "Atribuição multipla não suporta posições de arranjos e strings");
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
                emit2(f, tab[i].lev, tab[i].adr, tab[i].typ);
              }
              switch (sy) {
                case "plus":
                  op = "plus";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error();
                break;
                case "minus":
                  op = "minus";
                  insymbol();
                  if(debug)
                  debugger;
                  if (sy == "eql")
                    insymbol();
                  else
                    Error("assignment", "Operador de atribuição desconhecido");
                break;
                case "times":
                  op = "mult";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error("assignment", "Operador de atribuição desconhecido");
                break;
                case "rdiv":
                  op = "div";
                  insymbol();
                  if (sy == "eql")
                    insymbol();
                  else
                    Error("assignment", "Operador de atribuição desconhecido");
                break;
                default:
                  Error("assignment", "Está faltando o operador \'"+":=".bold()+'\'');
                  if (sy == "eql")
                    insymbol();

              }
            }
          }
          expression(fsys, y);
          if(debug)
          debugger;
          if (x.typ == y.typ)
            if (stantyps.indexOf(x.typ) != -1){
              if(x.typ == "strings" && x.ref == 1){
                Error("assignment", "Erro! Tentando armazenar string como caracter");
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
                    emit2(f, tab[i].lev, tab[i].adr, tab[i].typ);
                    emit(63);
                  }
                }
                switch (op) {
                    case "plus": emit1(52, x.typ); break;
                  case "minus":emit1(53, x.typ); break;
                  case "mult":  emit1(57, x.typ); break;
                  case "div": emit1(58, x.typ); break;
                }

                emit2(38, x.typ, assign);
              }
            }
            else
              if(x.ref != y.ref)
                Error(46);
              else
                if (x.typ == "arrays")
                  emit1(23, atab[x.ref].size);
                else
                  emit1(23, btab[x.ref].vsize);
          else{
            if(x.typ == 'strings'){
              if (x.ref == 1){
                if (y.typ != "chars"){
                  Error("assignment", "Tentando atribuir um valor não caracter a uma posição de string");
                }
                else {
                  if (tab[i].typ != "arrays")
                    emit2(1, tab[i].lev, tab[i].adr, tab[i].typ);
                  else {
                    var ltyp;
                    switch (y.typ) {
                      case "reals":ltyp = TAM_REAL;break;
                      case "ints":ltyp = TAM_INT;break;
                      case "bools":ltyp = TAM_BOOL;break;
                      case "chars":ltyp = TAM_CHAR;break;
                    }
                    emit1(34, ltyp);
                  }
                  emit(63);
                  emit2(38, x.typ, assign);
                }
              }
              else {
                emit2(38, x.typ, assign);
              }
            }
            else{
              if (x.typ == "reals" && y.typ == "ints"){
                emit1(26,TAM_INT);
                switch (op) {
                  case "plus": emit1(52, x.typ); break;
                  case "minus":emit1(53, x.typ); break;
                  case "mult":emit1(57, x.typ); break;
                  case "div": emit1(58, x.typ); break;
                }
                emit2(38, x.typ, assign);
              }
              else
                if (x.typ != "notyp" && y.typ != "notyp" || x.typ == "pointers")
                  emit2(38, x.typ, assign);
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
            else
              break;
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
            Error(17);
          lc1 = lc;
          emit(11);
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
            emit(10);
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
              k = 0;
              if (lab.tp == "reals")
                casetab[i].val = lab.r;
              else
                casetab[i].val = lab.i;
              casetab[i].lc = lc;
              do
                k++;
              while (casetab[k].val != lab.i);
              if (k < 1)
                Error(1); //{multiple definition}
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
              emit(10);
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
          debugger;
          i = 0;
          j = 0;
          expression(fsys.concat(["ofsy", "comma", "colon"]), x);
          if (["ints", "reals", "bools", "chars", "notyp"].indexOf(x.typ) == -1)
            Error(23);
          lc1 = lc;
          emit2(12, x.typ, 0);
          if (sy == "ofsy")
            insymbol();
          else
            Error(8);
          onecase();
          while (sy != "endsy") {
            onecase();
          }
          kode[lc1].y = lc;
          debugger;
          for (k = 1; k <= i; k++) {
            emit1(13, casetab[k].val);
            emit1(13, casetab[k].lc);
          }
          emit1(10, 0);
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
          }
          if (sy == "untilsy"){
            insymbol();
            expression(fsys, x);
            if (["bools", "notyp"].indexOf(x.typ) == -1)
              Error(17);
            emit1(11, lc1);
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
            Error(17);
          lc2 = lc;
          emit(11);
          if (sy == "dosy")
            insymbol();
          else
            Error(54);
          statement(fsys);
          emit1(10, lc1);
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
            if (i === 0)
              cvt = "ints";
            else
            if (tab[i].obj == "variable"){
              cvt = tab[i].typ;
              emit2(0, tab[i].lev, tab[i].adr);
              if (["notyp", "ints", "bools", "chars", "reals"].indexOf(cvt) == -1)
                Error(18);
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
            Error(19);
          }
          else
            skip(["untilsy"].concat(fsys), 51);
          f = 14;
          var steptyp = TAM_INT;
          if (sy == "untilsy"){
            insymbol();
            var p;
            p = new item("", 1);
            expression(fsys.concat(["stepsy", "dosy"]), p);
            if (p.typ != cvt)
              Error("para", "Tipo de valor informado incorreto");
            else{
              if (sy == "stepsy"){
                insymbol();
                if (sy == "minus"){
                  insymbol();
                  if (sy == "intcon" || sy == "realcon"){
                    if (sy == "intcon"){
                      if (cvt == "ints")
                        emit2(24, cvt, inum);
                      else
                        Error("para", "Erro, tipo do passo incompatível com a variável inicial");
                    }
                    else{
                      if (cvt == "reals"){
                        EnterReal(rnum);
                        emit2(24, cvt, c1);
                        steptyp = TAM_REAL;
                      }
                      else
                        Error("para", "Erro, tipo do passo incompatível com a variável inicial");
                    }
                  }
                  emit1(36, steptyp);
                }
                else {
                  if (sy == "intcon" || sy == "realcon"){
                    if (sy == "intcon"){
                      if (cvt == "ints")
                        emit2(24, cvt, inum);
                      else
                        Error("para", "Erro, tipo do passo incompatível com a variável inicial");
                    }
                    else{
                      if (cvt == "reals"){
                        EnterReal(rnum);
                        emit2(24, cvt, c1);
                        steptyp = TAM_REAL;
                      }
                      else
                        Error("para", "Erro, tipo do passo incompatível com a variável inicial");
                    }
                  }

                }
                if (p.typ != cvt) {
                  Error("para", "Valor informado para o passo precisa ser um número inteiro");
                }
                insymbol();
              }
              else {
                emit2(24, cvt, 1);
              }
            }
          }
          else {
            Error("para", "É necessário informar um ponto de parada para a estrutura \'para\'");
          }
          lc1 = lc;
          if (kode[lc-1].f == 36)
            f = 16;
          emit2(f, steptyp, 0);
          if (sy == "dosy")
            insymbol();
          else
              Error(54);
          lc2 = lc;
          statement(fsys);
          emit2(f+1, steptyp, lc2);
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
                Error(2);
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
                    emit2(f, tab[i].lev, tab[i].adr, tab[i].typ);
                    if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
                    selector(fsys.concat(["comma", "rparent"]), x, false);
                    if (["ints", "reals", "chars", "notyp", "strings"].indexOf(x.typ) != -1)
                    emit1(27, types1.indexOf(x.typ));
                    else
                    Error(40);
                  }
                }
                test(["comma", "rparent"], fsys, 6);
              }while(sy == "comma");
              if (sy == "rparent")
              insymbol();
              else
              Error(4);
            }
            if (n == 2)
            emit(62);
            break;
            case 3:
            case 4:
            if (sy == "lparent"){
              do{
                insymbol();
                if (sy == "stringsy"){
                  emit1(24, sleng);
                  emit1(28, inum);
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
                      emit(37);
                    }
                    else
                      emit1(30, types1.indexOf(x.typ));
                  }
                  else
                    emit1(29, types1.indexOf(x.typ));
                }
              }while(sy == "comma");
              if (sy == "rparent")
              insymbol();
              else
              Error(4);
            }
            if (n == 4)
            emit(63);
            break;
          }
        }
        catch(err){
          return err;
        }
      }
      try{
        debugger;
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
        test(fsys.concat(["ident", "realcon", "intcon", "charcon", "bools"]), [""], 14);
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
      test(["beginsy"], blockbegsys.concat(statbegsys), 56);
    }while(statbegsys.indexOf(sy) == -1);
    tab[prt].adr = lc;
    insymbol();
    statement(["semicolon", "endsy", "elsesy"].concat(fsys));
    while (sy != "endsy"){
      /*if (sy == "semicolon")
      insymbol();
      else
      Error(14);*/
      if (statbegsys.concat(["ident"]).indexOf(sy) != -1 && ch != "?")
        statement(["semicolon", "endsy", "elsesy"].concat(fsys));
      else {
        insymbol();
        Error();
        if (ch == "?")
          break;
      }

    }
    if(debug)
    debugger;
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
  key[7] = 'faca'; key[8] = 'decrementa';
  key[9] = 'senao'; key[10] = 'fim';
  key[11] = 'para'; key[12] = 'funcao';
  key[13] = 'se'; key[14] = 'mod';
  key[15] = 'nao'; key[16] = 'de';
  key[17] = 'ou'; key[18] = 'procedimento';
  key[19] = 'programa'; key[20] = 'registro';
  key[21] = 'repete'; key[22] = 'entao';
  key[23] = 'incrementa'; key[24] = 'tipos';
  key[25] = 'ate'; key[26] = 'var';
  key[27] = 'enquanto'; key[28] = 'ref';
  key[29] = "passo";
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
  ksy[29] = "stepsy";
  sps['+'] = 'plus'; sps['-'] = 'minus';
  sps['*'] = 'times'; sps['/'] = 'rdiv';
  sps['('] = 'lparent'; sps[')'] = 'rparent';
  sps['='] = 'eql'; sps[','] = 'comma';
  sps['['] = 'lbrack'; sps[']'] = 'rbrack';
  sps['#'] = 'neq'; sps['&'] = 'andsy';
  sps[';'] = 'semicolon';
  csps[0] = "+";  csps[1] = "-" ; csps[2] = "*";
  csps[3] = "/";  csps[4] = "(";  csps[5] = ")";
  csps[6] = "=";  csps[7] = ","; csps[8] = "[";
  csps[9] = "]";  csps[10] = "#"; csps[11] = "&";
  csps[12] = ";";
  constbegsys = ['plus', 'minus', 'intcon', 'realcon', 'charcon', 'ident', 'stringsy'];
  typebegsys = ['ident', 'arraysy', 'recordsy'];
  blockbegsys = ['constsy', 'typesy', 'varsy', 'proceduresy','functionsy', 'beginsy'];
  facbegsys = ['intcon', 'realcon', 'charcon', 'stringsy', 'ident', 'lparent', 'notsy'];
  statbegsys = ['beginsy', 'ifsy', 'whilesy', 'repeatsy', 'forsy', 'casesy'];
  stantyps = ['notyp', 'ints', 'reals', 'bools', 'chars', 'strings'];
  lc = 0;
  ll = 0;
  cc = 0;
  ch = " ";
  iln = 0;
  errpos = 0;
  errs = [];
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
    console.log("Aplicação finalizada");
    return;
  }
  else {
    insymbol();
    if (sy != "ident")
    Error(2);
    else {
      progname = id;
      insymbol();
      if (sy != "lparent")
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
      }while(sy == "comma");*/
      if (sy == "rparent")
      insymbol();
      else
      Error(4);
      if (!oflag)
      Error(20);
    }
  }
  enter('', "variable", "notyp", 0);
  enter('falso', "konstant", "bools", 0);
  enter('verdadeiro', "konstant", "bools", 1);
  enter('real', "type1", "reals", TAM_REAL);
  enter('caracter', "type1", "chars", TAM_CHAR);
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
  enter('strinsere', 'funktion', 'strings', 21);
  enter('escreva', "prozedure", "notyp", 3);
  //enter('escreveln', "prozedure", "notyp", 4);
  enter('', "prozedure", "notyp", 0);
  btab[1].last = t;
  btab[1].lastpar = 1;
  btab[1].psize = 0;
  btab[1].vsize = 0;
  if(debug)
  debugger;
  block(blockbegsys.concat(statbegsys), false, 1);
  isDone = true;
  /*if (sy != "period")
    Error(22);*/
  emit(31);
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
    alert("Compilação finalizada");
    //interpret();
  }

}//CompiladorPascalS

//VARIÁVEIS INTERPRETADOR
var ir; //buffer de instrução
var lncnt, ocnt, blkcnt, chrcnt, pc;//contadores
var ps = "";
var ps1 = ["run", "fin", "caschk", "divchk", "inxchk", "stkchk", "linchk",
"lngchk", "redchk"];
var t; //index do top da pilha
var b; //index base
var h1, h2, h3, h4;
var fld = new Array(4);//tamano padrão dos campos
var display = new Array(lmax);
var stack = new ArrayBuffer(stacksize);
var s = new DataView(stack);//new Array(stacksize);
var call_read = false;
var read_ok = false;

function interpreter(){
  do {
    ir = kode[pc];
    pc++;
    ocnt++;
    (debug)
    debugger;
    switch(ir.f){
      case 0:
      s.setInt32(t, (display[ir.x]+ir.y));
      t += TAM_INT;
      break;

      case 1:
      switch (ir.z) {
        case "reals":
        s.setFloat64(t, s.getFloat64(display[ir.x]+ir.y));
        t += TAM_REAL;
        break;
        case "chars":
        s.setUint8(t, s.getUint8(display[ir.x]+ir.y));
        t += TAM_CHAR;
        break;
        case "bools":
        s.setUint8(t, s.getUint8(display[ir.x]+ir.y));
        t += TAM_BOOL;
        break;
        default:
        s.setInt32(t, s.getInt32(display[ir.x]+ir.y));
        t += TAM_INT;
      }
      break;

      case 2:
      switch (ir.z) {
        case "reals":
        s.setFloat64(t, s.getFloat64(s.getInt32(display[ir.x]+ir.y)));
        t += TAM_REAL;
        break;
        case "chars":
        s.setUint8(t, s.getUint8(s.getInt32(display[ir.x]+ir.y)));
        t += TAM_CHAR;
        break;
        case "bools":
        s.setUint8(t, s.getUint8(s.getInt32(display[ir.x]+ir.y)));
        t += TAM_BOOL;
        break;
        default:
        s.setInt32(t, s.getInt32(s.getInt32(display[ir.x]+ir.y)));
        t += TAM_INT;
      }
      break;

      case 3:
      h1 = ir.y;
      h2 = ir.x;
      h3 = b;
      do{
        display[h1] = h3;
        h1--;
        h3 = s.getInt32(h3 + 2);
      }
      while( h1 == h2);
      break;

      case 8:
      switch (ir.y) {
        case 0:
          s.setInt32(t-TAM_INT, Math.abs(s.getInt32(t-TAM_INT)));
        break;
        case 1:
          s.setFloat64(t-TAM_REAL, Math.abs(s.getFloat64(t-TAM_REAL)));
        break;
        case 2:
          s.setInt32(t-TAM_INT, Math.pow(s.getInt32(t-TAM_INT), 2));
        break;
        case 3:
          s.setFloat64(t-TAM_REAL, Math.pow(s.getFloat64(t-TAM_REAL), 2));
        break;
        case 4:
          s.setInt8(t-TAM_INT, (s.getInt32(t-TAM_INT)%2 != 0));
          t -= 3;//Alocação de um valor inteiro de 4 bytes em um de 1 byte, libera 3 bytes
        break;
        case 5:
          s.setUint8(t-TAM_INT, s.getInt32(t-TAM_INT));
          t -= 3; //Alocação de um valor inteiro de 4 bytes em um de 1 byte, libera 3 bytes
        break;
        case 6:
          s.setInt32(t-TAM_CHAR, s.getInt8(t-TAM_CHAR));
          t += 3;   //Converção de caratere para inteiro, alocação de mais 3 bytes
        break;
        case 7:
          s.setUint8(t-TAM_CHAR, (s.getInt8(t-TAM_CHAR)+1));
        break;
        case 8:
          s.setUint8(t-TAM_CHAR, (s.getInt8(t-TAM_CHAR)-1));
        break;
        case 9:
          s.setInt32(t-TAM_REAL, Math.round(s.getFloat64(t-TAM_REAL)));
          t -= 4;   //Converte real para inteiro e libera 4 bytes
        break;
        case 10:
          s.setInt32(t-TAM_REAL, Math.floor(s.getFloat64(t-TAM_REAL)));
          t -= 4; //Converte real para inteiro e libera 4 bytes
        break;
        case 11:
          s.setFloat64(t-TAM_REAL, Math.sin(s.getFloat64(t - TAM_REAL)));
        break;
        case 12:
          s.setFloat64(t-TAM_REAL, Math.cos(s.getFloat64(t-TAM_REAL)));
        break;
        case 13:
          s.setFloat64(t-TAM_REAL, Math.exp(s.getFloat64(t-TAM_REAL)));
        break;
        case 14:
          s.setFloat64(t-TAM_REAL, Math.log(s.getFloat64(t-TAM_REAL)));
        break;
        case 15:
          s.setFloat64(t-TAM_REAL, Math.sqrt(s.getFloat64(t-TAM_REAL)));
        break;
        case 16:
          s.setFloat64(t-TAM_REAL, Math.atan(s.getFloat64(t-TAM_REAL)));
        break;
      }//switch case 8
      break;
      case 9:
        s.setInt32(t-TAM_INT, s.getInt32(t-TAM_REAL) + ir.y); //offset
      break;
      case 10: pc = ir.y; break;//jump
      case 11:    //conditional jump (if)
      if (!s.getInt8(t-TAM_BOOL))
        pc = ir.y;
      t -= TAM_BOOL;
      break;
      case 12:     //switch
      switch (ir.x) {
        case "ints":
         h1 = s.getInt32(t-TAM_INT);
         t -= TAM_INT;   //Libera 4 bytes
         break;
        case "reals":
          h1 = s.getFloat64(t-TAM_REAL);
          t -= TAM_REAL;   //Libera 8 bytes
        break;
        case "chars":
        case "bools":
        h1 = s.getUint8(t-TAM_CHAR);
        t -= TAM_BOOL;   //Libera 1 byte
        break;
      }
      h2 = ir.y;
      h3 = 0;
      do {
        if (kode[h2].f != 13){
          if (kode[h2].f == 10){
            pc = h2 + 1;
            break;
          }
          h3 = 1;
          ps = 'caschk';
          return;
        }
        else{
          if (kode[h2].y == h1){
            h3 = 1;
            pc = kode[h2 + 1].y;
          }
          else
          h2 += 2;
        }
      }while (h3 == 0);

      break;
      case 14:
      if (ir.x == TAM_INT){
        h1 = s.getInt32(t - TAM_INT*3);
        if(h1 <= s.getInt32(t-TAM_INT*2)){
          s.setInt32(s.getInt32(t - TAM_INT*4), h1);
        }
        else{
          t -= TAM_INT*4;
          pc = ir.y;
        }
      }
      else {
        h1 = s.getFloat64(t - TAM_REAL*3);
        if(h1 <= s.getFloat64(t-TAM_REAL*2)){
          s.setFloat64(s.getInt32(t - TAM_REAL*3-TAM_INT), h1);
        }
        else{
          t -= TAM_REAL*3+TAM_INT;
          pc = ir.y;
        }
      }
      break;

      case 15:
      if(ir.x == TAM_INT){
        h2 = s.getInt32(t - TAM_INT * 4);
        h1 = s.getInt32(h2) + s.getInt32(t-TAM_INT);
        if (h1 <= s.getInt32(t-TAM_INT * 2)){
          s.setInt32(h2, h1);
          pc = ir.y;
        }
        else{
          t -= TAM_INT * 3;
        }
      }
      else {
        h2 = s.getInt32(t - TAM_REAL * 3 - TAM_INT);
        h1 = s.getFloat64(h2) + s.getFloat64(t-TAM_REAL);
        if (h1 <= s.getFloat64(t-TAM_REAL * 2)){
          s.setFloat64(h2, h1);
          pc = ir.y;
        }
        else{
          t -= TAM_REAL * 3;
        }
      }
      break;

      case 16:
      if(ir.x == TAM_INT){
        h1 = s.getInt32(t- TAM_INT * 3);
        if (h1 >= s.getInt32(t - TAM_INT * 2)){
          s.setInt32(s.getInt32(t - TAM_INT * 4), h1);
        }
        else{
          pc = ir.y;
          t -= TAM_INT * 4;
        }
      }
      else {
        h1 = s.getFloat64(t- TAM_REAL * 3);
        if (h1 >= s.getFloat64(t - TAM_REAL * 2)){
          s.setFloat64(s.getInt32(t - TAM_REAL * 3-TAM_INT), h1);
        }
        else{
          pc = ir.y;
          t -= TAM_REAL * 3 + TAM_INT;
        }
      }
      break;

      case 17:
      if(ir.x == TAM_INT){
        h2 = s.getInt32(t - TAM_INT * 3 - TAM_INT);
        h1 = s.getInt32(h2) + s.getInt32(t - TAM_INT);
        if (h1 >= s.getInt32(t - TAM_INT * 2)){
          s.setInt32(h2, h1);
          pc = ir.y;
        }
        else{
          t -= TAM_INT * 3;
        }
      }
      else {
        h2 = s.getInt32(t - TAM_REAL * 3 - TAM_INT);
        h1 = s.getFloat64(h2) + s.getFloat64(t - TAM_REAL);
        if (h1 >= s.getFloat64(t - TAM_REAL * 2)){
          s.setFloat64(h2, h1);
          pc = ir.y;
        }
        else{
          t -= TAM_REAL * 3;
        }
      }
      break;

      case 18:
      h1 = btab[tab[ir.y].ref].vsize;
      if (t + h1 > stacksize){
        ps = 'stkchk';
        return;
      }
      else{
        if (tab[ir.y].obj == "prozedure")
          t = t + TAM_INT * 4;
        else
          switch (tab[ir.y].typ) {
            case "reals": t += 4 * TAM_INT + TAM_REAL;  break;
            case "bools":
            case "chars": t += 4 * TAM_INT + TAM_CHAR;
            default:  t += 5 * TAM_INT;
          }
        s.setInt32(t- TAM_INT * 2, h1);
        s.setInt32(t - TAM_INT, ir.y);
      }
      break;

      case 19:
      h1 = t - ir.y; //{h1 points to base}
      var hx = h1;    //Posição de inicio da pilha do procedimento ou função
      switch (ir.x) {//espaço para o retorno da função
        case "reals": h1 += TAM_REAL; break;
        case "bools":
        case "chars": h1 += TAM_CHAR; break;
        case "notyp": h1 = h1; break; //Procedimento não tem retorno, não precisa alocar espaço
        default:  h1 += TAM_INT;
      }
      h2 = s.getInt32(h1 + 3*TAM_INT); //{h2 points to tab}
      h3 = tab[h2].lev;
      display[h3 + 1] = hx;
      h4 = s.getInt32(h1 + 2*TAM_INT) + h1;
      s.setInt32(h1, pc);
      s.setInt32(h1 + 1*TAM_INT, display[h3]);
      s.setInt32(h1 + 2*TAM_INT, b);

      for (h3 = t+TAM_INT;  h3 < h4;  h3+=TAM_INT)
        s.setInt32(h3, 0);
      b = h1;
      t = h4;
      pc = tab[h2].adr;
      adicionarTabelaPilha(tab[h2].name);
      break;

      case 20:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s.getInt32(t-TAM_INT);
      if (h3 < h2){
        ps = 'inxchk';
        return;
      }
      else{
        if (h3 > atab[h1].high){
          ps = 'inxchk';
          return;
        }
        else{
          t -= TAM_INT;
          s.setInt32(t-TAM_INT, s.getInt32(t-TAM_INT)+(h3-h2));
        }
      }
      break;

      case 21:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s.getInt32(t-TAM_INT);
      if (h3 < h2) {
        ps = 'inxchk';
        return;
      }
      else{
        if (h3 > atab[h1].high){
          ps = 'inxchk';
          return;
        }
        else{
          t -= TAM_INT;
          s.setInt32(t-TAM_INT, s.getInt32(t-TAM_INT) + (h3 - h2) * atab[h1].elsize);
        }
      }
      break;
      case 22:
      h1 = s.getInt32(t-TAM_INT);
      t -= TAM_INT;
      h2 = ir.y + t;
      if(h2 > stacksize){
        ps = 'stkchk';
        return;
      }
      else
      while (t < h2) {
        t += TAM_INT;
        //var s1 = new record(s[h1].i, s[h1].r, s[h1].b, s[h1].c);
        s.setInt32(t-TAM_INT, s.getInt32(h1));
        h1 += TAM_INT;
      }
      break;

      case 23:
      h1 = s.getInt32(t - 2*TAM_INT);
      h2 = s.getInt32(t-TAM_INT);
      h3 = h1 + ir.y;
      while (h1 < h3){
        //var s1 = new record(s[h2].i, s[h2].r, s[h2].b, s[h2].c);
        s.setInt32(h1, s.getInt32(h2));
        h1 += TAM_INT;
        h2 += TAM_INT;
      }
      t -= 2 * TAM_INT;
      break;

      case 24://Carrega valor literal na pilha
      if (t > stacksize){
        ps = 'stkchk';
        return;
      }
      else{
        switch (ir.x) {
          case "reals":
            s.setFloat64(t, rconst[ir.y]);
            t += TAM_REAL;
          break;
          case "chars":
          case "bools":
            s.setUint8(t, ir.y);
            t += TAM_CHAR;
          break;
          case "strings":
          var index = alocaVetor();
          str_tab[index] = new lista();
          alocaString(ir.y, str_tab[index], true);
          s.setInt32(t, index);
          t += TAM_INT;
          break;
          default:
            s.setInt32(t, ir.y);
            t += TAM_INT;
        }

      }
      break;

      case 25://Conversão caracter para string
      switch (ir.y) {
        case 1:
          var char = s.getUint8(t-TAM_CHAR);
          var adr = alocaVetor();
          alocaString(String.fromCharCode(char), str_tab[adr], true);
          s.setInt32(t-TAM_CHAR, adr);
          t += 3;
        break;
        case 2:
          var char = s.getUint8(t-TAM_CHAR-TAM_INT);
          var adr = alocaVetor();
          alocaString(String.fromCharCode(char), str_tab[adr], true);
          s.setInt32(t-1, s.getInt32(t-TAM_INT));
          s.setInt32(t-TAM_INT-TAM_CHAR, adr);
          t += 3;
        break;
      }
      break;

      case 26:  //Conversão inteiro para real
      if (ir.y == TAM_INT){
        h1 = t - ir.y;
        s.setFloat64(h1, s.getInt32(h1));
        t += TAM_INT;   //Conversão inteiro para real, aloca mais 4 bytes
      }
      else if(ir.y == TAM_REAL){
        s.setFloat64(t-TAM_INT, s.getFloat64(t-TAM_REAL));    //Movimenta o valor real 4 bytes à frente
        s.setFloat64(t-TAM_REAL-TAM_INT, s.getInt32(t-TAM_REAL-TAM_INT)); //Converte o penúltimo dado de inteiro para real
        t += TAM_INT; //Avança 4 bytes a frente por causa da conversão inteiro/real
      }
      break;

      case 27:    //INSTRUÇÃO DE LEITURA
      /*if (InputFile){
        ps = 'redchk';
      }
      else{*/
        switch (ir.y) {
          case 1:
          if (read_ok) {
            s.setInt32(s.getInt32(t-TAM_INT), Number(InputFile));
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 2:
          if (read_ok) {
            s.setFloat64(s.getInt32(t - TAM_INT), Number(InputFile));
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 4:
          if (read_ok) {
            s.setUint8(s.getInt32(t - TAM_INT), InputFile.charCodeAt());
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 7:
            if (read_ok) {
              if (s.getInt32(s.getInt32(t-TAM_INT)) == 0){
                var ref = alocaVetor();
                s.setInt32(s.getInt32(t-TAM_INT), ref);
                alocaString(InputFile, str_tab[ref], false);
                read_ok = false;
              }
              else {
                if (typeof str_tab[s.getInt32(s.getInt32(t-TAM_INT))] == "object"){
                  alocaString(InputFile, str_tab[s.getInt32(s.getInt32(t - TAM_INT))], false);
                  read_ok = false;
                }
                else{
                  str_tab[s.getInt32(s.getInt32(t - TAM_INT))] = new lista();
                  alocaString(InputFile, str_tab[s.getInt32(s.getInt32(t-TAM_INT))], false);
                  read_ok = false;
                }
              }
            }
            else{
              call_read = true;
              return;
            }
          break;
        }
      //}
      t -= TAM_INT;
      break;

      case 28:
      h1 = s.getInt32(t-TAM_INT);
      h2 = ir.y;
      t -= TAM_INT;
      chrcnt = chrcnt + h1;
      var string = "";
      do {
        while (stab[h2] == "\\"){
          if (stab[h2+1] == "n"){
              atualizarConsole(string+"\n");
              string = "";
              h2 += 2;
              h1 -= 2;
          }
          else{
            string += stab[h2];
            h1--;
            h2++;
          }
          if (h1 <= 0)  break;
        }
        if (h1 <= 0) break;
        string += stab[h2];
        h1--;
        h2++;
      } while (h1 > 0);
      atualizarConsole(string);
      //call_read = true;
      //return;
      break;

      case 29:
      chrcnt = chrcnt + fld[ir.y];
      switch (ir.y) {
        case 1:
        var str = "";
          str += s.getInt32(t - TAM_INT);
          atualizarConsole(str);
          t -= TAM_INT;
        break;
        case 2:
        var str = "";
          str += s.getFloat64(t - TAM_REAL);
          atualizarConsole(str);
          t -= TAM_REAL;
        break;
        case 3:
          var str = "";
          str += s.getInt8(t - TAM_BOOL);
          atualizarConsole(str);
          t -= TAM_BOOL;
        break;
        case 4:
          atualizarConsole(String.fromCharCode(s.getUint8(t - TAM_CHAR)));
          t -= TAM_CHAR;
        break;
        case 7:
          atualizarConsole(getString(str_tab[s.getInt32(t - TAM_INT)]));
          if (str_tab[s.getInt32(t - TAM_INT)].destruct)
            str_tab[s.getInt32(t - TAM_INT)] = undefined;
          t -= TAM_INT;
        break;
      }
      //debugger;
      /*if (ir.y == 4)
        s[t] = String.fromCharCode(s[t]);
      var str = "";
      str += s[t];
      window.setTimeout(atualizarConsole(str), 1000);
      t = t - 1;*/
      break;

      case 30:
      chrcnt = chrcnt + s[t];
      switch (ir.y) {
        case 1:
          var str = "", len = s.getInt32(t - TAM_INT);
          t -= TAM_INT;
          for (var p = 0; p < len; p++)
            str += " ";
          str += s.getInt32(t-TAM_INT);
          atualizarConsole(str);
          t -= TAM_INT;
        break;
        case 2:
          var str = "", len = s.getInt32(t - TAM_INT);
          t -= TAM_INT;
          for (var p = 0; p < len; p++)
          str += " ";
          str += s.getFloat64(t-TAM_REAL);
          atualizarConsole(str);
          t -= TAM_REAL;
        break;
        case 3:
          var str = "", len = s.getInt32(t - TAM_INT);
          t -= TAM_INT;
          for (var p = 0; p < len; p++)
          str += " ";
          str += s.getInt8(t - TAM_BOOL);
          atualizarConsole(str);
          t -= TAM_BOOL;
        break;
        case 4:
          var str = "", len = s.getInt32(t-TAM_INT);
          t -= TAM_INT;
          for (var p = 0; p < len; p++)
          str += " ";
          str += String.fromCharCode(s.getUint8(t - TAM_CHAR));
          atualizarConsole(str);
          t -= TAM_CHAR;
        break;
        case 7:
        atualizarConsole(getString(str_tab[s.getInt32(t - TAM_INT)]));
        if (str_tab[s.getInt32(t - TAM_INT)].destruct)
          str_tab[s.getInt32(t - TAM_INT)] = undefined;
        t -= TAM_INT;
        break;
      }
      var str = "";
      for (var p = 0; p < s[t]; p++)
        str += " ";
      str += s[t-1];
      window.setTimeout(atualizarConsole(str), 1000);
      t = t - 2;
      break;
      case 31:
      ps = 'fin';
      removerTopoPilha();
      return;
      break;

      case 32:    //Saída de função/procedimento
      case 33:
      if (ir.f == 32)   //Procedimento
        t = b - TAM_INT;
      else{
        t = b;        //Função
      }
      pc = s.getInt32(b);
      b = s.getInt32(b + 2*TAM_INT);
      removerTopoPilha();
      break;

      case 34:
      switch (ir.y) {
        case TAM_INT:
          s.setInt32(t-TAM_INT, s.getInt32(s.getInt32(t-TAM_INT)));
        break;
        case TAM_REAL:
          s.setFloat64(t-TAM_INT, s.getFloat64(s.getInt32(t-TAM_INT)));
          t += TAM_INT;     //Espaço a mais na conversão inteiro => real
        break;
        case TAM_BOOL:
        case TAM_CHAR:
          s.setUint8(t-TAM_INT, s.getUint8(s.getInt32(t-TAM_INT)));
          t -= 3;     //Libera espaço da conversão inteiro => caractere
        break;
      }
      break;

      case 35: //não
        s.setUint8(t-TAM_BOOL,!s.getUint8(t-TAM_BOOL));
      break;
      case 36: //nega inteiro ou real
      if (ir.y == TAM_REAL)
        s.setFloat64(t - TAM_REAL, -s.getFloat64(t-TAM_REAL));
      else
        s.setInt32(t - TAM_INT, -s.getInt32(t-TAM_INT));
      break;
      case 37:
      var str = "", len = s.getInt32(t - 2*TAM_INT);
      for(var p = 0; p < len; p++)
        str += " ";
      str += s.getFloat64(t - TAM_REAL - 2 * TAM_INT);
      //str += s[t-1];
      str += "."+s.getInt32(t-TAM_INT);
      atualizarConsole(str);
        //call_read = true;
        //return;
      t -= TAM_INT + TAM_INT + TAM_REAL;
      break;

      case 38:
      /*Armazenar na pilha.
      y = Número de variáveis a ser armazenado o valor.
      x = Tipo da variável(tamanho)
      */
      if (ir.y == 1){
        switch (ir.x) {
          case "strings":
          if (str_tab[s.getInt32(t-TAM_INT)].destruct){
            var adr = alocaVetor();
            var str = getString(str_tab[s.getInt32(t-TAM_INT)]);
            str_tab[s.getInt32(t-TAM_INT)] = undefined;
            alocaString(str, str_tab[adr], false)   //Aloca uma string fixa na lista
            s.setInt32(s.getInt32(t-2*TAM_INT), adr);
            t -= 2*TAM_INT;
          }
          else {
            s.setInt32(s.getInt32(t-2*TAM_INT), adr);
            t -= 2*TAM_INT;
          }
          break;
          case "reals":
          s.setFloat64(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL));
          t -= TAM_REAL+TAM_INT;
          break;
          case "chars":
          case "bools":    //BOOL ou CHAR
          s.setUint8(s.getInt32(t-TAM_BOOL), s.getUint8(t-TAM_BOOL));
          t -= TAM_INT+TAM_BOOL;
          break;
          default:
          s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
          t -= 2*TAM_INT;
        }
      }
      else {
        var tx = t;
        for(var i = 1; i <= ir.y; i++){
          switch (ir.x) {
            case TAM_INT:
            s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
            s.setInt32(t - 2*TAM_INT, s.getInt32(t-TAM_INT));   //Movimenta o dado 4 bytes para baixo
            t -= TAM_INT;
            break;
            case TAM_REAL:
            s.setFloat64(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL));
            s.setFloat64(t-TAM_INT-TAM_REAL, s.getFloat64(t-TAM_REAL));   //Movimenta o dado 4 bytes para baixo.
            t -= TAM_INT;
            break;
            case TAM_BOOL:    //BOOL ou CHAR
            s.setUint8(s.getInt32(t-TAM_INT-TAM_BOOL), s.getUint8(t-TAM_BOOL));
            s.setUint8(t-TAM_INT-TAM_BOOL, s.getUint8(t-TAM_BOOL));
            t -= TAM_INT;
            break;
            default:
            s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
            s.setInt32(t-2*TAM_INT, s.getInt32(t-TAM_INT));
            t -= TAM_INT;
          }
        }
        t -= ir.x;
      }
      break;

      case 39:  //expressão relacional igual(real, inteiro, string e caracter)
      switch (ir.y) {
        case "reals":
         s.setUint8(t - 2*TAM_REAL,(s.getFloat64(t - TAM_REAL) == s.getFloat64(t - 2*TAM_REAL)));
         t -= 15;
        break;
        case "chars":
        case "bools":
          s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - TAM_CHAR) == s.getUint8(t - 2*TAM_CHAR)));
          t -= TAM_CHAR;
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str1 == str2));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        default:
          s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) == s.getInt32(t-TAM_INT)));
          t -= 7;   //Libera 7 bytes
      }
      break;

      case 40://expressão relacional diferente(real, inteiro, caractere, string, logico)
      switch (ir.y) {
        case "reals":
          s.setUint8(t - 2*TAM_REAL,(s.getFloat64(t - TAM_REAL) != s.getFloat64(t - 2*TAM_REAL)));
          t -= 15;
        break;
        case "ints":
          s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) != s.getInt32(t-TAM_INT)));
          t -= 7;   //Libera 7 bytes
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str1 != str2));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - TAM_CHAR) != s.getUint8(t - 2*TAM_CHAR)));
        t -= TAM_CHAR;
        break;

        default:

      }
      break;

      case 41://menor(inteiro, real, logico, caracter, string)
      switch (ir.y) {
        case "reals":
        s.setUint8(t - TAM_REAL - TAM_REAL, (s.getFloat64(t-2*TAM_REAL) < s.getFloat64(t - TAM_REAL)));
        t -= 15; //Libera 15 bytes nessa operação
        break;
        case "ints":
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) < s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str2 < str1));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) < s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
      }
      break;

      case 42://menor ou igual(inteiro, real, caracter, string, logico)
      switch (ir.y) {
        case "reals":
        s.setUint8(t - TAM_REAL - TAM_REAL, (s.getFloat64(t-2*TAM_REAL) <= s.getFloat64(t - TAM_REAL)));
        t -= 15; //Libera 15 bytes nessa operação
        break;
        case "ints":
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) <= s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str2 <= str1));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) <= s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
      }
      break;

      case 43://maior(real,inteiro,caracter, string, lógico)
      switch (ir.y) {
        case "reals":
        s.setUint8(t - TAM_REAL - TAM_REAL, (s.getFloat64(t-2*TAM_REAL) > s.getFloat64(t - TAM_REAL)));
        t -= 15; //Libera 15 bytes nessa operação
        break;
        case "ints":
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) > s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str2 > str1));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) > s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
      }
      break;

      case 44://maior ou igual(inteiro, real, caracter, string, lógico)
      switch (ir.y) {
        case "reals":
        s.setUint8(t - TAM_REAL - TAM_REAL, (s.getFloat64(t-2*TAM_REAL) >= s.getFloat64(t - TAM_REAL)));
        t -= 15; //Libera 15 bytes nessa operação
        break;
        case "ints":
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) >= s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
        break;
        case "strings":
        var id1, id2, str2, str2;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        str1 = getString(str_tab[id1]);
        str2 = getString(str_tab[id2]);
        s.setUint8(t-2*TAM_INT, (str2 >= str1));
        if (str_tab[id1].destruct)
          str_tab[id1] = undefined;
        if (str_tab[id2].destruct)
          str_tab[id2] = undefined;
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) >= s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
      }
      break;

      case 45:  //livre

      break;
      case 46://livre

      break;

      case 47://livre

      break;

      case 48://livre

      break;

      case 49://livre

      break;

      case 50://livre
      break;

      case 51://ou lógico
      s.setUint8(t-2*TAM_BOOL, (s.getUint8(t-2*TAM_BOOL) || s.getUint8(t-TAM_BOOL)));
      t -= TAM_BOOL;
      break;

      case 52://adição(inteiro,real) concatenação(string, caracter)
      switch (ir.y) {
        case "reals":
          s.setFloat64(t-2*TAM_REAL, (s.getFloat64(t-2*TAM_REAL) + s.getFloat64(t-TAM_REAL)));
          t -= TAM_REAL;
        break;
        case "ints":
          s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) + s.getInt32(t-TAM_INT)));
          t -= TAM_INT;
        break;
        case "strings":
          var str1, str2, id1, id2, adr;
          id1 = s.getInt32(t-2*TAM_INT);
          id2 = s.getInt32(t-TAM_INT);
          str1 = getString(str_tab[id1]);
          str2 = getString(str_tab[id2]);
          adr = s.getInt32(s.getInt32(t-3*TAM_INT));
          if (id1 == adr){
            alocaString(str1+str2, str_tab[adr], false);
            t -= TAM_INT;
            if (str_tab[id2].destruct)
              str_tab[id2] = undefined;
          }
          else if (id2 == adr){
            alocaString(str1+str2, str_tab[adr], false);
            s.setInt32(t-2*TAM_INT, adr);
            t -= TAM_INT;
            if (str_tab[id1].destruct)
              str_tab[id1] = undefined;
          }
          else {
            adr = alocaVetor();
            alocaString(str1+str2, str_tab[adr], false);
            s.setInt32(t-2*TAM_INT, adr);
            if (str_tab[id1].destruct)
              str_tab[id1] = undefined;
            if (str_tab[id2].destruct)
              str_tab[id2] = undefined;
            t -= TAM_INT;
          }
        break;
      }
      break;

      case 53://Subtração(inteiro,real)
      switch (ir.y) {
        case "reals":
          s.setFloat64(t-2*TAM_REAL, (s.getFloat64(t-2*TAM_REAL) - s.getFloat64(t-TAM_REAL)));
          t -= TAM_REAL;
        break;
        case "ints":
          s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) - s.getInt32(t-TAM_INT)));
          t -= TAM_INT;
        break;
      }
      break;

      case 54://livre

      break;

      case 55://livre

      break;

      case 56://e lógico
      s.setUint8(t-2*TAM_BOOL, (s.getUint8(t-2*TAM_BOOL) && s.getUint8(t-TAM_BOOL)));
      t -= TAM_BOOL;
      break;

      case 57://Multiplicação(inteiro,real)
      switch (ir.y) {
        case "reals":
        s.setFloat64(t-2*TAM_REAL, (s.getFloat64(t-2*TAM_REAL) * s.getFloat64(t-TAM_REAL)));
        t -= TAM_REAL;
        break;
        case "ints":
        s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) * s.getInt32(t-TAM_INT)));
        t -= TAM_INT;
        break;
      }
      break;

      case 58://Divisão(inteiro,real)
      var check;
      if (ir.y == "ints")
        check = s.getInt32(t-TAM_INT);
      else if( ir.y == "reals")
        check = s.getFloat64(t-TAM_REAL);
      if (check == 0){
        ps = 'divchk';
        atualizarConsole("ERRO! Divisão por 0");
        return;
      }
      else{
        switch (ir.y) {
          case "ints":
            s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) / s.getInt32(t-TAM_INT)));
            t -= TAM_INT;
          break;
          case "reals":
            s.setFloat64(t-2*TAM_REAL, (s.getFloat64(t-2*TAM_REAL) / s.getFloat64(t-TAM_REAL)));
            t -= TAM_REAL;
          break;
        }
      }
      break;

      case 59://módulo de inteiros
      if(s.getInt32(t-TAM_INT) == 0){
        ps = 'divchk';
        atualizarConsole("ERRO! Divisão por 0");
        return;
      }
      else{
        s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) % s.getInt32(t-TAM_INT)));
        t -= TAM_INT;
      }
      break;

      case 60://livre

      break;

      case 61://livre

      break;

      case 62:
        if (s[t] !== 0){
          if (s[t] <= s[t-1].length && s[t] >= (-s[t-1].length)){
            if (s[t] > 0)
              s[t]--;
            s[t-1] = s[t-1].charCodeAt(Number(s[t]));
            t--;
          }
          else {
            atualizarConsole("\nNão é permitido acessar uma posição fora da string");
            ps = "fin";
            return;
          }
        }
        else {
          atualizarConsole("\nNão é permitido acessar uma posição 0 na string");
          ps = "fin";
          return;
        }
      break;
      case 63:
      if (typeof s[t-2] == "number"){
        if (s[t-2] != 0){
          if (s[t-2] <= s[t].length && s[t-2] >= (-s[t].length)){
            if (s[t-2] > 0)
              s[t-2]--;
            if (s[t-2] != -1)
              s[t-2] = s[t].slice(0, s[t-2])+String.fromCharCode(s[t-1])+s[t].slice(s[t-2]+1, s[t].length);
            else
              s[t-2] = s[t].slice(0, s[t-2])+String.fromCharCode(s[t-1]);
            t -= 2;
          }
          else {
            atualizarConsole("\nNão é permitido acessar uma posição fora da string");
            ps = "fin";
            return;
          }
        }
        else {
          atualizarConsole("Posição 0 não existe em uma string, iniciar a partir da posição 1 ou -1");
          ps = "fin";
          return;
        }
      }
      else {
        if (s[t-1] != 0){
          if (s[t-1] <= s[t-2].length && s[t-1] >= (-s[t-2].length)){
            if (s[t-1] > 0)
              s[t-1]--;
            if (s[t-1] == -1)
            s[t-2] = s[t-2]+s[t];
            else
              s[t-2]= s[t-2].slice(0, s[t-1]+1)+s[t]+s[t-2].slice(s[t-1]+1, s[t-2].length);
            t -= 2;
          }
          else {
            atualizarConsole("\nNão é permitido acessar uma posição fora da string");
            ps = "fin";
            return;
          }
        }
        else {
          atualizarConsole("Posição 0 não existe em uma string, iniciar a partir da posição 1 ou -1");
          ps = "fin";
          return;
        }
      }
      break;
      case 64:
        s[t] = s[t].length;
      break;
      case 65:
        s[t] = s[t].toUpperCase();
      break;
      case 66:
        s[t] = s[t].toLowerCase();
      break;
      case 67:    //busca um caracter ou string no topo da pilha em uma string em t-1
        if (typeof s[t] == "number")
          s[t] = String.fromCharCode(s[t]);
        s[t-1] = s[t-1].indexOf(s[t]);
        if (s[t-1] == -1)
          s[t-1] = 0;
        else
          s[t-1]++;
        t--;
      break;
      case 68:    //Avaliação curta do operador 'ou'
        if (s[t])
          pc = ir.y;
      break;
      case 69:    //Avaliação curta do operador 'e'
        if (!s[t])
          pc = ir.y;
      break;
      case 70:    //Sendo t o topo da pilha, copia o valor t-ir.y para o novo topo da pilha
        t++;
        s[t] = s[t-ir.y];
      break;

      }//primeiro switch
    }while (true);
}
function interpret(){
  if (call_read){
    call_read = false;
    interpreter();
  }
  else{
    read_ok = false;

    s.setInt32(0,0);
    s.setInt32(4, 0);
    s.setInt32(8, -1);
    s.setInt32(12, btab[1].last);
    b = 0;
    display[1] = 0;
    //debugger;
    t = btab[2].vsize;
    pc = tab[s.getInt32(12)].adr;
    ps = 'run';
    lncnt = 0;
    ocnt = 0;
    chrcnt = 0;
    fld[1] = 10;
    fld[2] = 22;
    fld[3] = 10;
    fld[4] = 1;
    str_tab = [];
    adicionarTabelaPilha(progname);
    interpreter();
  }
  if (call_read){
    pc--;
    ocnt--;
    return; //Caso esteja em uma instrução de leitura, finaliza o interpretador.
  }
    if (ps != "fin"){
      removerTopoPilha();
      switch (ps) {
        case 'caschk': console.log('undefined case');   break;
        case 'divchk': console.log('division by 0');    break;
        case 'inxchk': console.log('invalid index');    break;
        case 'stkchk': console.log('storage overflow'); break;
        case 'linchk': console.log('too much output');  break;
        case 'lngchk': console.log('line too long');    break;
        case 'redchk': console.log('reading past end of file'); break;
      }
      h1 = b;
      blkcnt = 10; //{post mortem dump}
      do {
        //writeln;
        blkcnt--;
        if(blkcnt === 0){
          h1 = 0;
          h2 = s[h1 + 4];
        }
        if (h1 !== 0) {
          console.log(' '+ tab[h2].name+' called at '+"     "+s[h1 + 1]);
        }
        h2 = btab[tab[h2].ref].last;
        while (h2 !== 0) {
          //  with tab[h2] do
          if (tab[h2].obj == 'variable'){
            if (stantyps.indexOf(tab[h2].typ) != -1){
              write('    ', name, ' = ');
              if (tab[h2].normal){
                h3 = h1 + adr;
              }
              else{
                h3 = s[h1 + adr].i;
              }
              switch (tab[h2].typ) {
                case 'ints': console.log("          "+s[h3]); break;
                case 'reals': console.log(s[h3].r);break;
                case 'bools': console.log("         "+s[h3]);break;
                case 'chars': console.log("        "+s[h3]);break;
              }
            }
          }
          h2 = link;
        }
        h1 = s[h1 + 3];
      } while (h1 < 0);
    }
    console.log("          " + ocnt + " steps");
}//interpret
//False
