import { mostrarAlerta } from "../views/EditarTarefa.js";
import { Atividade } from "../models/atividade_model.js";
import { Subtarefa } from "../models/subtarefa_model.js";

const API_URL = 'http://127.0.0.1:8000/api';

export function fetchAtividade(id) {
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
            // Reconstrua o objeto Atividade com os dados recebidos
            const { nome, desc, data_Inicio, data_Final } = data.tarefa;
            const atividade = new Atividade(nome, desc, data_Inicio, data_Final);
            atividade.setId(data.tarefa.id); // Se necessário, adicione um método para definir o ID
            return atividade;
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

export async function fetchSubatividades(atividadeId) {
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
                // Reconstruir os objetos Subtarefa
                const subtarefas = data.message.map(item => {
                    const subtarefa = new Subtarefa(item.idAtividade, item.nome, item.concluida);
                    subtarefa.setId(item.id); // Setando o ID da subtarefa aqui
                    return subtarefa;
                });
                return subtarefas;
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

export async function salvarAtividade(atividadeId, dadosAtividade, subtarefasExistentes) {
    try {
        // Enviar dados da atividade
        const response = await fetch(`${API_URL}/atividades/${atividadeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtividade)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar atividade');
        }

        const data = await response.json();
        if (data.status) {
            // Verificar se dadosAtividade.subtarefas é um array
            const idsNovasSubtarefas = Array.isArray(dadosAtividade.subtarefas) 
                ? dadosAtividade.subtarefas.map(subtarefa => subtarefa.id) 
                : []; // Fallback para um array vazio

            // Excluir subtarefas que não estão mais na lista
            for (const subtarefaExistente of (subtarefasExistentes || [])) { // Garante que subtarefasExistentes é um array
                if (!idsNovasSubtarefas.includes(subtarefaExistente.id)) {
                    await excluirSubtarefa(atividadeId, subtarefaExistente.id); 
                }
            }

            // Atualizar ou adicionar novas subtarefas
            await Promise.all(dadosAtividade.subtarefas.map(async (subtarefa) => {
                if (subtarefa.id) {
                    await atualizarSubtarefa(atividadeId, subtarefa);
                } else {
                    await adicionarSubtarefa(atividadeId, {
                        nome: subtarefa.nome,
                        concluida: subtarefa.concluida
                    });
                }
            }));

            mostrarAlerta('Atividade e subtarefas atualizadas com sucesso!', 'success');
        } else {
            throw new Error(data.message || 'Erro ao atualizar atividade');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta(`Erro ao salvar atividade: ${error.message}`);
    }
}


async function atualizarSubtarefa(atividadeId, subtarefa) {
    try {
        const response = await fetch(`${API_URL}/atividades/${atividadeId}/subtarefas/${subtarefa.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subtarefa)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar subtarefa');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta(`Erro ao atualizar subtarefa: ${error.message}`);
    }
}

async function adicionarSubtarefa(atividadeId, subtarefaData) {
    try {
        const subtarefa = new Subtarefa(atividadeId, subtarefaData.nome, subtarefaData.concluida);
        await subtarefa.cadastrar();
    } catch (error) {
        console.error(error);
        mostrarAlerta(`Erro ao adicionar subtarefa: ${error.message}`);
    }
}

async function excluirSubtarefa(atividadeId, subtarefaId) {
    try {
        const subtarefa = new Subtarefa(atividadeId, '', false);
        subtarefa.setId(subtarefaId); 

        // Chama o método de exclusão
        await subtarefa.excluir();
        mostrarAlerta('Subtarefa excluída com sucesso!', 'success');
    } catch (error) {
        console.error(error);
        mostrarAlerta('Erro ao excluir subtarefa.');
    }
}


export async function obterSubtarefasExistentes(atividadeId) {
    try {
        const response = await fetch(`${API_URL}/subtarefas/${atividadeId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar subtarefas existentes.");
        }
        const data = await response.json();
        return data.subtarefas || []; // Retorne um array vazio se não houver subtarefas
    } catch (error) {
        console.error("Erro ao obter subtarefas existentes:", error);
        return []; // Retorne um array vazio em caso de erro
    }
}


export async function excluirAtividade(atividadeId) {
    try {
        const response = await fetch(`${API_URL}/atividades/${atividadeId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Erro ao excluir atividade');
        }
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

