import { fetchAtividade, fetchSubatividades, salvarAtividade, excluirAtividade, obterSubtarefasExistentes } from '../controller/edicao_exclusao.js'



export async function populaTela(){
    const atividadeId = getQueryParam('id');
        if (!atividadeId) {
        mostrarAlerta('ID da atividade não fornecido na URL.');
        return;
    }
    console.log(atividadeId);
    const ATV = await fetchAtividade(atividadeId);
    preencherAtividade(ATV);
    const SubTF = await fetchSubatividades(atividadeId);
    preencherSubtarefas(SubTF);
}

export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function preencherAtividade(atividade) {
    document.getElementById('titulo-atividade').value = atividade.nome || '';
    document.getElementById('descricao').value = atividade.desc || '';
    document.getElementById('dataInicial').value = atividade.data_Inicio || '';
    document.getElementById('dataFinal').value = atividade.data_Final || '';
}

function preencherSubtarefas(subtarefas) {
    const atividadesContainer = document.getElementById('atividadesContainer');
    atividadesContainer.innerHTML = ''; 
    if (subtarefas.length > 0) {
        subtarefas.forEach(subtarefa => {
            const formCheck = document.createElement('div');
            formCheck.className = 'form-check';

            const inputCheck = document.createElement('input');
            inputCheck.className = 'form-check-input';
            inputCheck.type = 'checkbox';
            inputCheck.value = subtarefa.id;
            inputCheck.id = `subtarefa-${subtarefa.id}`;
            inputCheck.checked = subtarefa.concluida === 1;

            const label = document.createElement('label');
            label.className = 'labelSubtarefa';
            label.htmlFor = `subtarefa-${subtarefa.id}`;

            const inputSubtarefa = document.createElement('input');
            inputSubtarefa.className = 'subtarefa form-control';
            inputSubtarefa.id = `titulo-Subtarefa-${subtarefa.id}`;
            inputSubtarefa.value = subtarefa.nome;
            inputSubtarefa.placeholder = 'Subtarefa';

            label.appendChild(inputSubtarefa);
            formCheck.appendChild(inputCheck);
            formCheck.appendChild(label);
            atividadesContainer.appendChild(formCheck);
        });
    }
    const novaSubtarefa = document.createElement('div');
    novaSubtarefa.classList.add('form-check');
    novaSubtarefa.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="check-novo">
        <label class="labelSubtarefa" for="check-novo">
            <input class="subtarefa form-control" autocomplete="off" placeholder="Subtarefa">
        </label>
    `;
    atividadesContainer.appendChild(novaSubtarefa);
    iniciarSubtarefas(); 
}

function iniciarSubtarefas() {
    const container = document.getElementById('atividadesContainer');
    function adicionarSubtarefa(event) {
        const inputs = container.querySelectorAll('.subtarefa');
        const ultimoInput = inputs[inputs.length - 1];
        if (ultimoInput.value.trim() !== '') {
            const novaDiv = document.createElement('div');
            novaDiv.classList.add('form-check');
            novaDiv.innerHTML = `
                <input class="form-check-input" type="checkbox" value="" id="check${inputs.length + 1}">
                <label class="labelSubtarefa" for="check${inputs.length + 1}">
                    <input class="subtarefa form-control" autocomplete="off" placeholder="Subtarefa">
                </label>`;
            container.appendChild(novaDiv);
            const novoInputSubtarefa = novaDiv.querySelector('.subtarefa');
            novoInputSubtarefa.addEventListener('input', adicionarSubtarefa);
            novoInputSubtarefa.addEventListener('input', removerSubtarefa);
        }
    }

    function removerSubtarefa(event) {
        const input = event.target;
        if (input.value.trim() === '') {
            const divSubtarefa = input.closest('.form-check');
            const inputs = container.querySelectorAll('.subtarefa');

            if (divSubtarefa && inputs.length > 1) {
                divSubtarefa.remove();
            }
        }
    }
    container.querySelectorAll('.subtarefa').forEach(input => {
        input.addEventListener('input', adicionarSubtarefa);
        input.addEventListener('input', removerSubtarefa);
    });
}

export async function editarAtividade(atividadeid, dadosAtividade){
    const SUBSIDS = await obterSubtarefasExistentes(atividadeid);
    debugger
    await salvarAtividade(atividadeid, dadosAtividade, SUBSIDS.id );
}

export async function excluirATV() {
    const atividadeId = getQueryParam('id');
    if (!atividadeId) {
    mostrarAlerta('ID da atividade não fornecido na URL.');
    return;
}
    await excluirAtividade(atividadeId);
}

 export function abrirmodalexclusao(){
    $('#confirmDeleteModal').modal('show');
 }

export function mostrarAlerta(mensagem, tipo = 'error') {
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertClose = document.getElementById('customAlertClose');

    customAlertMessage.textContent = mensagem;
    if (tipo === 'success') {
        customAlert.style.backgroundColor = '#d4edda';
        customAlertMessage.style.color = '#155724';
        customAlertClose.classList.remove('btn-primary');
        customAlertClose.classList.add('btn-success');
    } else {
        customAlert.style.backgroundColor = '#f8d7da';
        customAlertMessage.style.color = '#721c24';
        customAlertClose.classList.remove('btn-success');
        customAlertClose.classList.add('btn-primary');
    }

    customAlert.style.display = 'block';

    customAlertClose.onclick = () => {
        customAlert.style.display = 'none';
    };
}
export function coletarDadosAtividade() {
    const nome = document.getElementById('titulo-atividade').value;
    const desc = document.getElementById('descricao').value;
    const data_Inicio = document.getElementById('dataInicial').value;
    const data_Final = document.getElementById('dataFinal').value;
    const notificacoes = document.getElementById('flexSwitchCheckDefault').checked ? 1 : 0;

    const atividadesContainer = document.getElementById('atividadesContainer');
    const subtarefas = [];
    atividadesContainer.querySelectorAll('.form-check').forEach(formCheck => {
        const checkbox = formCheck.querySelector('.form-check-input');
        const inputSubtarefa = formCheck.querySelector('.subtarefa');
        subtarefas.push({
            id: parseInt(checkbox.value),
            nome: inputSubtarefa.value,
            concluida: checkbox.checked ? 1 : 0
        });
    });

    return { nome, desc, data_Inicio, data_Final, subtarefas };
}


// document.getElementById('edit_btn').addEventListener('click', async (e) => {
//     e.preventDefault();

//     const atividadeId = getQueryParam('id');
//     if (!atividadeId) {
//         mostrarAlerta('ID da atividade não fornecido na URL.');
//         return;
//     }

//     const dadosAtividade = coletarDadosAtividade();

//     $('#loadingModal').modal('show');

//     try {
//         await salvarAtividade(atividadeId, dadosAtividade);
//     } finally {
//         $('#loadingModal').modal('hide');
//     }
// });

// document.getElementById('btnExcluir').addEventListener('click', () => {
//     $('#confirmDeleteModal').modal('show');
// });

// document.getElementById('confirmarExclusao').addEventListener('click', async () => {
//     const atividadeId = getQueryParam('id');
//     if (!atividadeId) {
//         mostrarAlerta('ID da atividade não fornecido na URL.');
//         return;
//     }

//     $('#confirmDeleteModal').modal('hide');
//     $('#loadingModal').modal('show');

//     try {
//         await excluirAtividade(atividadeId);
//     } finally {
//         $('#loadingModal').modal('hide');
//     }
// });

// document.getElementById('arquivo').addEventListener('change', function() {
//     const nomeArquivo = document.getElementById('nome-arquivo');
//     if (this.files.length > 0) {
//         const nomes = Array.from(this.files).map(file => file.name).join(', ');
//         nomeArquivo.textContent = nomes;
//     } else {
//         nomeArquivo.textContent = 'Nenhum arquivo escolhido';
//     }
// });

