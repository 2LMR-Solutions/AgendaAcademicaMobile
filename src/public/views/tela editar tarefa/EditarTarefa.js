
const API_URL = 'http://127.0.0.1:8000/api';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const atividadeId = getQueryParam('id');

console.log(atividadeId);

function mostrarAlerta(mensagem, tipo = 'error') {
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

function fetchAtividade(id) {
    console.log(`Buscando atividade com ID: ${id}`);
    return fetch(`${API_URL}/atividades/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao buscar a atividade:', response.status);
            throw new Error('Atividade não encontrada');
        }
    })
    .then(data => {
        console.log('Dados da atividade recebidos:', data);
        if (data.status) {
            return data.tarefa;
        } else {
            throw new Error('Atividade não encontrada');
        }
    })
    .catch(error => {
        console.error(error);
        mostrarAlerta('Erro ao buscar atividade.');
        return null;
    });
}

async function fetchSubatividades(atividadeId) {
    console.log(`Buscando subtarefas para a atividade ID: ${atividadeId}`);
    try {
        const response = await fetch(`${API_URL}/subtarefas/${atividadeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Status da resposta:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Dados das subtarefas recebidos:', data);
            if (data.status) {
                return data.message;
            } else {
                console.error('Erro na resposta das subatividades:', data.message);
                return [];
            }
        } else {
            console.error('Erro ao buscar as subtarefas:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        return [];
    }
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
                    <input class="subtarefa" autocomplete="off" placeholder="Subtarefa">
                </label>
            `;
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
            if (divSubtarefa && container.querySelectorAll('.subtarefa').length > 1) {
                divSubtarefa.remove();
            }
        }
    }

    container.querySelectorAll('.subtarefa').forEach(input => {
        input.addEventListener('input', adicionarSubtarefa);
        input.addEventListener('input', removerSubtarefa);
    });

    const inputs = container.querySelectorAll('.subtarefa');
    if (inputs.length > 0) {
        const ultimoInput = inputs[inputs.length - 1];
        ultimoInput.addEventListener('input', adicionarSubtarefa);
        ultimoInput.addEventListener('input', removerSubtarefa);
    }
}

function coletarDadosAtividade() {
    const nome = document.getElementById('titulo-atividade').value;
    const desc = document.getElementById('descricao').value;
    const dataInicio = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
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

    return { nome, desc, dataInicio, dataFinal, notificacoes, subtarefas };
}


async function salvarAtividade(atividadeId, dadosAtividade) {
    try {
        const response = await fetch(`/atividades/${atividadeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtividade)
        });
        const data = await response.json();
        if (data.status) {
            mostrarAlerta('Atividade atualizada com sucesso!', 'success');

        } else {
            throw new Error(data.message || 'Erro ao atualizar atividade');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Erro ao salvar atividade.');
    }
}

async function excluirAtividade(atividadeId) {
    try {
        const response = await fetch(`/atividades/${atividadeId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (data.status) {
            mostrarAlerta('Atividade excluída com sucesso!', 'success');
            window.location.href = '/src/public/views/tela agenda/Agenda.html';
        } else {
            throw new Error(data.message || 'Erro ao excluir atividade');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Erro ao excluir atividade.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const atividadeId = getQueryParam('id');
    if (!atividadeId) {
        mostrarAlerta('ID da atividade não fornecido na URL.');
        return;
    }

    fetchAtividade(atividadeId)
        .then(atividade => {
            if (atividade) {
                preencherAtividade(atividade);
                return fetchSubatividades(atividadeId);
            }
        })
        .then(subtarefas => {
            if (subtarefas) {
                preencherSubtarefas(subtarefas);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar dados da atividade:', error);
            mostrarAlerta('Erro ao carregar dados da atividade.');
        });
});

document.getElementById('incluirATV_btn').addEventListener('click', async (e) => {
    e.preventDefault();

    const atividadeId = getQueryParam('id');
    if (!atividadeId) {
        mostrarAlerta('ID da atividade não fornecido na URL.');
        return;
    }

    const dadosAtividade = coletarDadosAtividade();

    $('#loadingModal').modal('show');

    try {
        await salvarAtividade(atividadeId, dadosAtividade);
    } finally {
        $('#loadingModal').modal('hide');
    }
});

document.getElementById('btnExcluir').addEventListener('click', () => {
    $('#confirmDeleteModal').modal('show');
});

document.getElementById('confirmarExclusao').addEventListener('click', async () => {
    const atividadeId = getQueryParam('id');
    if (!atividadeId) {
        mostrarAlerta('ID da atividade não fornecido na URL.');
        return;
    }

    $('#confirmDeleteModal').modal('hide');
    $('#loadingModal').modal('show');

    try {
        await excluirAtividade(atividadeId);
    } finally {
        $('#loadingModal').modal('hide');
    }
});

document.getElementById('arquivo').addEventListener('change', function() {
    const nomeArquivo = document.getElementById('nome-arquivo');
    if (this.files.length > 0) {
        const nomes = Array.from(this.files).map(file => file.name).join(', ');
        nomeArquivo.textContent = nomes;
    } else {
        nomeArquivo.textContent = 'Nenhum arquivo escolhido';
    }
});

