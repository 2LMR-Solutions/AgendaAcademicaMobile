import { Subtarefa } from "../models/subtarefa_model.js";

export function cadastroT(){
    let nomeSTF = document.getElementById("titulo-Subtarefa").value;
    let idAtividade = document.getElementById("id-atividade").value;
    let concluidaCheckbox = document.getElementById("defaultCheck1");
    let concluida = concluidaCheckbox.checked ? 1 : 0;
    console.log(nomeSTF);
    if (nomeSTF === ""){
        alert("Insira ao menos o titulo!");
    }
    else{ 
        // tem que ver algum jeito de fazer o idAtividade ser capturado para ser informado aqui na subtarefa
        // para a subtarefa funcionar vamos ter que ver algum jeito de salvar a atividade antes e depois buscar o ID
        // que foi salvo no banco para colocar aqui para linkar a subtarefa com a atividade
       const ATV = new Subtarefa("idAtividade", nomeSTF , concluida); 
       if (ATV.cadastrar("1")){
        console.log("Boa");
       }
       else{
        console.log("Deu ruim");
       }
    }
}