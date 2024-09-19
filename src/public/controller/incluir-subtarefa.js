import { Subtarefa } from "../models/subtarefa_model.js";

export function cadastroT(){
    let nomeATV = document.getElementById("titulo-atividade").value;
    let idAtividade = document.getElementById("id-atividade").value;
    let concluida = document.getElementById("concluida").value;
    console.log(nomeATV);
    if (nomeATV === ""){
        alert("Insira ao menos o titulo!");
    }
    else{
       const ATV = new Subtarefa(nomeATV, idAtividade, concluida); 
       if (ATV.cadastrar("1")){
        console.log("Boa");
       }
       else{
        console.log("Deu ruim");
       }
    }
}