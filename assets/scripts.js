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

document.addEventListener('input', function (event) {
	if (event.target.id == 'semanal'){
        document.querySelector('#number-columns').value = 7;
        document.querySelector('#number-columns').readOnly = true;
        document.querySelector('.radio-intervalo').style.display = 'block';
    }
    else if(event.target.id == 'outros'){
        document.querySelector('#number-columns').readOnly = false;
        document.querySelector('.radio-intervalo').style.display = 'none';
    }
    else{
        return;
    }
}, false);

function gerarTable(){
    apagarTabela();
    let linhas = document.getElementById("number-rows").value;
    let colunas = document.getElementById("number-columns").value;
    let tipo = document.querySelector('input[name="tipo"]:checked').value;
    let intervalo = document.querySelector('input[name="inter"]:checked').value;
    tableCreate(linhas, colunas, tipo, intervalo);
}

function tableCreate(linhas, colunas, tipo, intervalo) {
    let area = document.getElementsByClassName('tablearea')[0];
    let tbl = document.createElement('table');

    tbl.setAttribute('border', '1');

    for(let i = 0; i < (parseInt(linhas) + 1); i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < (parseInt(colunas) + 1); j++){
            let td = document.createElement('td');
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
                    for(let k = 0; k < parseInt(i) - 1; k++){
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
                    for(let k = 0; k < parseInt(i) - 1; k++){
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
        area.removeChild(area.childNodes[0]);
    }
}


