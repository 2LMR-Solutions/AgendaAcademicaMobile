import { SplashScreen } from "./views/splash-screen.js";
// import { Usuario } from "./models/user_model.js";
// import { Atividade } from "./models/atividade_model.js";
// import { UserAtividade } from "./models/user_atividade_model.js";
// import { cadastro_user,login } from "./controller/cadastro_user.js";
import { agenda } from "./views/agenda.js";
import { preencherTarefasNoCalendario } from "./controller/preencherAgenda.js";
import { cadastroATV } from "./controller/incluir-atvidade.js";
import { buscarAtividades } from "./controller/preencherTelaInicial.js";
import { iniciarSubtarefas } from "./views/tela incluir tarefa/IncrementSubtarefas.js";
import { mostrarNomeArquivo } from "./views/IncluirTarefa.js";

switch (document.body.id){
case "index-page":
  buscarAtividades();
  break;

case "agenda-page":
  agenda();
  preencherTarefasNoCalendario();
  break;

case "incluirATV-page":
  document.addEventListener('DOMContentLoaded', () => {
        let incluirATV_btn = document.getElementById("incluirATV_btn");
        if (incluirATV_btn) {
          incluirATV_btn.onclick = cadastroATV;
        }
        iniciarSubtarefas();
        document.getElementById('arquivo').addEventListener('change', mostrarNomeArquivo);
      });
  break;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}

const offlineModal = new bootstrap.Modal(document.getElementById('offlineModal'));
window.addEventListener('offline', () => {
    offlineModal.show();
});
window.addEventListener('online', () => {
    offlineModal.hide();
});

SplashScreen(); 
