import { Usuario } from "../models/user_model.js";


export function cadastro_user(nome, nomeDeUsuario, senha){
    // let nome = document.getElementById("nomeForm").value;
    // let nomeDeUsuario = document.getElementById("nomeDeUsuarioForm").value;
    // let senha = document.getElementById("senhaForm").value;
    if (nome && nomeDeUsuario && senha) {
        const novoUsuario = new Usuario(nome, nomeDeUsuario, senha);
        novoUsuario.save();
        alert('Usuário cadastrado com sucesso!');
        // document.getElementsByClassName('userForm').reset(); 
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

export function login(){
    let input_nome_de_usuário = document.getElementById("Nome_de_Usuário").value;
    let input_Senha = document.getElementById("inputSenha").value
    let teste = "sucesso";
    document.getElementById("Nome_de_Usuário").value = "";
    document.getElementById("inputSenha").value = "";
    cadastro_user(teste, input_nome_de_usuário, input_Senha)
    // console.log("Nome:", input_nome_de_usuário);
    // console.log("Senha:", input_Senha);
    // Usuario.login("teste", "12345");
}