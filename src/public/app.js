import { SplashScreen } from "./views/splash-screen.js";
import { agenda } from "./views/agenda.js";
import { preencherTarefasNoCalendario } from "./controller/preencherAgenda.js";
import { cadastroATV } from "./controller/incluir-atvidade.js";
import { buscarAtividades } from "./controller/preencherTelaInicial.js";
import { iniciarSubtarefas } from "./views/tela incluir tarefa/IncrementSubtarefas.js";
import { mostrarNomeArquivo } from "./views/IncluirTarefa.js";
import { mostrarAlerta } from "./views/EditarTarefa.js";
import { populaTela, editarAtividade, excluirATV, abrirmodalexclusao, coletarDadosAtividade, getQueryParam} from "./views/EditarTarefa.js";

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

  case "editATV-page":
    populaTela();
    document.addEventListener('DOMContentLoaded', () =>{
      document.getElementById("arquivo").addEventListener('change', function() {
            const nomeArquivo = document.getElementById('nome-arquivo');
            if (this.files.length > 0) {
                const nomes = Array.from(this.files).map(file => file.name).join(', ');
                nomeArquivo.textContent = nomes;
            } else {
                nomeArquivo.textContent = 'Nenhum arquivo escolhido';
            }
        });
        document.getElementById('edit_btn').addEventListener('click', async (e) => {
              e.preventDefault();
          
              const atividadeId = getQueryParam('id');
              if (!atividadeId) {
                  mostrarAlerta('ID da atividade não fornecido na URL.');
                  return;
              }
          
              const dadosAtividade = coletarDadosAtividade();
              const nome = document.getElementById('titulo-atividade').value.trim();
              const data_Inicio = document.getElementById('dataInicial').value;
              const data_Final = document.getElementById('dataFinal').value;

              if (nome === "") {
                mostrarAlerta('Insira um título');
                  return null;
              } 
              if (data_Final === "") {
                mostrarAlerta("Insira uma data final!");
                  return null;
              } 
              if (new Date(data_Inicio) > new Date(data_Final)) {
                mostrarAlerta("A data inicial não pode ser maior que a data final!");
                  return null;
              } 
              $('#loadingModal').modal('show');
          
              try {
                  await editarAtividade(atividadeId, dadosAtividade );
              } finally {
                  $('#loadingModal').modal('hide');
              }
          });
      let excluir = document.getElementById("btnExcluir");
      document.getElementById('confirmarExclusao').addEventListener('click', async () => {
            $('#confirmDeleteModal').modal('hide');
            $('#loadingModal').modal('show');
            try {
                await excluirATV();
            } finally {
                $('#loadingModal').modal('hide');
            }
        });
      if( excluir){
        // editar.onclick = editarAtividade();
        excluir.onclick = abrirmodalexclusao;
      }
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
