//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//emit1(62)
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
var ermax = 59;		//Nº máximo de erros
var omax = 63;		//Ordem do código de alto nível
var xmax = 1000;	//131071 2**17 - 1
var nmax = 32767	//281474976710655 2**48-1
var lineleng = 300;	//Tamanho da linha de saída
var linelimit = 500;
var stacksize = 1500;

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
function order(f, x, y){
  this.f = f;
  this.x = x;
  this.y = y;
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
var btab = []
var stab = [];
var rconst = new Array(c2max);
var kode = [];
var iln = 0;  //contador de caracteres total

var indexmax;  //Tamanho total do código

function initArray(){
  var j = 0;
  console.log("iniciando tab");
  do{
    tab[j] =  {name: "", link: 1, obj: [""], typ: [""], ref: 1, normal: true, lev: 1, adr: 44};
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
    btab[j] = {last: 1, lastpar: 1, psize: 1, vsize: 1};
    j++;
  }while(j < bmax);
  j = 0;
  console.log("btab iniciada");
  do{
    kode[j] = new order(0, 0, 0);
    j++;
  }while( j < cmax);
  j = 0;
  console.log("kode iniciada");
  do{
    output_console[j] = "";
    j++;
  }while(j < 15);
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
    Msg[32] = "boole type"; Msg[33] = "arith type"
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
    while (errs.length != 0){        //Verificação se o vetor está vázio.
      while (!(k < ermax && k > 0))  //Verificação de k está entre os valores de erro cadastrados
      k++;
      console.log(k + "   " + Msg[k]);  //Exibindo erro no console
      errs.splice(0, 1);  //Localiza o erro que foi exibido e elimina-o da lista de erros
    }

  }

  //FUNÇÃO DE BUSCA DE CARACTERES
  function NextCh(){
    try{
      if (InputFile[iln] == "")  iln++;
      if (iln > indexmax && cc >= ll){
        throw new Error("Programa incompleto");
        return;
      }
      if (cc == ll){
        if (errpos != 0)
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
  function Error(n){
    try{
      debugger;
      if (errpos == 0) {
        console.log(" ****");
      }
      if(cc > errpos){
        console.log( "Caracter \'" +ch+"\' na linha "+iln+"após "+id );//write(' ': cc - errpos, '^', n: 2);
        console.log("errpos "+errpos+"código "+n);
        errpos = cc + 3; //errpos := cc + 3;
        errs = errs.concat(n);//errs := errs + [n]
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
          Error(21);          //Erro maximo expoente para numero real
        }
        else{
          if ((k+e) < emin)
            rnum = 0;
          else{
            s = Math.abs(e);
            t = 1.0;
            d = 10.0;
            do{
              while((s%2) == 0){      //Verifica se é par
                s = s / 2;
                d = Math.pow(d,2);
              }
              s--;
              t = d * t;
            }while(s != 0);
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
            if (e != 0)
            AdjustScale();
          }
        }
        else {
          if (ch == "e"){
            sy = "realcon";
            rnum = inum;
            e = 0;
            readscale();
            if (e != 0)
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
          if (k == 0){
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
          break;
          default:
          if (csps.indexOf(ch) != -1){
            sy = sps[ch];
            NextCh();
          }
          else{
            Error(24);
            NextCh();
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
    tab[t].adr = x3
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

function emit2(fct, a, b){
  try{
    if (lc == cmax)
      fatal(6);
    kode[lc].f = fct;
    kode[lc].x = a;
    kode[lc].y = b;
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
    if ((i % 5) == 0){
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


    var dx;   //Índice de alocação de dados
    var prt;  //Índice T deste procedimento
    var prb;  //Índice B deste procedimento
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
          if (j != 0)
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
        }while(!((i < 0) || (j != 0)));
        if (j == 0)
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
      //c = conrec;
      //c.tp = "notyp"
      //c.i = 0;
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
              if (x != 0)
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
            if (x != 0)
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
              debugger;
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
                if (sy != "endsy"){
                  if (sy == "semicolon")
                    insymbol();
                  else {
                    Error(14);
                    if (sy == "comma")
                      insymbol();
                  }
                  test(["ident", "endsy","semicolon"], fsys, 6);
                }
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
        test(["ident", "varsy"], fsys.concat(["rparent"]), 7);
        while (sy == "ident" || sy == "varsy"){
          if (sy != "varsy")
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
              if (x != 0)
                if (tab[x].obj != "type1")
                  Error(29);
                else {
                  tp = tab[x].typ;
                  rf = tab[x].ref;
                  if (valpar)
                    sz = tab[x].adr;
                  else
                    sz = 1;
                }
            }
            test(["semicolon", "rparent"], ["comma", "ident"].concat(fsys), 14);
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
          test(["semicolon", "colon"], fsys, 6);
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
          TestSemicolon();
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
          TestSemicolon();
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
            tab[t0].normal = true;
            dx += xtype.sz;
          }
          TestSemicolon();
        }
      }
      catch(err){
        return err;
      }
    }//variabledeclaration

    function procdeclaration(){
      try{
        var isfun;
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
        insymbol();
        block(["semicolon"].concat(fsys), isfun, level+1);
        if (sy == "semicolon")
          insymbol();
        else
          Error(14);
        var bool = 0;
        if(isfun) bool++;
        emit(32 + bool);
      }
      catch(err){
        return err;
      }
    }//procdeclaration

    function statement(fsys){
      var i;

      function selector(fsys, v){
        var x, a, j;
        try{
          debugger;
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
                  if (j == 0)
                    Error(0);
                  v.typ = tab[j].typ;
                  v.ref = tab[j].ref;
                  a = tab[j].adr;
                  if (a != 0)
                    emit1(9, a);
                }
                insymbol();
                if (sy == "lbrack" && v.typ == "strings"){
                    insymbol();
                    debugger;
                    selector(fsys, v);
                  }
                else {
                    Error("recordsy", "strings");
                }
              }
            }
            else {    //Seletor do Array
              if (sy != "lbrack")
                Error(11);
              do{
                insymbol();
                if (v.typ != "arrays")
                  if (v.typ == "strings" || v.typ == "chars"){
                    if (v.typ == "strings")
                      emit(34);
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
          test(fsys, "", 6);
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
                      emit1(26,0);
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
                    if (k != 0){
                      if (tab[k].obj != "variable")
                        Error(37);
                      x.typ = tab[k].typ;
                      x.ref = tab[k].ref;
                      if (tab[k].normal)
                        emit2(0, tab[k].lev, tab[k].adr);
                      else
                        emit2(1, tab[k].lev, tab[k].adr);
                      if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
                        selector(fsys.concat(["comma", "colon", "rparent"]), x);
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
          emit1(19, btab[tab[i].ref].psize-1);
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
                emit1(26, 1);
              }
            else {
              result =  "reals";
              if (b == "ints")
                emit1(26, 0);
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
        debugger;


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
                  if (n < 17){
                    expression(fsys.concat["lparent"], x);
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
                          emit1(26,0);
                      break;
                      case 19:

                      break;
                    }
                    if (ts.indexOf(x.typ) != -1)
                    emit1(8, n);
                    else
                    if (x.typ != "notyp")
                    Error(48);
                  }
                  else {
                    if (sy != "ident")
                    Error(2);
                    else
                    if (id != "input")
                    Error(0);
                    else
                    insymbol();
                    emit1(8, n);
                  }
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
                test(facbegsys, fsys, 58);
                while (facbegsys.indexOf(sy) != -1){
                  if (sy == "ident"){
                    i = loc(id);
                    insymbol();
                    switch (tab[i].obj) {
                      case "konstant":
                        x.typ = tab[i].typ;
                        x.ref = 0;
                        if (x.typ == "reals")
                          emit1(25, tab[i].adr);
                        else
                          emit1(24, tab[i].adr);
                      break;
                      case "variable":
                        x.typ = tab[i].typ;
                        x.ref = tab[i].ref;
                        if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
                          if (tab[i].normal)
                            f = 0;
                          else
                            f = 1;
                          emit2(f, tab[i].lev, tab[i].adr);
                          selector(fsys, x);
                          if (stantyps.indexOf(x.typ) != -1 && x.typ != "strings")
                            emit(34);
                          if (x.typ == "strings" && x.ref == 1){
                            x.ref = 0;
                            x.typ = "chars";
                            emit(62);
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
                          emit2(f, tab[i].lev, tab[i].adr);
                        }
                      break;
                      case "type1":
                      case "prozedure":
                        Error(44);
                      break;
                      case "funktion":
                        x.typ = tab[i].typ;
                        if (tab[i].lev != 0)
                          call(fsys,i);
                        else
                          standfct(tab[i].adr);
                      break;
                    }
                  }
                  else
                  if (["charcon", "intcon", "realcon"].indexOf(sy) != -1){
                    if (sy == "realcon"){
                      x.typ = "reals";
                      EnterReal(rnum);
                      emit1(25, c1);
                    }
                    else {
                      if (sy == "charcon")
                      x.typ = "chars";
                      else
                      x.typ = "ints";
                      emit1(24, inum);
                    }
                    x.ref = 0;
                    insymbol();
                  }
                  else
                  if (sy == "lparent"){
                    insymbol();
                    expression(fsys.concat(["rparent"]), x);
                    if (sy == "rparent")
                    insymbol();
                    else
                    Error(4);
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
                  test(fsys.concat(["untilsy"]), facbegsys, 6);
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
                insymbol();
                factor (fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), y);
                if (op == "times"){
                  x.typ = resulttype(x.typ, y.typ);
                  switch (x.typ) {
                    case "ints":  emit(57);break;
                    case "reals": emit(60);break;
                  }
                }
                else
                if(op == "rdiv"){
                  if (x.typ == "ints"){
                    emit1(26,1);
                    x.typ = "reals";
                  }
                  if(y.typ == "ints"){
                    emit1(26,0);
                    y.typ = "reals";
                  }
                  if (x.typ == "reals" && y.typ == "reals")
                    emit(61);
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                    Error(33);
                    x.typ = "notyp";
                  }
                }
                else
                if (op == "andsy"){
                  if (x.typ == "bools" && y.typ == "bools")
                    emit(56);
                  else {
                    if (x.typ != "notyp" && y.typ != "notyp")
                      Error(32);
                    x.typ = "notyp";
                  }
                }
                else {
                  if (x.typ == "ints" && y.typ == "ints")
                    if (op == "idiv")
                      emit(58);
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
                  emit(36);
            }
            else
              term(fsys.concat(["plus", "minus", "orsy"]), x);
            while (["plus", "minus", "orsy"].indexOf(sy) != -1){
              op = sy;
              insymbol();
              term(fsys.concat(["plus", "minus", "orsy"]), y);
              if (op == "orsy"){
                if (x.typ == "bools" && y.typ == "bools")
                  emit(51);
                else {
                  if (x.typ != "notyp" && y.typ != "notyp")
                    Error(32);
                  x.typ = "notyp";
                }
              }
              else {
                x.typ = resulttype(x.typ, y.typ);
                switch (x.typ) {
                  case "strings":
                  case "ints":
                    if (op == "plus")
                      emit(52);
                    else
                      emit(53);
                  break;
                  case "reals":
                    if (op == "plus")
                      emit(54);
                    else
                      emit(55);
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
            if (["notyp", "ints", "bools", "chars", "strings"].indexOf(x.typ) != -1 && x.typ == y.typ)
              switch (op) {
                case "eql": emit(45);break;
                case "neq": emit(46);break;
                case "lss": emit(47);break;
                case "leq": emit(48);break;
                case "gtr": emit(49);break;
                case "geq": emit(50);break;
              }
            else {
              if (x.typ == "strings" || y.typ == "strings"){
                if (x.typ == "chars" || y.typ == "chars"){
                  switch (op) {
                    case "eql": emit(45);break;
                    case "neq": emit(46);break;
                    case "lss": emit(47);break;
                    case "leq": emit(48);break;
                    case "gtr": emit(49);break;
                    case "geq": emit(50);break;
                  }
                }
              }
              if (x.typ == "ints"){
                x.typ = "reals";
                emit1(26,1);
              }
              else
              if(y.typ == "ints"){
                y.typ = "reals";
                emit1(26,0);
              }
              if (x.typ == "reals" && y.typ == "reals")
              switch (op) {
                case "eql": emit(39);break;
                case "neq": emit(40);break;
                case "lss": emit(41);break;
                case "leq": emit(42);break;
                case "gtr": emit(43);break;
                case "geq": emit(44);break;
              }
              else
              Error(35);
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
          debugger;
          var x, y, f;
          x = new item("", 1);
          y = new item("", 1);
          x.typ = tab[i].typ;
          x.ref = tab[i].ref;
          if (tab[i].normal)
            f = 0;
          else
            f = 1;
          emit2(f, lv, ad);
          if (["lbrack", "lparent", "period"].indexOf(sy) != -1){
            x.typ = "chars";
            selector(["becomes", "eql"].concat(fsys), x);
          }
          if (sy == "becomes")
            insymbol();
          else {
            Error(51);
            if (sy == "eql")
            insymbol();
          }
          expression(fsys, y);
          if (x.typ == y.typ)
            if (stantyps.indexOf(x.typ) != -1){
              if(x.typ == "strings" && x.ref == 1){
                Error("assignment", "Erro! Tentando armazenar string como caracter");
              }
              else{
                if (tab[i].typ == "strings"){
                  x.ref = 0;
                  emit2(1, tab[i].lev, tab[i].adr);
                  emit(63);
                }
                emit(38);
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
                  x.ref = 0;
                  emit2(1, tab[i].lev, tab[i].adr);
                  emit(63);
                  emit(38);
                }
              }
            }
            else{
              if (x.typ == "reals" && y.typ == "ints"){
                emit1(26,0);
                emit(38);
              }
              else
                if (x.typ != "notyp" && y.typ != "notyp")
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
          while (["semicolon"].concat(statbegsys).indexOf(sy) != -1){
            if (sy == "semicolon")
            insymbol();
            else
            Error(14);
            statement(["semicolon", "endsy"].concat(fsys));
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
              insymbol;
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
        var x;
        x = new item("", 1);
        var i, j, k, lc1;
        var casetab = new Array(csmax);
        function CaseRecord(val, lc){
          this.val = val;
          this.lc = lc;
        }
        //inicializa array com objetos do tipo caserecord
        for (var i = 0; i < csmax; i++){
          casetab[i] = new CaseRecord(0,0);
        }
        var exittab = new Array(csmax);
        debugger;
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
          insymbol();
          i = 0;
          j = 0;
          expression(fsys.concat(["ofsy", "comma", "colon"]), x);
          if (["ints", "bools", "chars", "notyp"].indexOf(x.typ) == -1)
            Error(23);
          lc1 = lc;
          emit(12);
          if (sy == "ofsy")
            insymbol();
          else
            Error(8);
          onecase();
          while (sy == "semicolon") {
            insymbol();
            onecase();
          }
          kode[lc1].y = lc;
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
          statement(["semicolon", "untilsy"].concat(fsys));
          while(["semicolon"].concat(statbegsys).indexOf(sy) != -1){
            if (sy == "semicolon")
              insymbol();
            else
              Error(14);
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
            if (i == 0)
              cvt = "ints";
            else
            if (tab[i].obj == "variable"){
              cvt = tab[i].typ;
              emit2(0, tab[i].lev, tab[i].adr);
              if (["notyp", "ints", "bools", "chars"].indexOf(cvt) == -1)
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
            expression(["tosy", "downtosy", "dosy"].concat(fsys), x);
            if (x.typ != cvt)
            Error(19);
          }
          else
            skip(["tosy"].concat(fsys), 51);
          f = 14;
          if (["tosy", "downtosy"].indexOf(sy) != -1){
            if (sy == "downtosy")
              f = 16;
            insymbol();
            expression(["dosy"].concat(fsys), x);
            if (x.typ != cvt)
              Error(19);
          }
          else
            skip(["dosy"].concat(fsys), 55);
          lc1 = lc;
          emit(f);
          if (sy == "dosy")
            insymbol();
          else
            Error(54);
          lc2 = lc;
          statement(fsys);
          emit1(f+1, lc2);
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
                  if (i != 0)
                  if (tab[i].obj != "variable")
                  Error(37);
                  else{
                    x.typ = tab[i].typ;
                    x.ref = tab[i].ref;
                    if (tab[i].normal)
                    f = 0;
                    else
                    f = 1;
                    emit2(f, tab[i].lev, tab[i].adr);
                    if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
                    selector(fsys.concat(["comma", "rparent"]), x);
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
        if (statbegsys.concat(["ident"]).indexOf(sy) != -1)
        switch (sy) {
          case "ident":
          i = loc(id);
          insymbol();
          if (i != 0)
          switch (tab[i].obj) {
            case "konstant":
            case "type1":
              Error(45);
            break;
            case "variable":
            assignment(tab[i].lev, tab[i].adr);
            break;
            case "prozedure":
            if (tab[i].lev != 0)
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
        test(fsys, [""], 14);
      }
      catch(err){
        return err;
      }
    }//statement
  try{
    dx = 5;
    prt = t;
    if (level > lmax)
    fatal(5);
    test(["lparent", "colon", "semicolon"], fsys, 7);
    EnterBlock();
    display[level] = b;
    prb = b;
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
        if (x != 0)
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
    if (sy == "semicolon"){
    insymbol();}
    else
    Error(14);
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
    statement(["semicolon", "endsy"].concat(fsys));
    while (["semicolon"].concat(statbegsys).indexOf(sy) != -1){
      if (sy == "semicolon")
      insymbol();
      else
      Error(14);
      statement(["semicolon", "endsy"].concat(fsys));
    }
    if (sy == "endsy")
    insymbol();
    else
    Error(57);
    test(fsys.concat(["period"]), [""], 6);
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
  key[21] = 'repita'; key[22] = 'entao';
  key[23] = 'incrementa'; key[24] = 'tipos';
  key[25] = 'ate'; key[26] = 'var';
  key[27] = 'enquanto'; key[28] = 'ref';
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
  ksy[27] = 'whilesy'; ksy[28] = 'varsy';
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
  enter('real', "type1", "reals", 1);
  enter('caracter', "type1", "chars", 1);
  enter('logico', "type1", "bools", 1);
  enter('inteiro', "type1", "ints", 1);
  enter('literal', 'type1', 'strings', 1)
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
  //enter('eof', "funktion", "bools", 17);
  //enter('eoln', "funktion", "bools", 18);
  enter('leia', "prozedure", "notyp", 1);
  enter('tamanho', 'funktion', 'ints', 19);
  //enter('leialn', "prozedure", "notyp", 2);
  enter('escreva', "prozedure", "notyp", 3);
  //enter('escreveln', "prozedure", "notyp", 4);
  enter('', "prozedure", "notyp", 0);
  btab[1].last = t;
  btab[1].lastpar = 1;
  btab[1].psize = 0;
  btab[1].vsize = 0;
  block(blockbegsys.concat(statbegsys), false, 1);
  if (sy != "period")
    Error(22);
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
var s = []//new Array(stacksize);
var call_read = false;
var output_console = [];    //Variável que irá imprimir na tela do console
var read_ok = false;
/*function record(i, r, b, c, s, e) {
  this.i = i;
  this.r = r;
  this.b = b;
  this.c = c;
  this.s = s;
  this.e = e;
}
//inicializa array com objetos do tipo record
for (var i = 0; i < s.length; i++){
  s[i] = new record(1, 1, true, "c");
}*/
function interpreter(){
  do {
    ir = kode[pc];
    pc++;
    ocnt++;
    //debugger;
    switch(ir.f){
      case 0:
      debugger;
      t++;
      if (t > stacksize){
        ps = 'stkchk';
      }
      else{
        s[t] = display[ir.x] + ir.y;
      }
      break;

      case 1:
      t = t + 1;
      if (t > stacksize){
        ps = 'stkchk';
      }
      else{
        var i1 = display[ir.x]+ir.y;
        //var s1 = new record(s[i1].i, s[i1].r, s[i1].b, s[i1].c);
        s[t] = s[i1];

      }
      break;

      case 2:
      t++;
      if (t > stacksize){
        ps = 'stkchk';
      }
      else{
        var i1 = s[display[ir.x]+ir.y];
        //var s1 = new record(s[i1].i, s[i1].r, s[i1].b, s[i1].c);
        s[t] = s[i1];
      }
      break;

      case 3:
      h1 = ir.y;
      h2 = ir.x;
      h3 = b;
      do{
        display[h1] = h3;
        h1--;
        h3 = s[h3 + 2];
      }
      while( h1 == h2);
      break;

      case 8:
      switch (ir.y) {
        case 0: s[t] = Math.abs(s[t]); break;
        case 1: s[t] = Math.abs(s[t]); break;
        case 2: s[t] = Math.pow(s[t], 2); break;
        case 3: s[t] = Math.pow(s[t], 2); break;
        case 4: s[t] = (s[t]%2) != 0; break;
        case 5:
        if (s[t] < 0 || s[t] > 63){
          ps = 'inxchk';
        }
        else
        s[t] = String.fromCharCode(s[t]);
        break;
        case 6: s[t] = s[t].charCodeAt();  break;
        case 7:
        var c = s[t].charCodeAt();
        c++;
        s[t] = String.fromCharCode(c);
        break;
        case 8:
        var c = s[t].charCodeAt();
        c--;
        s[t] = String.fromCharCode(c);
        break;
        case 9: s[t] = Math.round(s[t]); break;
        case 10: s[t] = Math.floor(s[t]); break;
        case 11: s[t] = Math.sin(s[t]); break;
        case 12: s[t] = Math.cos(s[t]); break;
        case 13: s[t] = Math.exp(s[t]); break;
        case 14: s[t] = Math.log(s[t]); break;
        case 15: s[t] = Math.sqrt(s[t]); break;
        case 16: s[t] = Math.atan(s[t]); break;
      }//switch case 8
      break;
      case 9: s[t] = s[t] + ir.y; break;
      case 10: pc = ir.y; break;//jump
      case 11:
      debugger;
      if (!s[t])
        pc = ir.y;
      t--;
      break;
      case 12:
      debugger;
      h1 = s[t];
      t--;
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
      h1 = s[t - 1];
      if(h1 <= s[t]){
        s[s[t - 2]] = h1;
      }
      else{
        t = t - 3;
        pc = ir.y;
      }
      break;

      case 15:
      h2 = s[t - 2];
      h1 = s[h2] + 1;
      if (h1 <= s[t]){
        s[h2] = h1;
        pc = ir.y;
      }
      else{
        t = t - 3;
      }
      break;

      case 16:
      h1 = s[t - 1];
      if (h1 >= s[t]){
        s[s[t - 2]] = h1;
      }
      else{
        pc = ir.y;
        t = t - 3;
      }
      break;

      case 17:
      h2 = s[t - 2];
      h1 = s[h2] - 1;
      if (h1 >= s[t]){
        s[h2] = h1;
        pc = ir.y
      }
      else{
        t = t - 3;
      }
      break;

      case 18:
      h1 = btab[tab[ir.y].ref].vsize;
      if (t + h1 > stacksize){
        ps = 'stkchk';
      }
      else{
        t = t + 5;
        s[t - 1] = h1 - 1;
        s[t] = ir.y;
      }
      break;

      case 19:
      h1 = t - ir.y; //{h1 points to base}
      h2 = s[h1 + 4]; //{h2 points to tab}
      h3 = tab[h2].lev;
      display[h3 + 1] = h1;
      h4 = s[h1 + 3] + h1;
      s[h1 + 1] = pc;
      s[h1 + 2] = display[h3];
      s[h1 + 3] = b;

      for (h3 = t+1;  h3 < h4;  h3++) {
        s[h3] = 0;
      }

      b = h1;
      t = h4;
      pc = tab[h2].adr;
      break;

      case 20:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s[t];
      if (h3 < h2){
        ps = 'inxchk';
      }
      else{
        if (h3 > atab[h1].high){
          ps = 'inxchk';
        }
        else{
          t--;
          s[t] = s[t] + (h3 - h2);
        }
      }
      break;

      case 21:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s[t];
      if (h3 < h2) {
        ps = 'inxchk';
      }
      else{
        if (h3 > atab[h1].high){
          ps = 'inxchk';
        }
        else{
          t = t - 1;
          s[t] = s[t] + (h3 - h2) * atab[h1].elsize;
        }
      }
      break;
      case 22:
      h1 = s[t];
      t--;
      h2 = ir.y + t;
      if(h2 > stacksize){
        ps = 'stkchk';
      }
      else
      while (t < h2) {
        t++;
        //var s1 = new record(s[h1].i, s[h1].r, s[h1].b, s[h1].c);
        s[t] = s[h1];
        h1++;
      }
      break;

      case 23:
      h1 = s[t - 1];
      h2 = s[t];
      h3 = h1 + ir.y;
      while (h1 < h3){
        //var s1 = new record(s[h2].i, s[h2].r, s[h2].b, s[h2].c);
        s[h1] = s[h2];
        h1++;
        h2++;
      }
      t = t - 2;
      break;

      case 24:
      t++;
      if (t > stacksize){
        ps = 'stkchk';
      }
      else{
        s[t] = ir.y;
      }
      break;

      case 25:
      t++;
      if (t > stacksize){
        ps = 'stkchk';
      }
      else{
        s[t] = rconst[ir.y];
      }
      break;

      case 26:
      h1 = t - ir.y;
      //s[h1] = s[h1];
      break;

      case 27:    //INSTRUÇÃO DE LEITURA
      /*if (InputFile){
        ps = 'redchk';
      }
      else{*/
        switch (ir.y) {
          case 1:
          if (read_ok) {
            s[s[t]] = Number(InputFile);
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 2:
          if (read_ok) {
            s[s[t]] = Number(InputFile);
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 4:
          if (read_ok) {
            s[s[t]] = InputFile;
            read_ok = false;
          }
          else{
            call_read = true;
            return;
          }
          break;
          case 7:
            if (read_ok) {
              s[s[t]] = InputFile;
              read_ok = false;
            }
            else{
              call_read = true;
              return;
            }
          break;
        }
      //}
      t--;
      break;

      case 28:
      h1 = s[t];
      h2 = ir.y;
      t--;
      chrcnt = chrcnt + h1;
      var string = "";
      do {
        while (stab[h2] == "\\"){
          if (stab[h2+1] == "n"){
              window.setTimeout(atualizarConsole(string+"\n"), 1000);
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
      window.setTimeout(atualizarConsole(string), 1000);
      //call_read = true;
      //return;
      break;

      case 29:
      chrcnt = chrcnt + fld[ir.y];
      /*switch (ir.y) {
        case 1:
        var str = "";
        str += s[t].i;
        window.setTimeout(atualizarConsole(str), 1000);
        //call_read = true;
        //return;
        break;
        case 2:
        var str = "                    ";
        str += s[t].r;
        atualizarConsole(str);
        //call_read = true;
        //return;
        break;
        case 3:
        var str = "           ";
        str += s[t].b;
        atualizarConsole(str);
        //call_read = true;
        //return;
        break;
        case 4:
        atualizarConsole(String.fromCharCode(s[t].i));
        //call_read = true;
        //return;
        break;
      }*/
      debugger;
      var str = "";
      str += s[t];
      window.setTimeout(atualizarConsole(str), 1000);
      t = t - 1;
      break;

      case 30:
      chrcnt = chrcnt + s[t];
      /*switch (ir.y) {
        case 1:
          var str = "";
          for (var p = 0; p < s[t].i; p++)
          str += " ";
          str += s[t-1].i;
          window.setTimeout(atualizarConsole(str), 1000);
          //call_read = true;
          //return;
        break;
        case 2:
          var str = "";
          for (var p = 0; p < s[t].i; p++)
          str += " ";
          str += s[t-1].r;
          atualizarConsole(str);
          //call_read = true;
          //return;
        break;
        case 3:
          var str = "";
          for (var p = 0; p < s[t].i; p++)
          str += " ";
          str += s[t-1].b;
          atualizarConsole(str);
          //call_read = true;
          //return;
        break;
        case 4:
          var str = "";
          for (var p = 0; p < s[t].i; p++)
          str += " ";
          str += s[t-1].c;
          atualizarConsole(str);
          //call_read = true;
          //return;
        break;
      }*/
      var str = "";
      for (var p = 0; p < s[t]; p++)
        str += " ";
      str += s[t-1];
      window.setTimeout(atualizarConsole(str), 1000);
      t = t - 2;
      break;
      case 31:
      ps = 'fin';
      break;

      case 32:
      t = b - 1;
      pc = s[b + 1];
      b = s[b + 3];
      break;

      case 33:
      t = b;
      pc = s[b + 1];
      b = s[b + 3];
      break;

      case 34: s[t] = s[s[t]]; break;
      case 35: s[t] = !s[t]; break;
      case 36: s[t] = -s[t]; break;

      case 37:
      chrcnt = chrcnt + s[t - 1];
      var str = "";
      for(var p = 0; p < s[t-1]; p++)
        str += " ";
      str += s[t-2];
      //str += s[t-1];
      str += "."+s[t];
      atualizarConsole(str);
        //call_read = true;
        //return;
      t = t - 3;
      break;

      case 38:
      //s1 = new record(s[t].i, s[t].r, s[t].b, s[t].c);
      s[s[t - 1]] = s[t];
      t = t - 2;
      break;

      case 39:
      t--;
      s[t] = s[t] == s[t + 1];
      break;

      case 40:
      t--;
      s[t] = s[t] != s[t + 1];
      break;

      case 41:
      t--;
      s[t] = s[t] < s[t + 1];
      break;

      case 42:
      t--;
      s[t] = s[t] <= s[t + 1];
      break;

      case 43:
      t--;
      s[t] = s[t] > s[t + 1];
      break;

      case 44:
      t--;
      s[t] = s[t] >= s[t + 1];
      break;

      case 45:
      debugger;
      t--;
      s[t] = s[t] == s[t + 1];
      break;

      case 46:
      t--;
      s[t] = s[t] != s[t + 1];
      break;

      case 47:
      t--;
      s[t] = s[t] < s[t + 1];
      break;

      case 48:
      t--;
      s[t] = s[t] <= s[t + 1];
      break;

      case 49:
      t--;
      s[t] = s[t] > s[t + 1];
      break;

      case 50:
      t--;
      s[t] = s[t] >= s[t + 1];
      break;

      case 51:
      t--;
      s[t] = s[t] || s[t + 1];
      break;

      case 52:
      t--;
      s[t] = s[t] + s[t + 1];
      break;

      case 53:
      t--;
      s[t] = s[t] - s[t + 1];
      break;

      case 54:
      t--;
      s[t] = s[t] + s[t + 1];
      break;

      case 55:
      t--;
      s[t] = s[t] - s[t + 1];
      break;

      case 56:
      t = t - 1;
      s[t] = s[t] && s[t + 1];
      break;

      case 57:
      t--;
      s[t] = s[t] * s[t + 1];
      break;

      case 58:
      t--;
      if (s[t + 1] == 0){
        ps = 'divchk';
        atualizarConsole("ERRO! Divisão por 0");
      }
      else{
        s[t] = s[t] / s[t + 1];
      }
      break;

      case 59:
      t--;
      if(s[t + 1] == 0){
        ps = 'divchk';
        atualizarConsole("ERRO! Divisão por 0");
      }
      else{
        s[t] = s[t] % s[t + 1];
      }
      break;

      case 60:
      t--;
      s[t] = s[t] * s[t + 1];
      break;

      case 61:
      t--;
      s[t] = s[t] / s[t + 1];
      break;

      case 62:
        s[t-1] = s[t-1].charCodeAt(Number(s[t]));
        t--;
      break;
      case 63:
      s[t-2] = s[t].slice(0, s[t-2])+String.fromCharCode(s[t-1])+s[t].slice(s[t-2]+1, s[t].length)
      t -= 2;
      }//primeiro switch
    }while (ps == "run");
}
function interpret(){
  if (call_read){
    call_read = false;
    interpreter();
  }
  else{
    read_ok = false;
    s[1] = 0;
    s[2] = 0;
    s[3] = -1;
    s[4] = btab[1].last;
    b = 0;
    display[1] = 0;
    //debugger;
    t = btab[2].vsize - 1;
    pc = tab[s[4]].adr;
    ps = 'run';
    lncnt = 0;
    ocnt = 0;
    chrcnt = 0;
    fld[1] = 10;
    fld[2] = 22;
    fld[3] = 10;
    fld[4] = 1;
      interpreter();
  }
  if (call_read){
    pc--;
    ocnt--;
    return; //Caso esteja em uma instrução de leitura, finaliza o interpretador.
  }
    if (ps != "fin"){
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
        if(blkcnt == 0){
          h1 = 0;
          h2 = s[h1 + 4];
        }
        if (h1 != 0) {
          console.log(' '+ tab[h2].name+' called at '+"     "+s[h1 + 1].i);
        }
        h2 = btab[tab[h2].ref].last;
        while (h2 != 0) {
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
                case 'reals': console.log(s[h3].r);break
                case 'bools': console.log("         "+s[h3]);break
                case 'chars': console.log("        "+s[h3]);break
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
