const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const currentDate = new Date();
let selectedDate = new Date(currentDate);

let tarefas = {};
export function criarTarefa(atividade) {
    const { nome, data_Final, id } = atividade; 
    const data = new Date(data_Final + 'T00:00:00'); 
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getFullYear();

    const dateStr = `${ano}-${mes}-${dia}`;
    if (!tarefas[dateStr]) {
        tarefas[dateStr] = [];
    }

    tarefas[dateStr].push({ nome, id }); 

    renderizarCalendario(selectedDate);
}

function renderizarCalendario(data) {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDiaDoMes.getDate();

    const grid = document.querySelector('.Grid');
    grid.innerHTML = '';

    document.getElementById('MesSelecionado').textContent = `${monthNames[mes]} ${ano}`;

    for (let i = 0; i < primeiroDiaDoMes.getDay(); i++) {
        grid.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= diasNoMes; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('Dia');
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('date');
        dateSpan.textContent = i;

        const tasksDiv = document.createElement('div');
        tasksDiv.classList.add('tarefasAgenda');
        if (tarefas[`${ano}-${mes + 1}-${i}`]) {
            tasksDiv.innerHTML = '<span>&#x2605;</span>';
        }

        dayDiv.addEventListener('click', () => abrirModalTarefas(i));
        dayDiv.appendChild(dateSpan);
        dayDiv.appendChild(tasksDiv);
        grid.appendChild(dayDiv);
    }
}

function abrirModalTarefas(dia) {
    const dateStr = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${dia}`;
    const tarefasDoDia = tarefas[dateStr] || [];
    const modalBody = document.querySelector("#modalTarefas .modal-body");

    if (tarefasDoDia.length > 0) {
        modalBody.innerHTML = tarefasDoDia.map(tarefa => `
            <p>
                <a href="http://127.0.0.1:5500/src/public/views/tela%20editar%20tarefa/EditarTarefa.html?id=${tarefa.id}" class="nav-link">
                    ${tarefa.nome}
                </a>
            </p>
        `).join('') + ` 
            <a href="/src/public/views/tela incluir tarefa/IncluirTarefa.html" class="nav-link BotaoOutraTarefa">
                <button id="adicionarTarefa" class="btn btn-primary mt-3">Adicionar novas tarefas</button>
            </a>`;
    } else {
        modalBody.innerHTML = '<p>Não há tarefas para este dia.</p>' + ` 
            <a href="/src/public/views/tela incluir tarefa/IncluirTarefa.html" class="nav-link BotaoOutraTarefa">
                <button id="adicionarTarefa" class="btn btn-primary mt-3">Adicionar tarefa</button>
            </a>`;
    }

    const modal = document.getElementById("modalTarefas");
    modal.style.display = "block";
}

function mudarMes(meses) {
    selectedDate.setMonth(selectedDate.getMonth() + meses);
    renderizarCalendario(selectedDate);
}

function voltarParaHoje() {
    selectedDate = new Date(currentDate);
    renderizarCalendario(selectedDate);
}

function abrirModalMesAno() {
    const modal = document.getElementById("modalMesAno");
    modal.style.display = "block";
}

function fecharModalMesAno() {
    const modal = document.getElementById("modalMesAno");
    modal.style.display = "none";
}

function confirmarMesAno() {
    const mesSelecionado = document.getElementById("mesSelect").value;
    const anoSelecionado = document.getElementById("anoSelect").value;

    selectedDate.setMonth(mesSelecionado);
    selectedDate.setFullYear(anoSelecionado);

    renderizarCalendario(selectedDate);
    fecharModalMesAno();
}

function fecharModalTarefas() {
    const modal = document.getElementById("modalTarefas");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modalMesAno = document.getElementById("modalMesAno");
    const modalTarefas = document.getElementById("modalTarefas");
    if (event.target === modalMesAno) {
        fecharModalMesAno();
    }
    if (event.target === modalTarefas) {
        fecharModalTarefas();
    }
}

let InicioTouch = 0;
let FinalTouch = 0;

function TratarInicioTouch(event) {
    InicioTouch = event.changedTouches[0].screenX;
}

function TratarFinalTouch(event) {
    FinalTouch = event.changedTouches[0].screenX;
    SwipeTouch();
}

function SwipeTouch() {
    const swipeDistance = FinalTouch - InicioTouch;

    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
        mudarMes(-1);
    } else if (swipeDistance < -swipeThreshold) {
        mudarMes(1);
    }
}

export function agenda(){
    document.addEventListener('touchstart', TratarInicioTouch, false);
    document.addEventListener('touchend', TratarFinalTouch, false);
    document.getElementById('SetaMesEsquerda').addEventListener('click', () => mudarMes(-1));
    document.getElementById('SetaMesDireita').addEventListener('click', () => mudarMes(1));
    document.getElementById('voltarHoje').addEventListener('click', voltarParaHoje);
    document.getElementById('MesSelecionado').addEventListener('click', abrirModalMesAno);
    document.querySelector(".close").addEventListener("click", fecharModalMesAno);
    document.getElementById('confirmarMesAno').addEventListener('click', confirmarMesAno);
    document.querySelector("#modalTarefas .close").addEventListener("click", fecharModalTarefas);

    renderizarCalendario(selectedDate);

    //exemplo de como criar uma tarefa, colocar o nome da tarefa e a data, sendo dia, mes , ano
    //criarTarefa("Tarefa Silvio", 12, 9, 2024);
}