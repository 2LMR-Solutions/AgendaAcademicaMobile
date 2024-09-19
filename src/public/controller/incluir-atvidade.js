import { Atividade } from "../models/atividade_model.js";

export function cadastroT() {
    let nomeATV = document.getElementById("titulo-atividade").value;
    let desc = document.getElementById("descricao").value;
    let dataInicial = document.getElementById("dataInicial").value;
    let dataFinal = document.getElementById("dataFinal").value;
    
    console.log(nomeATV);

    if (nomeATV === "") {
        alert("Insira ao menos o título!");
    } else {
        const ATV = new Atividade(nomeATV, desc, dataInicial, dataFinal);
        if (ATV.cadastrar("1")) {
            console.log("Boa");
            delay(200).then(() => {
                document.body.id === "incluirATV-page" ? location.reload() : null;
            });
        } else {
            console.log("Deu ruim");
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}