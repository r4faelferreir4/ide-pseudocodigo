//INTERPRETADOR DE ALGORITMOS EM JAVASCRIPT
//Alunos: Jacons Morais e Rafael Ferreira
//Orientador: Prof. Dr. Welllington Lima dos Santos
//

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
var lineleng = 136;	//Tamanho da linha de saída
var linelimit = 200;
var stacksize = 1500;


//TIPOS DEFINIDOS

var xstring;  //Não é necessário atribuir uma string com tamanho definido
var symbol;// = ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
//"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
//"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var symbol1 =  ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var index = [xmax*2];    //Intervalo entre -xmax e +xmax
var alfa = [alng+1];
var object2;// = ["konstant", "variable", "type1", "prozedure", "funktion"];
var object1 = ["konstant", "variable", "type1", "prozedure", "funktion"];
var types = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records"];
var types1 = ["notyp", "ints", "reals", "bools", "chars", "arrays", "records"];
var symset;
var typeset;
var item = {typ: types, ref: index};
var order = {
  f : [omax*2];    //Intervalo -omax .. +omax
  x : [lmax*2];    //Intervalo -lmax .. +lmax
  y : [nmax*2];    //Intervalo -nmax .. +lmax
}

//DECLARAÇÃO DE VARIÁVEIS

var InputFile;    //Variável que irá armazenar o código, cada linha será armazenada em uma posição do vetor de strig
var sy = symbol;  //Ultimo simbolo lido por insymbol
var sy1 = ["intcon", "realcon", "charcon", "stringsy", "notsy", "plus", "minus", "times", "idiv", "rdiv", "imod", "andsy", "orsy", "eql", "neq", "gtr", "geq", "lss", "leq",
"lparent", "rparent", "lbrack", "rbrack", "comma", "semicolon", "period", "colon", "becomes", "contsy", "typesy", "varsy", "funcionsy", "proceduresy", "arraysy", "recordsy", "programsy", "ident", "beginsy", "ifsy",
"casesy", "repeatsy", "whilesy", "forsy", "endsy", "elsesy", "untilsy", "ofsy", "dosy", "tosy", "downtosy", "thensy"];
var id = alfa;    //Identificador de insymbol
var inum;         //Inteiro de insymbol
var rnum;         //Real de insymbol
var sleng;        //Tamanho da string de insymbol
var ch;           //Ultimo caracter lido do código fonte
var line = [llng+1];
var cc;           //Contagem de caracteres
var lc;           //Contador do programa
var ll;           //Tamanho da linha atual
var errs = [ermax];    //Lista de erros
var errpos;       //Posição do erro
var progname = alfa;
var iflag, oflag;
var constbegsys;
var typebegsys;
var blockbegsys;
var facbegsys;
var statbegsys;
var key[alfa.length()][nkw.length()];   //Tipo alfa não especificado, lembrar de tratar isso depois
var ksy = [nkw];   //Tipo symbol não especificado, lembrar de tratar isso depois
var sps = symbol;      //Simbolos especiais, tipo symbol não especificado
var xname;
var t, a, b, sx, c1, c2;    //Indices para tabelas
var stantyps;
var display = [lmax];
var tab[tmax] = {name: alfa, link: index, obj: object2, typ: types, ref: index, normal: boolean, lev: new Array(lmax), adr}  //Identificador de tabela
var atab[amax] = {inxtyp: types, eltyp: types, elref: index, low: index, high: index, elsize: index, size: index }
var btab[bmax] = {last: index, lastpar: index, psize: index, vsize: index}
var stab = [smax];
var rconst = [c2max];
var kode[xmax];
var indexfile = 0;  //Índice para navegar na string do código
var indexline = 0; //Índice para navegar entre as linhas
var indexmax;  //Tamanho total do código

function compiladorPascalS(){

  indexmax = InputFile.length()
  InputFile.split("\n");    //Dividindo o código pelas linhas

  AppEnd:
  console.log("Aplicação finalizada!");
  return;






//DEFINIÇÕES DE FUNÇÕES FALTANDO

function ErrorMsg(){
  var k, Msg = [ermax];
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
  while (errs[0] != NULL){        //Verificação se o vetor está vázio.
    while !(k < ermax && k > 0)  //Verificação de k está entre os valores de erro cadastrados
    k++;
    console.log(k + "   " + Msg[k]);  //Exibindo erro no console
    errs.splice(errs.indexOf(k), 1);  //Localiza o erro que foi exibido e elimina-o da lista de erros
  }

}

//FUNÇÃO DE BUSCA DE CARACTERES
function NextCh(){
  if (cc == ll){
    if (indexline == InputFile.length() && indexfile == InputFile[InputFile.length()].length()) {    //Verifica se chegou ao final do texto
      console.log('');
      console.log(' programa incompleto');
      ErrorMsg(); //  { goto 99;} vai para linha 99? - Não, está em um comentário
      continue AppEnd;//Retorna para a função principal e encerra a aplicação
    }
    if (errpos != 0) {
      console.log('');
      errpos = 0; //errpos := 0
    }

    console.log(lc:5)//write(lc: 5, '  ');
    ll = 0;//ll := 0;
    cc = 0;//cc := 0;
    while (InputFile.charAt(indexfile) != "\n") {   //Verifica se chegou ao final da linha
      ll += 1;//ll := ll + 1;
      ch = InputFile.charAt(indexfile);     //Lê um caracter
      indexfile++;                //Incrementa o contador de caracteres
      console.log(ch);//      write(ch);
      line[ll] = ch;//line[ll] := ch
    }
    console.log('');//  writeln;
    indexline++;      //Vai para a próxima linha do código.
    indexfile = 0;    //Zera o contador de caracteres da linha
    ll += 1;//ll := ll + 1;
    line[ll] = ' ';//line[ll] := ' ';
  }
  cc += 1;//cc := cc + 1;
  ch = line[cc];//ch := line[cc];
}

//Função Error
function Error(n){
  if (errpos == 0) {
    console.log(" ****");
  }
  if(cc > errpos){
    console.log( '' + cc - errpos +"^"+ n );//write(' ': cc - errpos, '^', n: 2);
    errpos = cc + 3; //errpos := cc + 3;
    errs = errs + n;//errs := errs + [n]
  }
}

function fatal(n){
  Msg = alfa;
  Msg[0] = "identificador";   Msg[1] = "identificador";
  Msg[2] = "procedimentos";   Msg[3] = "reais";
  Msg[4] = "arranjos";   Msg[5] = "niveis";
  Msg[6] = "código";   Msg[7] = "strings";
  console.log("Tabela do compilador para"+ Msg[n] +"é muito pequena");
  continue AppEnd;    //Termina compilação.
}

function insymbol(){      //Lê o próximo simbolo
  var i, j, k, e;

  function readscale(){
    var s, sign;
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
    while (ch >= 0 && ch <= 9){
      var temp = "0";
      s = 10 * s + ch.charCodeAt() - temp.charCodeAt();
      NextCh();
    }
    e = s * sign + e;
  }


  function AdjustScale(){
    var s, d, t;

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
            d = d ** 2;
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

  1: while(ch == " ")
  NextCh();
  if(ch.charCodeAt(0) >= "a" && ch.charCodeAt(0) <= "z"){
    k = 0;
    id = "          ";      //Seta a variavel id com espaços em branco
    do{
      if (k < alng){
        k++;
        id[k] = ch;
      }
      NextCh();
    }while(!(ch.charCodeAt(0) >= "a" && ch.charCodeAt(0) <= "z" || ch.charCodeAt(0) >= "0" && ch.charCodeAt(0) <= "9"));
    i = 1;      //Busca binaria
    j = nkw;
    do{
      k = (i+j)/2
      if ((i+j)%2 != 0) k = Math.floor(k);
      if (id.charAt(0) <= key[k])     //VERIFICAR SE ESTÁ CORRETO
      j = k - 1;
      if(id.charAt(0) >= key[k])
      i = k + 1;
    }while(i < j);
    if ((i - 1) > j)
    sy = ksy[k];
    else
    sy = "ident";
  }
  else {
    if (ch.charCodeAt(0) >= "0" && ch.charCodeAt(0) <= 9){
      k = 0;
      inum = 0;
      sy = "intcon";
      do{
        inum = inum * 10 + ch.charCodeAt(0) - "0".charCodeAt();
        k++;
        NextCh();
      }while(ch.charCodeAt(0) >= "0" && ch.charCodeAt(0) <= 9);
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
          while(ch.charCodeAt(0) >= "0" && ch.charCodeAt(0) <= "9"){
            e--;
            rnum = 10 * rnum + (ch.charCodeAt(0) - "0".charCodeAt(0));
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
        case "\"\"":
        k = 0;
        2:
        NextCh();
        if (ch == "\"\""){
          NextCh();
          if (ch != "\"\"")
          goto 3;
        }
        if ((sx + k) == smax)
        fatal(7);
        stab[sx+k] = ch;
        k++;
        if (cc == 1)    //fim da linha
        k = 0;
        else
        goto 2;
        3:
        if (k == 1){
          sy = "charcon";
          inum = stab[sx].charCodeAt(0);
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
          goto 1;
        }
        break;
        case "+", "-", "*", "/", ")", "=", ",", "[", "]", "#", "&", ";":
        sy = sps[ch];
        NextCh();
        break;
        default:
        Error(24);]
        NextCh();
        goto 1;
      }
    }
  }
}

function enter (x0, x1, x2, x3){
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

function EnterArray(tp, l, h){
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

function EnterBlock(){
  if (b == bmax)
  fatal(2);
  else {
    b++;
    btab[b].last = 0;
    btab[b].lastpar = 0;
  }
}

function EnterReal(){
  if(c2 == c2max-1)
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

function emit(fct){
  if (lc == cmax)
  fatal(6);
  kode[lc].f = fct;
  lc++;
}

function emit1(fct, b){
  if (lc == cmax)
  fatal(6);
  kode[lc].f = fct;
  kode[lc].y = b;
  lc++;
}

function emit2(fct, a, b){
  if (lc == cmax)
  fatal(6);
  kode[lc].f = fct;
  kode[lc].x = a;
  kode[lc].y = b;
  lc++;
}

function printtables(){
  var i;
  var o = order;
  console.log("");
  console.log("identificadores    link obj typ ref nrm lev adr");
  for (i = btab[1].last+1; i < t; i++){
    console.log(i+"       "+tab[i].name+"  "+tab[i].link+"      "+object1.indexOf(tab[i].obj)+"     "+type1.indexOf(tab[i].typ)+"     "+tab[i].ref+"     "+ tab[i].normal.toString()+"     "+tab[i].lev+"     "+tab[i].adr);
  }
  console.log("");
  console.log("blocos       last  lpar  psze  vsze");
  for(i = 1; i < b; i++)
  console.log(i+"       "+btab[i].last+"     "+btab[i].lastpar+"     "+btab[i].psize+"     "+btab[i].vsize);
  console.log("");
  console.log("arranjos     xtyp  etyp  eref  low  high  elsz  size");
  for(i = 1; i < a; i++)
  console.log(i+"       "+type1.indexOf(atab[i].inxtyp)+"     "+type1.indexOf(atab[i].eltyp)+"     "+atab[i].elref+"     "+atab[i].low+"     "+atab[i].high+"     "+atab[i].elsize+"     "+ atab[i].size);
  console.log("");
  console.log("código: ");
  for(i = 0; i < lc-1; i++){
    if ((i % 5) == 0){
      console.log("");
      console.log("      "+i);
    }
    o = kode[i];
    console.log("     "o.f);
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
  var conrec = {tp: 1, i: 2, r: 2.4};

  var dx;   //Índice de alocação de dados
  var prt;  //Índice T deste procedimento
  var prb;  //Índice B deste procedimento
  var x;

  function skip(fsys, n){
    Error(n);
    while(fsys.indexOf(sy) == -1)
    insymbol();
  }
  function test(s1, s2, n){
    if (s1.indexOf(sy) == -1){
      skip(s1.concat(s2), n);
    }
  }
  function TestSemicolon(){
    if(sy == "semicolon")
    insymbol();
    else {
      Error(14);
      if (sy == "comma" || sy == "colon")
      insymbol();
    }
    test(["ident", blockbegsys], fsys, 6);
  }
  function enter(id, k){
    var j, l;
    if (t == tmax)
    fatal(1);
    else {
      tab[0].name - id;
      j = btab[display[level]].last;
      l = j;
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
  }//enter

  function loc(id){
    var i, j;//Loalizador de ID na tabela
    i = level;
    tab[0].name = id;
    do{
      j = btab[display[i]].last;
      while(tab[j].name != id)
      j = tab[j].link;
      i--;
    }while(i > 0 || j == 0);
    if (j == 0)
    Error(0);
    return j;
  }//loc

  function entervariable(){
    if (sy == "ident"){
      enter(id, "variable");
      insymbol();
    }
    else
    Error(2);
  }//entervariable

  function constant(fsys, c){
    var x, sign;
    c.tp = "notyp"
    c.i = 0;
    test(constbegsys, fsys, 50);
    if(constbegsys.indexOf(sy) != -1){
      if (sy == "charcon"){
        c.tp = "chars";
        c.i = inum;
        insymbol();
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
      test(fsys, "", 6)
    }
  }//constant

  function typ(fsys, tp, rf, sz){
    var x, eltp, elrf, eldz, offset, t0, t1;
    function arraytyp(aref, arsz){
      var eltp, low, high, elrf, elsz;
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
      aref = a;
      if (sy == "comma"){
        insymbol();
        eltp = "arrays";
        arraytyp(elrf, elsz);
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
        typ(fsys, eltp, elrf, elsz);
      }
      arsz = (atab[aref].high - atab[aref].low + 1)*elsz;
      atab[aref].size = arsz;
      atab[aref].eltyp = eltp;
      atab[aref].elref = elrf;
      atab[aref].elsize = elsz;
    }//arraytyp

    tp = "notyp";
    rf = 0;
    sz = 0;
    test(typebegsys, fsys, 10);
    if (typebegsys.indexOf(sy) != -1){
      if (sy == "ident"){
        x = loc(id);
        if (x != 0)
        if (tab[x].obj != "type1")
        Error(29);
        else {
          tp = tab[x].typ;
          rf = tab[x].ref;
          sz = tab[x].adr;
          if(tp == "notyp")
          Error(30);
        }
        insymbol();
      }
      else
      if (sy = "arraysy"){
        insymbol();
        if (sy = "lbrack")
        insymbol();
        else {
          Error(11);
          if (sy == "lparent")
          insymbol();
        }
        tp = "arrays";
        arraytyp(rf, sz);
      }
      else{
        insymbol();
        EnterBlock();
        tp = "records";
        rf = b;
        if (level == lmax)
        fatal(5);
        level++;
        display[level] = b;
        offset = 0;
        while(sy != endsy){
          if (sy == "ident"){
            t0 = t;
            entervariable();
            if (sy == "colon")
            insymbol();
            else
            Error(5);
            t1 = t;
            typ(fsys.concat(["semicolon", "endsy", "comma", "ident"]), eltp, elrf, elsz);
            while (t0 < t1){
              t0++;
              tab[t0].typ = eltp;
              tab[t0].ref = elrf;
              tab[t0].normal = true;
              tab[t0].adr = offset;
              offset += elsz;
            }
          }
          if (sy == "endsy"){
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
        btab[rf].vsize = offset;
        sz = offset;
        btab[rf].psize = 0;
        insymbol();
        level--;
      }
      test(fsys, "", 6);
    }
  }//typ

  function parameterlist(){
    var tp, rf, sz, x, t0, valpar;
    insymbol();
    tp = "notyp";
    rf = 0;
    sz = 0;
    test(["ident", "varsy"], fsys.concat(["rparent"]), 7);
    while (sy == "ident" || sy == "varsy"){
      if (sy != "varsy")
      valpar = true;
      else {
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
      if (sy == "rparent"){
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

  function constantdeclaration(){
    var c = conrec;
    insymbol();
    test(["ident"], blockbegsys, 2);
    whie(sy == "ident"){
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

  function typedeclaration(){
    var tp, rf, sz, t1;
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
      typ(["semicolon", "comma", "ident"].concat(fsys), tp, rf, sz);
      tab[t1].typ = tp;
      tab[t1].ref = rf;
      tab[t1].adr = sz;
      TestSemicolon();
    }
  }

  function variabledeclaration(){
    var t0, t1, rf, sz, tp;
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
      typ(["semicolon", "comma", "ident"].concat(fsys), tp, rf, sz);
      while(t0 < t1){
        t0++;
        tab[t0].typ = tp;
        tab[t0].ref = rf;
        tab[t0].lev = level;
        tab[t0].adr = dx;
        tab[t0].normal = true;
        dx += sz;
      }
      TestSemicolon();
    }
  }

  function procdeclaration(){
    var isfun;
    isfun = sy == "functionsy";
    insymbol();
    if (sy != "ident"){
      Error(2);
      id = "          ";
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
<<<<<<< HEAD
    var bool = (isfun)?1:0;
    emit(32 + bool);
  }//procdeclaration

  function statement(fsys){
    var i;

    function selector(fsys, v){
      var x, a, j;
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
          }
        }
        else {    //Seletor do Array
          if (sy != "lbrack")
            Error(11);
          do{
            insymbol();
            expression(fsys.concat(["comma", "rbrack"]), x);
            if (v.typ != "arrays")
              Error(28);
            else {
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
  }//Selector

  function call(fsys, i){
    var x, lastp, cp, k;
    emit1(18, i);
    lastp = btab[tab[i].ref].lastpar;
    cp = i;
    if (sy == "lparent"){
      do{
        insymbol();
        if (cp >= lastcp)
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
                  emit2(1, tab[k].lev, tab[k].adr);
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
    if (cp < lastcp)
      Error(39);
    emit1(19, btab[tab[i].ref].psize-1);
    if (tab[i].lev < level)
      emit2(3, tab[i].lev, level);
  }//call

  function resulttype(a, b){
    if (type1.indexOf(a) > type1.indexOf("reals") || type1.indexOf(b) > type1.indexOf("reals")){
      Error(33);
      return "notyp";
    }
    else
      if (a == "notyp" || b == "notyp")
        return "notyp";
      else
        if (a == "ints")
          if(b == "ints")
            return "ints";
          else {
            return "reals";
            emit1(26, 1);
          }
        else {
          return "reals";
          if (b == "ints")
            emit1(26, 0);
        }
  }//resulttype

  function expression(){
    var y, op;

    function simpleexpression(fsys, x){
      var y, op;

      function term(fsys, x){
        var y, op;

        function factor(fsys, x){
          var i, f;

          function standfct(n){
            var ts;

            if (sy == "lparent")
              insymbol();
            else
              Error(9);
            if (n < 17){
              expression(fsys.concat["lparent"], x);
              switch (n) {
                case 0, 2:
                    ts = ["ints", "reals"];
                    tab[i].typ = x.typ;
                    if (x.typ == "reals")
                      n++;
                  break;
                case 4, 5:
                  ts = ["ints"];
                  break;
                case 6:
                  ts = ["ints", "bools", "chars"];
                  break;
                case 7, 8:
                  ts = ["chars"];
                  break;
                case 9, 10, 11, 12, 13, 14, 15, 16:
                  ts = ["ints", "reals"];
                  if (x.typ == "ints")
                    emit1(26,0);
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
                if (id != "input     ")
                  Error(0);
                else
                  insymbol();
                emit1(8, n);
            }
            x.typ = tab[i].typ;
            if (sy == "lparent")
              insymbol();
            else
              Error(4);
          }

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
                    if (stantyps.indexOf(x.typ) != -1)
                      emit(34);
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
                "type1", "prozedure":
                  Error(44);
                  break;
                "funktion":
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
                  expression(fsys.concat(["lparent"]), x);
                  if (sy == "lparent")
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
                      if (x.typ !- "notyp")
                        Error(32);
                  }
                test(fsys, facbegsys, 6);
          }
        } //factor

        factor(fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), x);
        while (["times", "rdiv", "idiv", "imod", "andsy"].indexOf(sy) != -1){
          op = sy;
          insymbol();
          factor (fsys.concat(["times", "rdiv", "idiv", "imod", "andsy"]), y);
          if (op == "times"){
            x.typ = resulttype(x.typ, y.typ);
            switch (x.typ) {
              case "ints":  emit(57);
              case "reals": emit(60);
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
      }//term

      if (["plus", "minus"].indexOf(sy) != -1){
        op = sy;
        insymbol();
        term(fsys.concat(["plus", "minus"]), x);
        if (types1.indexOf(x.typ) > types1.indexOf("reals"))
          Error(33);
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
    }//simpleexpression

    simpleexpression(fsys.concat(["eql", "neq", "lss", "leq", "gtr", "geq"]), x);
    if (["eql", "neq", "lss", "leq", "gtr", "geq"].indexOf(sy) != -1){
      op = sy;
      insymbol();
      simpleexpression(fsys, y);
      if (["notyp", "ints", "bools", "chars"].indexOf(x.typ) && x.typ == y.typ)
      switch (op) {
        "eql": emit(45);break;
        "neq": emit(46);break.
        "lss": emit(47);break;
        "leq": emit(48);break;
        "gtr": emit(49);break;
        "geq": emit(50);break;
      }
      else {
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
            "eql": emit(39);break;
            "neq": emit(40);break;
            "lss": emit(41);break;
            "leq": emit(42);break;
            "gtr": emit(43);break;
            "geq": emit(44);break;
          }
        else
          Error(35);
      }
      x.typ = "bools";
    }
  }//expression

  function assignment(lv, ad){
    var x, y, f;
    x.typ = tab[i].typ;
    x.ref = tab[i].ref;
    if (tab[i].normal)
      f = 0;
    else
      f = 1;
    emit2(f, lv, ad);
    if (["lbrack", "lparent", "period"].indexOf(sy) != -1)
      selector(["becomes", "eql"].concat(fsys), x);
    if (sy == "becomes")
      insymbol();
    else {
      Error(51);
      if (sy == "eql")
        insymbol();
    }
    expression(fsys, y);
    if (x.typ == y.typ)
      if (stantyps.indexOf(x.typ) != -1)
        emit(38);
      else
        if(x.ref != y.ref)
          Error(46);
        else
          if (x.typ == "arrays")
            emit1(23, atab[x.ref].size);
          else
            emit1(23, btab[x.ref].vsize);
    else
      if (x.typ == "reals" && y.typ == "ints"){
        emit1(26,0);
        emit(38);
      }
      else
        if (x.typ != "notyp" && y.typ != "notyp")
          Error(46);
  }//assignment

  function compoundstatement(){
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
  }//compoundstatement

  function ifstatement(){
    var x, lc1, lc2;
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
    if (sy == "elsesy");{
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



  }


}//block

  function interpret(){
  var ir; //buffer de instrução
  var lncnt, ocnt, blkcnt, chrcnt, pc;//contadores
  var ps = ["run", "fin", "caschk", "divchk", "inxchk", "stkchk", "linchk",
  "lngchk", "redchk"];
  var ps1 = ["run", "fin", "caschk", "divchk", "inxchk", "stkchk", "linchk",
  "lngchk", "redchk"];
  var t; //index do top da pilha
  var b: //index base
  h1, h2, h3, h4: integer;
  var fld = new Array(4);//tamano padrão dos campos
  var display = new Array(lmax);
  var s = new Array(stacksize);
  var record = function() {
    this.i = 0;
    this.r = 0.0;
    this.b = false;
    this.c = "";
  };
  //inicializa array com objetos do tipo record
  for (var i = 0; i < s.length; i++){
    s[i] = new record();
  }

  s[1].i = 0;
  s[2].i = 0;
  s[3].i = -1;
  s[4].i = btab[1].last;
  b = 0;
  display[1] = 0;
  t = btab[2].vsize - 1;
  pc = tab[s[4].i].adr;
  ps = run;
  lncnt = 0;
  ocnt = 0;
  chrcnt = 0;
  fld[1] = 10;
  fld[2] = 22;
  fld[3] = 10;
  fld[4] = 1;
  do {
    ir = kode[pc];
    pc = pc + 1;
    ocnt = ocnt + 1;
    switch(ir.f){
      case 0:
      t = t + 1;
      if (t > stacksize){
        ps = stkchk;
      }
      else{
        s[t].i = display[ir.x] + ir.y;
      }
      break;

      case 1:
      t = t + 1;
      if (t > stacksize){
        ps = stkchk;
      }
      else{
        s[t] = s[display[ir.x] + ir.y];

      }
      break;

      case 2:
      t = t + 1;
      if (t > stacksize){
        ps = stkchk;
      }
      else{
        s[t] = s[s[display[ir.x] + ir.y].i];
      }
      break;

      case 3:
      h1 = ir.y;
      h2 = ir.x;
      h3 = b;
      do{
        display[h1] = h3;
        h1 = h1 - 1;
        h3 = s[h3 + 2].i
      }
      while( h1 == h2);
      break;

      case 8:
      switch (ir.y) {
        case 0: s[t].i = abs(s[t].i); break;
        case 1: s[t].r = abs(s[t].r); break;
        case 2: s[t].i = sqr(s[t].i); break;
        case 3: s[t].r = sqr(s[t].r); break;
        case 4: s[t].b = odd(s[t].i); break;
        case 5:
        if (s[t].i < 0) or (s[t].i > 63){
          ps = inxchk;
        }
        break;
        case 6: s[t].i = ord(s[t].c);  break;
        case 7: s[t].c = succ(s[t].c); break;
        case 8: s[t].c = pred(s[t].c); break;
        case 9: s[t].i = round(s[t].r); break;
        case 10: s[t].i = trunc(s[t].r); break;
        case 11: s[t].r = sin(s[t].r) break;
        case 12: s[t].r = cos(s[t].r); break;
        case 13: s[t].r = exp(s[t].r); break;
        case 14: s[t].r = ln(s[t].r); break;
        case 15: s[t].r = sqrt(s[t].r) break;
        case 16: s[t].r = arctan(s[t].r); break;
        case 17:
        if (t > stacksize){
          ps = stkchk;
        }
        else{
          s[t].b = eof(InputFile);
        }
        break;

        case 18:
        t = t + 1;
        if (t > stacksize){
          ps = stkchk;
        }
        else
        {
          s[t].b = eoln(InputFile);
        }
        break;

      }//switch case 8

      case 9: s[t].i = s[t].i + ir.y; break;
      case 10: pc = ir.y; //jump
      case 11:
      if (!s[t].b){
        pc = ir.y;
        t = t - 1;
      }
      break;

      case 12:
      h1 = s[t].i;
      t = t - 1;
      h2 = ir.y;
      h3 = 0;
      do {
        if (kode[h2].f <> 13){
          h3 = 1;
          ps = caschk;
        }
        else{
          if (kode[h2].y = h1){
            h3 = 1;
            pc = kode[h2 + 1].y
          }
          else{
            h2 = h2 + 2;
          }
        }
      } while (until h3 <> 0);
      break;

      case 14:
      h1 = s[t - 1].i;
      if(h1 <= s[t].i){
        s[s[t - 2].i].i = h1;
      }
      else{
        t = t - 3;
        pc = ir.y;
      }
      break;

      case 15:
      h2 = s[t - 2].i;
      h1 = s[h2].i + 1;
      if (h1 <= s[t].i){
        s[h2].i = h1;
        pc = ir.y;
      }
      else{
        t = t - 3;
      }
      break;

      case 16:
      h1 = s[t - 1].i;
      if (h1 >= s[t].i){
        s[s[t - 2].i].i = h1;
      }
      else{
        pc = ir.y;
        t = t - 3;
      }
      break;

      case 17:
      h2 = s[t - 2].i;
      h1 = s[h2].i - 1;
      if (h1 >= s[t].i){
        s[h2].i = h1;
        pc = ir.y
      }
      else{
        t = t - 3;
      }
      break;

      case 18:
      h1 = btab[tab[ir.y].ref].vsize;
      if (t + h1 > stacksize){
        ps = stkchk;
      }
      else{
        t = t + 5;
        s[t - 1].i = h1 - 1;
        s[t].i = ir.y;
      }
      break;

      case 19:
      h1 = t - ir.y; //{h1 points to base}
      h2 = s[h1 + 4].i; //{h2 points to tab}
      h3 = tab[h2].lev;
      display[h3 + 1] = h1;
      h4 = s[h1 + 3].i + h1;
      s[h1 + 1].i = pc;
      s[h1 + 2].i = display[h3];
      s[h1 + 3].i = b;

      for (h3;  i < h4;  h3 = t + 1) {
        s[h3].i = 0;
      }

      b = h1;
      t = h4;
      pc = tab[h2].adr
      break;

      case 20:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s[t].i;
      if (h3 < h2){
        ps = inxchk;
      }
      else{
        if (h3 > atab[h1].high){
          ps = inxchk;
        }
        else{
          t = t - 1;
          s[t].i = s[t].i + (h3 - h2);
        }
      }
      break;

      case 21:
      h1 = ir.y; //{h1 points to atab}
      h2 = atab[h1].low;
      h3 = s[t].i;
      if (h3 < h2) {
        ps = inxchk;
      }
      else{
        if (h3 > atab[h1].high){
          ps = inxchk;
        }
        else{
          t = t - 1;
          s[t].i = s[t].i + (h3 - h2) * atab[h1].elsize;
        }
      }
      break;
      case 22:
      h1 = s[t].i;
      t = t - 1;
      h2 = ir.y + t;
      if(h2 > stacksize){
        ps = stkchk;
      }
      else
      while (t < h2) {
        t = t + 1;
        s[t] = s[h1];
        h1 = h1 + 1;
      }
      break;

      case 23:
      h1 = s[t - 1].i;
      h2 = s[t].i;
      h3 = h1 + ir.y;
      while (h1 < h3){
        s[h1] = s[h2];
        h1 = h1 + 1;
        h2 = h2 + 1;
      }
      t = t - 2;
      break;

      case 24:
      t = t + 1;
      if (t > stacksize){
        ps = stkchk;
      }
      else{
        s[t].i = ir.y;
      }
      break;

      case 25:
      t = t + 1;
      if (t > stacksize){
        ps = stkchk;
      }
      else{
        s[t].r = rconst[ir.y];
      }
      break;

      case 26:
      h1 = t - ir.y;
      s[h1].r = s[h1].i;
      break;

      case 27:
      if (eof(InputFile)){
        ps = redchk;
      }
      else{
        switch (ir.y) {
          case 1: read(InputFile, s[s[t].i].i); break;
          case 2: read(InputFile, s[s[t].i].r); break;
          case 4: read(InputFile, s[s[t].i].c); break;
        }
      }
      t = t - 1;
      break;

      case 28:
      h1 = s[t].i;
      h2 = ir.y;
      t = t - 1;
      chrcnt = chrcnt + h1;
      if (chrcnt > lineleng){
        ps = lngchk;
      }
      do {
        write(stab[h2]);
        h1 = h1 - 1;
        h2 = h2 + 1;
      } while (h1 = 0);
      break;

      case 29:
      chrcnt = chrcnt + fld[ir.y];
      if (chrcnt > lineleng){
        ps = lngchk;
      }
      else
      switch (ir.y) {
        case 1: write(s[t].i: fld[1]); break;
        case 2: write(s[t].r: fld[2]); break;
        case 3: write(s[t].b: fld[3]); break;
        case 4: write(s[t].c);         break;
      }
      t = t - 1;
      break;

      case 30:
      chrcnt = chrcnt + s[t].i;
      if (chrcnt > lineleng){
        ps = lngchk;
      }
      else{
        switch (ir.y) {
          case 1: write(s[t - 1].i: s[t].i); break;
          case 2: write(s[t - 1].r: s[t].i); break;
          case 3: write(s[t - 1].b: s[t].i); break;
          case 4: write(s[t - 1].c: s[t].i); break;
        }
      }
      t = t - 2;
      break;
      case 31:
      ps = fin;
      break;

      case 32:
      t = b - 1;
      pc = s[b + 1].i;
      b = s[b + 3].i
      break;

      case 33:
      t = b;
      pc = s[b + 1].i;
      b = s[b + 3].i;
      break;

      case 34: s[t] = s[s[t].i]; break;
      case 35: s[t].b = !s[t].b; break;
      case 36: s[t].i = -s[t].i; break;

      case 37:
      chrcnt = chrcnt + s[t - 1].i;
      if (chrcnt > lineleng) {
        ps = lngchk;
      }
      else{
        write(s[t - 2].r: s[t - 1].i: s[t].i);
      }
      t = t - 3;
      break;

      case 38:
      s[s[t - 1].i] = s[t];
      t = t - 2;
      break;

      case 39
      t = t - 1;
      s[t].b = s[t].r = s[t + 1].r;
      break;

      case 40:
      t = t - 1;
      s[t].b = s[t].r == s[t + 1].r;
      break;

      case 41:
      t = t - 1;
      s[t].b = s[t].r < s[t + 1].r;
      break;

      case 42:
      t = t - 1;
      s[t].b = s[t].r <= s[t + 1].r;
      break;

      case 43:
      t = t - 1;
      s[t].b = s[t].r > s[t + 1].r;
      break;

      case 44:
      t = t - 1;
      s[t].b = s[t].r >= s[t + 1].r;
      break;

      case 45:
      t = t - 1;
      s[t].b = s[t].i = s[t + 1].i;
      break;

      case 46:
      t = t - 1;
      s[t].b = s[t].i != s[t + 1].i;
      break;

      case 47:
      t = t - 1;
      s[t].b = s[t].i < s[t + 1].i;
      break;

      case 48:
      t = t - 1;
      s[t].b = s[t].i <= s[t + 1].i;
      break;

      case 49:
      t = t - 1;
      s[t].b = s[t].i > s[t + 1].i;
      break;

      case 50:
      t = t - 1;
      s[t].b = s[t].i >= s[t + 1].i;
      break;

      case 51:
      t = t - 1;
      s[t].b = s[t].b || s[t + 1].b;
      break;

      case 52:
      t = t - 1;
      s[t].i = s[t].i + s[t + 1].i;
      break;

      case 53:
      t = t - 1;
      s[t].i = s[t].i - s[t + 1].i;
      break;

      case 54:
      t = t - 1;
      s[t].r = s[t].r + s[t + 1].r;
      break;

      case 55:
      t = t - 1;
      s[t].r = s[t].r - s[t + 1].r;
      break;

      case 56:
      t = t - 1;
      s[t].b = s[t].b && s[t + 1].b;
      break;

      case 57:
      t = t - 1;
      s[t].i = s[t].i * s[t + 1].i;
      break;

      case 58:
      t = t - 1;
      if (s[t + 1].i = 0){
        ps = divchk;
      }
      else{
        s[t].i = s[t].i / s[t + 1].i;
      }
      break;

      case 59:
      t = t - 1;
      if(s[t + 1].i = 0){
        ps = divchk;
      }
      else{
        s[t].i = s[t].i % s[t + 1].i;
      }
      break;

      case 60:
      t = t - 1;
      s[t].r = s[t].r * s[t + 1].r;
      break;

      61:
      t = t - 1;
      s[t].r = s[t].r / s[t + 1].r;
      break;

      case 62:
      if (eof(InputFile)){
        ps = redchk;
      }
      else{
        readln(InputFile);
      }

      case 63:
      //      writeln;
      lncnt = lncnt + 1;
      chrcnt = 0;
      if (lncnt > linelimit){
        ps = linchk;
      }
    }//primeiro switch
  }
  while (ps != run);

  if (ps <> fin){
    //writeln;
    //writeln;
    write('halt at', pc: 5, ' because of ');
    switch (ps) {
      caschk: writeln('undefined case');   break;
      divchk: writeln('division by 0');    break;
      inxchk: writeln('invalid index');    break;
      stkchk: writeln('storage overflow'); break;
      linchk: writeln('too much output');  break;
      lngchk: writeln('line too long');    break;
      redchk: writeln('reading past end of file'); break;
    }
    h1 = b; blkcnt = 10; //{post mortem dump}
    do {
      //writeln;
      blkcnt = blkcnt - 1;
      if(blkcnt = 0){
        h1 = 0;
        h2 = s[h1 + 4].i;
      }
      if (h1 <> 0) {
        writeln(' ', tab[h2].name, ' called at ', s[h1 + 1].i: 5);
      }
      h2 = btab[tab[h2].ref].last;
      while (h2 <> 0) {
        //  with tab[h2] do
        if (tab[h2].obj == variable){
          if (tab[h2].typ in stantyps){
            write('    ', name, ' = ');
            if (normal){
              h3 = h1 + adr;
            }
            else{
              h3 = s[h1 + adr].i;
            }

            switch (tab[h2].typ) {
              case ints: writeln(s[h3].i: 10); break;
              reals: writeln(s[h3].r);break
              bools: writeln(s[h3].b: 10);break
              chars: writeln(s[h3].c: 10);break
            }
          }
        }
        h2 = link;
      }
      h1 = s[h1 + 3].i;
    } while (h1 < 0);
  }

  //writeln;
  console.log("          "ocnt, " steps");
  }//interpret

  var Ok = false;
  if (paramcount >= 1){
    assign(InputFile, ParamStr(1));
    reset(InputFile);
    Ok = IoResult == 0;
  }

  while (!Ok){
    console.log("");
    //INTRODUZIR O CÓDIGO NA VARIÁVEL InputFile
  }
    key[1] = 'and'; key[2] = 'array';
    key[3] = 'begin'; key[4] = 'case';
    key[5] = 'const'; key[6] = 'div';
    key[7] = 'do'; key[8] = 'downto';
    key[9] = 'else'; key[10] = 'end';
    key[11] = 'for'; key[12] = 'function';
    key[13] = 'if'; key[14] = 'mod';
    key[15] = 'not'; key[16] = 'of';
    key[17] = 'or'; key[18] = 'procedure';
    key[19] = 'program'; key[20] = 'record';
    key[21] = 'repeat'; key[22] = 'then';
    key[23] = 'to'; key[24] = 'type';
    key[25] = 'until'; key[26] = 'var';
    key[27] = 'while';
    ksy[1] = "andsy"; ksy[2] := "arraysy";
    ksy[3] = 'beginsy'; ksy[4] := "casesy";
    ksy[5] = 'constsy'; ksy[6] := "idiv";
    ksy[7] = 'dosy'; ksy[8] := 'downtosy';
    ksy[9] = 'elsesy'; ksy[10] := 'endsy';
    ksy[11] = 'forsy'; ksy[12] := 'functionsy';
    ksy[13] = 'ifsy'; ksy[14] := 'imod';
    ksy[15] = 'notsy'; ksy[16] := 'ofsy';
    ksy[17] = 'orsy'; ksy[18] := 'proceduresy';
    ksy[19] = 'programsy'; ksy[20] := 'recordsy';
    ksy[21] = 'repeatsy'; ksy[22] := 'thensy';
    ksy[23] = 'tosy'; ksy[24] := 'typesy';
    ksy[25] = 'untilsy'; ksy[26] := 'varsy';
    ksy[27] = 'whilesy';
    sps['+'] = 'plus'; sps['-'] := 'minus';
    sps['*'] = 'times'; sps['/'] := 'rdiv';
    sps['('] = 'lparent'; sps[')'] := 'rparent';
    sps['='] = 'eql'; sps[','] := 'comma';
    sps['['] = 'lbrack'; sps[']'] := 'rbrack';
    sps['#'] = 'neq'; sps['&'] := 'andsy';
    sps[';'] = 'semicolon';
    constbegsys = ['plus', 'minus', 'intcon', 'realcon', 'charcon', 'ident'];
    typebegsys = ['ident', 'arraysy', 'recordsy'];
    blockbegsys = ['constsy', 'typesy', 'varsy', 'proceduresy',
      'functionsy', 'beginsy'];
    facbegsys = ['intcon', 'realcon', 'charcon', 'ident', 'lparent', 'notsy'];
    statbegsys = ['beginsy', 'ifsy', 'whilesy', 'repeatsy', 'forsy', 'casesy'];
    stantyps = ['notyp', 'ints', 'reals', 'bools', 'chars'];
    lc = 0;
    ll = 0;
    cc = 0;
    ch = " ";
    errpos = 0;
    errs = [];
    insymbol();
    t = -1;
    a = 0;
    b = 1;
    sx = 0;
    c2 = 0;
    display[0] = 1;
    iflag = false;
    oflag = false;
    if (sy != "programsy")
      Error(3);
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
          do{
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
            Error(4);
          if (!oflag)
            Error(20);
      }
    }
    enter('', "variable", "notyp", 0); {sentinel}
    enter('false', "konstant", "bools", 0);
    enter('true', "konstant", "bools", 1);
    enter('real', "type1", "reals", 1);
    enter('char', "type1", "chars", 1);
    enter('boolean', "type1", "bools", 1);
    enter('integer', "type1", "ints", 1);
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
    enter('eof', "funktion", "bools", 17);
    enter('eoln', "funktion", "bools", 18);
    enter('read', "prozedure", "notyp", 1);
    enter('readln', "prozedure", "notyp", 2);
    enter('write', "prozedure", "notyp", 3);
    enter('writeln', "prozedure", "notyp", 4);
    enter('', "prozedure", "notyp", 0);
    btab[1].last = t;
    btab[1].lastpar = 1;
    btab[1].psize = 0;
    btab[1].vsize = 0;
    Block(blockbegsys.concat(statbegsys), false, 1);
    if (sy != "period")
      Error(22);
    Emit(31);
    if (btab[2].vsize > stacksize)
      Error(49);
    if (progname == "test0")
      PrintTables();

    if (errs.length == 0){
      console.log("Compilação concluída com sucesso!");
      if (iflag){
        
      }
    }

}//Compilador PascalS
