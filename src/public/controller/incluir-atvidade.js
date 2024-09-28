import { Atividade } from "../models/atividade_model.js";
import { Subtarefa } from "../models/subtarefa_model.js";
import { delay } from "../utils/utils.js";

export async function cadastroATV() {
    let nomeATV = document.getElementById("titulo-atividade").value;
    let desc = document.getElementById("descricao").value;
    let dataInicial = document.getElementById("dataInicial").value;
    let dataFinal = document.getElementById("dataFinal").value;

    console.log(nomeATV);

    if (nomeATV === "") {
        alert("Insira um título");
        return;
    } 
    if (dataFinal === "") {
        alert("Insira uma data Final!");
        return;
    } 
    if (new Date(dataInicial) > new Date(dataFinal)) {
        alert("A data inicial não pode ser maior que a data final!");
        return;
    } 

    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
    loadingModal.show();

    const ATV = new Atividade(nomeATV, desc, dataInicial, dataFinal);
    try {
        await ATV.cadastrar();
        console.log("Atividade cadastrada com sucesso:", ATV.getID());
        const subtarefas = verificarSubtarefas(); 
        for (const subtarefa of subtarefas) {
            const { nome, concluida } = subtarefa;
            const novaSubtarefa = new Subtarefa(ATV.getID(), nome, concluida);
            if (await novaSubtarefa.cadastrar()) { 
                console.log(`Subtarefa "${nome}" cadastrada com sucesso.`);
            } else {
                console.log(`Falha ao cadastrar a subtarefa "${nome}".`);
            }
        }

        await delay(200);
        if (document.body.id === "incluirATV-page") {
            location.reload();
        }
    } catch (error) {
        console.error("Deu ruim no cadastro:", error);
    } finally {
        loadingModal.hide();
    }
}

function verificarSubtarefas() {
    const inputs = document.querySelectorAll('.subtarefa');
    const subtarefas = [];

    inputs.forEach((input) => { 
        const formCheckDiv = input.closest('.form-check');
        const checkbox = formCheckDiv ? formCheckDiv.querySelector('.form-check-input') : null;

        if (input.value.trim() !== '') {
            subtarefas.push({
                nome: input.value.trim(),
                concluida: checkbox ? (checkbox.checked ? 1 : 0) : 0
            });
        }
    });

    return subtarefas;
}
