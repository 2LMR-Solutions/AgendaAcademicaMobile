export function iniciarSubtarefas() {
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

            novaDiv.querySelector('.subtarefa').addEventListener('input', adicionarSubtarefa);
            novaDiv.querySelector('.subtarefa').addEventListener('input', removerSubtarefa);
        }
    }

    function removerSubtarefa(event) {
        const input = event.target;

        if (input.value.trim() === '') {
            const divSubtarefa = input.closest('.form-check');
            if (divSubtarefa) {
                divSubtarefa.remove();
            }
        }
    }

    const primeiroInput = container.querySelector('.subtarefa');
    if (primeiroInput) {
        primeiroInput.addEventListener('input', adicionarSubtarefa);
        primeiroInput.addEventListener('input', removerSubtarefa);
    }

    container.querySelectorAll('.subtarefa').forEach(input => {
        input.addEventListener('input', adicionarSubtarefa);
        input.addEventListener('input', removerSubtarefa);
    });
}
