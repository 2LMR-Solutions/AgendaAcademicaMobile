import { SplashScreen } from "./views/splash-screen.js";
import { Usuario } from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user,login } from "./controller/cadastro_user.js";
import { agenda } from "./views/agenda.js";
import { preencherTarefasNoCalendario } from "./controller/preencherAgenda.js";
import { cadastroT } from "./controller/incluir-atvidade.js";
import { buscarAtividades } from "./controller/preencherTelaInicial.js";
import { iniciarSubtarefas } from "./views/tela incluir tarefa/IncrementSubtarefas.js";
import { mostrarNomeArquivo } from "./views/IncluirTarefa.js";


if (document.body.id === 'agenda-page'){
  agenda();
  preencherTarefasNoCalendario();
}
else if (document.body.id === 'incluirATV-page'){
  document.addEventListener('DOMContentLoaded', () => {
    let test_btn = document.getElementById("test-btn");
    if (test_btn) {
      test_btn.onclick = cadastroT;
    }
    iniciarSubtarefas();
    document.getElementById('arquivo').addEventListener('change', mostrarNomeArquivo);
  });
}

SplashScreen(); 
buscarAtividades();

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;
window.logar = login;
