import { fetchAtividade, fetchSubatividades, salvarAtividade, excluirAtividade} from '../controller/edicao_exclusao.js'
export const idsSubtarefasParaExcluir = []; 

export async function populaTela(){
    const atividadeId = getQueryParam('id');
        if (!atividadeId) {
        mostrarAlerta('ID da atividade não fornecido na URL.');
        return;
    }
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
            inputCheck.value = subtarefa.getId();
            inputCheck.id = `subtarefa-${subtarefa.getId()}`;
            inputCheck.checked = subtarefa.concluida === 1;

            const label = document.createElement('label');
            label.className = 'labelSubtarefa';
            label.htmlFor = `subtarefa-${subtarefa.getId()}`;

            const inputSubtarefa = document.createElement('input');
            inputSubtarefa.className = 'subtarefa form-control';
            inputSubtarefa.id = `titulo-Subtarefa-${subtarefa.getId()}`;
            inputSubtarefa.value = subtarefa.nome;
            inputSubtarefa.placeholder = 'Subtarefa';

            const inputIdInvisivel = document.createElement('input');
            inputIdInvisivel.type = 'hidden';
            inputIdInvisivel.className = 'id-subtarefa';
            inputIdInvisivel.value = subtarefa.getId() || ''; 

            label.appendChild(inputSubtarefa);
            formCheck.appendChild(inputCheck);
            formCheck.appendChild(label);
            formCheck.appendChild(inputIdInvisivel); 
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
            const inputIdInvisivel = divSubtarefa.querySelector('.id-subtarefa');
    
            if (divSubtarefa && inputIdInvisivel) {
                const subtarefaId = parseInt(inputIdInvisivel.value);
                if (!isNaN(subtarefaId)) {
                    idsSubtarefasParaExcluir.push(subtarefaId); 
                }
                divSubtarefa.remove(); 
            }
        }
    }
    container.querySelectorAll('.subtarefa').forEach(input => {
        input.addEventListener('input', adicionarSubtarefa);
        input.addEventListener('input', removerSubtarefa);
    });
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

export async function editarAtividade(atividadeId, dadosAtividadeExistente) {
    const dadosAtividadeColetados = coletarDadosAtividade();

    const dadosAtividade = {
        nome: dadosAtividadeColetados.nome,
        desc: dadosAtividadeColetados.desc,
        data_Inicio: dadosAtividadeColetados.data_Inicio,
        data_Final: dadosAtividadeColetados.data_Final,
        notificacoes: dadosAtividadeColetados.notificacoes
    };

    const novasSubtarefas = dadosAtividadeColetados.subtarefas;

    const subtarefasExistentes = dadosAtividadeExistente.subtarefas;

    await salvarAtividade(atividadeId, dadosAtividade, subtarefasExistentes, novasSubtarefas);
}

export function coletarDadosAtividade() {
    const nome = document.getElementById('titulo-atividade').value.trim();
    const desc = document.getElementById('descricao').value.trim();
    const data_Inicio = document.getElementById('dataInicial').value;
    const data_Final = document.getElementById('dataFinal').value;

    const atividadesContainer = document.getElementById('atividadesContainer');
    const subtarefas = [];

    atividadesContainer.querySelectorAll('.form-check').forEach(formCheck => {
        const checkbox = formCheck.querySelector('.form-check-input');
        const inputSubtarefa = formCheck.querySelector('.subtarefa');
        const inputIdInvisivel = formCheck.querySelector('.id-subtarefa'); 
        const nomeSubtarefa = inputSubtarefa.value.trim();
        const idSubtarefa = inputIdInvisivel ? parseInt(inputIdInvisivel.value) : null; 

        if (nomeSubtarefa !== '') { 
            subtarefas.push({
                id: isNaN(idSubtarefa) ? null : idSubtarefa, 
                nome: nomeSubtarefa,
                concluida: checkbox.checked ? 1 : 0
            });
        }
    });
    return { nome, desc, data_Inicio, data_Final, subtarefas };
}