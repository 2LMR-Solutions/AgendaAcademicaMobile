import { Usuario } from '../models/user_model.js';


export function cadastro_user(nome, nomeDeUsuario, senha){
    // let nome = document.getElementById("nomeForm").value;
    // let nomeDeUsuario = document.getElementById("nomeDeUsuarioForm").value;
    // let senha = document.getElementById("senhaForm").value;
    if (nome && nomeDeUsuario && senha) {
        const novoUsuario = new Usuario(nome, nomeDeUsuario, senha);
        novoUsuario.save();
        alert('Usuário cadastrado com sucesso!');
        document.getElementsByClassName('userForm').reset(); 
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}