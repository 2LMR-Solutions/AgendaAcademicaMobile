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
        alert("Insira ao menos o título!");
        return; // Adiciona retorno para evitar continuar caso o título esteja vazio
    } 

    const ATV = new Atividade(nomeATV, desc, dataInicial, dataFinal);
    try {
        // Aguarda o cadastro da atividade ser concluído
        await ATV.cadastrar();
        console.log("Atividade cadastrada com sucesso:", ATV.getID());

        // **Coletar e cadastrar as subtarefas**
        const subtarefas = verificarSubtarefas(); // Nova função para verificar subtarefas
        for (const subtarefa of subtarefas) {
            const { nome, concluida } = subtarefa;
            const novaSubtarefa = new Subtarefa(ATV.getID(), nome, concluida);
            if (await novaSubtarefa.cadastrar()) { // Certifique-se que cadastrar é assíncrono
                console.log(`Subtarefa "${nome}" cadastrada com sucesso.`);
            } else {
                console.log(`Falha ao cadastrar a subtarefa "${nome}".`);
            }
        }

        // Aqui a página só é recarregada após todos os cadastros
        await delay(200);
        if (document.body.id === "incluirATV-page") {
            location.reload();
        }
    } catch (error) {
        console.error("Deu ruim no cadastro:", error);
    }
}

// **Função para verificar e coletar subtarefas**
function verificarSubtarefas() {
    const inputs = document.querySelectorAll('.subtarefa');
    const subtarefas = [];

    inputs.forEach((input, index) => {
        const checkbox = document.querySelector(`.form-check-input[id^="check${index + 1}"]`); // Seletor para checkbox correspondente
        if (input.value.trim() !== '') {
            subtarefas.push({
                nome: input.value.trim(),
                concluida: checkbox ? (checkbox.checked ? 1 : 0) : 0 // Verifica se checkbox existe e se está checked
            });
        }
    });

    return subtarefas;
}
