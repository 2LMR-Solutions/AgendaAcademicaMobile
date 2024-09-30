import { criarTarefa } from "../views/agenda.js";

const API_URL = 'http://127.0.0.1:8000/api';

function buscarAtividades() {
    return fetch(`${API_URL}/atividades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao buscar as atividades:', response.status);
            throw new Error('Erro ao buscar as atividades');
        }
    });
}

export function preencherTarefasNoCalendario() {
    buscarAtividades()
    .then(data => {
        if (data && data.status && Array.isArray(data.message)) {
            data.message.forEach(atividade => {
                criarTarefa(atividade); 
            });
        } else {
            console.warn('Dados das atividades não estão no formato esperado.');
        }
    })
    .catch(error => {
        console.error('Erro ao preencher o calendário:', error);
    });
}

document.querySelectorAll('.dia-calendario').forEach(diaElement => {
    diaElement.addEventListener('click', () => {
        const dia = diaElement.getAttribute('data-dia'); 
        abrirModalTarefas(dia);
    });
});