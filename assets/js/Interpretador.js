function interpreter(){
  do {
    ir = kode[pc];
    pc++;
    ocnt++;
    if (debug_op){
      if(ir.line != linecount){
        incrementar(ir.line);
        linecount = ir.line;
      }
      if (ir.line > stopln){
        if(indebug){
          if(ir.f != 18){
            if(firstLine[firstLine.length-1] <= stopln){
              debug = false;
              call_read = true;
              indebug = false;
              limpaLinhaDepurador();
              mostraLinhaDepurador(ir.line);
              clearInterval(intervalExecution);
              return;
            }
          }
          else {
            if(kode[tab[ir.y].adr].line-1 != stopln){
              debug = false;
              call_read = true;
              indebug = false;
              limpaLinhaDepurador();
              mostraLinhaDepurador(ir.line);
              clearInterval(intervalExecution);
              return;
            }
          }
        }
        if(CursorRun && stopln == ir.line-1){
          debug = false;
          call_read = true;
          CursorRun = false;
          limpaLinhaDepurador();
          mostraLinhaDepurador(ir.line);
          clearInterval(intervalExecution);
          return;
        }
        if(bydebug && sNumber >= getNumberStacks()){
          debug = false;
          bydebug = false;
          call_read = true;
          limpaLinhaDepurador();
          mostraLinhaDepurador(ir.line);
          clearInterval(intervalExecution);
          return;
        }
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
        h3 = s.getInt32(h3 + 2*TAM_INT);
      }while( h1 == h2);
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
          s.setInt32(t-TAM_CHAR, s.getUint8(t-TAM_CHAR));
          t += 3;   //Converção de caratere para inteiro, alocação de mais 3 bytes
        break;
        case 7:
          s.setUint8(t-TAM_CHAR, (s.getUint8(t-TAM_CHAR)+1));
        break;
        case 8:
          s.setUint8(t-TAM_CHAR, (s.getUint8(t-TAM_CHAR)-1));
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
        s.setInt32(t-TAM_INT, s.getInt32(t-TAM_INT) + ir.y); //offset
      break;
      case 10://pulo incondicional
      pc = ir.y;
      if(indebug){
        stopln = kode[pc].line;
        limpaLinhaDepurador();
        mostraLinhaDepurador(stopln);
        stopln--;
      }
      break;
      case 11:    //pulo condicional
      if (!s.getUint8(t-TAM_BOOL)){
        pc = ir.y;
        if(indebug){
          stopln = kode[pc].line-1;
          limpaLinhaDepurador();
          mostraLinhaDepurador(stopln+1);
        }
      }
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
            pc = (kode[h2].y == 0)? h2+1 : kode[h2].y;
            if(indebug){
              stopln = kode[pc].line;
              limpaLinhaDepurador();
              mostraLinhaDepurador(stopln);
              stopln--;
            }
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
            if(indebug){
              stopln = kode[pc].line;
              limpaLinhaDepurador();
              mostraLinhaDepurador(stopln);
              stopln--;
            }
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
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
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
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
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
          if(indebug){
            stopln = kode[pc].line;
            atualizaVariavel(h2, h1);
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
        }
        else{
          t -= TAM_INT * 4;
        }
      }
      else {
        h2 = s.getInt32(t - TAM_REAL * 3 - TAM_INT);
        h1 = s.getFloat64(h2) + s.getFloat64(t-TAM_REAL);
        if (h1 <= s.getFloat64(t-TAM_REAL * 2)){
          s.setFloat64(h2, h1);
          pc = ir.y;
          if(indebug){
            stopln = kode[pc].line;
            atualizaVariavel(h2, h1);
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
        }
        else
          t -= TAM_REAL * 4;
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
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
        }
      }
      else {
        h1 = s.getFloat64(t- TAM_REAL * 3);
        if (h1 >= s.getFloat64(t - TAM_REAL * 2)){
          s.setFloat64(s.getInt32(t - TAM_REAL * 3-TAM_INT), h1);
          if(debug_op){
            atualizaVariavel(s.getInt32(t - TAM_REAL * 3-TAM_INT), h1);
          }
        }
        else{
          pc = ir.y;
          t -= TAM_REAL * 3 + TAM_INT;
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
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
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
        }
        else{
          t -= TAM_INT * 4;
        }
      }
      else {
        h2 = s.getInt32(t - TAM_REAL * 3 - TAM_INT);
        h1 = s.getFloat64(h2) + s.getFloat64(t - TAM_REAL);
        if (h1 >= s.getFloat64(t - TAM_REAL * 2)){
          s.setFloat64(h2, h1);
          pc = ir.y;
          if(indebug){
            stopln = kode[pc].line;
            limpaLinhaDepurador();
            mostraLinhaDepurador(stopln);
            stopln--;
          }
        }
        else{
          t -= TAM_REAL * 4;
        }
      }
      break;

      case 18:
      h1 = btab[tab[ir.y].ref].vsize;
      if (t + h1 > StartAddressMemory){
        ps = 'stkchk';
        return;
      }
      else{
        if (tab[ir.y].obj == "prozedure")
          t = t + TAM_INT * 4;
        else
          switch (tab[ir.y].typ) {
            case reals: t += 4 * TAM_INT + TAM_REAL;  break;
            case bools:
            case chars: t += 4 * TAM_INT + TAM_CHAR;
            default:  t += 5 * TAM_INT;
          }
        s.setInt32(t- TAM_INT * 2, h1);
        s.setInt32(t - TAM_INT, ir.y);
      }
      break;

      case 19:
      h1 = t - ir.y; //bytes até a base
      var hx = h1;    //Posição de inicio da pilha do procedimento ou função
      switch (ir.x) {//espaço para o retorno da função
        case reals: h1 += TAM_REAL; break;
        case bools:
        case chars: h1 += TAM_CHAR; break;
        case notyp: h1 = h1; break; //Procedimento não tem retorno, não precisa alocar espaço
        default:  h1 += TAM_INT;
      }
      h2 = s.getInt32(h1 + 3*TAM_INT); //{h2 points to tab}
      h3 = tab[h2].lev;
      display[h3 + 1] = hx;
      h4 = s.getInt32(h1 + 2*TAM_INT) + h1;
      s.setInt32(h1, pc);
      s.setInt32(h1 + 1*TAM_INT, display[h3]);
      s.setInt32(h1 + 2*TAM_INT, b);
      if(indebug){
        read_ok = false;
        stopln = kode[tab[h2].adr].line;
        limpaLinhaDepurador();
        mostraLinhaDepurador(stopln);
        stopln--;
      }
      firstLine.push(kode[tab[h2].adr].line-1);
      out.push(kode[pc].line);

      for (h3 = t;  h3 < h4;  h3++)
        s.setUint8(h3, 0);
      b = hx;
      t = h4;
      pc = tab[h2].adr;
      carregaVariaveis(h2+1);
      adicionarTabelaPilha(tab[h2].name);
      break;

      case 20:
      h1 = ir.y; //apontador para atab
      h2 = atab[h1].low;
      switch (atab[h1].inxtyp) {
        case "reals":
          ps = 'inxchk';
          return;
        break;
        case "bools":
        case "chars":
          h3 = s.getUint8(t-TAM_CHAR);
          t -= TAM_CHAR;
        break;
        default:
          h3 = s.getInt32(t-TAM_INT);
          t -= TAM_INT;
      }
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
          s.setInt32(t-TAM_INT, s.getInt32(t-TAM_INT)+(h3-h2));
        }
      }
      break;

      case 21:
      h1 = ir.y; //apontador para atab
      h2 = atab[h1].low;
      switch (atab[h1].inxtyp) {
        case "reals":
          ps = 'inxchk';
          return;
        break;
        case "bools":
        case "chars":
          h3 = s.getUint8(t-TAM_CHAR);
          t -= TAM_CHAR;
        break;
        default:
          h3 = s.getInt32(t-TAM_INT);
          t -= TAM_INT;

      }
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
          s.setInt32(t-TAM_INT, s.getInt32(t-TAM_INT) + (h3 - h2) * atab[h1].elsize);
        }
      }
      break;
      case 22:
      h1 = s.getInt32(t-TAM_INT);
      t -= TAM_INT;
      h2 = ir.y + t;
      if(h2 > StartAddressMemory){
        ps = 'stkchk';
        return;
      }
      else
      while (t < h2) {
        t += TAM_INT;
        s.setInt32(t-TAM_INT, s.getInt32(h1));
        h1 += TAM_INT;
      }
      break;

      case 23:
      h1 = s.getInt32(t - 2*TAM_INT);
      h2 = s.getInt32(t-TAM_INT);
      h3 = h1 + ir.y;
      while (h1 < h3){
        s.setInt32(h1, s.getInt32(h2));
        h1 += TAM_INT;
        h2 += TAM_INT;
      }
      t -= 2 * TAM_INT;
      break;

      case 24://Carrega valor literal na pilha
      if (t > StartAddressMemory){
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
          s.setInt32(t, StringAlloc(ir.y, undefined, true));
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
          s.setInt32(t-TAM_CHAR, StringAlloc(String.fromCharCode(s.getUint8(t-TAM_CHAR)), undefined, true));
          t += 3;
        break;
        case 2:
          s.setInt32(t-1, s.getInt32(t-TAM_INT));
          s.setInt32(t-TAM_INT-TAM_CHAR, StringAlloc(String.fromCharCode(s.getUint8(t-TAM_CHAR-TAM_INT))), undefined, true);
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
        if (debug_op){
          mostrarModalOutput();
          limpaLinhaDepurador();
          mostraLinhaDepurador(ir.line);
        }
        switch (ir.y) {
          case 1:
          if (read_ok) {
            s.setInt32(s.getInt32(t-TAM_INT), Number(InputFile));
            atualizaVariavel(s.getInt32(t-TAM_INT), Number(InputFile));
            read_ok = false;
          }
          else{
            call_read = true;
            clearInterval(intervalExecution);
            return;
          }
          break;
          case 2:
          if (read_ok) {
            s.setFloat64(s.getInt32(t - TAM_INT), Number(InputFile));
            atualizaVariavel(s.getInt32(t - TAM_INT), Number(InputFile));
            read_ok = false;
          }
          else{
            call_read = true;
            clearInterval(intervalExecution);
            return;
          }
          break;
          case 4:
          if (read_ok) {
            s.setUint8(s.getInt32(t - TAM_INT), InputFile.charCodeAt());
            atualizaVariavel(s.getInt32(t - TAM_INT), InputFile.charCodeAt());
            read_ok = false;
          }
          else{
            call_read = true;
            clearInterval(intervalExecution);
            return;
          }
          break;
          case 7:
            if (read_ok) {
              var adr = s.getInt32(s.getInt32(t-TAM_INT));
              var len = s.getUint8(adr);
              if(adr == 0)
                s.setInt32(s.getInt32(t-TAM_INT), StringAlloc(InputFile));
              else
                if(len < InputFile.length){
                    StringFree(adr);
                    s.setInt32(s.getInt32(t-TAM_INT), StringAlloc(InputFile));
                }
                else if(len == InputFile.length)
                  s.setInt32(s.getInt32(t-TAM_INT), StringAlloc(InputFile, adr));
                else {
                  s.setInt32(s.getInt32(t-TAM_INT), StringAlloc(InputFile, adr));
                  MemoryFree(adr+InputFile.length+1, len - InputFile.length);
                }
              read_ok = false;
              atualizaVariavel(s.getInt32(t-TAM_INT), s.getInt32(s.getInt32(t-TAM_INT)), strings);
            }
            else{
              call_read = true;
              clearInterval(intervalExecution);
              return;
            }
          break;
        }
      t -= TAM_INT;
      break;

      case 28:    //Impressão string literal
      h1 = s.getInt32(t-TAM_INT);
      h2 = ir.y;
      t -= TAM_INT;
      chrcnt = chrcnt + h1;
      atualizarConsole(stab.slice(h2, h2+h1).join(""));
      pc++;
      ocnt++;
      call_read = true;
      return;
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
          str += (s.getUint8(t - TAM_BOOL) == 0)?'falso':'verdadeiro';
          atualizarConsole(str);
          t -= TAM_BOOL;
        break;
        case 4:
          atualizarConsole(String.fromCharCode(s.getUint8(t - TAM_CHAR)));
          t -= TAM_CHAR;
        break;
        case 7:
          atualizarConsole(getString(s.getInt32(t - TAM_INT)));
          t -= TAM_INT;
        break;
        case 8:
          atualizarConsole((s.getInt32(t-TAM_INT) == 0)?'nulo':s.getInt32(t-TAM_INT));
          t -= TAM_INT;
        break;
        default:
        var str = "";
          str += s.getInt32(t - TAM_INT);
          atualizarConsole(str);
          t -= TAM_INT;
      }
      pc++;
      ocnt++;
      call_read = true;
      return;
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
          str += s.getUint8(t - TAM_BOOL);
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
        atualizarConsole(getString(s.getInt32(t - TAM_INT)));
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
        t = b;
      else{
        t = b+ir.y;        //Função
      }
      pc = s.getInt32(b+ir.y);
      removerTopoPilha();
      var last = arrayObjetoTabela[arrayObjetoTabela.length - 1];     //Última variável retirada da pilha
      while (arrayObjetoTabela.splice(-1,1) instanceof objetoTabela && arrayObjetoTabela.splice(-1,1).lv == last.lv) {
        if(arrayObjetoTabela[arrayObjetoTabela.length - 1].idtab <= last.idtab){     //Verificação para chamadas recursivas
          removerTopoPilhaVar();
          last = arrayObjetoTabela.pop();
        }
        else
          break;
      }
      if(indebug){
        limpaLinhaDepurador();
        mostraLinhaDepurador(kode[pc].line);
        stopln = kode[pc].line-1;
      }
      b = s.getInt32(b + 2*TAM_INT+ir.y);
      firstLine.pop();
      out.pop();
      var marker = document.getElementById("mk_"+kode[pc].line);
      if(marker != null)
        marker.innerHTML = marker.innerHTML - 1;
      if(outdebug && sNumber > getNumberStacks()){
        stopln = kode[pc].line;
        limpaLinhaDepurador();
        mostraLinhaDepurador(stopln);
        call_read = true;
        outdebug = false;
        pc++;
        ocnt++;
        clearInterval(intervalExecution);
        return;
      }
      break;

      case 34:    //Carregamento indireto
      switch (ir.y) {
        case TAM_INT:
          s.setInt32(t-TAM_INT, s.getInt32(s.getInt32(t-TAM_INT)));
        break;
        case TAM_REAL:
          s.setFloat64(t-TAM_INT, s.getFloat64(s.getInt32(t-TAM_INT)));
          t += TAM_INT;     //Espaço a mais na conversão inteiro => real
        break;
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
          if(StringLiteral.indexOf(s.getInt32(t-TAM_INT)) != -1){
            StringLiteral.splice(StringLiteral.indexOf(s.getInt32(t-TAM_INT)));
            s.setInt32(s.getInt32(t - 2*TAM_INT), StringCopy(s.getInt32(t-TAM_INT)));
            StringFree(s.getInt32(t-TAM_INT));
          }
          else
            s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
          t -= 2*TAM_INT;
          break;
          case "reals":
          s.setFloat64(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL));
          atualizaVariavel(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL), ir.x);
          t -= TAM_REAL+TAM_INT;
          break;
          case "chars":
          case "bools":    //BOOL ou CHAR
          s.setUint8(s.getInt32(t-TAM_BOOL-TAM_INT), s.getUint8(t-TAM_BOOL));
          atualizaVariavel(s.getInt32(t-TAM_BOOL-TAM_INT), s.getUint8(t-TAM_BOOL), ir.x);
          t -= TAM_INT+TAM_BOOL;
          break;
          default://ints pointers
          s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
          atualizaVariavel(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT), ir.x);
          t -= 2*TAM_INT;
        }
      }
      else {
        var tx = t;
        for(var i = 1; i <= ir.y; i++){
          switch (ir.x) {
            case "reals":
            s.setFloat64(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL));
            atualizaVariavel(s.getInt32(t-TAM_INT-TAM_REAL), s.getFloat64(t-TAM_REAL), ir.x);
            s.setFloat64(t-TAM_INT-TAM_REAL, s.getFloat64(t-TAM_REAL));   //Movimenta o dado 8 bytes para baixo.
            t -= TAM_INT;
            break;
            case "bools":
            case "chars":    //BOOL ou CHAR
            s.setUint8(s.getInt32(t-TAM_INT-TAM_BOOL), s.getUint8(t-TAM_BOOL));
            atualizaVariavel(s.getInt32(t-TAM_INT-TAM_BOOL), s.getUint8(t-TAM_BOOL), ir.x);
            s.setUint8(t-TAM_INT-TAM_BOOL, s.getUint8(t-TAM_BOOL));
            t -= TAM_INT;
            break;
            default:
            s.setInt32(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT));
            atualizaVariavel(s.getInt32(t - 2*TAM_INT), s.getInt32(t - TAM_INT), ir.x);
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
        var id1, id2, result;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        if(StringLength(id1) != StringLength(id2))
          result = false;
        else {
          var i = 0, len = StringLength(id1);
          id1++;
          id2++;
          while(i < len){
            if(s.getUint8(id1+i) != s.getUint8(id2+i))
              break;
            i++;
          }
          if(i == len)
            result = true;
          else
            result = false;
        }
        s.setUint8(t-2*TAM_INT, result);
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
        var id1, id2, result;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        if(StringLength(id1) != StringLength(id2))
          result = true;
        else {
          var i = 0, len = StringLength(id1);
          id1++;
          id2++;
          while(i < len){
            if(s.getUint8(id1+i) != s.getUint8(id2+i))
              break;
            i++;
          }
          if(i == len)
            result = false;
          else
            result = true;
        }
        s.setUint8(t-2*TAM_INT, result);
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - TAM_CHAR) != s.getUint8(t - 2*TAM_CHAR)));
        t -= TAM_CHAR;
        break;
        default:
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) != s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
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
        var id1, id2, len2, len2, result, i = 0;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        len1 = StringLength(id1);
        len2 = StringLength(id2);
        while (i < len1 || i < len2) {
          if(s.getUint8(id2+1+i) < s.getUint8(id1+1+i)){
            result = true;
            break;
          }
          else if(s.getUint8(id2+1+i) > s.getUint8(id1+1+i)){
            result = false;
            break;
          }
          i++;
        }
        s.setUint8(t-2*TAM_INT, result);
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) < s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
        default:
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) < s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
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
        var id1, id2, len2, len2, result, i = 0;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        len1 = StringLength(id1);
        len2 = StringLength(id2);
        while (i < len1 || i < len2) {
          if(s.getUint8(id2+1+i) <= s.getUint8(id1+1+i)){
            result = true;
            break;
          }
          else if(s.getUint8(id2+1+i) > s.getUint8(id1+1+i)){
            result = false;
            break;
          }
          i++;
        }
        s.setUint8(t-2*TAM_INT, result);
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) <= s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
        default:
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) <= s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
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
        var id1, id2, len2, len2, result, i = 0;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        len1 = StringLength(id1);
        len2 = StringLength(id2);
        while (i < len1 && i < len2) {
          if(s.getUint8(id2+1+i) > s.getUint8(id1+1+i)){
            result = true;
            break;
          }
          else if(s.getUint8(id2+1+i) < s.getUint8(id1+1+i)){
            result = false;
            break;
          }
          i++;
        }
        s.setUint8(t-2*TAM_INT, result);
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) > s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
        default:
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) > s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
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
        var id1, id2, len2, len2, result, i = 0;
        id1 = s.getInt32(t-TAM_INT);
        id2 = s.getInt32(t-2*TAM_INT);
        len1 = StringLength(id1);
        len2 = StringLength(id2);
        while (i < len1 || i < len2) {
          if(s.getUint8(id2+1+i) >= s.getUint8(id1+1+i)){
            result = true;
            break;
          }
          else if(s.getUint8(id2+1+i) < s.getUint8(id1+1+i)){
            result = false;
            break;
          }
          i++;
        }
        s.setUint8(t-2*TAM_INT, result);
        t -= TAM_INT+3;
        break;
        case "chars":
        case "bools":
        s.setUint8(t - 2*TAM_CHAR,(s.getUint8(t - 2*TAM_CHAR) >= s.getUint8(t - TAM_CHAR)));
        t -= TAM_CHAR;
        break;
        default:
        s.setUint8(t - TAM_INT - TAM_INT, (s.getInt32(t - 2*TAM_INT) >= s.getInt32(t-TAM_INT)));
        t -= 7;   //Libera 7 bytes
      }
      break;

      case 45:  //quebra de linha
        atualizarConsole("\n");
      break;
      case 46:

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
          s.setInt32(t-2*TAM_INT, StringAlloc(getString(s.getInt32(t-2*TAM_INT))+getString(s.getInt32(t-TAM_INT))));
          t -= TAM_INT;
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
        clearInterval(intervalExecution);
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
        clearInterval(intervalExecution);
        return;
      }
      else{
        s.setInt32(t-2*TAM_INT, (s.getInt32(t-2*TAM_INT) % s.getInt32(t-TAM_INT)));
        t -= TAM_INT;
      }
      break;

      case 60://livre

      break;

      case 61://seta uma substring em uma string
        var str = getString(s.getInt32(t-TAM_INT));
        t -= TAM_INT;
        var pos = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var adr = s.getInt32(t-TAM_INT);
        var new_adr = setStr(s.getInt32(adr), str, pos);
        t -= TAM_INT;
        s.setInt32(adr, new_adr);
      break;

      case 62: //Pega caracter da posição de uma string
        var pos = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var adr = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
        var char;
        if (pos != 0){
          var length = StringLength(adr);
          if(pos > 0 && pos < length){
            s.setUint8(t, getChar(adr, pos));
            t += TAM_CHAR;
          }
          else if(pos < 0 && pos > -length){
            s.setUint8(t, getChar(adr, pos+length+1));
            t += TAM_CHAR;
          }
          else
            atualizarConsole("Posição de string não existe.");
        }
        else{
          atualizarConsole("Posição 0 não existe");
          clearInterval(intervalExecution);
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
        if (pos > 0 && pos < StringLength(adr))
          setChar(adr, char, pos);
        else if(pos < 0){
          if (pos > -StringLength(adr)){
            pos = StringLength(adr)+pos+1;
            setChar(adr, char, pos);
          }
          else{
            atualizarConsole("\nERRO! Posição não permitida");
            clearInterval(intervalExecution);
            return;
          }
        }
        else {
          atualizarConsole("\nERRO! Posição não permitida");
          clearInterval(intervalExecution);
          return;
        }
        s.setInt32(t, adr);
        t += TAM_INT;
      break;
      case 64://Retorna tamanho de uma string
        s.setInt32(t-TAM_INT, StringLength(s.getInt32(t-TAM_INT)));
      break;
      case 65:     //Pega endereço de referencia no topo da pilha e converte string para maiúsculo
        s.setInt32(t-TAM_INT, StringUpper(s.getInt32(t-TAM_INT)));
      break;
      case 66:     //Pega endereço de referência no topo da pilha e converte string para minúsculo
        s.setInt32(t-TAM_INT, StringLower(s.getInt32(t-TAM_INT)));
      break;
      case 67:    //busca um caracter ou string no topo da pilha em uma string em t-1
        var adr1;
        if(ir.y == 1){
          adr1 = s.getInt32(t-TAM_INT);
          t -= TAM_INT;
        }
        else{
          adr1 = StringAlloc(String.fromCharCode(s.getUint8(t-TAM_CHAR)));
          t -= TAM_CHAR;
        }
        s.setInt32(t-TAM_INT, StringSearch(adr1, s.getInt32(t-TAM_INT)));
      break;
      case 68:    //Avaliação curta do operador 'ou'
        if (s.getUint8(t-TAM_BOOL))
          pc = ir.y;
      break;
      case 69:    //Avaliação curta do operador 'e'
        if (!s.getUint8(t-TAM_BOOL))
          pc = ir.y;
      break;
      case 70:  //Desalocação de memória
        MemoryFree(s.getInt32(t-TAM_INT), ir.y);
        t -= TAM_INT;
      break;
      case 71:    //Alocação de memória
        s.setInt32(t-TAM_INT, MemoryAloc(s.getInt32(t-TAM_INT)));
      break;
      case 72:    //Aleatório
        if(ir.y == 0){
          s.setFloat64(t, rand(1));
          t += TAM_REAL;
        }
        else
          s.setInt32(t-TAM_INT, rand(s.getInt32(t-TAM_INT)));

      break;
      case 73:    //Setar semente da função aleatório
        seed = s.getInt32(t-TAM_INT);
        t -= TAM_INT;
      break;
      case 74:    //Pegar tempo
        /*if(ir.y)
          s.setInt32(t-TAM_INT, getTimeInStack(s.getInt32(t-TAM_INT)));
        else {
          s.setInt32(t, setTimeInStack());
          t += TAM_INT;
        }*/
        s.setInt32(t, time32());
        t += TAM_INT;
      break;
      case 75:    //deletar um número de caracteres de uma string
        StringDel(s.getInt32(t-3*TAM_INT), s.getInt32(t-2*TAM_INT), s.getInt32(t-TAM_INT));
        t -= 3*TAM_INT;
      break;
      }
    }while(true);
}
function interpret(){
  if (call_read){
    startTime = (new Date).getTime();
    call_read = false;
    clearInterval(intervalExecution);
    if(isRunning){
        intervalExecution = setInterval(function () {
        interpret();
      }, 1);
      interpreter();
    }
  }
  else{
    mostraBtExecucarNovamente(false);
    read_ok = false;
    stack = new ArrayBuffer(stacksize);
    s = new DataView(stack);//new Array(stacksize);
    s.setInt32(0,0);
    s.setInt32(4, 0);
    s.setInt32(8, -1);
    s.setInt32(12, btab[1].last);
    startTime = new Date().getTime();
    time = 0;
    b = 0;
    seed = 1;
    display = [];
    TimeStack = [];
    isRunning = true;
    IndexTimeStack = 0;
    display[1] = 0;
    outputConsole = document.getElementById("output");
    t = btab[2].vsize;
    StartAddressMemory = stacksize*0.75;
    ttx = StartAddressMemory;
    pc = tab[s.getInt32(12)].adr;
    firstLine = [];
    firstLine.push(kode[pc].line-1);
    linecount = firstLine[0];
    arrayObjetoTabela = [];
    ps = 'run';
    lncnt = 0;
    ocnt = 0;
    chrcnt = 0;
    fld[1] = 10;
    fld[2] = 22;
    fld[3] = 10;
    fld[4] = 1;
    StringLiteral = [];
    clearInterval(intervalExecution);
    intervalExecution = setInterval(function () {
      interpret();
    }, 1);
    SetAllMemoryFree();
    removerTodaPilhaVar();
    carregaVariaveis(btab[1].last+1);
    removerTodaPilhaFuncoes();
    adicionarTabelaPilha(progname);
    limpaContadores();
    limpaConsole();
    interpreter();
  }
  if (call_read){
    pc--;
    ocnt--;
    time += (new Date).getTime() - startTime;
    return; //Caso esteja em uma instrução de leitura, finaliza o interpretador.
  }
    if (ps != "fin"){
      removerTopoPilha();
      switch (ps) {
        case 'caschk': console.log('Rótulo da estrutura caso indefinido');   break;
        case 'divchk': console.log('Divisão por 0');    break;
        case 'inxchk': console.log('Índice inválido');    break;
        case 'stkchk': console.log('Estouro de pilha'); break;
        case 'linchk': console.log('Saída muito grande');  break;
        case 'lngchk': console.log('Linha muito longa');    break;
      }
    }
    time += (new Date).getTime() - startTime;
    //atualizarConsole("\nTempo de execução: "+time+" ms.");
    clearInterval(intervalExecution);
    isRunning = false;
    // console.log("          " + ocnt + " steps");
    removerTodaPilhaVar();
    removerTodaPilhaFuncoes();
    debug_op = false;
    debug = false;
    mostraItensDepuracao(false);
    limpaLinhaDepurador();
    mostraBtExecucarNovamente(true);
}//interpret
