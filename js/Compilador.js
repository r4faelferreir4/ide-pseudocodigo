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




}

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
  //var conrec;

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
    if (s1.indexOf(sy) == -1)
      skip(s1+s2, n);
  }

}
