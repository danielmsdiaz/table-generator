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
    }
    else if(event.target.id == 'outros'){
        document.querySelector('#number-columns').readOnly = false;
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
    tableCreate(linhas, colunas, tipo);
}

function tableCreate(linhas, colunas, tipo) {
    let area = document.getElementsByClassName('tablearea')[0];
    let tbl = document.createElement('table');

    tbl.style.width = '100%';
    tbl.style.height = '100%';
    tbl.setAttribute('border', '1');

    for(let i = 0; i < linhas; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < colunas; j++){
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        tbl.appendChild(tr); 
        area.appendChild(tbl);
    }
}

function apagarTabela(){
    let area = document.getElementsByClassName('tablearea')[0];
    if(area.hasChildNodes()){
        area.removeChild(area.childNodes[0]);
    }
}


