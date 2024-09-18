import { Atividade } from "../models/atividade_model.js";

export function cadastroT(){
    let nomeATV = document.getElementById("titulo-atividade").value;
    let desc = document.getElementById("descricao").value;
    console.log(nomeATV);
    if (nomeATV === ""){
        alert("Insira ao menos o titulo!");
    }
    else{
       const ATV = new Atividade(nomeATV, desc, "12012020", "12012021"); 
       if (ATV.cadastrar("1")){
        console.log("Boa");
       }
       else{
        console.log("Deu ruim");
       }
    }
}