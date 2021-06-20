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
        document.querySelector('.radio-intervalo').style.display = 'block';
    }
    else if(event.target.id == 'outros'){
        document.querySelector('#number-columns').readOnly = false;
        document.querySelector('#number-columns').value = '';
        //intervalo
        document.querySelector('.radio-intervalo').style.display = 'none';
        document.querySelector('input[name="inter"]:checked').checked = false;
        //select intervalo
        document.querySelector('.select-intervalo').style.display = 'none';
        document.querySelector('#inicio').value = "ph";
        document.querySelector('#fim').value = "ph";
    }
    else if (event.target.className == "inter"){
        document.querySelector('.select-intervalo').style.display = 'block';
        let inicio = document.querySelector('#inicio');
        let fim = document.querySelector('#fim');
        inicio.value = "ph";
        fim.value = "ph";
        //seed select
        if(event.target.id == 60){
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                inicio.add(new Option(i.toString().padStart(2, '0') +":00", i));
                fim.add(new Option(i.toString().padStart(2, '0') +":00", i));
            }
        }
        else if(event.target.id == 50){
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                inicio.add(new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i));
                fim.add(new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i));
            }
        }
        else{
            removeAll(inicio, fim);
            for(let i = 0; i < 24/(event.target.id/60); i++){
                inicio.add(new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i));
                fim.add(new Option((Math.floor((event.target.id * i)/60)).toString().padStart(2, '0')+":"+((event.target.id*i)%60).toString().padEnd(2, '0'), i));
            }
        }
        //
        let inputLinhas = document.querySelector('#number-rows');
        validarNumber(inputLinhas);
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
        let intervalo = document.querySelector('input[name="inter"]:checked').value;
        tableCreate(linhas, colunas, tipo, intervalo);
    }
    else{
        tableCreate(linhas, colunas, tipo);
    }
}

function tableCreate(linhas, colunas, tipo, intervalo = null) {
    let area = document.getElementsByClassName('tablearea')[0];
    let tbl = document.createElement('table');

    tbl.setAttribute('border', '1');

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
   
    if(tipo == 's' && document.querySelector(".table")){
        preencherTabela(document.querySelector(".table"), intervalo);
    }
}

function preencherTabela(elemento, intervalo){
    for(let i = 0; i < elemento.rows.length; i++){
        if(i > 0){
            if(intervalo == 60){
                let x = elemento.rows[i].cells;
                if(i > 10){
                    x[0].innerHTML = parseInt(i - 1) + ":00";
                    continue;
                }
                x[0].innerHTML = "0" + parseInt(i - 1) + ":00";
                continue;
            }
            else if(intervalo == 50){
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
    let celulaHidden = document.getElementById('celula-clicada');
    let linha = celulaHidden.getAttribute("linha");
    let coluna = celulaHidden.getAttribute("coluna");

    let celula = document.getElementsByClassName("table")[0].rows[linha].cells.item(coluna);
    celula.innerHTML = inputTexto;

    let areaEdit = document.getElementsByClassName('edit-cell')[0];
    areaEdit.style.display = "none";
}
