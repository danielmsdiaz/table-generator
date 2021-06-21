// document.addEventListener('input', function (event) {
// 	if (event.target.id == 'number-rows'){
//         let valor = event.target.value;
//         let area = document.getElementsByClassName('textNodeRow')[0];
//         for(let i = 0; i < valor; i++){
//             let div = document.createElement('div');
//             let label = document.createElement('label');
//             label.innerText = "Texto Linha " + (i + 1) + "  ";
//             let input = document.createElement('input');
//             div.appendChild(label);
//             div.appendChild(input);
//             area.append(div);
//         }
//     }
//     else if(event.target.id == 'number-columns'){
//         let valor = event.target.value;
//         let area = document.getElementsByClassName('textNodeColumn')[0];
//         for(let i = 0; i < valor; i++){
//             let div = document.createElement('div');
//             let label = document.createElement('label');
//             label.innerText = "Texto coluna " + (i + 1) + "  ";
//             let input = document.createElement('input');
//             div.appendChild(label);
//             div.appendChild(input);
//             area.append(div);
//         }
//     }
//     else{
//         return;
//     }
// }, false);

function validarNumber(elemento, radio){
    if(!document.querySelector('input[name="inter"]').checked){
        if(elemento.value && elemento.value > 48){
            elemento.value = ''
            alert('Digite um valor que seja menor que 48');
            return;
        }
    }

    if(!document.querySelector('input[name="inter"]:checked') || !document.querySelector('input[name="inter"]:checked').checked){
        if(elemento.value && elemento.value > 48){
            elemento.value = ''
            alert('Digite um valor que seja menor que 48');
            return;
        }
    }
    else{
        let intervalo = document.querySelector('input[name="inter"]:checked').value;
        if(intervalo == 60){
            if(elemento.value && elemento.value > 24){
                elemento.value = ''
                alert('Digite um valor que seja menor ou igual a 24');
                return;
            }
        }
        else if(intervalo == 50){
            if(elemento.value && elemento.value > 29){
                elemento.value = ''
                alert('Digite um valor que seja menor ou igual a 29');
                return;
            }
        }
        else{
            if(elemento.value && elemento.value > 48){
                elemento.value = ''
                alert('Digite um valor que seja menor ou igual a 48');
                return;
            }
        }
    }

    // if(radio && radio.checked){
    //     let intervalo = document.querySelector('input[name="inter"]:checked').value;
    //     if(intervalo == 60){
    //         if(elemento.value && elemento.value > 24){
    //             elemento.value = ''
    //             alert('Digite um valor que seja menor ou igual a 24');
    //             return;
    //         }
    //     }
    //     else if(intervalo == 50){
    //         if(elemento.value && elemento.value > 29){
    //             elemento.value = ''
    //             alert('Digite um valor que seja menor ou igual a 29');
    //             return;
    //         }
    //     }
    //     else{
    //         if(elemento.value && elemento.value > 48){
    //             elemento.value = ''
    //             alert('Digite um valor que seja menor ou igual a 48');
    //             return;
    //         }
    //     }
    // }
}

document.addEventListener('input', function (event) {
	if (event.target.id == 'semanal'){
        document.querySelector('#number-columns').value = 7;
        document.querySelector('#number-columns').readOnly = true;
        document.querySelector('#number-rows').readOnly = true;
        document.querySelector('#number-rows').placeholder  = "Calculado no intervalo!";
        document.querySelector('.radio-intervalo').style.display = 'block';
    }
    else if(event.target.id == 'outros'){
        document.querySelector('#number-columns').readOnly = false;
        document.querySelector('#number-rows').readOnly = false;
        document.querySelector('#number-rows').value = '';
        document.querySelector('#number-rows').placeholder  = "";
        document.querySelector('#number-columns').value = '';
        //intervalo
        document.querySelector('.radio-intervalo').style.display = 'none';
        if(document.querySelector('input[name="inter"]:checked') && document.querySelector('input[name="inter"]:checked').checked == true){
            document.querySelector('input[name="inter"]:checked').checked = false;
        }
        //select intervalo
        document.querySelector('.select-intervalo').style.display = 'none';
        document.querySelector('#inicio').value = "ph";
        document.querySelector('#fim').value = "ph";
    }
    else if (event.target.className == "inter"){
        document.querySelector('#number-rows').value = '';
        document.querySelector('#number-rows').readOnly = false;
        document.querySelector('.select-intervalo').style.display = 'block';
        let inicio = document.querySelector('#inicio');
        let fim = document.querySelector('#fim');
        inicio.value = "ph";
        fim.value = "ph";
        //seed select
        if(event.target.id == 60){
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                let optionIni = new Option(i.toString().padStart(2, '0') +":00", i);
                let optionFim = new Option(i.toString().padStart(2, '0') +":00", i);
                optionIni.setAttribute("key", "i"+i);
                optionFim.setAttribute("key", "f"+i);

                inicio.add(optionIni);
                fim.add(optionFim);
            }
        }
        else if(event.target.id == 50){
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                let optionIni = new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i);
                let optionFim = new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i);
                optionIni.setAttribute("key", "i"+i);
                optionFim.setAttribute("key", "f"+i);
                inicio.add(optionIni);
                fim.add(optionFim);
            }
        }
        else{
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                let optionIni = new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i);
                let optionFim = new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i);
                optionIni.setAttribute("key", "i"+i);
                optionFim.setAttribute("key", "f"+i);
                inicio.add(optionIni);
                fim.add(optionFim);
            }
        }
        //
        let inputLinhas = document.querySelector('#number-rows');
        validarNumber(inputLinhas);
    }
    else if (event.target.className == 'variacao'){
        let intervalo = document.querySelector('input[name="inter"]:checked');
        let inicio = document.querySelector('#inicio');
        let fim = document.querySelector('#fim');
        
        if(inicio.value != "ph" && fim.value != "ph"){
            if(parseInt(inicio.value) >= parseInt(fim.value)){
                alert('O inicio não pode ser maior que o final');
                inicio.value = "ph";
                fim.value = "ph";
                return;
            }
            else{
                let diferenca = parseInt(fim.value) - parseInt(inicio.value);
                document.querySelector('#number-rows').value = diferenca + 1;
                document.querySelector('#number-rows').readOnly = true;
            }
        }
    }
    else if (event.target.className == 'numbers'){
        if(event.target.value <= 0){
            event.target.value = '';
            alert('Não é aceito um numero menor/igual que 0');
            return;
        }
    }
    else{
        return;
    }
}, false);

function removeAll(inicio, fim) {
    while (inicio.options.length > 1) {
        inicio.remove(1);
    }
    while (fim.options.length > 1) {
        fim.remove(1);
    }
}

function gerarTable(){
    apagarTabela();
    let linhas = document.getElementById("number-rows").value;
    let colunas = document.getElementById("number-columns").value;
    let tipo = document.querySelector('input[name="tipo"]:checked').value;
    if(tipo == "s"){
        if(document.querySelector('input[name="inter"]:checked')){
            if(document.getElementsByClassName('select-intervalo')[0]){
                if(document.querySelector('#inicio').value == "ph" && document.querySelector('#fim').value == "ph"){
                    alert('Escolha um valor para o início e para o fim!')
                    document.getElementById('print').style.display = "none";
                    document.getElementsByClassName('edit-cell')[0].style.display = "none";
                    return;
                }
                else if(document.querySelector('#inicio').value == "ph" && document.querySelector('#fim').value != "ph"){
                    alert('Escolha um valor para o início!');
                    document.getElementById('print').style.display = "none";
                    document.getElementsByClassName('edit-cell')[0].style.display = "none";
                    return;
                }
                else if(document.querySelector('#inicio').value != "ph" && document.querySelector('#fim').value == "ph"){
                    alert('Escolha um valor para o fim!');
                    document.getElementById('print').style.display = "none";
                    document.getElementsByClassName('edit-cell')[0].style.display = "none";
                    return;
                }
                let intervalo = document.querySelector('input[name="inter"]:checked').value;
                tableCreate(linhas, colunas, tipo, intervalo);
            }
        }
        else{
            alert("Escolha um intervalo!");
            document.getElementById('print').style.display = "none";
            document.getElementsByClassName('edit-cell')[0].style.display = "none";
            return;
        }
    }
    else{
        if(linhas && colunas){
            tableCreate(linhas, colunas, tipo);
        }
        else if(linhas && !colunas){
            alert("Informe a quantidade de colunas");
            document.getElementById('print').style.display = "none";
            document.getElementsByClassName('edit-cell')[0].style.display = "none";
            return;
        }
        else if(!linhas && colunas){
            alert("Informe a quantidade de linhas");
            document.getElementById('print').style.display = "none";
            document.getElementsByClassName('edit-cell')[0].style.display = "none";
            return;
        }
        else{
            alert("Informe a quantidade de linhas e colunas");
            document.getElementById('print').style.display = "none";
            document.getElementsByClassName('edit-cell')[0].style.display = "none";
            return;
        }
    }
}

function tableCreate(linhas, colunas, tipo, intervalo = null) {
    let area = document.getElementsByClassName('tablearea')[0];
    let tbl = document.createElement('table');

    tbl.setAttribute('border', '1');

    if(tipo == "s"){
        for(let i = 0; i < (parseInt(linhas) + 1); i++){
            let tr = document.createElement('tr');
            for(let j = 0; j < (parseInt(colunas) + 1); j++){
                let td = document.createElement('td');
                td.addEventListener('click', masterEventHandler, false);
                tr.appendChild(td);
            }
            tbl.appendChild(tr); 
            tbl.className = "table"
            area.appendChild(tbl);
        }
    }
    else{
        for(let i = 0; i < (parseInt(linhas)); i++){
            let tr = document.createElement('tr');
            for(let j = 0; j < (parseInt(colunas) + 1); j++){
                let td = document.createElement('td');
                td.addEventListener('click', masterEventHandler, false);
                tr.appendChild(td);
            }
            tbl.appendChild(tr); 
            tbl.className = "table"
            area.appendChild(tbl);
        }
    }
    document.getElementById('print').style.display = "block";
    if(tipo == 's' && document.querySelector(".table")){
        preencherTabela(document.querySelector(".table"), intervalo);
    }
}

function preencherTabela(elemento, intervalo){
    let arrayAux = [];
    for(let i = 0; i < elemento.rows.length; i++){
        if(i > 0){
            if(intervalo == 60){
                if(document.querySelector('#fim') && document.querySelector('#inicio')){
                    for(let pos = parseInt(document.querySelector('#inicio').value); pos <= parseInt(document.querySelector('#fim').value); pos++){
                        let horario = document.querySelector("[key='f"+pos+"']");
                        if(!arrayAux.includes(horario.text)){
                            let x = elemento.rows[i].cells;
                            x[0].innerHTML = horario.text;
                            arrayAux.push(horario.text);
                            break;
                        }
                        else{
                            continue;
                        }
                    }
                }
                else{
                    let x = elemento.rows[i].cells;
                    if(i > 10){
                        x[0].innerHTML = parseInt(i - 1) + ":00";
                        continue;
                    }
                    x[0].innerHTML = "0" + parseInt(i - 1) + ":00";
                    continue;
                }
            }
            else if(intervalo == 50){
                if(document.querySelector('#fim') && document.querySelector('#inicio')){
                    for(let pos = parseInt(document.querySelector('#inicio').value); pos <= parseInt(document.querySelector('#fim').value); pos++){
                        let horario = document.querySelector("[key='f"+pos+"']");
                        if(!arrayAux.includes(horario.text)){
                            let x = elemento.rows[i].cells;
                            x[0].innerHTML = horario.text;
                            arrayAux.push(horario.text);
                            break;
                        }
                        else{
                            continue;
                        }
                    }
                }
                else{
                    let x = elemento.rows[i].cells;
                    if(i == 1){
                        var d = new Date;
                        d.setHours(0,0,0,0)
                        x[0].innerHTML = d.getHours().toString().padStart(2, '0') + ":00";
                        //x[0].innerHTML = ("0" + new Date(new Date().setHours(0,0,0,0)).getHours()).slice(-2) + ":" + ("0" + new Date(new Date().setHours(0,0,0,0)).getMinutes()).slice(-2);
                        continue;
                    }
                    else{
                        var d = new Date;
                        d.setHours(0,0,0,0);
                        for(let j = 0; j < parseInt(i) - 1; j++){
                            d = new Date(d.getTime() + 50*60000);
                        }
                        x[0].innerHTML = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padEnd(2, "0");
                    }
                }
            }
            else{
                if(document.querySelector('#fim') && document.querySelector('#inicio')){
                    for(let pos = parseInt(document.querySelector('#inicio').value); pos <= parseInt(document.querySelector('#fim').value); pos++){
                        let horario = document.querySelector("[key='f"+pos+"']");
                        if(!arrayAux.includes(horario.text)){
                            let x = elemento.rows[i].cells;
                            x[0].innerHTML = horario.text;
                            arrayAux.push(horario.text);
                            break;
                        }
                        else{
                            continue;
                        }
                    }
                }
                else{
                    let x = elemento.rows[i].cells;
                    if(i == 1){
                        var d = new Date;
                        d.setHours(0,0,0,0)
                        x[0].innerHTML = d.getHours().toString().padStart(2, '0') + ":00";
                        //x[0].innerHTML = ("0" + new Date(new Date().setHours(0,0,0,0)).getHours()).slice(-2) + ":" + ("0" + new Date(new Date().setHours(0,0,0,0)).getMinutes()).slice(-2);
                        continue;
                    }
                    else{
                        var d = new Date;
                        d.setHours(0,0,0,0);
                        for(let j = 0; j < parseInt(i) - 1; j++){
                            d = new Date(d.getTime() + 30*60000);
                        }
                        x[0].innerHTML = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padEnd(2, "0");
                    }
                }
            }
        }
        for(let j = 0; j < elemento.rows[i].cells.length; j++){
            if(i == 0){
                if(j > 0){
                    let arrayDias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                    let x = elemento.rows[i].cells;
                    x[j].innerHTML = arrayDias[(parseInt(j) - 1)];
                }
            }
        }
    }
}

function apagarTabela(){
    let area = document.getElementsByClassName('tablearea')[0];
    if(area.hasChildNodes()){
        for (let i = 0; i < area.childNodes.length; i++) {
            if (area.childNodes[i].className == "table") {
              area.removeChild(area.childNodes[i]);
            }        
        }
    }
}
  
function masterEventHandler(){
    let celulaHidden = document.getElementById('celula-clicada');
    let linha = this.parentNode.rowIndex;
    let coluna = this.cellIndex;
    let areaEdit = document.getElementsByClassName('edit-cell')[0];

    if(linha == 0 && coluna == 0){
        areaEdit.style.display = "none";
        alert("Não é possivel editar essa célula");
        return;
    }

    celulaHidden.setAttribute("linha", linha);
    celulaHidden.setAttribute("coluna", coluna);

    areaEdit.style.display = "block";
    let texto = this.innerHTML;
    let inputTexto = document.getElementById('text-cell');
    inputTexto.value = texto;
}

function salvarCelula(){
    let inputTexto = document.getElementById('text-cell').value;
    let cor = document.getElementById('cor').value;
    let celulaHidden = document.getElementById('celula-clicada');
    let linha = celulaHidden.getAttribute("linha");
    let coluna = celulaHidden.getAttribute("coluna");
    let celula = document.getElementsByClassName("table")[0].rows[linha].cells.item(coluna);

    let fontColor = escolherBackground(cor, '#FFFFFF', '#000000');
    celula.innerHTML = inputTexto;
    celula.style.color = fontColor;
    celula.style.backgroundColor = cor;

    let areaEdit = document.getElementsByClassName('edit-cell')[0];
    areaEdit.style.display = "none";
}

function escolherBackground(bgColor, lightColor, darkColor) {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    let uicolors = [r / 255, g / 255, b / 255];
    let c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
  }
