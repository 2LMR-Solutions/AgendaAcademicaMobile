document.addEventListener("DOMContentLoaded", function() {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentDate = new Date();
    let selectedDate = new Date(currentDate);

    function carregarTarefas() {
        const tarefas = localStorage.getItem('tarefas');
        return tarefas ? JSON.parse(tarefas) : {};
    }

    function salvarTarefas(tarefas) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    let tasks = carregarTarefas();

    function criarTarefa(nome, dia, mes, ano) {
        const dateStr = `${ano}-${mes}-${dia}`;
        if (!tasks[dateStr]) {
            tasks[dateStr] = [];
        }

        tasks[dateStr].push(nome);

        salvarTarefas(tasks);
        
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
            if (tasks[`${ano}-${mes + 1}-${i}`]) {
                tasksDiv.innerHTML = '<span>&#x2605;</span>';
                dayDiv.addEventListener('click', () => abrirModalTarefas(i));
            }

            dayDiv.appendChild(dateSpan);
            dayDiv.appendChild(tasksDiv);
            grid.appendChild(dayDiv);
        }
    }

    function abrirModalTarefas(dia) {
        const dateStr = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${dia}`;
        const tarefasDoDia = tasks[dateStr] || [];
        const modalBody = document.querySelector("#modalTarefas .modal-body");
        modalBody.innerHTML = tarefasDoDia.length ? tarefasDoDia.map(tarefa => `<p>${tarefa}</p>`).join('') : '<p>Não há tarefas para este dia.</p>';
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

    document.getElementById('SetaMesEsquerda').addEventListener('click', () => mudarMes(-1));
    document.getElementById('SetaMesDireita').addEventListener('click', () => mudarMes(1));
    document.getElementById('voltarHoje').addEventListener('click', voltarParaHoje);
    document.getElementById('MesSelecionado').addEventListener('click', abrirModalMesAno);
    document.querySelector(".close").addEventListener("click", fecharModalMesAno);
    document.getElementById('confirmarMesAno').addEventListener('click', confirmarMesAno);
    document.querySelector("#modalTarefas .close").addEventListener("click", fecharModalTarefas);

    renderizarCalendario(selectedDate);

    //exemplo de como criar uma tarefa, colocar o nome da tarefa e a data, sendo dia, mes , ano
    // criarTarefa("Tarefa Silvio", 12, 9, 2024);
});