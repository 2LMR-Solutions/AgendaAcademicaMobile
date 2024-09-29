import { mostrarAlerta, idsSubtarefasParaExcluir } from "../views/EditarTarefa.js";
import { Atividade } from "../models/atividade_model.js";
import { Subtarefa } from "../models/subtarefa_model.js";

const API_URL = 'http://127.0.0.1:8000/api';

export function fetchAtividade(id) {
    return fetch(`${API_URL}/atividades/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao buscar a atividade:', response.status);
            throw new Error('Atividade não encontrada');
        }
    })
    .then(data => {
        if (data.status) {
            const { nome, desc, data_Inicio, data_Final } = data.tarefa;
            const atividade = new Atividade(nome, desc, data_Inicio, data_Final);
            atividade.setId(data.tarefa.id); 
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
    try {
        const response = await fetch(`${API_URL}/subtarefas/${atividadeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                const subtarefas = data.message.map(item => {
                    const subtarefa = new Subtarefa(item.idAtividade, item.nome, item.concluida);
                    subtarefa.setId(item.id);
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
            window.location.href = '/index.html';
        } else {
            throw new Error(data.message || 'Erro ao excluir atividade');
        }
    } catch (error) {
        console.error(error);
        mostrarAlerta('Erro ao excluir atividade.');
    }
}

export async function salvarAtividade(atividadeId, dadosAtividade, subtarefasExistentes, novasSubtarefas) {
    try {
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
            const idsNovasSubtarefas = Array.isArray(novasSubtarefas)
                ? novasSubtarefas.map(subtarefa => subtarefa.id)
                : [];

            // Excluir subtarefas que foram removidas
            for (const subtarefaId of idsSubtarefasParaExcluir) {
                await excluirSubtarefa(atividadeId, subtarefaId);
            }

            for (const subtarefaExistente of (subtarefasExistentes || [])) {
                if (!idsNovasSubtarefas.includes(subtarefaExistente.id)) {
                    await excluirSubtarefa(atividadeId, subtarefaExistente.id);
                }
            }

            await Promise.all(novasSubtarefas.map(async (subtarefa) => {
                if (subtarefa.id) {
                    await atualizarSubtarefa(subtarefa);
                } else {
                    await adicionarSubtarefa(atividadeId, subtarefa);
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


async function adicionarSubtarefa(idAtividade, subtarefa) {
    const id = subtarefa.id
    const nome = subtarefa.nome
    const concluida = subtarefa.concluida

    try {
        const response = await fetch(`${API_URL}/subtarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, idAtividade, nome, concluida })
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar subtarefa');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        mostrarAlerta('Erro ao adicionar subtarefa.');
    }
}

async function atualizarSubtarefa(subtarefa) {
    const id = subtarefa.id ;
    const nome = subtarefa.nome
    const concluida = subtarefa.concluida

try {
    const response = await fetch(`${API_URL}/subtarefas/${id}/update`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, concluida })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar subtarefa');
    }

    return await response.json();
} catch (error) {
    console.error("Erro ao atualizar subtarefa:", error);
    mostrarAlerta('Erro ao atualizar subtarefa.');
}
}

async function excluirSubtarefa(atividadeId, subtarefaId) {
    try {
        const response = await fetch(`${API_URL}/subtarefas/${subtarefaId}`, {
            method: 'DELETE', // Método para exclusão
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir subtarefa');
        }

        mostrarAlerta('Subtarefa excluída com sucesso!', 'success');
    } catch (error) {
        console.error("Erro ao excluir subtarefa:", error);
        mostrarAlerta('Erro ao excluir subtarefa.');
    }
}