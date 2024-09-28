import { setProgress } from "../views/graficos.js";

const API_URL = 'http://127.0.0.1:8000/api';

export function buscarAtividades() {
    fetch(`${API_URL}/atividades`, {
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
        }
    })
    .then(data => {
        if (data && data.status) {
            preencherTabelaAtividades(data.message);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function buscarSubatividades(atividadeId) {
    return fetch(`${API_URL}/subtarefas/${atividadeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao buscar as subatividades:', response.status);
            return { status: false, message: [] };
        }
    })
    .then(data => {
        if (data && data.status) {
            return data.message;
        } else {
            console.error('Erro na resposta das subatividades:', data.message);
            return [];
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        return [];
    });
}

function preencherTabelaAtividades(atividades) {
    const atividadesList = document.getElementById('atividades-list');
    const graficosContainer = document.querySelector('.GraficosRelatorioSemanal');

    atividadesList.innerHTML = '';
    graficosContainer.innerHTML = '';

    const dataAtual = new Date();
    const dataAtualStr = formatarDataLocal(dataAtual);

    const dataInicioIntervalo = new Date(dataAtual);
    dataInicioIntervalo.setHours(0, 0, 0, 0);

    const atividadesComDataValida = atividades.filter(atividade => {
        const dataFinal = new Date(atividade.data_Final + 'T00:00'); 
        return atividade.data_Final && !isNaN(dataFinal.getTime()) && dataFinal >= dataInicioIntervalo;
    });

    const atividadesOrdenadas = atividadesComDataValida
        .sort((a, b) => new Date(a.data_Final + 'T00:00') - new Date(b.data_Final + 'T00:00'))
        .slice(0, 4); 

    atividadesOrdenadas.forEach((atividade, index) => {
        const dataFinalFormatada = formatarDataLocal(new Date(atividade.data_Final + 'T00:00'));
        const dataAtividade = new Date(atividade.data_Final + 'T00:00');

        const isHoje = compararDatas(dataAtual, dataAtividade);
        const classeAtividade = isHoje ? 'atividade-hoje' : ''; 

        const atividadeItem = document.createElement('md-list-item');
        atividadeItem.className = classeAtividade;
        atividadeItem.innerHTML = `
            <div>
                <strong>${atividade.nome || 'Sem Nome'}</strong>
                <span class="float-end">${dataFinalFormatada || 'N/A'}</span>
            </div>
            <md-divider></md-divider>
        `;
        atividadesList.appendChild(atividadeItem);

        buscarSubatividades(atividade.id).then(subatividades => {
            if (subatividades && subatividades.length > 0) {
                const totalSubatividades = subatividades.length;
                const subatividadesConcluidas = subatividades.filter(subatividade => subatividade.concluida === 1).length;

                const percentConcluido = totalSubatividades > 0 
                    ? Math.round((subatividadesConcluidas / totalSubatividades) * 100) 
                    : 0;
                const graficoContainer = document.createElement('div');
                graficoContainer.className = 'col-6 col-md-4 col-lg-3 Materias';
                graficoContainer.id = `Materia${index + 1}`;

                graficoContainer.innerHTML = `
                    <div class="progress-circle" id="Grafico${index + 1}">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <circle class="circle-bg" cx="18" cy="18" r="15.9155"/>
                            <circle class="circle" cx="18" cy="18" r="15.9155"/>
                        </svg>
                        <div class="percentage">
                            <span class="percent">0%</span>
                        </div>
                    </div>
                    <span>${atividade.nome || 'Sem Nome'}</span>
                `;

                graficosContainer.appendChild(graficoContainer);
                setTimeout(() => {
                    setProgress(`Grafico${index + 1}`, percentConcluido);
                }, 200);
            }
        });
    });
}

function compararDatas(data1, data2) {
    return (
        data1.getDate() === data2.getDate() &&
        data1.getMonth() === data2.getMonth() &&
        data1.getFullYear() === data2.getFullYear()
    );
}

function formatarDataLocal(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
