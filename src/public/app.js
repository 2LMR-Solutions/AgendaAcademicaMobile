import { showSplashScreenIndex } from "./views/splash-screen-Index.js";
import { showSplashScreenTelaInicial } from "./views/splash-screen-Tela-Inicial.js";
import { Usuario } from "./models/user_model.js";
import { Atividade } from "./models/atividade_model.js";
import { UserAtividade } from "./models/user_atividade_model.js";
import { cadastro_user } from "./controller/cadastro_user.js";
import { inactivityTime } from "./views/DetectorDeInatividade.js";
 
if (document.body.id === 'index-page') {
  document.addEventListener('DOMContentLoaded', showSplashScreenIndex);
}

if (document.body.id === 'Initial-page') {
  document.addEventListener('DOMContentLoaded', showSplashScreenTelaInicial);
}

inactivityTime();

window.cadastro_user = cadastro_user;
window.Usuario = Usuario;