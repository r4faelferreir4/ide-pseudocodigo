
function interpreter(){
  do {
    ir = kode[pc];
    pc++;
    ocnt++;
    debugger;
    if (debug_op){
      if (ir.line > stopln){
        if(!read_ok){
          read_ok = false;
          call_read = true;
          limpaLinhaDepurador();
          mostraLinhaDepurador(kode[pc].line);
          return;
        }
        else
          read_ok = false;
      }
    }
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
      if(read_ok){
        read_ok = false;
        stopln = kode[tab[h2].adr].line;
        limpaLinhaDepurador();
        mostraLinhaDepurador(stopln);
      }
      out.push(kode[pc].line);

      for (h3 = t+TAM_INT;  h3 < h4;  h3+=TAM_INT)
        s.setInt32(h3, 0);
      b = h1;
      t = h4;
      pc = tab[h2].adr;
      carregaVariaveis(h2+1);
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
      if(debug_op){
        limpaLinhaDepurador();
        mostraLinhaDepurador(kode[pc].line);
      }
      b = s.getInt32(b + 2*TAM_INT);
      removerTopoPilha();
      out.pop();
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
      z = Posição na tabela de símbolos das variáveis atualizadas
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
        atualizaVariavel(ir.z);
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
          atualizaVariavel(ir.z[i-1]);
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

      case 62: //Pega caracter da posição de uma string
        var pos = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var adr = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var char;
        if (pos != 0){
          if (pos < 0){
            if ((-pos) < lenString(str_tab[adr]))
              char = getChar(str_tab[adr], pos);
          }
          else if(pos < lenString(str_tab[adr]))
            char = getChar(str_tab[adr], pos);
          else{
            atualizarConsole("ERRO! Posição não permitida");
            return;
          }
          s.setUint8(t, char);
          t += TAM_CHAR;
        }
        else{
          atualizarConsole("Posição 0 não existe");
          return;
        }
      break;
      case 63: //Escreve um caracter em uma posição de uma string
        var adr = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var char = s.getUint8(t-TAM_CHAR);
        t -= TAM_CHAR;
        var pos = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        if (pos > 0 && pos < lenString(str_tab[adr]))
          setChar(str_tab[adr], char, pos);
        else if(pos < 0){
          if ((-pos) < lenString(str_tab[adr]))
            setChar(str_tab[adr], char, pos);
          else{
            atualizarConsole("ERRO! Posição não permitida");
            return;
          }
        }
        else {
          atualizarConsole("ERRO! Posição não permitida");
          return;
        }
        s.setInt32(t, adr);
        t += TAM_INT;
      break;
      case 64://Retorna tamanho de uma string
        s.setInt32(t-TAM_INT, lenString(str_tab[s.getInt32(t-TAM_INT)]));
      break;
      case 65:     //Pega endereço de referencia no topo da pilha e converte string para maiúsculo
        var adr = s.getInt32(t-TAM_INT);
        var str = getString(str_tab[adr]);
        str = str.toUpperCase();
        alocaString(str, str_tab[adr], false);
      break;
      case 66:     //Pega endereço de referência no topo da pilha e converte string para minúsculo
        var adr = s.getInt32(t-TAM_INT);
        var str = getString(str_tab[adr]);
        str = str.toLowerCase();
        alocaString(str, str_tab[adr], false);
      break;
      case 67:    //busca um caracter ou string no topo da pilha em uma string em t-1
        if(ir.y == 1){
          var adr1 = s.getInt32(t-TAM_INT);
          t -= TAM_INT;
          var str1 = getString(str_tab[adr1]);
          if (str_tab[adr1].destruct)
            str_tab[adr1] = undefined;
        }
        else{
          var str1 = String.fromCharCode(s.getUint8(t-TAM_CHAR));
          t -= TAM_CHAR;
        }
        var adr2 = s.getInt32(t-TAM_INT);
        var str2 = getString(str_tab[adr2]);
        if (str_tab[adr2].destruct)
          str_tab[adr2] = undefined;
        var result = str2.localeCompare(str1);
        s.setInt32(t-TAM_INT, result);
      break;
      case 68:    //Avaliação curta do operador 'ou'
        if (s.getUint8(t-TAM_BOOL))
          pc = ir.y;
      break;
      case 69:    //Avaliação curta do operador 'e'
        if (!s.getUint8(t-TAM_BOOL))
          pc = ir.y;
      break;
      case 70:
        if(debug_op){
          if (read_ok){
            read_ok = false;
          }
          else {
            call_read = true;
            limpaLinhaDepurador();
            mostraLinhaDepurador(ir.line);
            return;
          }
        }
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
    stack = new ArrayBuffer(stacksize);
    s = new DataView(stack);//new Array(stacksize);
    s.setInt32(0,0);
    s.setInt32(4, 0);
    s.setInt32(8, -1);
    s.setInt32(12, btab[1].last);
    b = 0;
    display[1] = 0;
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
    removerTodaPilhaVar();
    carregaVariaveis(btab[1].last+1);
    removerTodaPilhaFuncoes();
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
    removerTodaPilhaVar();
}//interpret
