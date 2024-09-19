import { SplashScreen } from "./views/splash-screen.js";
import { Usuario } from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";
import { agenda } from "./views/agenda.js";
import { AbrirCalendario } from "./views/IncluirTarefa.js";
import { mostrarNomeArquivo } from "./views/IncluirTarefa.js";
import { exibirMensagemValidacao } from "./views/tela criar conta/CriarConta.js";


if (document.body.id === 'agenda-page'){
  agenda();
}

SplashScreen(); 

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;
