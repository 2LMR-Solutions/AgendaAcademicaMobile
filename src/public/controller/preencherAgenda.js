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

// Preencher tarefas no calendário usando o objeto atividade
export function preencherTarefasNoCalendario() {
    buscarAtividades()
    .then(data => {
        if (data && data.status && Array.isArray(data.message)) {
            data.message.forEach(atividade => {
                criarTarefa(atividade); // Apenas chama criarTarefa, que agora não abre o modal automaticamente
            });
        } else {
            console.warn('Dados das atividades não estão no formato esperado.');
        }
    })
    .catch(error => {
        console.error('Erro ao preencher o calendário:', error);
    });
}

// Lógica para abrir o modal apenas ao clicar em um dia do calendário
document.querySelectorAll('.dia-calendario').forEach(diaElement => {
    diaElement.addEventListener('click', () => {
        const dia = diaElement.getAttribute('data-dia'); // Supondo que você tenha um atributo data-dia
        abrirModalTarefas(dia); // Abre o modal somente quando o dia é clicado
    });
});